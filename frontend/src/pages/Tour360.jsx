import { useState } from "react";
import class1 from '../assets/image/class1.png';
import class3 from '../assets/image/class3.png';
import libraryClassImg from '../assets/image/libraryclass.png';
import Button from "../component/Button.jsx";
const TOUR_TABS = [
  { label: "FPT có gì?", src: "https://www.thinglink.com/view/scene/1992282589162898276", img: class3 , bg: class3 },
  { label: "Bạn phù hợp với ngành nào ?", src: "https://www.thinglink.com/view/scene/1996257561417875942", img: libraryClassImg, bg: libraryClassImg },
  { label: "Nơi đẹp nhất ở đâu ?", src: "https://www.thinglink.com/view/scene/1996245188166549990", img: class1, bg: class1},
]; // Thay bg bằng ảnh thật nếu có

function Tour360() {
  const [tabIdx, setTabIdx] = useState(0);
  const [showTour, setShowTour] = useState(false);

  const bgImg = TOUR_TABS[tabIdx].bg;

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center" style={{ minHeight: 480 }}>
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImg})`,
          filter: "blur(2px)",
          height:'100%'
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
        {!showTour && (
          <>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 text-center drop-shadow-lg">
              {TOUR_TABS[tabIdx].label}
            </h1>
            <Button style={{ backgroundColor: '#F97316', color: '#FFFFFF', fontWeight:"400"}} 
          onHover={(e) => e.currentTarget.style.color = '#FF8A00'} 
          onMouseOut={(e) => e.currentTarget.style.color = '#FFFFFF'}
          onClick={() => setShowTour(true)}>Khám phá</Button>
            {/* Tabs as round images */}
            <div className="flex gap-6 mt-10 pt-20">
              {TOUR_TABS.map((tab, idx) => (
                <button
                  key={tab.label}
                  onClick={() => setTabIdx(idx)}
                  className={`rounded-full transition-all duration-200 shadow-lg ${tabIdx === idx ? "ring-4 ring-orange-500" : ""}`}
                  style={{ width: 60, height: 60, padding: 0, background: "none" }}
                >
                  <img
                    src={tab.img}
                    alt={tab.label}
                    className="rounded-full object-cover w-full h-full"
                    style={{ display: "block" }}
                  />
                </button>
              ))}
            </div>
          </>
        )}
        {showTour && (
          <div className="w-full h-full flex flex-col justify-between items-center">
            <div className="w-full flex-1 flex items-center justify-center pt-5">
              <iframe
                loading="lazy"
                src={TOUR_TABS[tabIdx].src}
                title="360 Virtual Tour"
                style={{ border: "none", width: "100%", minHeight: 480, borderRadius: 16, background: "#222" }}
                allowFullScreen
                scrolling="yes"
              ></iframe>
            </div>
            <div className="flex gap-6">
              {TOUR_TABS.map((tab, idx) => (
                <button
                  key={tab.label}
                  onClick={() => setTabIdx(idx)}
                  className={`rounded-full transition-all duration-200 shadow-lg ${tabIdx === idx ? "ring-4 ring-orange-500" : ""}`}
                  style={{ width: 60, height: 60, padding: 0, background: "none" }}
                >
                  <img
                    src={tab.img}
                    alt={tab.label}
                    className="rounded-full object-cover w-full h-full"
                    style={{ display: "block" }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tour360;
