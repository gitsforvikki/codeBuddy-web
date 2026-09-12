import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FooterPage } from "./components/Footer";
import AuthInitializer from "./AuthInitializer";

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <AuthInitializer />  */}
      <Navbar />
      <main className="flex-1 bg-gray-200">
        <Outlet />
      </main>
      <FooterPage />
    </div>
  );
};
