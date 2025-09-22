import React from "react";
import { TextField, Button } from "@mui/material";

const Contact: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-xl grid md:grid-cols-2 gap-10">
      {/* Thông tin liên hệ */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-wide">
          THÔNG TIN LIÊN HỆ
        </h2>
        <p className="text-gray-600 leading-relaxed">
          <span className="font-semibold text-gray-800">DT SHOP</span> luôn sẵn
          sàng phục vụ quý khách với những bộ sách được nhiều khách hàng tại Việt Nam tin tưởng và lựa chọn.
        </p>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
              A
            </div>
            <span>Ha Noi, Viet Nam</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
              P
            </div>
            <a href="tel:0123456789" className="hover:underline">
              0123456789
            </a>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
              E
            </div>
            <a href="mailto:abc@gmail.com" className="hover:underline">
              abc@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Form gửi thông tin */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">GỬI THÔNG TIN</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Vui lòng điền nội dung tin nhắn bên dưới. Chúng tôi sẽ phản hồi sớm
          nhất có thể.
        </p>
        <form className="space-y-4">
          <TextField
            fullWidth
            label="Tên đầy đủ"
            placeholder="VD: Quốc Trung"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Email"
            placeholder="VD: email@domain.com"
            type="email"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Điện thoại"
            placeholder="0912******"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Nội dung"
            placeholder="Nhập nội dung tại đây"
            multiline
            rows={4}
            variant="outlined"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "0.75rem",
              background: "linear-gradient(to right, #2563eb, #1e40af)",
              "&:hover": {
                background: "linear-gradient(to right, #1d4ed8, #1e3a8a)",
              },
            }}
          >
            Gửi tin nhắn
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
