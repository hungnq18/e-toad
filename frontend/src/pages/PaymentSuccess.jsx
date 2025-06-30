import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import coinPackageApi from '../api/coinPackageApi';
import coinImg from '../assets/image/coinEtoad.png';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderCode = searchParams.get('orderCode');
  const statusParam = searchParams.get('status');
  const codeParam = searchParams.get('code');
  const idParam = searchParams.get('id');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderCode) {
        setError('Không tìm thấy mã đơn hàng.');
        setLoading(false);
        return;
      }
      try {
        const res = await coinPackageApi.verifyPayOSPayment(orderCode);
        setOrderInfo(res.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể xác minh trạng thái đơn hàng.');
        setLoading(false);
      }
    };

    const completePayment = async () => {
      if (!orderCode) {
        setError('Không tìm thấy mã đơn hàng.');
        setLoading(false);
        return;
      }
      
      // Nếu status từ URL là 'PAID', gọi API complete payment
      if (statusParam === 'PAID') {
        try {
          const res = await coinPackageApi.completePayOSPayment(orderCode);
          // Sau khi complete, fetch lại thông tin order
          const orderRes = await coinPackageApi.verifyPayOSPayment(orderCode);
          setOrderInfo(orderRes.data);
          setLoading(false);
        } catch (err) {
          // Nếu lỗi, vẫn fetch thông tin order để hiển thị
          fetchOrder();
        }
      } else {
        // Nếu không phải 'PAID', chỉ fetch thông tin order
        fetchOrder();
      }
    };

    completePayment();
  }, [orderCode, statusParam]);

  const handleBackToShop = () => {
    navigate('/shop');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang xác minh thanh toán...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Thanh toán thất bại</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleBackToShop}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors mb-2"
          >
            Quay lại cửa hàng
          </button>
          <button
            onClick={handleBackToHome}
            className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  // Xác định trạng thái thành công
  const isSuccess = (orderInfo && orderInfo.status === 'completed') || statusParam === 'PAID';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {isSuccess ? (
          <>
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h2>
              <p className="text-gray-600">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Mã đơn hàng:</p>
              <p className="font-mono text-lg font-bold text-gray-900">{orderInfo?.orderCode || orderCode}</p>
              <p className="text-sm text-gray-600 mt-2">Trạng thái: <span className="font-semibold text-green-600">Thành công</span></p>
              {orderInfo?.amount && (
                <p className="text-sm text-gray-600">Số tiền: <span className="font-semibold">{orderInfo.amount.toLocaleString()}đ</span></p>
              )}
              {orderInfo?.coins && (
                <p className="text-sm text-gray-600">Số xu: <span className="font-semibold">{orderInfo.coins}</span></p>
              )}
              {orderInfo?.paymentStatus && (
                <p className="text-sm text-gray-600">Payment status: <span className="font-semibold">{orderInfo.paymentStatus}</span></p>
              )}
            </div>
            <div className="flex items-center justify-center mb-6">
              <img src={coinImg} alt="coin" className="w-6 h-6 mr-2" />
              <span className="text-lg font-semibold text-orange-600">
                Xu đã được cộng vào tài khoản của bạn
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Đang xử lý thanh toán...</h2>
              <p className="text-gray-600">Vui lòng chờ trong giây lát hoặc liên hệ hỗ trợ nếu gặp sự cố.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Mã đơn hàng:</p>
              <p className="font-mono text-lg font-bold text-gray-900">{orderInfo?.orderCode || orderCode}</p>
              <p className="text-sm text-gray-600 mt-2">Trạng thái: <span className="font-semibold text-yellow-600">{orderInfo?.status || statusParam || 'Đang xử lý'}</span></p>
              {orderInfo?.paymentStatus && (
                <p className="text-sm text-gray-600">Payment status: <span className="font-semibold">{orderInfo.paymentStatus}</span></p>
              )}
            </div>
          </>
        )}
        <div className="space-y-3">
          <button
            onClick={handleBackToShop}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Quay lại cửa hàng
          </button>
          <button
            onClick={handleBackToHome}
            className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 