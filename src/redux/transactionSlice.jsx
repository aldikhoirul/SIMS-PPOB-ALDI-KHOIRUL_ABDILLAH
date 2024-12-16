import { createSlice } from "@reduxjs/toolkit";
import { getTransaction } from "./apiThunk";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTransactionState: (state) => {
      state.transactions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransaction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload.data.records;
    });
    builder.addCase(getTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
