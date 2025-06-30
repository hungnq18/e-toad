import React, { useState } from 'react';
import authApi from '../api/authApi';

const EmailIcon = () => (
  <div className="flex justify-center mb-6">
    <div className="bg-orange-100 rounded-full p-3 shadow-inner w-fit">
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#f97316">
        <rect width="20" height="14" x="2" y="5" rx="3" fill="#fff" stroke="#f97316" strokeWidth="1.5"/>
        <path d="M4 7l8 6 8-6" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await authApi.forgotPassword(email);
      setMessage(res.message || 'Vui lòng kiểm tra email để đặt lại mật khẩu.');
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-orange-100"
      >
        <EmailIcon />
        <h2 className="text-2xl font-bold mb-2 text-center text-orange-500">Quên mật khẩu?</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">
          Nhập email bạn đã đăng ký để nhận hướng dẫn đặt lại mật khẩu.
        </p>
        <div className="mb-6">
          <input
            type="email"
            className="w-full p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow"
            disabled={loading}
          >
            {loading ? 'Đang gửi...' : 'Gửi email đặt lại mật khẩu'}
          </button>
        </div>
        {message && (
          <div className="flex items-center justify-center text-green-600 text-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#22c55e">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {message}
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center text-red-600 text-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ef4444">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword; 