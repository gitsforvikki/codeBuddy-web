import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { FooterPage } from "../Footer";

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
