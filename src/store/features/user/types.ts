import { ICategoryInterface } from '../../../components/private/Budget/Budget';
import { IDevice } from '../../../utils/device';

export interface IProfile {
  id: number | undefined;
  firstName: string;
  nickName?: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  emailVerified: boolean;
}

export interface IAuth {
  isAuthenticated: boolean;
  token: string;
  provider: string;
  biometryType?: string | null;
  device?: IDevice;
}

export interface IUserState {
  profile: IProfile;
  auth: IAuth;
  verificationEmail?: string;
  miscellaneous?: IMiscellaneous;
  transactions: ITransaction[];
}

export const initialUserState: IUserState = {
  profile: {
    id: undefined,
    firstName: '',
    nickName: '',
    lastName: '',
    email: '',
    emailVerified: false,
  },
  auth: {
    isAuthenticated: false,
    token: '',
    provider: '',
    biometryType: null,
  },
  transactions: [],
};

export interface ITransaction {
  transactionId: string;
  description: string;
  amount: number;
  date: Date;
  type: string;
  category: string;
}

export interface IMiscellaneous  {
  categories: ICategoryInterface[];
}