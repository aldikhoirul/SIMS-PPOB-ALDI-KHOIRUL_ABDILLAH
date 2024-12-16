import { createSlice } from "@reduxjs/toolkit";
import { getProfile, updateProfile, updateProfileImage } from "./apiThunk";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    email: null,
    profileImage: null,
    firstName: null,
    lastName: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearProfileState: (state) => {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.profileImage = null;
      state.error = null;
      state.loading = false;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // get profile
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.email = action.payload.data.email;
      state.firstName = action.payload.data.first_name;
      state.lastName = action.payload.data.last_name;
      state.profileImage = action.payload.data.profile_image;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // update profile
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.firstName = action.meta.arg.first_name;
      state.lastName = action.meta.arg.last_name;
      state.successMessage = action.payload.message;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // update profile image
    builder.addCase(updateProfileImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.loading = false;
      state.profileImage = action.payload.data.profile_image;
      state.successMessage = "Image updated successfully";
    });
    builder.addCase(updateProfileImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearProfileState, clearMessages } = profileSlice.actions;
export default profileSlice.reducer;
