export type RootStackParamList = {
  SetPin: undefined;
  BiometricLogin: undefined;
  PinLogin: undefined;
  Home: undefined;
  TransactionDetails: { id: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}