import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant";

//register user
export const registerUser = createAsyncThunk(
  "/auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, payload, {
        withCredentials: true,
      });
     
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Register user failed"
      );
    }
  }
);

//login user
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

//get profile
export const getProfile = createAsyncThunk(
  "/profile/view",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      console.log("get profile" + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue("UNAUTHORIZED");
      }
      return rejectWithValue("Failed to load profile");
    }
  }
);

//update profile
export const updateProfile = createAsyncThunk(
  "/profile/update",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/profile/update`, data, {
        withCredentials: true,
      });
      if (res.ok) {
        dispatch(getProfile());
      }
      console.log("update profile" + JSON.stringify(res.data));

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Profile update failed"
      );
    }
  }
);
