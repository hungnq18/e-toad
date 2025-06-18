import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import { BlogProvider } from "../contexts/BlogContext"; // ✅ THÊM DÒNG NÀY

const MainLayout = (children) => {
  return (
    <div className="relative flex flex-col w-full overflow-x-hidden">
      <Header />

      {/* ✅ BỌC BLOG PROVIDER */}
      <BlogProvider>
        <main className="flex-grow pt-[70px] pb-[70px] md:pb-[120px] md:pt-[130px]">
          <Outlet />
        </main>
      </BlogProvider>

      <Footer className="overflow-y-hidden"/>
    </div>
  );
};

export default MainLayout;
