import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FeedShimmer } from "./components/simmerUi/ShimmerUi";
import { ROUTES } from "./utils/routes";

const ProtectedLayout = () => {
  const location = useLocation();
  const { user, authLoading } = useSelector((state) => state.user);

  if (authLoading) {
    return <FeedShimmer />;
  }

  if (!user) {
    const targetUrl = location.pathname + location.search;
    const redirectUrl = `${ROUTES.LOGIN}?callbackUrl=${encodeURIComponent(targetUrl)}`;
    return <Navigate to={redirectUrl} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;

