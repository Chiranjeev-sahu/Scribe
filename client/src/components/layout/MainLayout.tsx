import { Outlet } from "react-router";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
