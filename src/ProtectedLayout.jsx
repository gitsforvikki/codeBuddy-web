import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "./utils/Spinner";

const ProtectedLayout = () => {
  const { user, authLoading } = useSelector((state) => state.user);

  if (authLoading) return <Spinner size={50} />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
