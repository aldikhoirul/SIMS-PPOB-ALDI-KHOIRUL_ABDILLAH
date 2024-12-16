import { createSlice } from "@reduxjs/toolkit";
import { getSaldo, getProfile } from "./apiThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {
      first_name: "",
      last_name: "",
      profile_image: "",
    },
    saldo: 0,
    loading: false,
    error: null,
    showSaldo: false,
  },
  reducers: {
    toggleShowSaldo: (state) => {
      state.showSaldo = !state.showSaldo;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // thunk profile
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = {
        first_name: action.payload.data.first_name,
        last_name: action.payload.data.last_name,
        profile_image: action.payload.data.profile_image,
      };
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // thunk saldo
    builder.addCase(getSaldo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSaldo.fulfilled, (state, action) => {
      state.loading = false;
      state.saldo = action.payload.data.balance;
    });
    builder.addCase(getSaldo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { toggleShowSaldo, clearError } = userSlice.actions;
export default userSlice.reducer;
