import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authWithPin } from '../../../features/auth/thunks';

export function usePinLogin() {
  const [pin, setPin] = useState('');
  const d = useAppDispatch();
  const { lockUntil } = useAppSelector(s => s.auth);

  const secs = lockUntil
    ? Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000))
    : 0;

  const onEnter = useCallback(async () => {
    try {
      await d(authWithPin(pin)).unwrap();
    } catch (e: any) {
      Alert.alert('Falha', e?.payload || e?.message || 'Tente novamente');
    }
  }, [d, pin]);

  return { pin, setPin, secs, onEnter };
}
