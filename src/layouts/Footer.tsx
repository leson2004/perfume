import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo & Contact */}
                <div className="space-y-4 text-center md:text-left">
                    <div className="flex justify-center md:justify-start">
                        <img
                            src="https://media.istockphoto.com/id/1406611044/vi/vec-to/thi%E1%BA%BFt-k%E1%BA%BF-logo-chai-n%C6%B0%E1%BB%9Bc-hoa-sang-tr%E1%BB%8Dng-minh-h%E1%BB%8Da-cho-m%E1%BB%B9-ph%E1%BA%A9m-l%C3%A0m-%C4%91%E1%BA%B9p-th%E1%BA%A9m-m%E1%BB%B9-vi%E1%BB%87n-s%E1%BA%A3n-ph%E1%BA%A9m.jpg?s=612x612&w=0&k=20&c=R6pze5UeNvGGQtJpRViiS9YlLduaF7HahXuVDuxhgnk="
                            alt="Logo"
                            className="w-14 h-14 rounded-full shadow-md border-2 border-white cursor-pointer hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="text-sm leading-relaxed space-y-1">
                        <p><strong>Địa chỉ:</strong> Triệu Sơn, Thanh Hóa </p>
                        <p><strong>Điện thoại:</strong> 012345678</p>
                        <p><strong>Email:</strong> abc@gmail.com</p>
                    </div>
                    <div className="flex justify-center md:justify-start space-x-4 mt-3">
                        <a href="#" className="text-blue-500 hover:text-blue-400 text-xl">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="text-pink-400 hover:text-pink-300 text-xl">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-500 text-xl">
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="#" className="text-sky-400 hover:text-sky-300 text-xl">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-3 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-purple-400 uppercase">Thông tin của chúng tôi</h3>
                    <p>Cơ sở 1: Triệu Sơn, Thanh Hóa </p>
                    <p>Lĩnh vực kinh doanh: Mỹ phẩm, chăm sóc sắc đẹp</p>
                </div>

                {/* Policies */}
                <div className="space-y-3 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-purple-400 uppercase">Chính sách</h3>
                    <ul className="space-y-1 text-sm">
                        <li>Chính sách bảo hành</li>
                        <li>Chính sách đổi trả</li>
                        <li>Chính sách thanh toán</li>
                        <li>Chính sách giao hàng</li>
                        <li>Chính sách bảo mật</li>
                    </ul>
                </div>

                {/* Support */}
                <div className="space-y-3 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-purple-400 uppercase">Hỗ trợ chung</h3>
                    <ul className="space-y-1 text-sm">
                        <li>Trang chủ</li>
                        <li>Giới thiệu</li>
                        <li>Sản phẩm</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Công ty TNHH XYZ. Bảo lưu mọi quyền.
            </div>
        </footer>
    );
};

export default Footer;
