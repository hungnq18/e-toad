import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/image/logo-eToad.svg";
import "./css/header.css";

const navLinks = [
  { to: "/", label: "Trang chính" },
  { to: "/about-fpt", label: "Về đại học FPT" },
  { to: "/about-etoad", label: "Về E-Toad" },
  { to: "/lop-hoc-ao", label: "Lớp học ảo" },
  { to: "/shop", label: "Cửa hàng" },
  { to: "/blog", label: "Tin tức" },
  { to: "/account", label: "Tài khoản" },
  { to: "/quiz", label: "Quiz" },
];

const Header = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

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
          {/* Hamburger icon */}
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
              {navLinks.map((link) => (
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
        className="flex flex-row items-center justify-center w-full gap-3 header-inner"
        style={{ height: 70, background: "#F97316" }}
      >
        <span
          style={{
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "25px",
            color: "#FEF4F0",
            textAlign: "center",
            maxwidth: 631,
          }}
        >
          KHÁM PHÁ{" "}
          <span className="italic font-size-[16px]">
            {" "}
            ngay lớp học ảo đại học FPT để{" "}
          </span>
          <span className="font-bold font-size-[18px]"> NHẬN XU</span>
          <span className="italic font-size-[16px]"> đổi </span>
          <span className="font-bold">LINH VẬT</span>
        </span>
        {/* Divider */}
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
        {/* Divider */}
        <span
          style={{
            width: 0,
            height: 24.5,
            borderLeft: "2px solid #FEF4F0",
          }}
        />
        <a
          href="#"
          style={{
            fontWeight: 500,
            fontSize: 16,
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

      {/* Main navbar */}
      <div
        className="flex flex-row items-center justify-between w-full header-inner"
        style={{
          height: 110,
          background: "#FEF4F0",
          margin: "0 auto",
        }}
      >
        {/* Logo + Name */}
        <div
          className="flex flex-col items-center gap-2"
          style={{
            width: 108,
            height: 108,
            marginLeft: 24, // giảm margin cho mobile
            marginTop: 18,
            marginBottom: 18,
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
          className="flex flex-row items-center gap-4 px-12"
          style={{
            width: "auto", // cho nav co giãn
            height: 38,
            marginRight: 24, // giảm margin cho mobile
          }}
        >
          {navLinks.map((link, idx) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:!text-[#F97316] transition-colors duration-300"
              style={{
                fontWeight: location.pathname === link.to ? 600 : 400,
                fontSize: 18,
                lineHeight: "31px",
                color: location.pathname === link.to ? "#F97316" : "#353535",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                height: 38,
                ...(idx === 0 && { width: 150 }),
                ...(idx === 1 && { width: 192 }),
                ...(idx === 2 && { width: 160 }),
                ...(idx === 3 && { width: 160 }),
                ...(idx === 4 && { width: 140 }),
                ...(idx === 5 && { width: 90 }),
                ...(idx === 6 && { width: 140 }),
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
