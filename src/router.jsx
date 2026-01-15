import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./error/ErrorPage";
import { RootLayout } from "./RootLayout";
import { LoginPage } from "./components/auth/Login";
import { Profile } from "./components/user/Profle";
import ProtectedLayout from "./ProtectedLayout";
import { FeedPage } from "./components/Feed";
import { Connections } from "./components/connections/Connection";
import { RequestPage } from "./components/connections/Requests";

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
          { index: true, element: <FeedPage /> },
          { path: "profile", element: <Profile /> },
          { path: "connections", element: <Connections /> },
          { path: "requests", element: <RequestPage /> },
        ],
      },
    ],
  },
]);
