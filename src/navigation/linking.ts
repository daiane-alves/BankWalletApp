import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['recarga://'],

  config: {
    screens: {
      TransactionDetails: 'user/transactions/:id', 
    },
  },
};