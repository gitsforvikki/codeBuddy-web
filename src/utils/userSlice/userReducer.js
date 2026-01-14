import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant";

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

//logout user
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);
export const getProfile = createAsyncThunk(
  "/profile/view",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue("UNAUTHORIZED");
      }
      return rejectWithValue("Failed to load profile");
    }
  }
);
