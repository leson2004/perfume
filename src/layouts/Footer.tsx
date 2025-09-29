import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo & Contact */}
        <div className="space-y-5 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <img
              src="/assets/img/logo/logo_perfume.png"
              alt="Logo"
              className="w-16 h-16 rounded-full shadow-lg border border-gray-600 hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </div>
          <p className="text-sm">
            <strong>Địa chỉ:</strong> Triệu Sơn, Thanh Hóa
          </p>
          <p className="text-sm">
            <strong>Điện thoại:</strong> 012345678
          </p>
          <p className="text-sm">
            <strong>Email:</strong> abc@gmail.com
          </p>
          <div className="flex justify-center md:justify-start space-x-3 pt-3">
            {[FaFacebookF, FaInstagram, FaYoutube, FaTwitter].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-orange-500 transition"
                >
                  <Icon className="text-white text-lg" />
                </a>
              )
            )}
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 text-center md:text-left">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-orange-400 uppercase">
              Về chúng tôi
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-orange-400 uppercase">
              Chính sách
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Đổi trả & Hoàn tiền</li>
              <li>Thanh toán & Giao hàng</li>
              <li>Bảo mật thông tin</li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-lg font-semibold text-orange-400 uppercase">
            Nhận tin khuyến mãi
          </h3>
          <p className="text-sm text-gray-400">
            Đăng ký email để nhận ưu đãi độc quyền và cập nhật mới nhất.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-900"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SMTA Perfume. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
