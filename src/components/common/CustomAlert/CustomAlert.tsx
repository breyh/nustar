import React, { FC } from 'react';
import {
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Alert,
  Text,
} from 'native-base';

export interface ICustomErrorProp {
  errorMessage: string;
  reset: () => void;
}

const CustomAlert: FC<ICustomErrorProp> = ({ errorMessage, reset }) => {
  return (
    <Alert
      w="100%"
      status="error"
      marginBottom={3}
      style={{
        display: 'flex',
        alignContent: 'center',
      }}
    >
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack
            space={2}
            flexShrink={1}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {errorMessage}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{ borderWidth: 0 }}
            icon={<CloseIcon size="3" />}
            _icon={{
              onPress: reset,
              color: 'coolGray.600',
            }}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default CustomAlert;
