import { useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useGetTransactionByIdQuery } from '../../../features/wallet/walletApi';
import { RootStackParamList } from '../../../navigation/types';


type TransactionDetailsRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetails'
>;

export function useTransactionDetails() {
  const route = useRoute<TransactionDetailsRouteProp>();
  const nav = useNavigation();
  const { id } = route.params;

  const { data, isLoading, isError } = useGetTransactionByIdQuery(id);

  const goBack = useCallback(() => nav.goBack(), [nav]);

  return { id, data, isLoading, isError, goBack };
}
