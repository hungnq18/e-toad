import Banner from "../component/Banner";
import BlogSection from "../component/BlogSection";
import Card from "../component/card/Card";
import EToad from "../component/EToad";
import FPTIntroSection from "../component/FPTIntroSection";
import SectionClassroom from "../component/SectionClassroom";
import ShopSection from "../component/ShopSection";

function HomePage() {
  return (
    <div className="w-full relative">
    <Banner />
    <Card />
    <FPTIntroSection />
    <EToad />
    <SectionClassroom />
    <ShopSection />
    <BlogSection />
    </div>
  );
}

export default HomePage;
