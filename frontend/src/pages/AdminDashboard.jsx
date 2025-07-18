import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import userApi from '../api/userApi';
import AdminLayout from '../layouts/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ userCount: 0, productCount: 0 });
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BLUE = '#1976d2';
  const BLUE_DARK = '#1565c0';
  const BLUE_LIGHT = '#e3f2fd';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const statsRes = await userApi.getStats();
        setStats(statsRes || { userCount: 0, productCount: 0 });
        const prodRes = await axiosClient.get('/products/newest');
        setProducts(prodRes.data || []);
        const userRes = await userApi.getNewestUsers();
        setUsers(userRes || []);
      } catch (err) {
        setError('Không thể tải dữ liệu dashboard!');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <AdminLayout><div style={{ padding: 40, textAlign: 'center' }}>Đang tải dashboard...</div></AdminLayout>;
  if (error) return <AdminLayout><div style={{ padding: 40, color: 'red', textAlign: 'center' }}>{error}</div></AdminLayout>;

  return (
    <AdminLayout>
      {/* Stats boxes */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: BLUE }}>{stats.userCount}</div>
          <div style={{ color: BLUE_DARK, marginTop: 8, fontSize: 18 }}>Tổng người dùng</div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: BLUE }}>{stats.productCount}</div>
          <div style={{ color: BLUE_DARK, marginTop: 8, fontSize: 18 }}>Tổng sản phẩm</div>
        </div>
      </div>
      {/* Main tables */}
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Danh sách sản phẩm mới */}
        <div style={{ flex: 2, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>Sản phẩm mới</h2>
            <button style={{ background: BLUE, color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/admin/products')}>Xem tất cả</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f6f7fb' }}>
                <th style={{ textAlign: 'left', padding: 8, color: BLUE_DARK }}>Tên sản phẩm</th>
                <th style={{ textAlign: 'left', padding: 8, color: BLUE_DARK }}>Số lượng</th>
                <th style={{ textAlign: 'left', padding: 8, color: BLUE_DARK }}>Giá xu</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr key={p._id || idx}>
                  <td style={{ padding: 8 }}>{p.name}</td>
                  <td style={{ padding: 8 }}>{p.quantity}</td>
                  <td style={{ padding: 8 }}>{p.coin}</td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan={3} style={{ textAlign: 'center', color: '#aaa', padding: 16 }}>Không có dữ liệu</td></tr>}
            </tbody>
          </table>
        </div>
        {/* Danh sách user mới */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: BLUE_DARK }}>User mới</h2>
            <button style={{ background: BLUE, color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/admin/users')}>Xem tất cả</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.map((u, idx) => (
              <li key={u._id || idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#eee', marginRight: 12 }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{u.fullName || u.username}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{u.email}</div>
                </div>
              </li>
            ))}
            {users.length === 0 && <li style={{ color: '#aaa', textAlign: 'center', padding: 16 }}>Không có dữ liệu</li>}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 