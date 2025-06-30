import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authApi from '../api/authApi';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    if (password !== confirm) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.resetPassword(token, password);
      setMessage(res.message || 'Đặt lại mật khẩu thành công!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Đặt lại mật khẩu</h2>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Nhập lại mật khẩu mới"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          disabled={loading}
        >
          {loading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
        </button>
        {message && <div className="text-green-600 mt-4 text-center">{message}</div>}
        {error && <div className="text-red-600 mt-4 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default ResetPassword; 