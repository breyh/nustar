import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import WelcomeScreen from '../../components/common/WelcomeScreen/WelcomeScreen';
import Login from '../../components/auth/Login/Login';
import { PublicNavigationScreen } from '../types';
import { IconButton } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ParamListBase } from '@react-navigation/native';
import Join from '../../components/auth/Join/Join';

export interface PublicRootStackParamList extends ParamListBase {
  WelcomeScreen: undefined;
  Login: undefined;
}

const PublicStack = () => {
  const Stack = createNativeStackNavigator<PublicRootStackParamList>();

  const renderBackButton = (
    navigation: any,
    navigateTo: any,
    arrowColor?: string,
  ) => (
    <IconButton
      onPress={() => navigation.navigate(navigateTo)}
      style={{ alignSelf: 'center' }}>
      <AntDesign
        name="arrowleft"
        size={30}
        style={{
          color: arrowColor || 'black',
          height: 50,
          width: 50,
        }}
      />
    </IconButton>
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerTransparent: true,
          headerLeft: () =>
            renderBackButton(navigation, PublicNavigationScreen.WELCOME_SCREEN),
        })}
      />
      <Stack.Screen
        name="Join"
        component={Join}
        options={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerTransparent: true,
          headerLeft: () =>
            renderBackButton(navigation, PublicNavigationScreen.WELCOME_SCREEN),
        })}
      />
    </Stack.Navigator>
  );
};

export default PublicStack;
