import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productApi from "../api/productApi";
import { useAuth } from "../contexts/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { user, setUser } = useAuth();
  const [isExchanging, setIsExchanging] = useState(false);
  const [exchangeResult, setExchangeResult] = useState(null); // null | 'success' | 'error'
  const [exchangeMessage, setExchangeMessage] = useState(null); // message từ backend

  useEffect(() => {
    setLoading(true);
    setError(null);
    productApi.getById(id)
      .then(res => setProduct(res.data.data))
      .catch(() => setError("Không tìm thấy sản phẩm."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleExchange = async () => {
    if (!user) {
      setExchangeMessage('Bạn cần đăng nhập để đổi sản phẩm!');
      setExchangeResult('error');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    if (isExchanging || !product.quantity || product.quantity <= 0) return;
    setIsExchanging(true);
    setExchangeResult(null);
    setExchangeMessage(null);
    try {
      const res = await productApi.exchangeProduct(product._id);
      if (res.data.success) {
        setExchangeResult('success');
        setExchangeMessage(res.data.message);
        setProduct(prev => ({ ...prev, quantity: res.data.productQuantity }));
        if (user) setUser({ ...user, coins: res.data.newCoin });
      } else {
        setExchangeResult('error');
        setExchangeMessage(res.data.message);
      }
    } catch (err) {
      setExchangeResult('error');
      setExchangeMessage('Đổi xu thất bại. Vui lòng thử lại.');
    } finally {
      setIsExchanging(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-[#F97316]">Đang tải sản phẩm...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product) return null;

  const PreviewModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
      onClick={() => setPreviewOpen(false)}
    >
      <div
        className="relative flex items-center justify-center w-full h-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Nút X đóng */}
        <button
          className="absolute top-6 right-6 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 text-[#F97316] hover:text-orange-700 rounded-full p-2 shadow-lg transition"
          onClick={() => setPreviewOpen(false)}
          title="Đóng"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white object-contain bg-white bg-opacity-30 backdrop-blur-md"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-2 md:px-10">
      {previewOpen && <PreviewModal />}
      <div className="w-full bg-white rounded-3xl shadow-2xl p-8 md:p-14 flex flex-col gap-10">
        <button
          className="mb-8 px-5 py-2 bg-orange-50 text-orange-600 rounded-full font-semibold hover:bg-orange-200 transition w-fit shadow"
          onClick={() => navigate(-1)}
        >
          ← Quay lại
        </button>
        <div className="flex flex-col md:flex-row gap-10 w-full">
          <div className="flex-shrink-0 flex items-center justify-center relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full md:w-96 md:h-96 h-72 object-contain rounded-2xl bg-gray-50 shadow-lg hover:scale-105 transition-transform duration-300 cursor-zoom-in"
              onClick={() => setPreviewOpen(true)}
              title="Nhấn để phóng to"
            />
            {/* Eye preview icon */}
            <button
              className="absolute bottom-3 right-3 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition group"
              onClick={() => setPreviewOpen(true)}
              title="Xem trước ảnh lớn"
              style={{outline: 'none', border: 'none'}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#F97316"
                className="w-7 h-7 group-hover:scale-110 group-hover:stroke-orange-600 transition"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12C3.75 7.5 7.5 4.5 12 4.5c4.5 0 8.25 3 9.75 7.5-1.5 4.5-5.25 7.5-9.75 7.5-4.5 0-8.25-3-9.75-7.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </button>
          </div>
          {/* Thông tin sản phẩm */}
          <div className="flex-1 flex flex-col gap-5">
            <h1 className="text-3xl font-extrabold text-[#F97316] tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-6">
              <span className="text-2xl font-bold text-[#F97316] flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="#F97316" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#F97316">Xu</text></svg>
                {product.coin}
              </span>
              <span className="text-base text-gray-600 flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18" /><path d="M12 3v18" /></svg>
                Còn: <b className="ml-1">{product.quantity ?? '-'}</b>
              </span>
            </div>
            {/* Hiển thị mô tả sản phẩm nếu story là string */}
            {typeof product.story === "string" && (
              <p className="text-gray-700 text-lg mt-2 italic">{product.story}</p>
            )}
            <button
              className={`mt-6 px-8 py-3 rounded-full font-bold transition shadow-xl text-lg
                ${(!product.quantity || product.quantity <= 0 || isExchanging)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#F97316] to-orange-400 text-white hover:from-orange-600 hover:to-orange-500'}
              `}
              onClick={handleExchange}
              disabled={!product.quantity || product.quantity <= 0 || isExchanging}
            >
              {isExchanging ? 'Đang xử lý...' : 'Đổi xu'}
            </button>
            {exchangeResult === 'success' && (
              <div className="mt-2 text-green-600 font-semibold">{exchangeMessage || 'Đổi xu thành công!'}</div>
            )}
            {exchangeResult === 'error' && (
              <div className="mt-2 text-red-500 font-semibold">{exchangeMessage || 'Đổi xu thất bại. Vui lòng thử lại.'}</div>
            )}
            {(!product.quantity || product.quantity <= 0) && (
              <div className="mt-2 text-red-400 italic">Sản phẩm đã hết hàng.</div>
            )}
            {exchangeMessage && (
              <div className="mt-2 text-red-500 font-semibold">{exchangeMessage}</div>
            )}
          </div>
        </div>
        {/* Story sản phẩm: luôn nằm bên dưới ảnh và thông tin sản phẩm */}
        <div className="mt-8 w-full">
          <h2 className="text-xl font-bold text-[#F97316] mb-6">Câu chuyện sản phẩm</h2>
          {Array.isArray(product.story) && product.story.length > 0 ? (
            <div className="relative flex flex-col items-center">
              {/* Timeline line center */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-orange-100 rounded -translate-x-1/2 z-0"></div>
              <ul className="space-y-16 w-full">
                {product.story.map((story, idx) => (
                  <li key={story._id} className="relative flex flex-col items-center w-full">
                    {/* Số thứ tự nằm trên đường kẻ dọc */}
                    <span className="z-10 w-10 h-10 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shadow absolute left-1/2 -translate-x-1/2 -top-5 border-4 border-white">
                      {idx + 1}
                    </span>
                    <div className="bg-orange-50 p-5 rounded-xl shadow border border-orange-200 flex-1 mt-5 w-full md:w-3/4" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                      <h3 className="font-semibold text-orange-700 text-lg mb-1">
                        {story.title}
                      </h3>
                      <p className="text-gray-700">{story.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-400 italic">Không có story cho sản phẩm này.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 