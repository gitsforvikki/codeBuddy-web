import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { ErrorPage } from "./error/ErrorPage";
import PublicLayout from "./PublicLayout";
import { LoginPage } from "./components/auth/Login";
import { RegisterPage } from "./components/auth/Register";
import ProtectedLayout from "./ProtectedLayout";

import { FeedPage } from "./components/Feed";
import { Profile } from "./components/user/Profle";
import { Connections } from "./components/connections/Connection";
import { RequestPage } from "./components/connections/Requests";
import { ResetPassword } from "./components/auth/ResetPassword";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // 🌐 Public routes
      {
        element: <PublicLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <RegisterPage /> },
        ],
      },

      // 🔒 Private routes
      {
        element: <ProtectedLayout />,
        children: [
          { index: true, element: <FeedPage /> },
          { path: "profile", element: <Profile /> },
          { path: "connections", element: <Connections /> },
          { path: "requests", element: <RequestPage /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },
    ],
  },
]);
