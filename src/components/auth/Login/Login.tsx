import { Link, theme, View, Image, Button, StatusBar } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
  Alert as RnAlert,
  PermissionsAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import NustarInputController from '../../common/NustarInputController/NustarInputController';
import { ILoginFields } from './types';
import { Ionicons, Feather,  } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, addProfile } from '../../../store/features/user/userSlice';
import {
  useBiometricsLoginMutation,
  useLoginMutation,
} from '../../../services/gim/auth/auth';
import {
  emailPatternValidator,
  emailValidationErrorText,
  emailValidator,
} from '../../../utils/formValidator';
import InputIconContainer from '../../common/InputIconContainer/InputIconContainer';
import { retrieveLocalData } from '../../../services/async-storage/asyncStorage';
import { IAppState } from '../../../store/types';
import { biometricsImage } from '../../../utils/biometrics';
import { getDeviceInfo } from '../../../utils/device';
import CustomAlert from '../../common/CustomAlert/CustomAlert';
import OnboardingHeader from '../../common/OnboardingHeader/OnboardingHeader';
import NustarButton from '../../common/NustarButton/NustarButton';

const Login: FC = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [localData, setLocalData] =
    useState<{
      useBiometrics: boolean;
      email: string;
    }>();
  const [imageMeta, setImageMeta] =
    useState<{ image: ImageSourcePropType; alt: string }>();
  const [location, setLocation] = useState<string>('');
  const { handleSubmit, control, setValue, getValues } = useForm<ILoginFields>({
    mode: 'onBlur',
    defaultValues: {
      email: 'breylixhenriquez07@hotmail.com',
      password: 'Password1234.'
    }
  });
  const [login, { isLoading, error, reset }] = useLoginMutation();
  const [
    biometricsLogin,
    { error: biometricsError, isLoading: biometricsLoading },
  ] = useBiometricsLoginMutation();
  const dispatch = useDispatch();
  const auth = useSelector((state: IAppState) => state.user?.auth);

  useEffect(() => {
    retrieveBiometricData();
  }, []);

  useEffect(() => {
    if (auth?.biometryType) {
      setImageMeta(biometricsImage[auth?.biometryType]);
    }
  }, [auth]);

  useEffect(() => {
    handleBiometricsLogin();
  }, [localData]);

  const handleLogIn = async (formData: ILoginFields) => {
    try {
      const notificationToken = await retrieveLocalData('notificationToken');
      const device = await getDeviceInfo();
      const loginPayload = {
        formData,
        device: { ...device, token: notificationToken },
        location,
      };
      const response = await login(loginPayload).unwrap();
      dispatch(addProfile(response.profile));
      dispatch(
        addAuth({
          ...auth,
          ...response?.auth,
          isAuthenticated: true,
        }),
      );
    } catch (e) {
      const err = e as Error;
      console.error(`Could not login - message: ${err.message} - stack: ${err.stack}`);
    }
  };

  // const getCurrentLocation = async () => {
  //   const { status } = await Location.requestBackgroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     const permission = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (permission === 'denied') {
  //       RnAlert.alert(
  //         'Permission not granted',
  //         'Allow the app to use location service.',
  //         [{ text: 'OK' }],
  //         { cancelable: false },
  //       );
  //     }
  //   } else if (status === 'granted') {
  //     const { coords } = await Location.getCurrentPositionAsync();

  //     if (coords) {
  //       const { latitude, longitude } = coords;
  //       const response = await Location.reverseGeocodeAsync({
  //         latitude,
  //         longitude,
  //       });
  //       for (let item of response) {
  //         let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
  //         setLocation(address);
  //       }
  //     }
  //   }
  // };

  const handleBiometricsLogin = async () => {
    try {
      if (localData?.email && localData?.useBiometrics) {
      const response = await biometricsLogin({
          email: localData?.email,
          uuid: auth?.device?.uuid,
          signature: '',
        }).unwrap();
        if (biometricsError) {
          throw new Error(biometricsError as string);
        }
        dispatch(addProfile(response.profile));
        dispatch(
          addAuth({
            ...auth,
            ...response?.auth,
            isAuthenticated: true,
          }),
        );
      }
    } catch (e) {
      const err = e as Error;
      console.error(
        `Could not sign in with biometrics - message: ${err.message} - stack: ${err.stack}`,
      );
    }
  };

  const retrieveBiometricData = async () => {
    const authData = await retrieveLocalData('auth');
    if (authData) {
      setValue('email', authData?.email);
      setLocalData({
        email: authData?.email,
        useBiometrics: authData?.useBiometrics,
      });
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle='dark-content' />
      <View style={styles.imageContainer}>
        <OnboardingHeader
          title="Welcome back"
          subtitle="Login to your account"
        />
      </View>
      <View style={styles.inputContainer}>
        <NustarInputController
          inputProps={{
            placeholder: 'Email Address',
            style: {
              borderWidth: 0,
            },
            leftElement: (
              <InputIconContainer>
                <Feather name="mail" size={20} color={theme.colors.black} />
              </InputIconContainer>
            ),
          }}
          name="email"
          control={control}
          rules={{
            required: emailValidationErrorText(getValues('email')),
            validate: (e: any) => emailValidator(e),
            pattern: {
              value: emailPatternValidator,
              message: 'Email provided is not valid',
            },
          }}
        />
        <NustarInputController
          inputProps={{
            placeholder: 'Password',
            style: {
              borderWidth: 0,
            },
            secureTextEntry: !showPassword,
            rightElement: (
              <InputIconContainer>
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  onPress={() => setShowPassword(!showPassword)}
                  size={20}
                />
              </InputIconContainer>
            ),
            leftElement: (
              <InputIconContainer>
                <Feather name="lock" size={20} color={theme.colors.black} />
              </InputIconContainer>
            ),
          }}
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />
        {localData?.useBiometrics && imageMeta?.image ? (
          <View style={[styles.centeredItems, { paddingVertical: 20 }]}>
            <TouchableHighlight
              onPress={handleBiometricsLogin}
              underlayColor="lightgray"
              style={{ borderRadius: 10 }}
            >
              <Image
                source={imageMeta?.image}
                alt={imageMeta?.alt}
                style={{ width: 75, height: 75 }}
              />
            </TouchableHighlight>
          </View>
        ) : null}
        <View style={styles.buttonContainer}>
          {error ? (
            <CustomAlert errorMessage={String(error)} reset={reset} />
          ) : null}
          <NustarButton
            onPress={handleSubmit(handleLogIn)}
            isLoading={isLoading || biometricsLoading}
          >
            Login
          </NustarButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '45%',
  },
  buttonBox: {
    width: '48%',
    height: '100%',
    maxHeight: 100,
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.4,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonContainer: {
    marginVertical: 15,
  },
  errorContainer: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    display: 'flex',
    marginBottom: 10,
    flex: 0.3,
  },
  divider: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    flex: 0.1,
    minHeight: 100,
  },
  inputContainer: {
    flex: 0.6,
    paddingHorizontal: 10,
  },
  welcomeText: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0.1,
    justifyContent: 'flex-end',
  },
  spaceBetween: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
  },
  centeredItems: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  root: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default Login;
