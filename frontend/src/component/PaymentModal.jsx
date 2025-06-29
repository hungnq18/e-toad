import React, { useState } from 'react';
import coinImg from '../assets/image/coinEtoad.png';
import Button from './Button';

const PaymentModal = ({ package: selectedPackage, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    {
      id: 'banking',
      name: 'Chuyển khoản',
      icon: '🏦',
      description: 'Chuyển khoản ngân hàng'
    },
    {
      id: 'cod',
      name: 'Tiền mặt',
      icon: '💵',
      description: 'Thanh toán tại trường'
    }
  ];

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onPaymentSuccess(selectedPackage);
    }, 2000);
  };

  if (!selectedPackage) return null;

  return (
    <div className="fixed inset- bg-opacity-50 flex items-center justify-center z-1000 p-4">
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
      </div>
    </div>
  );
};

export default PaymentModal; 