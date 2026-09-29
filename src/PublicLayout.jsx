import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthShimmer } from "./components/simmerUi/ShimmerUi";
import { sanitizeCallbackUrl, ROUTES } from "./utils/routes";

const PublicLayout = () => {
  const location = useLocation();
  const { user, authLoading } = useSelector((state) => state.user);

  if (authLoading) return <AuthShimmer />;

  if (user) {
    const searchParams = new URLSearchParams(location.search);
    const callbackUrl = searchParams.get("callbackUrl");
    const target = sanitizeCallbackUrl(callbackUrl, ROUTES.HOME);
    return <Navigate to={target} replace />;
  }

  return <Outlet />;
};

export default PublicLayout;

