import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FooterPage } from "./components/Footer";
import AuthInitializer from "./AuthInitializer";

export const RootLayout = () => {
  return (
    <>

     <AuthInitializer /> 
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterPage />
    </>
  );
};
