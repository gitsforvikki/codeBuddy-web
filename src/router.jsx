import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./error/ErrorPage";
import { RootLayout } from "./layout/RootLayout";
import { HomePage } from "./Home";
import { AboutPage } from "./About";

//this is the modernway of routing
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);
