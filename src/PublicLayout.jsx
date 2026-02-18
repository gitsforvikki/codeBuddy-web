import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicLayout = () => {
  const { user, authLoading } = useSelector((state) => state.user);

  if (authLoading) return null;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;
