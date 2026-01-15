import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FooterPage } from "./components/Footer";

export const RootLayout = () => {
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
