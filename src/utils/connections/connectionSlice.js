import { createSlice } from "@reduxjs/toolkit";
import { fetchConnectionRequest, getAllConnection, reviewRequest } from "./connectionReducer";

const initialState = {
  connections: null,
  requests: null,
  loading: false,
  error: false,
  success: false,
};
export const connectionSlice = createSlice({
  name: "Connection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllConnection.pending, (state) => {
        (state.loading = true), (state.success = false);
      })
      .addCase(getAllConnection.fulfilled, (state, action) => {
        (state.loading = false), (state.connections = action.payload);
        (state.success = true), (state.error = null);
      })
      .addCase(getAllConnection.rejected, (state, action) => {
        (state.loading = false),
          (state.connections = null),
          (state.error = action.payload);
      })
      .addCase(fetchConnectionRequest.pending, (state) => {
        (state.loading = true), (state.success = false);
      })
      .addCase(fetchConnectionRequest.fulfilled, (state, action) => {
        (state.loading = false), (state.requests = action.payload);
        (state.success = true), (state.error = null);
      })
      .addCase(fetchConnectionRequest.rejected, (state, action) => {
        (state.loading = false),
          (state.connections = null),
          (state.error = action.payload);
      })
      .addCase(reviewRequest.pending, (state) => {
        (state.loading = true), (state.success = false);
      })
      .addCase(reviewRequest.fulfilled, (state, action) => {
        (state.loading = false), (state.success = true), (state.error = null);
        state.requests?.filter((each) => each._id !== action.payload._id);
      })
      .addCase(reviewRequest.rejected, (state, action) => {
        (state.loading = false),
          (state.connections = null),
          (state.error = action.payload);
      });
  },
});

export default connectionSlice.reducer;
