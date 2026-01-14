import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FooterPage } from "./components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./utils/userSlice/userReducer";

export const RootLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error === "UNAUTHORIZED") {
      navigate("/login");
    }
  }, [error, navigate]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterPage />
    </>
  );
};
