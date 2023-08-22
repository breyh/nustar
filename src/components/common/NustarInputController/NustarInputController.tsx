import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { IInputProps, Input, Text, useTheme, View } from 'native-base';

export interface INustarInputController {
  control: any;
  name: string;
  rules?: any;
  inputProps?: IInputProps;
  containerStyles?: any;
}
const NustarInputController: FC<INustarInputController> = ({
  control,
  name,
  rules = {},
  inputProps = {},
  containerStyles = {}
}) => {
  const theme = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View
          style={[
            styles.container,
            {
              borderColor: error
                ? theme.colors.error[600]
                : theme.colors.gray[600],
            },
            containerStyles
          ]}>
          <Input
            {...inputProps}
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
          {error && (
            <View style={{paddingHorizontal: 5, paddingVertical: 3}}>
              <Text style={styles.errorText}>{error?.message || 'Error'}</Text>
            </View>
          )}
        </View>
      )}
    />
  );
};

export default NustarInputController;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    bordercolor: '#e8e8e8',
    borderWidth: 1.5,
    borderRadius: 7,
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'stretch',
  },
  input: {
    height: 55,
  },
});
