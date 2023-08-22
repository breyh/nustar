import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';

export interface IIconContainerProp {
    children: React.ReactNode;
}

const InputIconContainer: FC<IIconContainerProp> = ({children}) => {
  return (
    <View style={styles.root}>
        {children}
    </View>
  )
}

export default InputIconContainer;

const styles = StyleSheet.create({
    root: {
        marginHorizontal: 10,
    }
})