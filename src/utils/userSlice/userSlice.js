import { createSlice } from "@reduxjs/toolkit";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
} from "./userReducer";

const initialState = {
  user: null,
  loading: false,
  success: false,
  error: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null), (state.success = true);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload.data);
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(updateProfile.pending, (state) => {
        (state.loading = true), (state.error = null), (state.success = false);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        (state.loading = false),
          (state.user = action.payload.data),
          (state.success = true);
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        (state.success = false), (state.error = action.payload);
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
