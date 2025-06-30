import React, { useState } from 'react';
import coinPackageApi from '../api/coinPackageApi';
import coinImg from '../assets/image/coinEtoad.png';
import Button from './Button';

const PaymentModal = ({ package: selectedPackage, onClose, onPaymentSuccess, user }) => {
  const [paymentMethod, setPaymentMethod] = useState('payos');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const paymentMethods = [
    {
      id: 'payos',
      name: 'PayOS Banking',
      icon: '🏦',
      description: 'Thanh toán qua PayOS (Internet Banking)'
    }
  ];

  const handlePayment = async () => {
    if (paymentMethod === 'cod') {
      // Hiển thị xác nhận cho COD
      setShowConfirmation(true);
      return;
    }

    setLoading(true);

    if (paymentMethod === 'payos') {
      try {
        const res = await coinPackageApi.createPayOSOrder(selectedPackage._id, user._id);
        
        if (res.success && res.data.checkoutUrl) {
          // Chuyển hướng đến trang thanh toán PayOS
          window.location.href = res.data.checkoutUrl;
        } else {
          throw new Error('Không nhận được URL thanh toán từ PayOS');
        }
        
        setLoading(false);
        return;
      } catch (err) {
        setLoading(false);
        console.error('PayOS error:', err);
        
        let errorMessage = 'Không thể tạo đơn thanh toán PayOS!';
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        alert(errorMessage);
        return;
      }
    }
  };

  const handleConfirmCOD = async () => {
    setLoading(true);
    setShowConfirmation(false);
    
    try {
      // Gọi API để tạo đơn hàng COD (chưa thanh toán)
      const response = await coinPackageApi.createCODOrder(selectedPackage._id);
      
      setLoading(false);
      onPaymentSuccess(selectedPackage, 'cod', response.data.order.orderNumber);
    } catch (error) {
      setLoading(false);
      alert('Không thể tạo đơn hàng! Vui lòng thử lại.');
    }
  };

  const handleCancelCOD = () => {
    setShowConfirmation(false);
  };

  if (!selectedPackage) return null;

  // Modal xác nhận COD
  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-1000 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">💵</div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Xác nhận thanh toán tiền mặt</h2>
            <p className="text-gray-600 mb-6">
              Bạn sẽ thanh toán <strong>{selectedPackage.price}đ</strong> tại trường để nhận <strong>{selectedPackage.coins} xu</strong>.
              <br /><br />
              <strong>Lưu ý:</strong> Xu sẽ chỉ được cộng vào tài khoản sau khi xác nhận thanh toán từ admin.
            </p>
            
            <div className="flex gap-3">
              <Button
                onClick={handleCancelCOD}
                style={{
                  backgroundColor: '#6B7280',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px'
                }}
              >
                Hủy
              </Button>
              <Button
                onClick={handleConfirmCOD}
                style={{
                  backgroundColor: '#F97316',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px'
                }}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-1000 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Thanh toán</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Package Info */}
        <div className="bg-orange-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{selectedPackage.name}</h3>
              <p className="text-sm text-gray-600">{selectedPackage.description}</p>
            </div>
            <div className="flex items-center">
              <img src={coinImg} alt="coin" className="w-6 h-6 mr-2" />
              <span className="font-bold text-[#F97316]">{selectedPackage.coins}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-orange-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tổng tiền:</span>
              <div className="text-right">
                <span className="text-lg font-bold text-[#F97316]">{selectedPackage.price}đ</span>
                <span className="text-sm text-gray-400 line-through ml-2">{selectedPackage.originalPrice}đ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Chọn phương thức thanh toán</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === method.id
                    ? 'border-[#F97316] bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="text-2xl mr-3">{method.icon}</span>
                <div>
                  <div className="font-medium text-gray-800">{method.name}</div>
                  <div className="text-sm text-gray-600">{method.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            style={{
              backgroundColor: '#6B7280',
              color: '#FFFFFF',
              fontWeight: '600',
              flex: 1,
              padding: '12px',
              borderRadius: '12px'
            }}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            onClick={handlePayment}
            style={{
              backgroundColor: '#F97316',
              color: '#FFFFFF',
              fontWeight: '600',
              flex: 1,
              padding: '12px',
              borderRadius: '12px'
            }}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Thanh toán'}
          </Button>
        </div>

        {loading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#F97316]"></div>
            <p className="text-sm text-gray-600 mt-2">Đang xử lý thanh toán...</p>
          </div>
        )}

        {/* Overlay loading khi chuyển hướng PayOS */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#F97316] mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Đang chuyển hướng...</h3>
              <p className="text-gray-600">Vui lòng chờ trong giây lát để chuyển đến trang thanh toán PayOS</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal; 