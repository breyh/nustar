import React, { useRef } from 'react';
import { Button, IButtonProps } from 'native-base';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/Colors';

export interface INustarButtonProps extends IButtonProps {
    primary?: boolean;
    secondary?: boolean;
}

const NustarButton = (props: INustarButtonProps) => {
    const buttomRef = useRef()
    return (
        <Button
            ref={buttomRef}
            style={[styles.button,]}
            background={props?.primary ? Colors.paynesGray : Colors.tiffanyBlue}
            {...props}
        >
            {props?.children}
        </Button>
    );
};

export default NustarButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        height: 55,
    },
});
