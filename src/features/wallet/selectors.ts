// import type { RootState } from '../../app/store';
// import { createSelector } from '@reduxjs/toolkit';
// import type { Transaction } from './walletApi';

// export const selectWallet = (s: RootState) => s.wallet;
// export const selectFilterType = (s: RootState) => s.wallet.filterType;
// export const selectSelectedTxId = (s: RootState) => s.wallet.selectedTxId;

// // Exemplo de seletor derivado (pode usar dados da API quando já carregados)
// export const filterTransactions = (txs: Transaction[] | undefined, type: ReturnType<typeof selectFilterType>) => {
//   if (!txs) return [];
//   if (type === 'all') return txs;
//   return txs.filter(t => t.type === type);
// };

// export const makeSelectFiltered = () =>
//   createSelector([(txs: Transaction[] | undefined) => txs, (_: any, type: 'all' | 'debit' | 'credit') => type],
//     (txs, type) => filterTransactions(txs, type)
//   );