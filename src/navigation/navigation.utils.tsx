import React from 'react';
import { IconButton } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';

export const BackButton = (
  navigation: any,
  navigateTo: any,
  arrowColor?: string,
) => (
  <IconButton onPress={() => navigation.navigate(navigateTo)}>
    <AntDesign
      name="arrowleft"
      size={30}
      style={{
        color: arrowColor || 'black',
        height: 30,
        width: 30,
      }}
    />
  </IconButton>
);
