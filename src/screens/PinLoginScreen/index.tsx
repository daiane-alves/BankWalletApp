import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { usePinLogin } from './hooks/usePinLogin';

export default function PinLoginScreen() {
  const { pin, setPin, secs, onEnter } = usePinLogin();

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>Digite seu PIN</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        placeholder="PIN"
        keyboardType="number-pad"
        secureTextEntry
      />
      <Button title="Entrar" onPress={onEnter} disabled={secs > 0} />
      {secs > 0 && (
        <Text style={{ color: 'tomato' }}>Bloqueado por {secs}s</Text>
      )}
    </View>
  );
}
