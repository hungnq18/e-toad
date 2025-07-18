import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BLUE = '#1976d2';
const BLUE_DARK = '#1565c0';
const BLUE_LIGHT = '#e3f2fd';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, loading } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Debug: log user và loading
  // console.log('AdminLayout user:', user, 'loading:', loading);

  const menu = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Sản phẩm', path: '/admin/products' },
    { label: 'Người dùng', path: '/admin/users' },
    { label: 'Tài khoản', path: '/admin/profile' }
  ];

  React.useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    if (dropdown) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdown]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Đang tải...</div>;
  if (!user) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>Không tìm thấy thông tin admin.</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: BLUE_LIGHT }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: BLUE, color: '#fff', padding: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 32, color: '#fff' }}>E-Toad Admin</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {menu.map(item => (
              <li
                key={item.path}
                style={{
                  margin: '16px 0',
                  fontWeight: 600,
                  background: location.pathname === item.path ? '#fff' : 'transparent',
                  color: location.pathname === item.path ? BLUE : '#fff',
                  borderRadius: 8,
                  padding: 8,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  boxShadow: location.pathname === item.path ? '0 2px 8px #0001' : undefined
                }}
                onClick={() => navigate(item.path)}
                onMouseOver={e => { if (location.pathname !== item.path) e.currentTarget.style.background = BLUE_LIGHT; }}
                onMouseOut={e => { if (location.pathname !== item.path) e.currentTarget.style.background = 'transparent'; }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <main style={{ flex: 1, padding: 32 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: BLUE_DARK }}>Admin Panel</h1>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <input placeholder="Search here" style={{ padding: 8, borderRadius: 6, border: `1px solid ${BLUE}`, marginRight: 24, background: '#fff' }} />
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setDropdown(d => !d)} ref={dropdownRef}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: BLUE, marginRight: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: '#fff' }}>
                {user?.fullName?.[0] || user?.username?.[0] || 'A'}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: BLUE_DARK }}>{user?.fullName || user?.username || 'Admin'}</div>
                {user?.username && <div style={{ fontSize: 13, color: BLUE }}>{'@' + user.username}</div>}
                <div style={{ fontSize: 12, color: '#888' }}>{user?.email || 'Super admin'}</div>
              </div>
              {/* Dropdown */}
              {dropdown && (
                <div style={{ position: 'absolute', top: 48, right: 0, background: '#fff', boxShadow: '0 2px 8px #0002', borderRadius: 8, minWidth: 160, zIndex: 10 }}>
                  <div style={{ padding: 12, cursor: 'pointer', borderBottom: '1px solid #eee', color: BLUE_DARK }} onClick={() => { setDropdown(false); navigate('/admin/profile'); }}>Xem thông tin</div>
                  <div style={{ padding: 12, cursor: 'pointer', color: BLUE }} onClick={handleLogout}>Đăng xuất</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 