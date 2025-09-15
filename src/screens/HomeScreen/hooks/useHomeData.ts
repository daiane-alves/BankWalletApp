// hooks/useHomeData.ts
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useAppDispatch } from '../../../app/hooks';
import { signOutAndLock } from '../../../features/auth/thunks';
import {
  useGetBalanceQuery,
  useGetTransactionsQuery,
  useGetUserQuery,
} from '../../../features/wallet/walletApi';
import { getDeviceLocale } from '../../../services/locale';

export function useHomeData() {
  const d = useAppDispatch();
  const nav = useNavigation();

  const { data: user } = useGetUserQuery();
  const { data: bal } = useGetBalanceQuery();
  const { data: txs, isLoading } = useGetTransactionsQuery();

  const [locale, setLocale] = useState<string | null>(null);

  const handleClick = () => {
    d(signOutAndLock());
  };

  useEffect(() => {
    getDeviceLocale().then(setLocale);
    const sub = AppState.addEventListener('change', s => {
      if (s !== 'active') d(signOutAndLock());
    });
    return () => sub.remove();
  }, [d]);

  return {
    user,
    locale,
    bal,
    txs,
    isLoading,
    nav,
    handleClick,
  };
}
