import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAppState } from '../../store/types';

export const gimApi = createApi({
  reducerPath: 'gimApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_BASE_URL,
    prepareHeaders: (headers: Headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      const token = (getState() as IAppState).user?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Login', 'Join', 'Transaction'],
  endpoints: () => ({}),
});
