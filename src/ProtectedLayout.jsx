import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthInitializer from "./AuthInitializer";

const ProtectedLayout = () => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) return null; // or spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
      {/* <AuthInitializer /> */}
    </>
  );
};

export default ProtectedLayout;
