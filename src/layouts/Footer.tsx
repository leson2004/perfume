import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 py-10 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Contact */}
        <div className="space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
                <img
                    src="./assets/img/logo/logo_perfume.png"
                    alt="Logo"
                    className="w-14 h-14 rounded-full shadow-md border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="text-sm leading-relaxed space-y-1">
                <p><strong>Địa chỉ:</strong> Triệu Sơn, Thanh Hóa </p>
                <p><strong>Điện thoại:</strong> 012345678</p>
                <p><strong>Email:</strong> abc@gmail.com</p>
            </div>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
                <a href="#" className="text-gray-500 hover:text-orange-500 text-xl"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-gray-500 hover:text-orange-500 text-xl"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-500 hover:text-orange-500 text-xl"><i className="fab fa-youtube"></i></a>
                <a href="#" className="text-gray-500 hover:text-orange-500 text-xl"><i className="fab fa-twitter"></i></a>
            </div>
        </div>

        {/* Info */}
        <div className="space-y-3 text-center md:text-left">
            <h3 className="text-lg font-semibold text-orange-500 uppercase">Thông tin của chúng tôi</h3>
            <p>Cơ sở 1: Triệu Sơn, Thanh Hóa </p>
            <p>Lĩnh vực kinh doanh: Mỹ phẩm, chăm sóc sắc đẹp</p>
        </div>

        {/* Policies */}
        <div className="space-y-3 text-center md:text-left">
            <h3 className="text-lg font-semibold text-orange-500 uppercase">Chính sách</h3>
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
            <h3 className="text-lg font-semibold text-orange-500 uppercase">Hỗ trợ chung</h3>
            <ul className="space-y-1 text-sm">
                <li>Trang chủ</li>
                <li>Giới thiệu</li>
                <li>Sản phẩm</li>
                <li>Liên hệ</li>
            </ul>
        </div>
    </div>

    <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Công ty TNHH XYZ. Bảo lưu mọi quyền.
    </div>
</footer>

    );
};

export default Footer;
