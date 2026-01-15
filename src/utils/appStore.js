import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import connectionReducer from "./connections/connectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    connection: connectionReducer,
  },
});

export default appStore;
