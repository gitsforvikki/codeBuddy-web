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
import { ChatPage } from "./components/chat/Chat";
import { Membership } from "./components/membership/Membership";
import { AboutPage } from "./components/pages/About";
import { ContactPage } from "./components/pages/Contact";
import { NotFoundPage } from "./components/pages/NotFound";
import { ROUTES } from "./utils/routes";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // 🌐 Public (Guest-only auth) routes
      {
        element: <PublicLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <LoginPage /> },
          { path: ROUTES.SIGNUP, element: <RegisterPage /> },
        ],
      },

      // 🌍 General Informational routes (Accessible to both guests & authenticated users)
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },

      // 🔒 Private (Authenticated-only) routes
      {
        element: <ProtectedLayout />,
        children: [
          { index: true, element: <FeedPage /> },
          { path: "profile", element: <Profile /> },
          { path: "connections", element: <Connections /> },
          { path: "requests", element: <RequestPage /> },
          { path: "reset-password", element: <ResetPassword /> },
          { path: "chat", element: <ChatPage /> },
          { path: "chat/:withUserId", element: <ChatPage /> },
          { path: "premium", element: <Membership /> },
        ],
      },

      // ❓ Catch-all 404 route
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);


