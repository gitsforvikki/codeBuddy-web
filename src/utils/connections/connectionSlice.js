import { createSlice } from "@reduxjs/toolkit";
import { getAllConnection } from "./connectionReducer";

const initialState = {
  connections: null,
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
      });
  },
});

export default connectionSlice.reducer;
