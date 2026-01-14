import { createSlice } from "@reduxjs/toolkit";
import { getFeed } from "./feedReducer";

const initialState = {
  feed: null,
  loading: false,
  error: null,
};
const feedSlice = createSlice({
  name: "Feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        (state.loading = false),
          (state.feed = action.payload),
          (state.error = null);
      })
      .addCase(getFeed.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default feedSlice.reducer;
