import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaBoxOpen, FaUser, FaKey, FaSignOutAlt, FaSearch, FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { hasManagement, isAuthenticated, logout } from "../services/auth.service";
import { useCart } from "../contexts/CartContext";
import { useProfile } from "../contexts/ProfileContext";

const Header: React.FC<{ toggleSidebar?: () => void }> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartTotal } = useCart();
  const { profile } = useProfile();

  const isManager = hasManagement();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // dropdown click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (isDropdownOpen) window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const handleSearch = (keyword: string) => {
    navigate("/product-page", { state: { keyword } });
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      confirmButtonColor: "#d33",
      cancelButtonText: "Hủy",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await logout();
          navigate("/login", { replace: true });
          localStorage.clear();
          sessionStorage.clear();
          window.location.reload();
          toast.success(response.message, { autoClose: 3000 });
        } catch (error) {
          console.error("Error logging out:", error);
          toast.error("Đã xảy ra lỗi, vui lòng thử lại sau", { autoClose: 3000 });
        }
      }
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1200] transition-all duration-500 ${
        isScrolled ? "backdrop-blur-lg bg-black/70 py-2 shadow-lg" : " bg-black/90 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo + Sidebar button (manager) */}
        <div className="flex items-center">
          {isManager && location.pathname.startsWith("/manager") && toggleSidebar && (
            <FaBars
              size={26}
              onClick={toggleSidebar}
              className="text-white cursor-pointer mr-5 hover:scale-110 transition-transform"
            />
          )}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <img
              src="/assets/img/logo/logo_perfume.png"
              alt="Logo"
              className="w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
            />
            <h1 className="text-xl font-bold text-white tracking-wide">SMTA Perfume</h1>
          </div>
        </div>

        {/* Navigation (user only) */}
        {!location.pathname.startsWith("/manager") && (
          <nav>
            <ul className="flex space-x-10 font-medium text-white text-[16px]">
              {[
                { to: "/", label: "Trang Chủ" },
                { to: "/product-page", label: "Sản Phẩm" },
                { to: "/intro", label: "Giới Thiệu" },
                { to: "/contact", label: "Liên Hệ" },
              ].map((item, i) => (
                <li key={i} className="relative group">
                  <Link to={item.to} className="hover:text-orange-400 transition-colors">
                    {item.label}
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Right actions */}
        <div className="flex items-center space-x-6">
          {/* Search (user only) */}
          {!location.pathname.startsWith("/manager") && (
            <div className="relative">
              {showSearch ? (
                <input
                  type="text"
                  autoFocus
                  placeholder="Tìm kiếm..."
                  className="p-2 pl-4 pr-10 rounded-full shadow-sm focus:ring-2 focus:ring-orange-400 transition-all duration-300 w-56"
                  onChange={(e) => handleSearch(e.target.value)}
                  onBlur={() => setShowSearch(false)}
                />
              ) : (
                <FaSearch
                  size={20}
                  className="text-white cursor-pointer hover:text-orange-400 transition-colors"
                  onClick={() => setShowSearch(true)}
                />
              )}
            </div>
          )}

          {/* Cart (user only) */}
          {!location.pathname.startsWith("/manager") && (
            <div className="relative">
              <Link to="/cart">
                <FaCartShopping size={26} className="text-white hover:text-orange-400 transition-colors" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow-md">
                {isAuthenticated() ? cartTotal : 0}
              </span>
            </div>
          )}

          {/* User dropdown (manager + user) */}
          {isAuthenticated() ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setDropdownOpen(!isDropdownOpen)}>
                <span className="text-white font-medium group-hover:text-orange-400 transition-colors">
                  {profile.name}
                </span>
                <img
                  src={profile.avatarUrl}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-orange-400 transition-all duration-300 shadow-md"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-4 w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-3 z-50 animate-fade-in-down">
                  {isManager && (
                    <Link
                      to="/manager/sales-counter"
                      className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-orange-100 hover:text-orange-600 rounded-xl transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaBoxOpen /> Trang quản lý
                    </Link>
                  )}
                  <Link
                    to="/manager/my-order"
                    className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-orange-100 hover:text-orange-600 rounded-xl transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaBoxOpen /> Đơn hàng của tôi
                  </Link>
                  <Link
                    to="/manager/profile"
                    className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-orange-100 hover:text-orange-600 rounded-xl transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUser /> Thông tin cá nhân
                  </Link>
                  <Link
                    to="/manager/change-password"
                    className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-orange-100 hover:text-orange-600 rounded-xl transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaKey /> Đổi mật khẩu
                  </Link>
                  <div
                    className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-red-100 hover:text-red-600 rounded-xl cursor-pointer transition"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-md hover:opacity-90 transition"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
