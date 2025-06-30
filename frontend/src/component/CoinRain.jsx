import React, { useEffect } from 'react';
import coinImg from '../assets/image/coinEtoad.png';

const NUM_COINS = 20;

const CoinRain = ({ onEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnd && onEnd();
    }, 2000); // 2s hiệu ứng
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {[...Array(NUM_COINS)].map((_, i) => (
        <img
          key={i}
          src={coinImg}
          alt="coin"
          className="coin-rain"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random()}s`,
            width: 40 + Math.random() * 20,
            position: 'absolute',
            top: '-60px',
            zIndex: 9999,
          }}
        />
      ))}
      <style>{`
        .coin-rain {
          animation: coin-fall 1.8s linear forwards;
        }
        @keyframes coin-fall {
          to {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default CoinRain; 