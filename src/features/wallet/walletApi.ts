// src/features/wallet/walletApi.ts
import { baseApi } from '../../services/baseApi';

export interface Transaction {
  id: string;
  amount: number;
  type: 'debit' | 'credit';
  date: string;
  cardLast4?: string;
  description?: string;
  merchant?: string;
  category?: string;
  status?: string;
  authCode?: string;
}

export const walletApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<{ name: string }, void>({
      query: () => '/user',
      providesTags: ['User'],
    }),
    getBalance: build.query<{ balance: number }, void>({
      query: () => '/balance',
      providesTags: ['Balance'],
    }),
    getTransactions: build.query<Transaction[], void>({
      query: () => '/transactions-history',
      providesTags: ['Transactions'],
    }),
    getTransactionById: build.query<Transaction, string>({
      query: (id) => `/transactions/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useGetBalanceQuery,
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
} = walletApi;