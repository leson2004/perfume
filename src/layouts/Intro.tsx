import React from 'react';
import { FaEye, FaGift, FaStore } from 'react-icons/fa';

const Intro = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-2xl">
      <div className="space-y-12">

        {/* Phần Tầm nhìn */}
        <section className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-4">
            <FaEye className="text-pink-500 text-2xl" />
            <h2 className="text-2xl font-extrabold text-gray-800">I/ Tầm nhìn</h2>
          </div>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Tại <span className="font-semibold text-pink-600">SMTA SHOP</span>, chúng tôi cam kết nâng cao trải nghiệm khách hàng bằng sản phẩm đa dạng và tư vấn chuyên nghiệp. Mục tiêu của chúng tôi là trở thành một trong những cửa hàng nước hoa hàng đầu tại Việt Nam, luôn đặt khách hàng lên hàng đầu.
          </p>
          <ul className="list-decimal list-inside mt-4 space-y-3 text-gray-700">
            <li className="hover:text-pink-600 transition-colors duration-200">
              <strong>Trải nghiệm hoàn hảo:</strong> Tư vấn và hỗ trợ khách hàng tận tâm, nhanh chóng.
            </li>
            <li className="hover:text-pink-600 transition-colors duration-200">
              <strong>Sản phẩm chính hãng:</strong> Nhập trực tiếp từ các nhà cung cấp uy tín.
            </li>
          </ul>
        </section>

        {/* Phần Sứ mệnh */}
        <section className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-4">
            <FaGift className="text-purple-500 text-2xl" />
            <h2 className="text-2xl font-extrabold text-gray-800">II/ Sứ mệnh</h2>
          </div>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Đặt khách hàng làm trung tâm, đáp ứng mọi nhu cầu với dịch vụ chất lượng cao. Chú trọng phát triển nhân sự, đào tạo đội ngũ kế thừa và chia sẻ quyền lợi, cùng xây dựng sự phát triển bền vững cho công ty.
          </p>
        </section>

        {/* Phần Cửa hàng */}
        <section className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-4">
            <FaStore className="text-blue-500 text-2xl" />
            <h2 className="text-2xl font-extrabold text-gray-800">III/ Cửa hàng SMTA SHOP</h2>
          </div>
          <div className="text-gray-700 mt-2 space-y-2 leading-relaxed">
            <p><strong>Địa chỉ:</strong> Dân Lý, Triệu Sơn, Thanh Hóa, Việt Nam | ĐT: 0123456789</p>
            <p>Hoạt động từ 9h tới 21h hằng ngày, mở cả 7 ngày trong tuần.</p>
            <p className="text-pink-600 font-semibold">Rất hân hạnh được phục vụ và cảm ơn sự tin tưởng của các bạn!</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Intro;
