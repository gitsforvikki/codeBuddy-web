import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./error/ErrorPage";
import { RootLayout } from "./RootLayout";
import { HomePage } from "./components/Home";
import { LoginPage } from "./components/auth/Login";

//this is the modernway of routing
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);
