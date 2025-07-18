import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '../layouts/AdminLayout';

const AdminProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (!user) return <AdminLayout><div>Không tìm thấy thông tin admin.</div></AdminLayout>;

  return (
    <AdminLayout>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Thông tin Admin</h2>
      <div style={{ background: '#fff', borderRadius: 8, padding: 32, maxWidth: 400 }}>
        <div style={{ marginBottom: 16 }}><b>Họ tên:</b> {user.fullName || user.username}</div>
        <div style={{ marginBottom: 16 }}><b>Email:</b> {user.email}</div>
        <div style={{ marginBottom: 16 }}><b>Role:</b> {user.role}</div>
        <div style={{ marginBottom: 16 }}><b>Ngày tạo:</b> {new Date(user.createdAt).toLocaleDateString()}</div>
        <button onClick={handleLogout} style={{ marginTop: 24, background: '#e91e63', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', cursor: 'pointer' }}>Đăng xuất</button>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile; 