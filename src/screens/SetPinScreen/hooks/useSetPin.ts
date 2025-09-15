import { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch } from '../../../app/hooks';
import { createPin } from '../../../features/auth/thunks';
import { deviceSupportsBiometrics } from '../../../lib/security';

export function useSetPin() {
  const d = useAppDispatch();
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [enableBio, setEnableBio] = useState(true);
  const [bioAvailable, setBioAvailable] = useState(false);

  useEffect(() => {
    deviceSupportsBiometrics().then(({ available }) => {
      setBioAvailable(available);
    });
  }, []);

  const onContinue = useCallback(async () => {
    if (!/^\d{4,6}$/.test(pin))
      return Alert.alert('PIN inválido', 'Use 4 a 6 dígitos.');
    if (pin !== confirm) return Alert.alert('Erro', 'PINs não conferem.');
    await d(createPin({ pin, enableBiometrics: bioAvailable && enableBio }));
  }, [pin, confirm, d, bioAvailable, enableBio]);

  return {
    pin,
    setPin,
    confirm,
    setConfirm,
    enableBio,
    setEnableBio,
    bioAvailable,
    onContinue,
  };
}
