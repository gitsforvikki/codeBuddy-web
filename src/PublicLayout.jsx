import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthShimmer } from "./components/simmerUi/ShimmerUi";

const PublicLayout = () => {
  const { user, authLoading } = useSelector((state) => state.user);

  if (authLoading) return <AuthShimmer />;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;
