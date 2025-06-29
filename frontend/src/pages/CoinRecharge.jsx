import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoinPackages from '../component/CoinPackages';
import Notification from '../component/Notification';
import PaymentModal from '../component/PaymentModal';
import { useAuth } from '../contexts/AuthContext';

const CoinRecharge = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check if user is logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Vui lòng đăng nhập</h2>
          <p className="text-gray-600 mb-6">Bạn cần đăng nhập để nạp xu</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#F97316] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#EA580C] transition-colors"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPackage(null);
  };

  const handlePaymentSuccess = (pkg) => {
    setShowPaymentModal(false);
    setSelectedPackage(null);
    
    // Show success notification
    setNotification({
      message: `🎉 Nạp xu thành công! Bạn đã nhận được ${pkg.coins} xu`,
      type: 'success',
      duration: 5000
    });

    // In a real app, you would update the user's coin balance here
    // For now, we'll just show the notification
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Nạp Xu</h1>
              <p className="text-gray-600">Tài khoản: {user?.username}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Số xu hiện tại</p>
              <p className="text-xl font-bold text-[#F97316]">{user?.coins || 0} xu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <CoinPackages onSelectPackage={handleSelectPackage} />
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          package={selectedPackage}
          onClose={handleClosePaymentModal}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={hideNotification}
        />
      )}
    </div>
  );
};

export default CoinRecharge; 