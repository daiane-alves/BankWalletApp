import React from 'react';
import { View, Text, TextInput, Button, Switch } from 'react-native';
import { useSetPin } from './hooks/useSetPin';

export default function SetPinScreen() {
  const {
    pin,
    setPin,
    confirm,
    setConfirm,
    enableBio,
    setEnableBio,
    bioAvailable,
    onContinue,
  } = useSetPin();

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>Crie seu PIN</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        placeholder="PIN (4–6 dígitos)"
        keyboardType="number-pad"
        secureTextEntry
      />
      <TextInput
        value={confirm}
        onChangeText={setConfirm}
        placeholder="Confirmar PIN"
        keyboardType="number-pad"
        secureTextEntry
      />
      {bioAvailable && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>Habilitar biometria</Text>
          <Switch
            value={enableBio}
            onValueChange={setEnableBio}
            trackColor={{ false: '#d1d5db', true: '#2563eb' }} // cinza → azul
            thumbColor={enableBio ? '#ffffff' : '#f9fafb'} // branco sutil
            ios_backgroundColor="#d1d5db"
          />
        </View>
      )}
      <Button title="Continuar" onPress={onContinue} />
    </View>
  );
}
