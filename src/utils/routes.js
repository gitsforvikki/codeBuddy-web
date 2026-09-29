export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROFILE: "/profile",
  CONNECTIONS: "/connections",
  REQUESTS: "/requests",
  RESET_PASSWORD: "/reset-password",
  CHAT: (userId = ":withUserId") => `/chat/${userId}`,
  PREMIUM: "/premium",
  ABOUT: "/about",
  CONTACT: "/contact",
  NOT_FOUND: "/404",
};

export const DEFAULT_LOGIN_REDIRECT = ROUTES.HOME;
export const DEFAULT_UNAUTH_REDIRECT = ROUTES.LOGIN;

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];

export const PROTECTED_ROUTES = [
  ROUTES.HOME,
  ROUTES.PROFILE,
  ROUTES.CONNECTIONS,
  ROUTES.REQUESTS,
  ROUTES.RESET_PASSWORD,
  ROUTES.PREMIUM,
  "/chat",
];

export const isPublicRoute = (pathname) => {
  return PUBLIC_ROUTES.some((route) => pathname === route);
};

export const isProtectedRoute = (pathname) => {
  if (pathname === "/") return true;
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
};

export const sanitizeCallbackUrl = (url, fallback = DEFAULT_LOGIN_REDIRECT) => {
  if (!url || typeof url !== "string") return fallback;
  // Disallow external URLs or open redirect schemes
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
    return fallback;
  }
  // Prevent infinite login/signup redirect loops
  if (url.startsWith(ROUTES.LOGIN) || url.startsWith(ROUTES.SIGNUP)) {
    return fallback;
  }
  return url;
};
