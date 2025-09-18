import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from '../contexts/CartContext';
import { isAuthenticated } from '../services/auth.service';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartTotal } = useCart();

    const [isScrolled, setIsScrolled] = useState(false);

    const handleChangeKeyword = (keyword: string) => {
        navigate('/product-page', { state: { keyword } });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`bg-white/70 backdrop-blur-md py-6 px-4 fixed left-0 right-0 shadow-xl z-50 border-b border-purple-200 transition-all duration-300 ${
                isScrolled ? 'top-0' : 'top-12'
            }`}
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center mr-12">
                    <div className="rounded-full overflow-hidden w-14 h-14 shadow-md border-2 border-white">
                        <img
                            src="https://media.istockphoto.com/id/1406611044/vi/vec-to/thi%E1%BA%BFt-k%E1%BA%BF-logo-chai-n%C6%B0%E1%BB%9Bc-hoa-sang-tr%E1%BB%8Dng-minh-h%E1%BB%8Da-cho-m%E1%BB%B9-ph%E1%BA%A9m-l%C3%A0m-%C4%91%E1%BA%B9p-th%E1%BA%A9m-m%E1%BB%B9-vi%E1%BB%87n-s%E1%BA%A3n-ph%E1%BA%A9m.jpg?s=612x612&w=0&k=20&c=R6pze5UeNvGGQtJpRViiS9YlLduaF7HahXuVDuxhgnk="
                            alt="Logo"
                            className="cursor-pointer transform hover:scale-110 transition-transform duration-300"
                            onClick={() => navigate('/')}
                        />
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow">
                    <ul className="flex space-x-10 justify-start text-[17px] font-medium text-gray-800 items-center">
                        <li><Link to="/" className="hover:text-purple-500 transition-colors duration-200">TRANG CHỦ</Link></li>
                        <li><Link to="/product-page" className="hover:text-purple-500 transition-colors duration-200">SẢN PHẨM</Link></li>
                        <li><Link to="/contact" className="hover:text-purple-500 transition-colors duration-200">LIÊN HỆ</Link></li>
                        <li><Link to="/intro" className="hover:text-purple-500 transition-colors duration-200">GIỚI THIỆU</Link></li>
                    </ul>
                </nav>

                {/* Search + Cart */}
                <div className="flex items-center space-x-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="p-2.5 pl-5 pr-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 w-52"
                            onChange={(e) => handleChangeKeyword(e.target.value)}
                        />
                        <FaSearch
                            className="absolute right-3 top-3 text-gray-600 hover:text-purple-500 transition-colors duration-300"
                            size={18}
                        />
                    </div>

                    <div className="relative hover:scale-110 transition-transform duration-300">
                        <Link to="/cart">
                            <FaCartShopping
                                size={30}
                                className="text-gray-800 hover:text-purple-500 transition-colors duration-300"
                            />
                        </Link>
                        <span
                            className="absolute bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold"
                            style={{ top: -6, right: -6 }}
                        >
                            {isAuthenticated() ? cartTotal : 0}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
