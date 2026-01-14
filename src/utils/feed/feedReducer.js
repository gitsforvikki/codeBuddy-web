import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant";

export const getFeed = createAsyncThunk(
  "/user/feed",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Feed not fetched");
    }
  }
);
