import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PublicStack from './PublicStack/PublicStack';
import PrivateStack from './PrivateStack/PrivateStack';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/types';
import { StatusBar } from 'expo-status-bar';

const MainNavigation = () => {
  const auth = useSelector((state: IAppState) => state.user?.auth);

  return (
    <NavigationContainer>
      <StatusBar translucent />
      {!auth?.isAuthenticated ? <PublicStack /> : <PrivateStack />}
    </NavigationContainer>
  );
};

export default MainNavigation;
