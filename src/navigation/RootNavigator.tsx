import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

import SetPinScreen from '../screens/SetPinScreen/';
import BiometricLoginScreen from '../screens/BiometricLoginScreen/';
import PinLoginScreen from '../screens/PinLoginScreen/';
import HomeScreen from '../screens/HomeScreen/';
import TransactionDetailsScreen from '../screens/TransactionDetailsScreen/';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { bootstrapAuth } from '../features/auth/thunks';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const d = useAppDispatch();
  const { hasPin, biometricsEnabled, isAuthenticated } = useAppSelector(
    s => s.auth,
  );

  useEffect(() => {
    d(bootstrapAuth());
  }, [d]);

  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#fff' },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasPin && <Stack.Screen name="SetPin" component={SetPinScreen} />}
        {hasPin && !isAuthenticated && biometricsEnabled && (
          <Stack.Screen
            name="BiometricLogin"
            component={BiometricLoginScreen}
          />
        )}
        {hasPin && !isAuthenticated && !biometricsEnabled && (
          <Stack.Screen name="PinLogin" component={PinLoginScreen} />
        )}
        {isAuthenticated && (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="TransactionDetails"
              component={TransactionDetailsScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
