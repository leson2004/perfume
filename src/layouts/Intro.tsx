import React from 'react';

const Intro = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        {/* Phần Tầm nhìn */}
        <section>
          <h2 className="text-xl font-bold text-gray-800">I/ Tầm nhìn</h2>
          <p className="text-gray-600 mt-2">
            Tại DT SHOP, chúng tôi cam kết nâng cao chất lượng trải nghiệm của khách hàng bằng cách đa dạng hóa sản phẩm và đầu tư vào nghiên cứu để mang đến những tư vấn phù hợp nhất với từng nhu cầu cá nhân. Với mục tiêu trở thành một trong những cửa hàng cung cấp nước hoa tốt nhất tại Việt Nam, DT SHOP luôn đặt ra những giá trị cốt lõi cho khách hàng, bao gồm:
          </p>
          <ul className="list-decimal list-inside mt-4 space-y-2 text-gray-600">
            <li><strong>Trải nghiệm hoàn hảo:</strong> Thông qua việc tư vấn, hỗ trợ khách hàng tận tâm và nhanh nhất có thể.</li>
            <li><strong>Sản phẩm chính hãng:</strong> Sản phẩm được DT SHOP nhâp trực tiếp từ công ty và các trang web uy tín nên các bạn có thể yên tâm về nguồn gốc sản phẩm.</li>
          </ul>
        </section>

        {/* Phần Sứ mệnh */}
        <section>
          <h2 className="text-xl font-bold text-gray-800">II/ Sứ mệnh</h2>
          <p className="text-gray-600 mt-2">
            Đặt khách hàng làm trung tâm. Đáp ứng hiệu quả nhất mọi nhu cầu vì lợi ích khách hàng và chất lượng dịch vụ. Đặt nhân sự là yếu tố quyết định và là nền tảng của sự phát triển. Không ngừng đào tạo và xây dựng đội ngũ kế thừa. Chia sẻ các quyền lợi với các thành viên trong công ty, cùng xây dựng và phát triển vì mục tiêu chung của công ty.
          </p>
        </section>

        {/* Phần Cửa hàng */}
        <section>
          <h2 className="text-xl font-bold text-gray-800">III/ Cửa hàng của DT SHOP</h2>
          <div className="text-gray-600 mt-2 space-y-2">
            <p><strong>DT SHOP :</strong> 100 Hoàn Kiếm, Hà Nội, Việt Nam | ĐT: 0123456789</p>
            <p>Hoạt động từ 9h tới 21h hằng ngày và cả 7 ngày trong tuần. Rất vui được đón tiếp các bạn.</p>
            <p>Xin cảm ơn các bạn đã tin tưởng và ủng hộ DT SHOP.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Intro;