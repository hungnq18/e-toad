import React, { useEffect, useState } from 'react';
import userApi from '../api/userApi';
import AdminLayout from '../layouts/AdminLayout';

const PAGE_SIZE = 10;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await userApi.getAllUsers(page, PAGE_SIZE);
        setUsers(res.users || []);
        setTotalPages(res.totalPages || 1);
        setTotal(res.total || 0);
      } catch (err) {
        setError('Không thể tải danh sách user!');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const BLUE = '#1976d2';
  const BLUE_DARK = '#1565c0';
  const BLUE_LIGHT = '#e3f2fd';

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);
    if (page <= 3) end = Math.min(5, totalPages);
    if (page >= totalPages - 2) start = Math.max(1, totalPages - 4);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return (
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
        <button onClick={() => setPage(1)} disabled={page === 1} style={{ background: BLUE_LIGHT, color: BLUE_DARK, border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>{'<<'}</button>
        <button onClick={handlePrev} disabled={page === 1} style={{ background: BLUE_LIGHT, color: BLUE_DARK, border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>{'<'}</button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{
              fontWeight: p === page ? 700 : 400,
              background: p === page ? BLUE : BLUE_LIGHT,
              color: p === page ? '#fff' : BLUE_DARK,
              border: 'none',
              borderRadius: 4,
              padding: '4px 12px',
              cursor: 'pointer',
              boxShadow: p === page ? '0 2px 8px #0001' : undefined
            }}
            disabled={p === page}
          >
            {p}
          </button>
        ))}
        <button onClick={handleNext} disabled={page === totalPages} style={{ background: BLUE_LIGHT, color: BLUE_DARK, border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>{'>'}</button>
        <button onClick={() => setPage(totalPages)} disabled={page === totalPages} style={{ background: BLUE_LIGHT, color: BLUE_DARK, border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600, cursor: 'pointer' }}>{'>>'}</button>
        <span style={{ marginLeft: 16, color: BLUE_DARK }}>Trang {page} / {totalPages} (Tổng: {total})</span>
      </div>
    );
  };

  return (
    <AdminLayout>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Danh sách người dùng</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <>
          <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f6f7fb' }}>
                <th style={{ padding: 12, textAlign: 'left' }}>Họ tên</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Role</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td style={{ padding: 12 }}>{u.fullName || u.username}</td>
                  <td style={{ padding: 12 }}>{u.email}</td>
                  <td style={{ padding: 12 }}>{u.role}</td>
                  <td style={{ padding: 12 }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination()}
        </>
      )}
    </AdminLayout>
  );
};

// Sửa userApi.getAllUsers để nhận page, limit
userApi.getAllUsers = async (page = 1, limit = 10) => {
  try {
    const response = await userApi._rawGetAllUsers(page, limit);
    return response;
  } catch (error) {
    throw error;
  }
};
// Lưu lại hàm gốc
userApi._rawGetAllUsers = async (page, limit) => {
  try {
    const response = await userApi.__proto__.getAllUsers.call(userApi, page, limit);
    return response;
  } catch (error) {
    throw error;
  }
};
// Ghi đè hàm gốc để gọi API đúng dạng
userApi.getAllUsers = async (page = 1, limit = 10) => {
  try {
    const response = await import('../api/axiosClient').then(m => m.default.get(`/users?page=${page}&limit=${limit}`));
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching users' };
  }
};

export default AdminUsers; 