import { useCallback, useState } from 'react';

export const useCoinEffect = () => {
  const [showCoinRain, setShowCoinRain] = useState(false);

  const playCoinEffect = useCallback(() => {
    // Play coin sound
    try {
      const audio = new Audio('/coin.mp3'); // Using existing punch.mp3 as coin sound
      audio.volume = 0.3; // Reduce volume
      audio.play().catch(err => console.log('Audio play failed:', err));
    } catch (error) {
      console.log('Audio not available:', error);
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