import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useBiometricAuth } from './hooks/useBiometricAuth';

export default function BiometricLoginScreen() {
  const { tryBio } = useBiometricAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <ActivityIndicator />
      <Text>Autenticando por biometria…</Text>
      <Button title="Tentar novamente" onPress={tryBio} />
    </View>
  );
}
