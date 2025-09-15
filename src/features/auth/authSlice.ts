import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from './types';
import { authWithBiometrics, authWithPin, bootstrapAuth, createPin, signOutAndLock } from './thunks';

const initialState: AuthState = {
  isAuthenticated: false,
  hasPin: false,
  biometricsEnabled: false,
  bioAvailable: false,
  failedAttempts: 0,
  lockUntil: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (b) => {
    b.addCase(bootstrapAuth.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(bootstrapAuth.fulfilled, (s, a) => {
      s.loading = false;
      s.hasPin = a.payload.hasPin;
      s.biometricsEnabled = a.payload.biometricsEnabled;
      s.bioAvailable = a.payload.bioAvailable;
      s.isAuthenticated = a.payload.isAuthenticated;
      s.lockUntil = a.payload.lockUntil;
    });
    b.addCase(bootstrapAuth.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? 'Erro ao iniciar auth'; });

    b.addCase(createPin.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(createPin.fulfilled, (s, a) => {
      s.loading = false;
      s.hasPin = true;
      s.biometricsEnabled = a.payload.biometricsEnabled;
      s.isAuthenticated = true;
    });
    b.addCase(createPin.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? 'Erro ao criar PIN'; });

    b.addCase(authWithBiometrics.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(authWithBiometrics.fulfilled, (s) => { s.loading = false; s.isAuthenticated = true; s.failedAttempts = 0; s.lockUntil = null; });
    b.addCase(authWithBiometrics.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? 'Biometria falhou'; });

    b.addCase(authWithPin.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(authWithPin.fulfilled, (s) => { s.loading = false; s.isAuthenticated = true; s.failedAttempts = 0; s.lockUntil = null; });
    b.addCase(authWithPin.rejected, (s, a) => {
      s.loading = false;
      s.failedAttempts += 1;
      s.error = (a.payload as string) ?? a.error.message ?? 'PIN incorreto';
    });

    b.addCase(signOutAndLock.fulfilled, (s) => { s.isAuthenticated = false; });
  },
});

export default authSlice.reducer;