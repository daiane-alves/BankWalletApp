import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  biometricAuthenticate, deviceSupportsBiometrics, getStoredPinHash,
  isBiometricsEnabled, savePinHash, setBiometricsEnabled, verifyPin,
  setAuthenticated, getAuthenticated, getLockUntil, setLockUntil
} from '../../lib/security';
import type { RootState } from '../../app/store';

export const bootstrapAuth = createAsyncThunk('auth/bootstrap', async () => {
  const [pinHash, biometrics, { available }, authed, lockUntil] = await Promise.all([
    getStoredPinHash(), isBiometricsEnabled(), deviceSupportsBiometrics(), getAuthenticated(), getLockUntil()
  ]);
  return { hasPin: !!pinHash, biometricsEnabled: biometrics, bioAvailable: available, isAuthenticated: authed, lockUntil };
});

export const createPin = createAsyncThunk(
  'auth/createPin',
  async ({ pin, enableBiometrics }: { pin: string; enableBiometrics: boolean }) => {
    await savePinHash(pin);
    await setBiometricsEnabled(enableBiometrics);
    await setAuthenticated(true);
    return { biometricsEnabled: enableBiometrics };
  }
);

export const authWithBiometrics = createAsyncThunk('auth/biometrics', async () => {
  const { success } = await biometricAuthenticate('Autentique-se para entrar');
  if (!success) throw new Error('Falha na biometria');
  await setAuthenticated(true);
  await setLockUntil(null);
  return true;
});

export const authWithPin = createAsyncThunk<boolean, string, { state: RootState; rejectValue: string }>(
  'auth/pin',
  async (pin, { getState, rejectWithValue }) => {
    const s = getState().auth;
    const now = Date.now();
    if (s.lockUntil && now < s.lockUntil) {
      const secs = Math.ceil((s.lockUntil - now) / 1000);
      return rejectWithValue(`Aguarde ${secs}s para tentar novamente`);
    }
    const ok = await verifyPin(pin);
    if (!ok) {
      const attempts = s.failedAttempts + 1;
      if (attempts >= 5) await setLockUntil(now + 30_000);
      return rejectWithValue('PIN incorreto');
    }
    await setAuthenticated(true);
    await setLockUntil(null);
    return true;
  }
);

export const signOutAndLock = createAsyncThunk('auth/signOut', async () => {
  await setAuthenticated(false);
  return true;
});