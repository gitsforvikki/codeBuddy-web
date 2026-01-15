import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { router } from "./router.jsx";
import appStore from "./utils/appStore.js";
import AuthInitializer from "./AuthInitializer.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <AuthInitializer />

      <RouterProvider router={router} />

      <Toaster position="top-right" />
    </Provider>
  </StrictMode>
);
