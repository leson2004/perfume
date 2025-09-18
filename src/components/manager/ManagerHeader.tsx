import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { hasManagement, isAuthenticated, logout } from '../../services/auth.service';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useProfile } from '../../contexts/ProfileContext';

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

    // 👇 Hiển thị header khi về đầu trang
    const [isVisible, setIsVisible] = useState(true);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    const handleLogout = async () => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đăng xuất',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await logout();
                    navigate('/login', { replace: true });
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.reload();
                    toast.success(response.message, { autoClose: 3000 });
                } catch (error) {
                    console.error('Error logging out:', error);
                    toast.error('Đã xảy ra lỗi, vui lòng thử lại sau', { autoClose: 3000 });
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
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // 👇 Theo dõi scroll để ẩn/hiện header
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY <= 10) {
                setIsVisible(true); // Chỉ hiện khi ở đầu trang
            } else {
                setIsVisible(false); // Ẩn khi cuộn xuống
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`bg-black fixed w-full top-0 z-[1100] transition-all duration-500 ease-in-out ${
                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}
        >
            <div className="flex justify-between items-center px-4 py-2">
                <div className="flex items-center">
                    {isManager && location.pathname.startsWith('/manager') && (
                        <FaBars
                            size={28}
                            onClick={toggleSidebar}
                            className="text-white cursor-pointer mr-5"
                        />
                    )}
                </div>
                {isAuthenticated() ? (
                    <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center space-x-4 cursor-pointer" onClick={toggleDropdown}>
                            <span className="text-white font-medium">{profile.name}</span>
                            <img
                                src={profile.avatarUrl}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                {isManager && (
                                    <Link to="/manager/sales-counter" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={toggleDropdown}>
                                        Trang quản lý
                                    </Link>
                                )}
                                <Link to="/manager/my-order" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={toggleDropdown}>
                                    Đơn hàng của tôi
                                </Link>
                                <Link to="/manager/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={toggleDropdown}>
                                    Thông tin cá nhân
                                </Link>
                                <Link to="/manager/change-password" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={toggleDropdown}>
                                    Đổi mật khẩu
                                </Link>
                                <li className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                                    Đăng xuất
                                </li>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="text-white">Đăng nhập</Link>
                )}
            </div>
        </header>
    );
};

export default ManagerHeader;
