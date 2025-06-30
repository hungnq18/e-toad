import React, { useEffect } from 'react';
import coinImg from '../assets/image/coinEtoad.png';
import { useCoinPackages, usePurchasePackage, useUserBalance } from '../hooks/useCoinPackages';
import { useNotification } from '../hooks/useNotification';
import Button from './Button';

const CoinPackages = ({ onSelectPackage }) => {
  const { packages, loading, error, fetchPackages } = useCoinPackages();
  const { balance, fetchBalance } = useUserBalance();
  const { purchasePackage, loading: purchaseLoading } = usePurchasePackage();
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchPackages();
    fetchBalance();
  }, []);

  const handlePurchase = async (pkg) => {
    try {
      const result = await purchasePackage(pkg._id);
      showNotification('success', `Mua thành công ${pkg.coins} xu!`);
      
      // Update user balance
      fetchBalance();
      
      // Call the original onSelectPackage if provided
      if (onSelectPackage) {
        onSelectPackage(pkg);
      }
    } catch (error) {
      showNotification('error', error.message || 'Mua thất bại!');
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F97316] mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải gói xu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="text-center">
          <p className="text-red-600">Lỗi: {error}</p>
          <Button 
            onClick={() => {
              fetchPackages();
              fetchBalance();
            }}
            style={{
              backgroundColor: '#F97316',
              color: '#FFFFFF',
              marginTop: '1rem'
            }}
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#F97316] mb-4">Nạp Xu E-Toad</h2>
        <p className="text-gray-600">Chọn gói xu phù hợp với nhu cầu của bạn</p>
        {balance !== null && (
          <div className="mt-4 flex items-center justify-center">
            <img src={coinImg} alt="coin" className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold text-[#F97316]">
              Số dư: {balance} xu
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              pkg.popular 
                ? 'border-[#F97316] shadow-orange-100' 
                : 'border-gray-200 hover:border-[#F97316]'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#F97316] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Phổ biến nhất
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                <p className="text-sm text-gray-600">{pkg.description}</p>
              </div>

              <div className="flex items-center justify-center mb-4">
                <img src={coinImg} alt="coin" className="w-8 h-8 mr-2" />
                <span className="text-2xl font-bold text-[#F97316]">{pkg.coins}</span>
                <span className="text-gray-600 ml-1">xu</span>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-[#F97316]">{pkg.price.toLocaleString()}đ</span>
                  <span className="text-lg text-gray-400 line-through">{pkg.originalPrice.toLocaleString()}đ</span>
                </div>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-semibold">
                  Giảm {pkg.discount}
                </span>
              </div>

              <Button
                onClick={() => onSelectPackage(pkg)}
                disabled={purchaseLoading}
                style={{
                  backgroundColor: pkg.popular ? '#F97316' : '#10B981',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  opacity: purchaseLoading ? 0.7 : 1,
                  cursor: purchaseLoading ? 'not-allowed' : 'pointer'
                }}
                onHover={(e) => {
                  if (!purchaseLoading) {
                    e.currentTarget.style.backgroundColor = pkg.popular ? '#EA580C' : '#059669';
                  }
                }}
                onMouseOut={(e) => {
                  if (!purchaseLoading) {
                    e.currentTarget.style.backgroundColor = pkg.popular ? '#F97316' : '#10B981';
                  }
                }}
              >
                {purchaseLoading ? 'Đang xử lý...' : 'Chọn Gói'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          * Xu có thể sử dụng để mua các vật phẩm trong shop E-Toad
        </p>
      </div>
    </div>
  );
};

export default CoinPackages; 