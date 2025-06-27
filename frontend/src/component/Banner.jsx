import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import bannerBg from '../assets/image/banner-home.png';
import mascot from '../assets/image/mascot.png';
import './css/banner.css';

const typingVariants = {
  hidden: { opacity: 1 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function TypingText({ text }) {
  return (
    <motion.span
      variants={typingVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, idx) => (
        <motion.span key={idx} variants={letterVariants}>
          {char === "\n" ? <br /> : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Thêm hiệu ứng trái tim bay lên
function FlyingHeart() {
  return (
    <motion.span
      initial={{ y: 0, opacity: 1, scale: 1 }}
      animate={{ y: -60, opacity: 0, scale: 1.8 }}
      transition={{ duration: 1 }}
      style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 32, color: '#F97316', pointerEvents: 'none' }}
    >
      ❤️
    </motion.span>
  );
}

// Thêm hiệu ứng nhiều trái tim bay lên
function FlyingHearts({ count = 12 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        // Random vị trí ngang và delay
        const left = 40 + Math.random() * 20; // 40% - 60%
        const delay = Math.random() * 0.7;
        const scale = 1.5 + Math.random() * 0.7;
        return (
          <motion.span
            key={i}
            initial={{ y: 0, opacity: 1, scale }}
            animate={{ y: -160 - Math.random() * 60, opacity: 0, scale: scale + 0.5 }}
            transition={{ duration: 2.2, delay }}
            style={{ position: 'absolute', left: `${left}%`, transform: 'translateX(-50%)', fontSize: 44, color: '#F97316', pointerEvents: 'none', zIndex: 10 }}
          >
            ❤️
          </motion.span>
        );
      })}
    </>
  );
}

function Banner() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const audioRef = useRef(null);

  // Preload audio
  const slapRef = useRef(null);
  const punchRef = useRef(null);

  useEffect(() => {
    slapRef.current = new Audio("/danhram.mp3");
    punchRef.current = new Audio("/punch.mp3");
    slapRef.current.load();
    punchRef.current.load();
  }, []);

  // Các message đặc biệt khi slap 3 lần
  const slapNguaMessages = [
    "Cóc không sợ ngã, chỉ sợ không được yêu!",
    "Tớ là cóc E-TOAD, ngã cũng không đau!",
    "Cóc ngã nhưng vẫn cười!",
    "Cóc ngã rồi! Đỡ tớ dậy với! 🐸"
  ];
  // Các message còn lại cho punch
  const punchMessages = [
    "Ấn nữa đi, tớ thích lắm đó!",
    "Ấn nhẹ thôi, tớ nhột mà!",
    "Cậu cute nhất hệ mặt trời!",
    "Bạn ấn tớ, tớ ấn tim bạn! ❤️",
    "Ui da! Nhưng tớ vẫn cute lắm!",
    "Cùng khám phá FPT với tớ nhé!"
  ];
  // Message đầu tiên trên mobile
  const mobileFirstMessage = "Cùng khám phá FPT với tớ nhé!";

  const [isFalling, setIsFalling] = useState(false);
  const [slapCount, setSlapCount] = useState(0);
  const [slapNguaIndex, setSlapNguaIndex] = useState(0);
  const [punchIndex, setPunchIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(isMobile ? mobileFirstMessage : "Cùng khám phá FPT với tớ nhé!");
  const [showHeart, setShowHeart] = useState(false);
  const [heartKey, setHeartKey] = useState(0); // để re-trigger hiệu ứng
  const [firstMobileShown, setFirstMobileShown] = useState(false);

  useEffect(() => {
    // Đảm bảo mobile lần đầu luôn là message đặc biệt
    if (isMobile && !firstMobileShown) {
      setCurrentMessage(mobileFirstMessage);
      setFirstMobileShown(true);
    }
  }, [isMobile, firstMobileShown]);

  const playSound = (type) => {
    if (type === "punch") {
      const punch = punchRef.current;
      punch.pause();
      punch.currentTime = 0;
      punch.play();
      setTimeout(() => {
        punch.pause();
        punch.currentTime = 0;
      }, 2000);
    } else {
      const slap = slapRef.current;
      slap.pause();
      slap.currentTime = 0;
      slap.play();
      if (navigator.vibrate) {
        navigator.vibrate(300);
      }
      setTimeout(() => {
        slap.pause();
        slap.currentTime = 0;
      }, 2000);
    }
  };

  // Khi ấn vào mascot
  const handleMascotClick = () => {
    // 80% punch, 20% danhram
    const isPunch = Math.random() < 0.8;
    if (isPunch) {
      setIsFalling(false);
      // Random message punch (trừ 'Hì hì, ngại quá !!!')
      const idx = Math.floor(Math.random() * punchMessages.length);
      const msg = punchMessages[idx];
      setCurrentMessage(msg);
      playSound("punch");
      if (msg === "Bạn ấn tớ, tớ ấn tim bạn! ❤️" || msg === "Cậu cute nhất hệ mặt trời!") {
        setShowHeart(false); // reset trước để đảm bảo re-trigger
        setHeartKey(prev => prev + 1); // đổi key để re-render
        setTimeout(() => setShowHeart(true), 10);
        setTimeout(() => setShowHeart(false), 2400);
      }
    } else {
      setIsFalling(false);
      setCurrentMessage("Hì hì, ngại quá !!!");
      playSound("slap");
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="relative min-h-[300px] flex items-center justify-center" style={{paddingTop: 20, paddingBottom: 30}}>
        {/* Background image + overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            background: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerBg}) center/cover no-repeat`,
            zIndex: 1,
            left: '0px',
            right: '0px',
            top: '0px',
            height: '600px',
            overflowY: 'hidden',
          }}
        />
        {/* Banner content */}
        <div className="relative z-10 flex flex-col items-center gap-2 max-w-[900px] w-full mx-auto" style={{top: 40}}>
          {/* Desktop */}
          {!isMobile && (
            <>
              <div className="banner-title-desktop flex flex-col items-center gap-1 w-full">
                <span className="text-[25px] font-semibold text-[#E98842] text-center">Xin chào bạn !</span>
                <h1 className="text-[40px] font-black leading-[61px] text-[#F97316] text-center w-full" style={{ fontWeight: '700'}}>
                  Sẵn sàng khám phá FPT University<br />cùng E-Toad chưa?
                </h1>
              </div>
              {/* Nút */}
              <div className="banner-btn-row flex flex-row gap-2 mt-2 mb-2 justify-center" style={{width: 410}}>
                <button
                  className="banner-btn flex items-center justify-center px-5 py-2 h-16 w-[170px] rounded-full border border-[#F97316] bg-[#F97316]/40 text-white text-[25px] font-semibold transition-all duration-200 hover:bg-[#F97316] hover:text-white hover:scale-105"
                  style={{color: '#FFFF'}}
                  onClick={() => scrollToSection('shop-section')}
                >
                  Đổi quà
                </button>
                <button
                  className="banner-btn banner-btn-main flex items-center justify-center px-5 py-2 h-16 w-[170px] rounded-full bg-[#F97316] text-white text-[25px] font-semibold transition-all duration-200 hover:bg-[#E98842] hover:scale-105"
                  style={{ color: '#FFFF'}}
                  onClick={() => scrollToSection('intro-fpt-section')}
                >
                  Khám phá
                </button>
              </div>
              {/* Mascot */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.img
                  src={mascot}
                  alt="Mascot"
                  className="banner-mascot w-[150px] h-[200px] object-contain mt-2 cursor-pointer"
                  style={{zIndex: 2}}
                  initial={{ y: 40, opacity: 0 }}
                  animate={isFalling ? { rotate: [0, 90, 75, 100, 0], y: [0, 60, 80, 0, 0], opacity: [1, 0.7, 1] } : { y: 0, opacity: 1 }}
                  transition={{ type: isFalling ? "tween" : "spring", duration: 1, stiffness: 120, damping: 12 }}
                  whileHover={{ scale: 1.08, rotate: -5 }}
                  onClick={handleMascotClick}
                />
                {showHeart && <FlyingHearts key={heartKey} count={12} />}
              </div>
              {/* Cute message */}
              <div className="mt-2 text-center text-[#F97316] text-lg font-semibold min-h-[32px]">
                {currentMessage}
              </div>
            </>
          )}

          {/* Mobile */}
          {isMobile && (
            <>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="relative flex flex-col items-center">
                  <motion.img
                    src={mascot}
                    alt="Mascot"
                    className="banner-mascot-mobile w-[80px] h-[100px] object-contain mt-2 cursor-pointer"
                    style={{zIndex: 2}}
                    initial={{ y: 40, opacity: 0 }}
                    animate={isFalling ? { rotate: [0, 90, 75, 100, 0], y: [0, 40, 60, 0, 0], opacity: [1, 0.7, 1] } : { y: 0, opacity: 1 }}
                    transition={{ type: isFalling ? "tween" : "spring", duration: 1, stiffness: 120, damping: 12 }}
                    onClick={handleMascotClick}
                  />
                  {showHeart && <FlyingHearts key={heartKey} count={12} />}
                  {/* Speech bubble */}
                  <div className="speech-bubble-mobile absolute left-[70px] top-2 bg-white px-3 py-2 rounded-xl shadow-md border border-[#F97316] min-w-[170px] max-w-[220px]">
                    <TypingText text={currentMessage} />
                  </div>
                </div>
                {/* Nút dưới mascot */}
                <div className="banner-btn-row-mobile flex flex-col gap-2 mt-4 w-full max-w-[350px]">
                  <button
                    className="banner-btn flex items-center justify-center px-4 py-2 h-12 w-full rounded-full border border-[#F97316] bg-[#F97316]/40 text-white text-[16px] font-semibold transition-all duration-200 hover:bg-[#F97316] hover:text-white hover:scale-105"
                    onClick={() => scrollToSection('shop-section')}
                  >
                    Đổi quà
                  </button>
                  <button
                    className="banner-btn banner-btn-main flex items-center justify-center px-4 py-2 h-12 w-full rounded-full bg-[#F97316] text-white text-[16px] font-semibold transition-all duration-200 hover:bg-[#E98842] hover:scale-105"
                    onClick={() => scrollToSection('intro-fpt-section')}
                  >
                    Khám phá
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner;
