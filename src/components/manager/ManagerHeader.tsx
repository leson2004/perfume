import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaBoxOpen, FaUser, FaKey, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { hasManagement, isAuthenticated, logout } from "../../services/auth.service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useProfile } from "../../contexts/ProfileContext";

interface ManagerHeaderProps {
  toggleSidebar: () => void;
}

const ManagerHeader: React.FC<ManagerHeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { profile } = useProfile();
  const isManager = hasManagement();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

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

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Theo dõi scroll để thu nhỏ header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
  className={`fixed top-0 right-0 z-[1200] h-16 flex items-center justify-between
    transition-all duration-500 shadow-md
    ${isManager 
      ? "ml-64 bg-gradient-to-r from-blue-500 to-indigo-600 px-8" 
      : (isScrolled 
          ? "bg-black/70 backdrop-blur-lg px-6" 
          : "bg-gray-100 px-6")}
  `}
>
  {/* Logo + menu */}
  <div className="flex items-center space-x-4">
    {isManager && location.pathname.startsWith("/manager") && (
      <FaBars
        size={24}
        onClick={toggleSidebar}
        className="text-white cursor-pointer hover:scale-110 transition-transform"
      />
    )}
    <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">
     
    </h1>
  </div>

  {/* User dropdown */}
  {isAuthenticated() ? (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center space-x-3 cursor-pointer group"
        onClick={toggleDropdown}
      >
        <span className="text-white font-medium group-hover:text-yellow-200 transition-colors">
          {profile.name}
        </span>
        <img
          src={profile.avatarUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm
          group-hover:scale-105 transition-transform"
        />
      </div>

      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-2xl py-3 z-50 animate-fade-in-down"
        >
          {/* menu items */}
          <Link
            to="/manager/sales-counter"
            className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
            onClick={toggleDropdown}
          >
            <FaBoxOpen /> Trang quản lý
          </Link>
          <Link
            to="/manager/my-order"
            className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
            onClick={toggleDropdown}
          >
            <FaBoxOpen /> Đơn hàng của tôi
          </Link>
          <Link
            to="/manager/profile"
            className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
            onClick={toggleDropdown}
          >
            <FaUser /> Thông tin cá nhân
          </Link>
          <Link
            to="/manager/change-password"
            className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
            onClick={toggleDropdown}
          >
            <FaKey /> Đổi mật khẩu
          </Link>
          <div
            className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer transition"
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
</header>
  );
};

export default ManagerHeader;
