import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

const BLUE = '#1976d2';
const BLUE_DARK = '#1565c0';
const BLUE_LIGHT = '#e3f2fd';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const user = await authApi.login({ email, password });
      if (user && user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('Tài khoản không có quyền admin!');
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: BLUE_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{
        maxWidth: 400,
        width: '100%',
        background: '#fff',
        padding: 40,
        borderRadius: 16,
        boxShadow: '0 4px 24px #1976d233',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ color: BLUE_DARK, fontWeight: 800, fontSize: 32, marginBottom: 32, letterSpacing: 1 }}>Admin Login</h2>
        <div style={{ width: '100%', marginBottom: 20 }}>
          <label style={{ fontWeight: 600, color: BLUE_DARK }}>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 12, borderRadius: 8, border: `1px solid ${BLUE}`, marginTop: 6, outline: 'none', fontSize: 16, background: BLUE_LIGHT }}
            autoFocus
          />
        </div>
        <div style={{ width: '100%', marginBottom: 20 }}>
          <label style={{ fontWeight: 600, color: BLUE_DARK }}>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 12, borderRadius: 8, border: `1px solid ${BLUE}`, marginTop: 6, outline: 'none', fontSize: 16, background: BLUE_LIGHT }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 16, width: '100%', textAlign: 'center' }}>{error}</div>}
        <button type="submit" style={{
          width: '100%',
          background: BLUE,
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 0',
          fontWeight: 700,
          fontSize: 18,
          marginTop: 8,
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px #1976d222',
          transition: 'background 0.2s'
        }}
        disabled={loading}
        onMouseOver={e => { if (!loading) e.currentTarget.style.background = BLUE_DARK; }}
        onMouseOut={e => { if (!loading) e.currentTarget.style.background = BLUE; }}
        >{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
      </form>
    </div>
  );
};

export default AdminLogin; 