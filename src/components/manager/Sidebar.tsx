import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaHome,
    FaBox,
    FaUsers,
    FaClipboardList,
    FaChevronDown,
    FaChevronUp,
    FaStore
} from 'react-icons/fa';
import { BiSolidOffer } from "react-icons/bi";
import { TbReportAnalytics } from 'react-icons/tb';
import { isAdmin } from '../../services/auth.service';

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const [isDropdownAccountOpen, setDropdownAccountOpen] = useState(false);
    const [isDropdownProductOpen, setDropdownProductOpen] = useState(false);
    const [isDropdownDiscountOpen, setDropdownDiscountOpen] = useState(false);

    const toggleDropdownAccount = () => setDropdownAccountOpen(!isDropdownAccountOpen);
    const toggleDropdownProduct = () => setDropdownProductOpen(!isDropdownProductOpen);
    const toggleDropdownDiscount = () => setDropdownDiscountOpen(!isDropdownDiscountOpen);

    return (
        <aside
            className={`bg-gradient-to-b from-gray-900 to-black text-white w-64 fixed h-screen overflow-y-auto transform transition-transform duration-300 shadow-lg z-50 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-6 text-center tracking-wide">Bảng Điều Khiển</h2>

                <img
                    src="https://media.istockphoto.com/id/1406611044/vi/vec-to/thi%E1%BA%BFt-k%E1%BA%BF-logo-chai-n%C6%B0%E1%BB%9Bc-hoa-sang-tr%E1%BB%8Dng-minh-h%E1%BB%8Da-cho-m%E1%BB%B9-ph%E1%BA%A9m-l%C3%A0m-%C4%91%E1%BA%B9p-th%E1%BA%A9m-m%E1%BB%B9-vi%E1%BB%87n-s%E1%BA%A3n-ph%E1%BA%A9m.jpg?s=612x612&w=0&k=20&c=R6pze5UeNvGGQtJpRViiS9YlLduaF7HahXuVDuxhgnk="
                    alt="Logo"
                    className="w-40 h-40 object-cover mx-auto rounded-full border-4 border-white shadow-md mb-6"
                />

                <ul className="space-y-2 text-sm">
                    <SidebarItem icon={<FaHome />} label="Trang chủ" to="/" />
                    <SidebarItem icon={<TbReportAnalytics />} label="Doanh thu" to="/manager/revenue" />
                    <SidebarItem icon={<FaStore />} label="Bán hàng tại quầy" to="/manager/sales-counter" />

                    <SidebarDropdown
                        icon={<FaBox />}
                        label="Quản lý sản phẩm"
                        isOpen={isDropdownProductOpen}
                        toggle={toggleDropdownProduct}
                        items={[
                            { label: 'Sản phẩm', to: '/manager/product-management' },
                            { label: 'Thương hiệu', to: '/manager/brand-management' },
                            { label: 'Thể loại', to: '/manager/category-management' },
                        ]}
                    />

                    {isAdmin() && (
                        <SidebarDropdown
                            icon={<FaUsers />}
                            label="Quản lý tài khoản"
                            isOpen={isDropdownAccountOpen}
                            toggle={toggleDropdownAccount}
                            items={[
                                { label: 'Nhân viên', to: '/manager/staff-management' },
                                { label: 'Khách hàng', to: '/manager/user-management' },
                            ]}
                        />
                    )}

                    {isAdmin() && (
                        <SidebarDropdown
                            icon={<BiSolidOffer />}
                            label="Quản lý giảm giá"
                            isOpen={isDropdownDiscountOpen}
                            toggle={toggleDropdownDiscount}
                            items={[
                                { label: 'Đợt giảm giá', to: '/manager/discount-management' },
                                { label: 'Mã giảm giá', to: '/manager/voucher-management' },
                            ]}
                        />
                    )}

                    <SidebarItem icon={<FaClipboardList />} label="Quản lý đơn hàng" to="/manager/order-management" />
                </ul>
            </div>
        </aside>
    );
};

// Component con: SidebarItem
const SidebarItem = ({
                         icon,
                         label,
                         to
                     }: {
    icon: React.ReactNode;
    label: string;
    to: string;
}) => (
    <li>
        <Link
            to={to}
            className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 hover:bg-opacity-75 transition duration-200"
        >
            <span className="mr-3 text-lg">{icon}</span>
            {label}
        </Link>
    </li>
);

// Component con: SidebarDropdown
const SidebarDropdown = ({
                             icon,
                             label,
                             isOpen,
                             toggle,
                             items
                         }: {
    icon: React.ReactNode;
    label: string;
    isOpen: boolean;
    toggle: () => void;
    items: { label: string; to: string }[];
}) => (
    <li>
        <div
            onClick={toggle}
            className="flex items-center px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700 hover:bg-opacity-75 transition duration-200"
        >
            <span className="mr-3 text-lg">{icon}</span>
            {label}
            {isOpen ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
        </div>
        {isOpen && (
            <ul className="ml-10 mt-2 space-y-1">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.to}
                            className="block px-4 py-1 rounded hover:bg-gray-600 hover:bg-opacity-70 transition duration-150"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        )}
    </li>
);

export default Sidebar;
