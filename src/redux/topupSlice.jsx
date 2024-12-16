import { createSlice } from "@reduxjs/toolkit";
import { topUp } from "./apiThunk";

const topupSlice = createSlice({
  name: "topup",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearTopUpState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(topUp.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(topUp.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(topUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearTopUpState } = topupSlice.actions;
export default topupSlice.reducer;
