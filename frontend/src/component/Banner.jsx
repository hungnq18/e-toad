import { motion } from "framer-motion";
import { useRef, useState } from "react";
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

function Banner() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const audioRef = useRef(null);

  // Cute messages array
  const cuteMessages = [
    "Cóc ngã rồi! Đỡ tớ dậy với! 🐸",
    "Ui da! Nhưng tớ vẫn cute lắm!",
    "Ấn nữa đi, tớ thích lắm đó!",
    "Cùng khám phá FPT với tớ nhé!",
    "Cóc không sợ ngã, chỉ sợ không được yêu!",
    "Tớ là cóc siêu nhân, ngã cũng không đau!",
    "Ấn nhẹ thôi, tớ nhột mà!",
    "Cóc cute nhất hệ mặt trời!",
    "Bạn ấn tớ, tớ ấn tim bạn! ❤️",
    "Cóc ngã nhưng vẫn cười!"
  ];
  const [isFalling, setIsFalling] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // Hiển thị message hiện tại
  const currentMessage = cuteMessages[messageIndex];

  const playSound = () => {
    // Random chọn slap hoặc punch
    const hitSounds = ["/slap.mp3", "/puch.mp3"];
    const randomHit = hitSounds[Math.floor(Math.random() * hitSounds.length)];
    const hit = new Audio(randomHit);
    if (randomHit === "/puch.mp3") {
      hit.play();
      setTimeout(() => {
        hit.pause();
        hit.currentTime = 0;
      }, 2000);
    } else {
      const dau = new Audio("/dau.mp3");
      hit.play();
      dau.play();
      // Rung điện thoại nếu có hỗ trợ
      if (navigator.vibrate) {
        navigator.vibrate(300);
      }
      setTimeout(() => {
        hit.pause();
        hit.currentTime = 0;
        dau.pause();
        dau.currentTime = 0;
      }, 2000);
    }
  };

  // Khi ấn vào mascot
  const handleMascotClick = () => {
    setIsFalling(true);
    // Đổi message (random hoặc tuần tự)
    setMessageIndex((prev) => (prev + 1) % cuteMessages.length);
    playSound();
    // Sau 1s thì trở lại trạng thái bình thường
    setTimeout(() => setIsFalling(false), 1000);
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
