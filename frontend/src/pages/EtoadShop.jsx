import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coinPackageApi from "../api/coinPackageApi";
import productApi from "../api/productApi";
import coinImg from "../assets/image/coinEtoad.png";
import shopBanner from "../assets/image/shop-banner.png";
import CoinPackages from "../component/CoinPackages";
import ItemShop from "../component/ItemShop";
import Notification from "../component/Notification";
import PaymentModal from "../component/PaymentModal";
import { useAuth } from "../contexts/AuthContext";

const EtoadShop = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [showCoinPackages, setShowCoinPackages] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState(null);

  // Fetch user orders
  const fetchOrders = async () => {
    if (!isAuthenticated) {
      return;
    }
    
    setLoadingOrders(true);
    try {
      const response = await coinPackageApi.getUserOrders();
      
      // Đảm bảo orders luôn là array
      const ordersData = response.data?.data || response.data || [];
      
      if (Array.isArray(ordersData)) {
        setOrders(ordersData);
      } else {
        setOrders([]);
      }
    } catch (error) {
      setOrders([]); // Set empty array nếu có lỗi
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch products
  useEffect(() => {
    if (!showCoinPackages) {
      setLoadingProducts(true);
      setErrorProducts(null);
      productApi.getAll()
        .then(res => {
          setProducts(res.data.data || []);
        })
        .catch(err => {
          setErrorProducts('Không thể tải sản phẩm.');
        })
        .finally(() => setLoadingProducts(false));
    }
  }, [showCoinPackages]);

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated]);

  const handleCoinRecharge = () => {
    setShowCoinPackages(!showCoinPackages);
  };

  const handleSelectPackage = (pkg) => {
    if (!isAuthenticated) {
      setNotification({
        message: 'Vui lòng đăng nhập để nạp xu',
        type: 'warning',
        duration: 3000
      });
      return;
    }
    setSelectedPackage(pkg);
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPackage(null);
  };

  const handlePaymentSuccess = async (pkg, paymentType = 'payos', orderId = null) => {
    setShowPaymentModal(false);
    setSelectedPackage(null);
    
    if (paymentType === 'cod') {
      setNotification({
        message: `📋 Đơn hàng COD đã được tạo! Mã đơn: ${orderId}. Vui lòng thanh toán tại trường để nhận ${pkg.coins} xu.`,
        type: 'info',
        duration: 8000
      });
      // Refresh orders after creating new COD order
      fetchOrders();
    } else if (paymentType === 'payos') {
      if (orderId === 'mock_order') {
        setNotification({
          message: `🎉 Mock PayOS thành công! Bạn đã nhận được ${pkg.coins} xu (development mode)`,
          type: 'success',
          duration: 5000
        });
      } else {
        setNotification({
          message: `🎉 Nạp xu thành công! Bạn đã nhận được ${pkg.coins} xu`,
          type: 'success',
          duration: 5000
        });
      }
      // Refresh orders after PayOS payment
      fetchOrders();

      if (orderId) {
        try {
          const response = await coinPackageApi.getOrderById(orderId);
          const order = response.data.data;
          const status = order.status;
          const paymentStatus = order.paymentStatus;

          if (status === 'PAID') {
            const coinPackage = await coinPackageApi.getPackageById(order.packageId);
            if (!coinPackage) return;
            const user = await coinPackageApi.getUserById(order.userId);
            if (!user) return;

            // Chỉ cộng xu nếu order chưa từng completed
            if (order.status !== 'completed' || order.paymentStatus !== 'paid') {
                user.coins += coinPackage.coins;
                await user.save();
            } else {
            }
          }
        } catch (error) {
          setNotification({
            message: 'Có lỗi xảy ra khi cộng xu cho user. Vui lòng thử lại sau.',
            type: 'error',
            duration: 8000
          });
        }
      }
    }
  };

  const hideNotification = () => {
    setNotification(null);
  };

  // Filter orders based on current view - đảm bảo orders là array
  let filteredOrders = Array.isArray(orders) ? orders.filter(order => {
    if (showCoinPackages) {
      return order.paymentMethod === 'cod' || order.paymentMethod === 'payos';
    } else {
      return false; // For shop items, we don't have orders yet
    }
  }) : [];
  // Sắp xếp theo thời gian tạo mới nhất trước và chỉ lấy 5 order gần nhất
  filteredOrders = filteredOrders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getStatusBadge = (status, paymentStatus) => {
    if (paymentStatus === 'paid') {
      return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Đã thanh toán</span>;
    } else if (status === 'pending') {
      return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Chờ thanh toán</span>;
    } else if (status === 'cancelled') {
      return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Đã hủy</span>;
    }
    return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{status}</span>;
  };

  return (
    <div className="bg-[#FEF4F0] md:pb-12">
      {/* img banner */}
      <div className="relative w-full md:h-[500px] aspect-[3/2]">
        {/* Ảnh nền */}
        <div className="relative w-full h-full">
          <img
            src={shopBanner}
            alt="shop-banner"
            className="object-cover w-full h-full"
          />
          {/* Overlay làm tối ảnh */}
          <div className="absolute inset-0 z-10 bg-black/40" />

          {/* text center in banner */}
          <div className="absolute z-20 text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <h3 className="text-[#F97316] md:text-5xl text-2xl whitespace-nowrap !font-bold">
              Cửa hàng E-Toad
            </h3>
            <p className="text-sm md:text-lg">
              Đổi xu lấy quà hoặc mua vật phẩm hỗ trợ học tập
            </p>
            {isAuthenticated && (
              <div className="mt-4 p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <p className="text-sm text-white">
                  Số xu hiện tại: <span className="font-bold text-[#F97316]">{user?.coins || 0} xu</span>
                </p>
              </div>
            )}
            {!isAuthenticated && (
              <div className="mt-4 p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <p className="text-sm text-white">
                  <span className="font-bold">Đăng nhập</span> để mua sắm và nạp xu
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-[90%] mx-auto mt-10 ">
          {/* button */}
          <div className="flex flex-col items-center justify-center w-full gap-4 md:flex-row">
            <button 
              onClick={() => setShowCoinPackages(false)}
              className={`md:p-4 w-full p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                !showCoinPackages 
                  ? 'bg-[#F97316] !text-white hover:!text-[#F97316] hover:bg-[#FFF1E0] hover:border border-[#F97316]'
                  : 'bg-[#FFF1E0] text-[#F97316] border border-[#F97316] hover:bg-[#F97316] hover:!text-white'
              }`}
            >
              Cửa hàng
            </button>
            <button 
              onClick={handleCoinRecharge}
              className={`md:p-4 w-full p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                showCoinPackages 
                  ? 'bg-[#F97316] !text-white hover:!text-[#F97316] hover:bg-[#FFF1E0] hover:border border-[#F97316]'
                  : 'bg-[#FFF1E0] text-[#F97316] border border-[#F97316] hover:bg-[#F97316] hover:!text-white'
              }`}
            >
              Nạp xu
            </button>
          </div>

          {/* buying history */}
          <div className="my-10">
            <h3 className="text-lg text-[#F97316] !font-bold">
              {showCoinPackages ? 'Lịch sử nạp xu' : 'Lịch sử mua hàng'}
            </h3>
            <div className="w-full bg-[#FFF1E0] p-4 rounded-xl mt-4 md:p-6">
              {loadingOrders ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F97316]"></div>
                  <span className="ml-3 text-gray-600">Đang tải...</span>
                </div>
              ) : filteredOrders.length > 0 ? (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order._id} className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{order.package?.name || 'Gói xu'}</h4>
                          <p className="text-sm text-gray-600">Mã đơn: {order.orderNumber}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('vi-VN')} {new Date(order.createdAt).toLocaleTimeString('vi-VN')}
                          </p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(order.status, order.paymentStatus)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img src={coinImg} alt="coin" className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">{order.coins} xu</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-[#F97316]">{order.amount}đ</span>
                          <p className="text-xs text-gray-500 capitalize">
                            {order.paymentMethod === 'cod' ? 'Tiền mặt' : 'PayOS'}
                          </p>
                        </div>
                      </div>
                      {order.notes && (
                        <p className="text-xs text-gray-600 mt-2">{order.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="max-h-max flex flex-col items-center justify-center py-8">
                  <div className="w-10 h-10 md:w-15 md:h-15">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 81 81"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.0884 14.1777H19.5072C21.3984 14.1777 22.344 14.1777 23.0955 14.5922C23.4054 14.7631 23.6861 14.9823 23.9271 15.2415C24.5115 15.87 24.7408 16.7874 25.1995 18.6222L25.8048 21.0434C26.1417 22.3911 26.3102 23.065 26.5702 23.6303C27.4729 25.5927 29.2704 26.9962 31.3932 27.3959C32.0047 27.5111 32.6992 27.5111 34.0884 27.5111V27.5111"
                        stroke="#F2A166"
                        stroke-width="6.66667"
                        stroke-linecap="round"
                      />
                      <path
                        d="M60.7544 57.5112H25.9241C25.4368 57.5112 25.1931 57.5112 25.0083 57.4905C23.0496 57.2712 21.7079 55.4097 22.1192 53.4822C22.158 53.3003 22.2351 53.0691 22.3892 52.6068V52.6068C22.5603 52.0935 22.6458 51.8369 22.7403 51.6104C23.708 49.2917 25.897 47.714 28.4027 47.5293C28.6474 47.5112 28.9179 47.5112 29.459 47.5112H47.4211"
                        stroke="#F2A166"
                        stroke-width="6.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M49.1808 47.5107H37.3355C33.2825 47.5107 31.256 47.5107 29.6928 46.5928C29.0326 46.2051 28.4442 45.7066 27.9533 45.1192C26.7908 43.7282 26.4576 41.7292 25.7913 37.7313C25.1162 33.6805 24.7786 31.6551 25.58 30.1549C25.9145 29.5286 26.3786 28.9808 26.9414 28.5478C28.2894 27.5107 30.3427 27.5107 34.4495 27.5107H56.6343C61.4689 27.5107 63.8862 27.5107 64.8633 29.0916C65.8403 30.6725 64.7593 32.8346 62.5972 37.1588L61.1065 40.1402C59.3134 43.7264 58.4169 45.5194 56.8059 46.5151C55.1949 47.5107 53.1902 47.5107 49.1808 47.5107Z"
                        stroke="#F2A166"
                        stroke-width="6.66667"
                        stroke-linecap="round"
                      />
                      <circle
                        cx="57.4217"
                        cy="67.5106"
                        r="3.33333"
                        fill="#F2A166"
                      />
                      <circle
                        cx="30.7547"
                        cy="67.5106"
                        r="3.33333"
                        fill="#F2A166"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center">
                    <h5 className="text-sm text-slate-800 !mb-0.5 md:text-lg">
                      {showCoinPackages ? 'Chưa có lịch sử nạp xu' : 'Chưa có lịch sử mua hàng'}
                    </h5>
                    <p className="text-xs text-slate-600 md:text-sm">
                      {showCoinPackages ? 'Hãy chọn gói xu phù hợp ở dưới' : 'Hãy khám phá các sản phẩm ở dưới'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 text-sm">
              <h4>
                {showCoinPackages ? 'Mẹo nạp xu từ' : 'Mẹo mua sắm từ'} <span>E-toad</span>
              </h4>
              <ul className="text-[12px]">
                {showCoinPackages ? (
                  <>
                    <li className="text-slate-600">
                      <p>
                        💡 Gói Vừa (150 xu) là lựa chọn phổ biến nhất với giá tốt!
                      </p>
                    </li>
                    <li className="text-slate-600">
                      <p>
                        🎯 Gói Lớn và VIP có tỷ lệ giảm giá cao nhất, tiết kiệm hơn!
                      </p>
                    </li>
                    <li className="text-slate-600">
                      <p>
                        ⚡ Xu có thể sử dụng để mua vật phẩm hỗ trợ học tập trong shop!
                      </p>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="text-slate-600">
                      <p>
                        💡 Làm quiz thường xuyên để tích xu! Mỗi câu đúng có thể
                        mang lại 10-50 xu.
                      </p>
                    </li>
                    <li className="text-slate-600">
                      <p>
                        🎯 Ưu tiên đổi những món quà có giá trị cao khi đã tích đủ
                        xu.
                      </p>
                    </li>
                    <li className="text-slate-600">
                      <p>
                        ⚡ Mua vật phẩm hỗ trợ để tăng hiệu quả học tập và kiếm xu
                        nhanh hơn!
                      </p>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/*  shop items or coin packages */}
          <div>
            <h3 className="text-lg text-[#F97316] !font-bold">
              {showCoinPackages ? 'Gói nạp xu' : 'Danh sách sản phẩm'}
            </h3>

            {/* items or packages */}
            <div className="mt-4">
              {showCoinPackages ? (
                <CoinPackages onSelectPackage={handleSelectPackage} />
              ) : (
                <div className="grid grid-cols-2 mb-10 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* loading/error state */}
                  {loadingProducts && (
                    <div className="col-span-2 lg:col-span-3 flex justify-center items-center py-8 text-[#F97316]">Đang tải sản phẩm...</div>
                  )}
                  {errorProducts && (
                    <div className="col-span-2 lg:col-span-3 flex justify-center items-center py-8 text-red-500">{errorProducts}</div>
                  )}
                  {/* render products */}
                  {products.map(product => (
                    <ItemShop key={product._id} product={product} />
                  ))}
                  {/* end of item */}
                </div>
              )}
            </div>
            
            {/* end of items/packages */}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          package={selectedPackage}
          onClose={handleClosePaymentModal}
          onPaymentSuccess={handlePaymentSuccess}
          user={user}
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

export default EtoadShop;
