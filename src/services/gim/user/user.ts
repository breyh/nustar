import { gimApi } from '..';
import { ICategoryInterface } from '../../../components/private/Budget/Budget';
import { IErrorResponse } from '../auth/auth.types';

export const userApi = gimApi.injectEndpoints({
  endpoints: build => ({
    addTransaction: build.mutation({
      query: ({ transaction, id }) => ({
        url: `user/${id}/add-transaction`,
        method: 'POST',
        body: {transaction},
      }),
      invalidatesTags: ['Transaction'],
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
    allCategories: build.query<any, void>({
        query: (arg: any) => `user/all-categories`,
        transformResponse: (response: { data: any }, _meta, _arg) => {
          return response.data;
        },
        transformErrorResponse: (
          response: { status: string | number; error?: string },
          _meta,
          _arg,
        ) => {
          console.error(`error response: ${JSON.stringify(response)}`);
          return (response as IErrorResponse)?.data;
        },
      }),
    transactionsById: build.query<any, string>({
        query: (id: string) => `user/${id}/all-transactions`,
        providesTags: ['Transaction'],
        transformResponse: (response: { data: any }, _meta, _arg) => {
          return response.data;
        },
        transformErrorResponse: (
          response: { status: string | number; error?: string },
          _meta,
          _arg,
        ) => {
          console.error(`error response: ${JSON.stringify(response)}`);
          return (response as IErrorResponse)?.data;
        },
      }),
  }),
  overrideExisting: false,
});

export const {
    useAllCategoriesQuery,
    useAddTransactionMutation,
    useTransactionsByIdQuery
} = userApi;
