import { createSlice } from "@reduxjs/toolkit";
import { getService, getBanner } from "./apiThunk";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    banner: [],
    service: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // banner
    builder.addCase(getBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.banner = action.payload.data;
    });
    builder.addCase(getBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // service
    builder.addCase(getService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getService.fulfilled, (state, action) => {
      state.loading = false;
      state.service = action.payload.data;
    });
    builder.addCase(getService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearError } = homeSlice.actions;
export default homeSlice.reducer;
