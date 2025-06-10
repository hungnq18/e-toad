import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full relative overflow-x-hidden ">
      <Header />

      <main className="flex-grow pt-[70px] pb-[70px] md:pt-[100px] md:pb-[120px]">
        <Outlet />
      </main>

      <Footer className="overflow-y-hidden"/>
    </div>
  );
};

export default MainLayout;
