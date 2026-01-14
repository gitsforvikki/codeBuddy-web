import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import feedReducer from "./feed/feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default appStore;
