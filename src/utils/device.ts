import * as Device from 'expo-device';
import LocalAuthentication, { LocalAuthenticationOptions } from 'expo-local-authentication';
import { biometricsType } from './biometrics';

export interface IDevice {
  model: string;
  brand: string;
  systemVersion: string;
  os: string;
  uuid: string;
  deviceToken?: string;
}

export const getDeviceInfo = async (): Promise<IDevice> => {
    try {
        return {
        model: Device.manufacturer,
        brand: Device.brand,
        systemVersion: Device.osVersion,
        os: Device.osName,
        uuid: Device.osBuildId,
      };
    } catch (e) {
      const error = e as Error;
      console.error(
        `Something happens trying to get device data - message: ${error.message} - stack: ${error.stack}`,
      );
      throw e;
    }
};

export const checkDeviceForLocalAuthentication = async () => {
  const isAvailable = await LocalAuthentication.hasHardwareAsync();
  
  if (!isAvailable) {
    LocalAuthentication.cancelAuthenticate()
    return;
  }
  const authenticationMethod = await  determineAuthenticationType();
  const options: LocalAuthenticationOptions = {
    promptMessage: `Scan your ${biometricsType[authenticationMethod[0]]}`,
    fallbackLabel: 'Use passcode',
  };
  
  const result = await LocalAuthentication.authenticateAsync(options);  
  
  if (result.success) {
    // User authenticated successfully.
  } else {
    // Authentication failed or was canceled by the user.
  }
};

export const determineAuthenticationType = async (): Promise<LocalAuthentication.AuthenticationType[]> =>  await LocalAuthentication.supportedAuthenticationTypesAsync();
