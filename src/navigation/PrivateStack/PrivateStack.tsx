import React from 'react';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Home from '../../components/private/Home/Home';
import { ParamListBase } from '@react-navigation/native';
import Budget from '../../components/private/Budget/Budget';
import ToDoList from '../../components/private/ToDoList/ToDoList';

export interface PrivateRootStackParamList extends ParamListBase {
  Home: undefined;
  Budget: undefined;
  ToDoList: undefined;
}

const PrivateStack = () => {
  const Drawer = createDrawerNavigator<PrivateRootStackParamList>();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawer {...props} />
      )}
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTransparent: true,
        headerTitleAlign: 'left',
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Budget" component={Budget} />
      <Drawer.Screen name="ToDoList" component={ToDoList} />
    </Drawer.Navigator>
  );
};

export default PrivateStack;
