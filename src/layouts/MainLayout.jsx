import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingSocials from "../components/FloatingSocials";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <FloatingSocials />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
