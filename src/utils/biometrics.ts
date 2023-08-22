import { faceIdIOs, touchIdAndroid, touchIdIOs } from '../assets';
import { AuthenticationType } from 'expo-local-authentication';

export const biometricsImage = {
  [AuthenticationType.FACIAL_RECOGNITION]: {
    image: faceIdIOs,
    alt: 'face-id-ios',
  },
  [AuthenticationType.FINGERPRINT]: {
    image: touchIdAndroid,
    alt: 'finger-print-android',
  },
  [AuthenticationType.IRIS]: {
    image: touchIdAndroid,
    alt: 'finger-print-android',
  },
};

export const biometricsType = {
  [AuthenticationType.FACIAL_RECOGNITION]: 'Face-ID',
  [AuthenticationType.FINGERPRINT]: 'FingerPrint',
  [AuthenticationType.IRIS]: 'Iris',
}
