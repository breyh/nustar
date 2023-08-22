import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {AntDesign, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import { Text, View } from 'native-base';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1, width: '100%', padding: 10, marginTop: 30}}>
        <DrawerItem
          icon={() => <AntDesign name="home" size={20} />}
          label={() => <Text fontSize="md"> Home </Text>}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          icon={() => <FontAwesome5 name="money-check-alt" size={20} />}
          label={() => <Text fontSize="md"> Budget </Text>}
          onPress={() => props.navigation.navigate('Budget')}
        />
        <DrawerItem
          icon={() => <MaterialCommunityIcons name="format-list-checks" size={20} />}
          label={() => <Text fontSize="md"> To Do List </Text>}
          onPress={() => props.navigation.navigate('ToDoList')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
