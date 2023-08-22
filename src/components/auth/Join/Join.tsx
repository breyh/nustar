import {
  Button,
  Text,
  View,
  theme,
  ScrollView,
} from 'native-base';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet } from 'react-native';
import {
  emailValidator,
  nameValidator,
  isValidPassword,
  passwordConfirmationValidator,
  emailValidationErrorText,
  emailPatternValidator,
} from '../../../utils/formValidator';
import InputIconContainer from '../../common/InputIconContainer/InputIconContainer';
import {
  retrieveLocalData,
} from '../../../services/async-storage/asyncStorage';
import { IJoinFields } from './Join.types';
import { useJoinMutation } from '../../../services/gim/auth/auth';
import OnboardingHeader from '../../common/OnboardingHeader/OnboardingHeader';
import NustarInputController from '../../common/NustarInputController/NustarInputController';
import CustomAlert from '../../common/CustomAlert/CustomAlert';
import { Ionicons, Feather, FontAwesome, AntDesign } from '@expo/vector-icons/';
import { Colors } from '../../../utils/Colors';
import { addProfile, addAuth } from '../../../store/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../../store/types';
import { getDeviceInfo } from '../../../utils/device';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trackYourMoney } from '../../../assets';


const Join: FC = ({ navigation }: any) => {
  const { control, getValues, handleSubmit, setValue } = useForm<IJoinFields>({
    mode: 'onBlur',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [join, { isLoading, error, isError, reset }] = useJoinMutation();
  const auth = useSelector((state: IAppState) => state.user?.auth);
  const dispatch = useDispatch();

  const onSubmit = async (formData: IJoinFields) => {
    try {
      delete formData.confirmPassword;
      const notificationToken = await retrieveLocalData('notificationToken');
      const _device = await getDeviceInfo()
      const response = await join({
        customer: formData,
        device: { ..._device, token: notificationToken },
      }).unwrap();
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
      console.error(
        `Could not join to Budget-App - message: ${err.message} - stack: ${err.stack}`,
      );
    }
  };

  const passwordValidationMessage = (password: string) =>
    isValidPassword(password) || 'Password entered is not valid';

  const confirmPasswordValidationMessage = (password: string) =>
    passwordConfirmationValidator(getValues('password'), password) ||
    'Password must be the same';

  return (
    <SafeAreaView style={styles.joinContainer}>
      <View style={styles.imageContainer}>
        <OnboardingHeader
          title="Profile creation"
          subtitle="Create a Profile"
        />
      </View>
      <ScrollView style={styles.content}>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <NustarInputController
              control={control}
              name="firstName"
              inputProps={{
                placeholder: 'First name',
                InputLeftElement: (
                  <InputIconContainer>
                    <Feather name="user" size={25} color={theme.colors.black} />
                  </InputIconContainer>
                ),
                testID: 'name-input',
              }}
              rules={{
                required: 'We need to know your name',
                validate: (e: any) => nameValidator(e),
                minLength: {
                  value: 3,
                  message: 'Minimum length to name is 3 characters',
                },
              }}
              containerStyles={{ width: '48%' }}
            />
            <NustarInputController
              control={control}
              name="lastName"
              inputProps={{
                placeholder: 'Last name',
                InputLeftElement: (
                  <InputIconContainer>
                    <AntDesign name="idcard" size={25} color={theme.colors.black} />
                  </InputIconContainer>
                ),
                testID: 'lastname-input',
              }}
              rules={{
                required: 'We need to know your lastname',
                validate: (e: any) => nameValidator(e),
                minLength: {
                  value: 3,
                  message: 'Minimum length to last name is 3 characters',
                },
              }}
              containerStyles={{ width: '48%' }}

            />
          </View>
          <NustarInputController
            control={control}
            name="email"
            inputProps={{
              placeholder: 'Email',
              InputLeftElement: (
                <InputIconContainer>
                  <Feather name="mail" size={25} color={theme.colors.black} />
                </InputIconContainer>
              ),
              testID: 'email-input',
              onBlur: () => setValue('email', getValues('email')?.trim()),
            }}
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
            control={control}
            name="password"
            inputProps={{
              placeholder: 'Password',
              secureTextEntry: !showPassword,
              style: {
                borderWidth: 0,
              },
              rightElement: (
                <InputIconContainer>
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                    size={25}
                    color={theme.colors.black}
                  />
                </InputIconContainer>
              ),
              leftElement: (
                <InputIconContainer>
                  <Feather name="lock" size={25} color={theme.colors.black} />
                </InputIconContainer>
              ),
              testID: 'password-input',
            }}
            rules={{
              required: 'You need to provide a password',
              validate: (e: any) => passwordValidationMessage(e),
              minLength: {
                value: 6,
                message:
                  'Password must be minimum of 6 characters. Including one capital letter and one number and one symbol',
              },
            }}
          />
          <NustarInputController
            control={control}
            name="confirmPassword"
            inputProps={{
              placeholder: 'Confirm password',
              secureTextEntry: !showConfirmPassword,
              style: {
                borderWidth: 0,
              },
              leftElement: (
                <InputIconContainer>
                  <Feather name="lock" size={25} color={theme.colors.black} />
                </InputIconContainer>
              ),
              rightElement: (
                <InputIconContainer>
                  <Ionicons
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    size={25}
                    color={theme.colors.black}
                  />
                </InputIconContainer>
              ),
              testID: 'confirm-password-input',
            }}
            rules={{
              required: 'You need to confirm the password',
              validate: (e: string) => confirmPasswordValidationMessage(e),
              minLength: {
                value: 12,
                message: 'minimum value is 12 characters',
              },
            }}
          />
        </View>
        {isError && error && (
          <CustomAlert errorMessage={String(error)} reset={reset} />
        )}
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            style={{
              backgroundColor: Colors.paynesGray,
              height: 55,
            }}
            testID="continue-button"
          >
            <Text style={{ color: theme.colors.white }}>
              Continue{' '}
              <FontAwesome
                name="arrow-right"
                style={{
                  fontSize: 14,
                  marginLeft: 5,
                }}
              />
            </Text>
          </Button>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image source={trackYourMoney} style={{ width: 300, height: 200 }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    paddingHorizontal: 10,
    flex: 0.7,
  },
  alertError: {
    backgroundColor: theme.colors.error[600],
    margin: 10,
  },
  buttonContainer: {
    paddingVertical: 10,
    marginBottom: 50,
  },
  imageContainer: {
    display: 'flex',
    marginBottom: 10,
    flex: 0.3,
  },
  joinContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export default Join;
