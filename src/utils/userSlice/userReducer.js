import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);
