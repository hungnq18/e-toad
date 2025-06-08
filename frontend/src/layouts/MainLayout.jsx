import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <Header />

      <main
        className="flex-grow pt-[130px] pb-[700px] md:pt-[130px] md:pb-[700px] pt-[70px] pb-[120px]"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
