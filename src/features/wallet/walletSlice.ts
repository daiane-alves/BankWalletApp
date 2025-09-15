// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type WalletUIState = {
//   selectedTxId?: string | null;
//   filterType?: 'all' | 'debit' | 'credit';
// };

// const initialState: WalletUIState = {
//   selectedTxId: null,
//   filterType: 'all',
// };

// const walletSlice = createSlice({
//   name: 'wallet',
//   initialState,
//   reducers: {
//     setSelectedTx(state, action: PayloadAction<string | null>) {
//       state.selectedTxId = action.payload;
//     },
//     setFilterType(state, action: PayloadAction<WalletUIState['filterType']>) {
//       state.filterType = action.payload;
//     },
//   },
// });

// export const { setSelectedTx, setFilterType } = walletSlice.actions;
// export default walletSlice.reducer;