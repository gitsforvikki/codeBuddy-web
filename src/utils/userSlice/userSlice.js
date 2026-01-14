import { createSlice } from "@reduxjs/toolkit";
import { getProfile, loginUser, logoutUser } from "./userReducer";

const initialState = {
  user: null,
  loading: false,
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
      .addCase(getProfile.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload);
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
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
