import Abe1 from "../component/Abe1";
import Abe2 from "../component/Abe2";
import Abe3 from "../component/Abe3";
import Abe4 from "../component/Abe4";
import StorySection from "../component/StorySection";
import "../component/css/aboutEtoad.css";

function AboutEtoad() {
  return (
    <div>
      <Abe1 />
      <StorySection />
      <div className="story-dess">
        <Abe3 />
      </div>
      <div className="story-dess">
        <Abe4 />{" "}
      </div>
      <Abe2 />
    </div>
  );
}

export default AboutEtoad;
