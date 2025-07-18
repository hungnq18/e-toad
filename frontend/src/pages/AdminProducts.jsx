import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import AdminLayout from '../layouts/AdminLayout';

const PAGE_SIZE = 10;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axiosClient.get(`/products?page=${page}&limit=${PAGE_SIZE}`);
        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
        setTotal(res.data.total || 0);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm!');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
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
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Danh sách sản phẩm</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <>
          <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f6f7fb' }}>
                <th style={{ padding: 12, textAlign: 'left' }}>Tên sản phẩm</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Số lượng</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Giá xu</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td style={{ padding: 12 }}>{p.name}</td>
                  <td style={{ padding: 12 }}>{p.quantity}</td>
                  <td style={{ padding: 12 }}>{p.coin}</td>
                  <td style={{ padding: 12 }}>{new Date(p.createdAt).toLocaleDateString() || "18/06/2024"} </td>
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

export default AdminProducts; 