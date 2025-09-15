import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sha256 } from 'js-sha256';

const SERVICE_PIN = 'wallet.pin.hash';
const STORAGE_BIOMETRICS = 'wallet.biometrics.enabled';
const STORAGE_AUTH = 'wallet.session.isAuthenticated';
const STORAGE_LOCK_UNTIL = 'wallet.lock.until';

export const hashPin = (pin: string) => sha256(pin);

export async function savePinHash(pin: string) {
  const hash = hashPin(pin);
  await Keychain.setGenericPassword('user', hash, {
    service: SERVICE_PIN,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

export async function getStoredPinHash(): Promise<string | null> {
  const creds = await Keychain.getGenericPassword({ service: SERVICE_PIN });
  return creds ? String(creds.password) : null;
}

export async function verifyPin(pin: string) {
  const saved = await getStoredPinHash();
  return saved ? saved === hashPin(pin) : false;
}

export async function deviceSupportsBiometrics() {
  const rnBiometrics = new ReactNativeBiometrics();

  try {
    const { available, biometryType, error } =
      await rnBiometrics.isSensorAvailable();

    if (error) console.warn('isSensorAvailable error:', error);

    console.log('available', available);
    console.log('biometryType', biometryType);

    return { available, biometryType: biometryType ?? null, error };
  } catch (e: any) {
    console.warn('isSensorAvailable threw:', e);
    return {
      available: false,
      biometryType: null,
      error: String(e?.message ?? e),
    };
  }
}

export async function biometricAuthenticate(
  promptMessage = 'Autentique-se para entrar',
) {
  const rnBiometrics = new ReactNativeBiometrics();
  const { available } = await rnBiometrics.isSensorAvailable();
  if (!available) return { success: false, error: 'Biometria indisponível' };
  const { success } = await rnBiometrics.simplePrompt({ promptMessage });
  return { success };
}

export async function setBiometricsEnabled(enabled: boolean) {
  await AsyncStorage.setItem(STORAGE_BIOMETRICS, JSON.stringify(enabled));
}

export async function isBiometricsEnabled() {
  const v = await AsyncStorage.getItem(STORAGE_BIOMETRICS);
  return v ? JSON.parse(v) : false;
}

export async function setAuthenticated(v: boolean) {
  await AsyncStorage.setItem(STORAGE_AUTH, JSON.stringify(v));
}

export async function getAuthenticated() {
  const v = await AsyncStorage.getItem(STORAGE_AUTH);
  return v ? JSON.parse(v) : false;
}

export async function setLockUntil(ts: number | null) {
  if (ts) await AsyncStorage.setItem(STORAGE_LOCK_UNTIL, String(ts));
  else await AsyncStorage.removeItem(STORAGE_LOCK_UNTIL);
}

export async function getLockUntil(): Promise<number | null> {
  const v = await AsyncStorage.getItem(STORAGE_LOCK_UNTIL);
  return v ? Number(v) : null;
}

export async function resetAllAuth() {
  try {
    await Keychain.resetGenericPassword({ service: SERVICE_PIN });
  } catch (e) {
    try {
      await Keychain.resetGenericPassword();
    } catch {}
  }

  await AsyncStorage.multiRemove([
    STORAGE_BIOMETRICS,
    STORAGE_AUTH,
    STORAGE_LOCK_UNTIL,
  ]);
}
