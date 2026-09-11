import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import connectionReducer from "./connections/connectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    connection: connectionReducer,
  },
});

export default appStore;
