import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch } from '../../../app/hooks';
import { authWithBiometrics } from '../../../features/auth/thunks';

export function useBiometricAuth() {
  const d = useAppDispatch();

  const tryBio = async () => {
    try {
      await d(authWithBiometrics()).unwrap();
    } catch {
      Alert.alert('Biometria falhou', 'Use seu PIN pelo fallback.');
    }
  };

  useEffect(() => {
    tryBio();
  }, []);

  return { tryBio };
}
