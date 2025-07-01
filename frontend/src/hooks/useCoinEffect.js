import { useCallback, useState } from 'react';

export const useCoinEffect = () => {
  const [showCoinRain, setShowCoinRain] = useState(false);

  const playCoinEffect = useCallback(() => {
    // Play coin sound
    try {
      const audio = new Audio('/coin.mp3'); // Using existing punch.mp3 as coin sound
      audio.volume = 0.3; // Reduce volume
      audio.play();
    } catch (error) {
      // No need to log, as the error handling is already done in the try block
    }

    // Show coin rain animation
    setShowCoinRain(true);
  }, []);

  const hideCoinRain = useCallback(() => {
    setShowCoinRain(false);
  }, []);

  return {
    showCoinRain,
    playCoinEffect,
    hideCoinRain
  };
}; 