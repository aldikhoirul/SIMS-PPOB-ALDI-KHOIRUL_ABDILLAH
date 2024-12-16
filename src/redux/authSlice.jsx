import { createSlice } from "@reduxjs/toolkit";
import { registerAuth, loginAuth } from "./apiThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // thunk untuk register
    builder.addCase(registerAuth.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    });
    builder.addCase(registerAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(registerAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // thunk untuk login
    builder.addCase(loginAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearMessage, logout } = authSlice.actions;
export default authSlice.reducer;
