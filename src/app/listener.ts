import { createListenerMiddleware } from '@reduxjs/toolkit';
import { AppState } from 'react-native';
import { signOutAndLock } from '../features/auth/thunks';

export const appListenerMiddleware = createListenerMiddleware();

appListenerMiddleware.startListening({
  predicate: () => true,
  effect: (_, api) => {
    const sub = AppState.addEventListener('change', (s) => {
      if (s !== 'active') api.dispatch(signOutAndLock());
    });
    return () => sub.remove();
  },
});