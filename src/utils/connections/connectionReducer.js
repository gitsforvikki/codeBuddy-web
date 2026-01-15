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

// review request
export const reviewRequest = createAsyncThunk(
  "/request/review",
  async ({ status, requestId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data?.message || `${status} request failed.`
      );
    }
  }
);

//feed
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

// send request or reject request
export const sendRequest = createAsyncThunk(
  "/request/send",
  async ({ status, requestId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      console.log("send req:--" + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data?.message || `${status} request failed.`
      );
    }
  }
);
