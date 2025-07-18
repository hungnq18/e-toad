import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        navigate('/admin/login');
      }
    }
  }, [user, loading, navigate]);

  if (loading || !user || user.role !== 'admin') {
    return null; // hoặc loading spinner
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Page</h1>
      <p>Quản lý người dùng (dữ liệu sẽ được hiển thị ở đây).</p>
      {/* TODO: Thêm bảng danh sách user, chức năng xoá/sửa, v.v. */}
    </div>
  );
};

export default AdminPage; 