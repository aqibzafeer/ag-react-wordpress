import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    {/* Fixed Header */}
    <div className="fixed top-0 left-0 right-0 z-50">
      <Header />
    </div>

    {/* Main Content with Top Padding to avoid overlap and Bottom Margin */}
    <main className="flex-grow pt-[80px] pb-[30px]">
      <Outlet />
    </main>

    {/* Footer */}
    <Footer />
  </div>
);

export default MainLayout;
