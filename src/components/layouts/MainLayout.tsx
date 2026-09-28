import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthExpiryHandler from "../auth/AuthExpiryHandler";

function MainLayout() {
  return (
    <>
    <AuthExpiryHandler/>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default MainLayout;