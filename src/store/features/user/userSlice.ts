import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IAuth,
  initialUserState,
  IProfile,
  ITransaction,
  IUserState,
} from './types';
import { IDevice } from '../../../utils/device';
import { ICategoryInterface } from '../../../components/private/Budget/Budget';

export const usersSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    addProfile: (state: IUserState, action: PayloadAction<IProfile>) => ({
      ...state,
      profile: action.payload,
      signinIn: false,
      isSaving: false,
    }),
    addAuth: (state: any, action: PayloadAction<IAuth>) => ({
      ...state,
      auth: action.payload,
      signinIn: false,
    }),
    addAuthToken: (state: IUserState, action: PayloadAction<string>) => ({
      ...state,
      auth: {
        ...state?.auth,
        token: action.payload,
      },
    }),
    logOut: (state: IUserState) => {
      return {
        ...state,
        ...initialUserState,
      };
    },
    storeDevice: (state: IUserState, action: PayloadAction<IDevice>) => {
      state.auth = {
        ...state.auth,
        device: { ...action.payload },
      };
    },
    storeBiometryType: (
      state: IUserState,
      action: PayloadAction<string | null>,
    ) => {
      state.auth = {
        ...state.auth,
        biometryType: action.payload,
      };
    },
    addPhoneNumber: (state: IUserState, action: PayloadAction<string>) => {
      state.profile = {
        ...state.profile,
        phoneNumber: action.payload,
      };
    },
    addCategoriesData: (
      state: IUserState,
      action: PayloadAction<ICategoryInterface[]>,
    ) => ({
      ...state,
      miscellaneous: {
        ...state?.miscellaneous,
        categories: action.payload,
      },
    }),
    addTransactions: (
      state: IUserState,
      action: PayloadAction<ITransaction[]>,
    ) => ({
      ...state,
      transactions: {
        ...state?.transactions,
        ...action.payload,
      },
    }),
  },
});

export const {
  addProfile,
  addAuth,
  addAuthToken,
  logOut,
  storeDevice,
  storeBiometryType,
  addPhoneNumber,
  addCategoriesData,
  addTransactions,
} = usersSlice.actions;

export default usersSlice.reducer;
