import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant";

export const getAllConnection = createAsyncThunk(
  "/user/connections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log("COnnection " + res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch connections failed"
      );
    }
  }
);

//fetch connection request

export const fetchConnectionRequest = createAsyncThunk(
  "/user/requests/pending",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/pending`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data?.message || "Fetch Request failed. "
      );
    }
  }
);
