import React, { useEffect, useRef } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  type NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

import SetPinScreen from '../screens/SetPinScreen/';
import BiometricLoginScreen from '../screens/BiometricLoginScreen/';
import PinLoginScreen from '../screens/PinLoginScreen/';
import HomeScreen from '../screens/HomeScreen/';
import TransactionDetailsScreen from '../screens/TransactionDetailsScreen/';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { bootstrapAuth } from '../features/auth/thunks';

import { linking } from './linking';
import { useDeepLinking } from '../lib/useDeepLinking';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const { hasPin, biometricsEnabled, isAuthenticated } = useAppSelector(
    s => s.auth,
  );

  // dispara a leitura do estado de auth (PIN, biometria, sessão, etc.)
  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  // ref para navegação (usado pelo hook de deep link quando autenticar)
  const navRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  // ativa deep link: só navega automaticamente quando já estiver autenticado
  useDeepLinking({ enabled: isAuthenticated, navRef });

  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#fff' },
  } as const;

  return (
    <NavigationContainer ref={navRef} theme={theme} linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Fluxo de onboarding/autenticação */}
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

        {/* App autenticado */}
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
