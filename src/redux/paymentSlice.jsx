import { createSlice } from "@reduxjs/toolkit";
import { payment, getSaldo } from "./apiThunk";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    saldo: 0,
    paymentStatus: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.paymentStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // thunk saldo
    builder.addCase(getSaldo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSaldo.fulfilled, (state, action) => {
      state.loading = false;
      state.saldo = action.payload;
    });
    builder.addCase(getSaldo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // thunk payment
    builder
      .addCase(payment.pending, (state) => {
        state.loading = true;
        state.paymentStatus = null;
        state.error = null;
      })
      .addCase(payment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = "success";
        state.saldo -= action.meta.arg.total_amount; //update saldo
      })
      .addCase(payment.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = "failure";
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
