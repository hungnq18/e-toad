import Banner from "../component/Banner";
import Card from "../component/card/Card";
import EToad from "../component/EToad";
import FPTIntroSection from "../component/FPTIntroSection";

function HomePage() {
  return (
    <div className="w-full rSelative">
    <Banner />
    <Card />
    <FPTIntroSection />
    <EToad />
    </div>
  );
}

export default HomePage;
