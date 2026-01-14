import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./error/ErrorPage";
import { RootLayout } from "./RootLayout";
import { HomePage } from "./components/Home";
import { LoginPage } from "./components/auth/Login";
import { Profile } from "./components/user/Profle";
import ProtectedLayout from "./ProtectedLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />, // global ui
    errorElement: <ErrorPage />, //global error boundry
    children: [
      {
        path: "/login", //public route
        element: <LoginPage />,
      },
      {
        element: <ProtectedLayout />, // 🔒 auth check, private routes
        children: [
          { index: true, element: <HomePage /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
]);
