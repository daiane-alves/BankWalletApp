import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { appListenerMiddleware } from './listener';
import { baseApi } from '../services/baseApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer, // ⬅️ adiciona
  },
  middleware: (gDM) => gDM().concat(baseApi.middleware, appListenerMiddleware.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;