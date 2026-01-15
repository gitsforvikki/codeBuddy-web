import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import feedReducer from "./feed/feedSlice";
import connectionReducer from "./connections/connectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
  },
});

export default appStore;
