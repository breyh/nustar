import { gimApi } from '..';
import { ILoginPayload } from '../../../components/auth/Login/types';
import {
  IErrorResponse,
  UserResponse,
} from './auth.types';

export const authApi = gimApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<any, ILoginPayload>({
      query: (body: ILoginPayload) => ({
        url: 'auth/sign-in',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Login'],
      transformResponse: (response: { data: any }, _meta: any, _arg: any) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number; error?: string },
        _meta: any,
        _arg: any,
      ) => (response as IErrorResponse)?.data?.errorMessage,
    }),
    join: build.mutation({
      query: (data: any) => ({
        url: 'auth/join',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Join'],
      transformResponse: (
        response: { data: any },
        _meta: any,
        _arg: any,
      ): Promise<UserResponse> => response.data,
      transformErrorResponse: (
        response: { status: string | number; error?: any },
        _meta: any,
        _arg: any,
      ) => {
        return (response as IErrorResponse)?.data?.errorMessage;
      },
    }),
    storeSignature: build.mutation({
      query: ({ body, params }) => ({
        url: `auth/${params.userId}/store-signature`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: any }, _meta: any, _arg: any) => {
        return response.data;
      },
      transformErrorResponse: (
        response: { status: string | number; error?: string },
        _meta: any,
        _arg: any,
      ) => {
        console.error(`error response: ${JSON.stringify(response)}`);
        return (response as IErrorResponse)?.data;
      },
    }),
    biometricsLogin: build.mutation({
      query: (data: any) => ({
        url: 'auth/biometrics-login',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { data: any }, _meta: any, _arg: any) => {
        return response.data;
      },
      transformErrorResponse: (
        response: { status: string | number; error?: string },
        _meta: any,
        _arg: any,
      ) => {
        console.error(`error response: ${JSON.stringify(response)}`);
        return (response as IErrorResponse)?.data;
      },
    }),
    storeDeviceToken: build.mutation({
      query: ({ device, id }) => ({
        url: `auth/${id}/store-device-token`,
        method: 'POST',
        body: device,
      }),
      transformResponse: (response: { data: any }, _meta: any, _arg: any) => {
        return response.data;
      },
      transformErrorResponse: (
        response: { status: string | number; error?: string },
        _meta: any,
        _arg: any,
      ) => {
        console.error(`error response: ${JSON.stringify(response)}`);
        return (response as IErrorResponse)?.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useJoinMutation,
  useStoreSignatureMutation,
  useBiometricsLoginMutation,
  useStoreDeviceTokenMutation,
} = authApi;
