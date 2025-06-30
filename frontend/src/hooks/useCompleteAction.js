import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCoinEffect } from './useCoinEffect';
import { useNotification } from './useNotification';

export const useCompleteAction = (sectionKey, coins, useNotificationHook = null) => {
  const { addCoins, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showCoinRain, playCoinEffect, hideCoinRain } = useCoinEffect();
  
  // Use provided notification hook or create a new one
  const notificationHook = useNotificationHook || useNotification();
  const { showNotification } = notificationHook;

  const handleComplete = useCallback(async () => {
    // Kiểm tra đăng nhập
    if (!isAuthenticated) {
      showNotification('Vui lòng đăng nhập để nhận xu!', 'warning');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    // Kiểm tra đã hoàn thành chưa (sẽ được xử lý bởi useCompletionState)
    const completed = localStorage.getItem(`${sectionKey}_completed_${JSON.parse(localStorage.getItem('user'))?._id}`);
    if (completed === 'true') {
      showNotification('Bạn đã hoàn thành phần này rồi!', 'warning');
      return;
    }

    try {
      await addCoins(coins);
      showNotification(`🎉 Hoàn thành! Bạn đã nhận được ${coins} xu!`, 'success');
      // Play coin effect
      playCoinEffect();
      return true; // Return true to indicate success
    } catch (error) {
      console.error('Error adding coins:', error);
      showNotification('Có lỗi xảy ra khi thêm xu. Vui lòng thử lại!', 'error');
      return false; // Return false to indicate failure
    }
  }, [isAuthenticated, addCoins, coins, sectionKey, navigate, showNotification, playCoinEffect]);

  return {
    handleComplete,
    showCoinRain,
    hideCoinRain,
    ...notificationHook
  };
}; 