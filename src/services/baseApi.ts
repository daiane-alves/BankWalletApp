import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Platform } from 'react-native';

const DEV_BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: DEV_BASE_URL, timeout: 10000 }),
  tagTypes: ['User', 'Balance', 'Transactions'],
  endpoints: () => ({}),
});
