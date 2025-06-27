import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo-eToad.svg";
import { useAuth } from "../contexts/AuthContext";
import "./css/header.css";

const navLinks = [
  { to: "/", label: "Trang chính" },
  { to: "/about-fpt", label: "Về đại học FPT" },
  { to: "/about-etoad", label: "Về E-Toad" },
  { to: "/lop-hoc-ao", label: "Lớp học ảo" },
  { to: "/shop", label: "Cửa hàng" },
  { to: "/blog", label: "Tin tức" },
  { to: "/quiz", label: "Trò chơi" },
  { to: "/login", label: "Login" }
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated } = useAuth();

  // Tạo menu items dựa trên trạng thái đăng nhập
  const getMenuItems = () => {
    const baseItems = [
      { to: "/", label: "Trang chính" },
      { to: "/about-fpt", label: "Về đại học FPT" },
      { to: "/about-etoad", label: "Về E-Toad" },
      { to: "/lop-hoc-ao", label: "Lớp học ảo" },
      { to: "/shop", label: "Cửa hàng" },
      { to: "/blog", label: "Tin tức" },
      { to: "/quiz", label: "Trò chơi" }
    ];

    if (isAuthenticated) {
      return [
        ...baseItems,
        { to: '/profile', label: 'Tài khoản' }
      ];
    }
    return [...baseItems, { to: "/login", label: "Đăng nhập" }];
  };

  const menuItems = getMenuItems();

  return (
    <header
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 150,
        filter: "drop-shadow(0px 4px 4px rgba(249, 115, 22, 0.2))",
        zIndex: 50,
        width: "100%",
      }}
      className="flex flex-col items-center p-0"
    >
      {/* Mobile Header */}
      <div
        className="flex items-center justify-between px-4 py-2 header-mobile"
        style={{ background: "#F97316", height: 70 }}
      >
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="E-Toad Logo"
            style={{ width: 40, height: 30, objectFit: "contain" }}
          />
          <span style={{ fontWeight: 600, fontSize: 18, color: "#FEF4F0" }}>
            E-Toad
          </span>
        </div>
        <button
          aria-label="Open menu"
          onClick={() => setOpenMenu(true)}
          style={{ background: "none", border: "none" }}
        >
          <svg width="32" height="32" fill="#FEF4F0" viewBox="0 0 24 24">
            <rect y="5" width="24" height="3" rx="1.5" />
            <rect y="11" width="24" height="3" rx="1.5" />
            <rect y="17" width="24" height="3" rx="1.5" />
          </svg>
        </button>
      </div>

      {/* Modal menu cho mobile */}
      {openMenu && (
        <div className="fixed inset-0 z-[1000] bg-black/50 flex justify-end">
          <div className="flex flex-col h-full p-6 bg-white shadow-lg mobile-menu-modal">
            <button
              aria-label="Close menu"
              className="self-end mb-4"
              onClick={() => setOpenMenu(false)}
              style={{ background: "none", border: "none", paddingLeft: 10 }}
            >
              <svg width="28" height="28" fill="#F97316" viewBox="0 0 24 24">
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  stroke="#F97316"
                  strokeWidth="2"
                />
                <line
                  x1="6"
                  y1="18"
                  x2="18"
                  y2="6"
                  stroke="#F97316"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <nav className="flex flex-col gap-2">
              {menuItems.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-lg font-semibold text-[#F97316] py-2"
                  onClick={() => setOpenMenu(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Header giữ nguyên */}
      <div
        className="w-full flex flex-row items-center header-inner"
        style={{ background: "#F97316", height: 60, padding: 0 }}
      >
        {/* Marquee chiếm phần lớn chiều ngang */}
        <div
          className="flex-1 min-w-0 overflow-hidden marquee-container"
          style={{ height: 60 }}
        >
          <div
            className="animate-marquee whitespace-nowrap flex items-center"
            style={{ height: 60 }}
          >
            <span className="blink-gradient" style={{ fontWeight: 500, fontSize: 22, color: "#FEF4F0", letterSpacing: 1 }}>
              <span className="blink-gradient">KHÁM PHÁ</span>
              <span className="blink-gradient"> ngay lớp học ảo đại học FPT để </span>
              <span className="blink-gradient"> NHẬN XU</span>
              <span className="blink-gradient"> đổi </span>
              <span className="blink-gradient">LINH VẬT</span>
            </span>
            <span className="blink-gradient" style={{ fontWeight: 500, fontSize: 22, color: "#FEF4F0", letterSpacing: 1 }}>
              <span className="blink-gradient">KHÁM PHÁ</span>
              <span className="blink-gradient"> ngay lớp học ảo đại học FPT để </span>
              <span className="blink-gradient"> NHẬN XU</span>
              <span className="blink-gradient"> đổi </span>
              <span className="blink-gradient">LINH VẬT</span>
            </span>
            <span className="blink-gradient" style={{ fontWeight: 500, fontSize: 22, color: "#FEF4F0", letterSpacing: 1 }}>
              <span className="blink-gradient">KHÁM PHÁ</span>
              <span className="blink-gradient"> ngay lớp học ảo đại học FPT để </span>
              <span className="blink-gradient"> NHẬN XU</span>
              <span className="blink-gradient"> đổi </span>
              <span className="blink-gradient">LINH VẬT</span>
            </span>
            <span className="blink-gradient" style={{ fontWeight: 500, fontSize: 22, color: "#FEF4F0", letterSpacing: 1 }}>
              <span className="blink-gradient">KHÁM PHÁ</span>
              <span className="blink-gradient"> ngay lớp học ảo đại học FPT để </span>
              <span className="blink-gradient"> NHẬN XU</span>
              <span className="blink-gradient"> đổi </span>
              <span className="blink-gradient">LINH VẬT</span>
            </span>
          </div>
        </div>
        {/* Phần số xu và nút khám phá */}
        <div
          className="flex items-center gap-3 justify-end pr-8 flex-shrink-0"
          style={{ height: 60 }}
        >
          <span
            style={{
              width: 0,
              height: 24.5,
              borderLeft: "2px solid #FEF4F0",
            }}
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "25px",
              color: "#FEF4F0",
              textAlign: "center",
              width: 160,
            }}
          >
            Số xu hiện tại: <strong>50</strong>
          </span>
          <span
            style={{
              width: 0,
              height: 24.5,
              borderLeft: "2px solid #FEF4F0",
            }}
          />
          <a
            href="/lop-hoc-ao"
            className="header-explore-link"
            style={{
              fontWeight: 500,
              fontSize: 18,
              lineHeight: "25px",
              color: "#FEF4F0",
              textDecoration: "underline",
              width: 149,
              textAlign: "center",
            }}
          >
            Khám phá ngay
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className="w-full header-inner"
        style={{ background: "#FEF4F0" }}
      >
        <div
          className="flex flex-row items-center justify-between w-full px-6"
          style={{
            height: 110,
            margin: "0 auto",
            maxWidth: 1252,
          }}
        >
          {/* Logo + Name */}
          <div
            className="flex flex-col items-center gap-2"
            style={{
              width: 108,
              height: 108,
              marginTop: 18,
              marginBottom: 18,
              flexShrink: 0,
            }}
          >
            <img
              src={logo}
              alt="E-Toad Logo"
              style={{
                width: 70,
                height: 50,
                objectFit: "contain",
                marginTop: 10,
              }}
            />
            <span
              style={{
                fontWeight: 600,
                fontSize: 18,
                lineHeight: "25px",
                color: "#353535",
                textAlign: "center",
                width: 108,
                height: 30,
              }}
            >
              E-Toad
            </span>
          </div>
          {/* Navigation links */}
          <nav
            className="flex flex-row items-center justify-end flex-grow gap-2"
            style={{
              height: 38,
            }}
          >
            {menuItems.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:!text-[#F97316] transition-colors duration-300 px-3"
                style={{
                  fontWeight: location.pathname === link.to ? 600 : 400,
                  fontSize: 18,
                  lineHeight: "31px",
                  color: location.pathname === link.to ? "#F97316" : "#353535",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  height: 38,
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
