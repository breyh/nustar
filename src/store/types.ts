import { IAuth, IMiscellaneous, IProfile, ITransaction } from './features/user/types';

export interface IAppState {
  user: {
    profile: IProfile;
    auth: IAuth;
    transactions: ITransaction[]; 
    miscellaneous?: IMiscellaneous;
  };
}
