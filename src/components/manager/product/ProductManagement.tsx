import React, { useState, useEffect } from 'react';
import { TbCategory } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import { Switch } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from '../../common/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { deleteProduct, getAllProducts, updateStatusProduct } from '../../../services/product.service';
import { Product } from '../../../models/Product';
import { FaTrademark } from "react-icons/fa";

const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await getAllProducts(keyword, status, page, 10, '', '');
      setProducts(response.data.content);
      setTotalPages(response.data.page.totalPages);
      setLoading(false);
    } catch (error) {
      toast.error('Không thể tải dữ liệu', { autoClose: 3000 });
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number) => {
    try {
      const response = await updateStatusProduct(id);
      if (response) {
        toast.success(response.data.message, { autoClose: 3000 });
        fetchAllProducts(currentPage);
      }
    } catch (error) {
      toast.error('Cập nhật trạng thái thất bại', { autoClose: 3000 });
    }
  };

  useEffect(() => {
    fetchAllProducts(currentPage);
  }, [keyword, currentPage, status]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      text: "Dữ liệu sẽ không thể khôi phục sau khi xóa!",
      icon: 'warning',
      confirmButtonText: 'Xóa',
      confirmButtonColor: '#ff4757',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(id);
        toast.success('Xóa sản phẩm thành công', { autoClose: 3000 });
        fetchAllProducts(currentPage);
      }
    });
  };

  return (
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
        {/* Tiêu đề */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold flex items-center text-blue-800">
            <FaTrademark className='mr-4 text-blue-600' />
            Quản lý Sản Phẩm
          </h1>
        </div>

        {/* Bộ lọc */}
        <div className="bg-white p-6 rounded-lg shadow-xl mb-6">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Bộ lọc và tìm kiếm</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className='flex col-span-1 items-center'>
              <label className="text-gray-700 mb-1 w-52">Tên sản phẩm:</label>
              <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className='flex col-span-1 items-center'>
              <label className="text-gray-700 mb-1 w-52">Trạng thái:</label>
              <select
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="true">Vẫn kinh doanh</option>
                <option value="false">Không kinh doanh</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bảng danh sách */}
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Danh sách sản phẩm</h2>
          <div className="flex justify-end mb-4">
            <Link to="/manager/add-product" className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md hover:bg-gradient-to-l transition duration-300 shadow-lg">
              Thêm sản phẩm
            </Link>
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-4">STT</th>
              <th className="border p-4">Mã sản phẩm</th>
              <th className="border p-4">Tên sản phẩm</th>
              <th className="border p-4">Nhà xuất bản</th>
              <th className="border p-4">Trạng thái</th>
              <th className="border p-4">Hành động</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
                <tr key={product.id} className="bg-white hover:bg-gray-100 transition duration-200">
                  <td className="border p-4 text-center">{(index + 1) + currentPage * 10}</td>
                  <td className="border p-4">{'SP' + product.id}</td>
                  <td className="border p-4">{product.name}</td>
                  <td className="border p-4">{product.brand.name}</td>
                  <td className="border p-4 text-center">
                    <Switch
                        color="primary"
                        checked={product.status}
                        onChange={() => handleStatusChange(product.id)}
                    />
                  </td>
                  <td className="border p-4 text-center">
                    <div className="flex justify-center items-center space-x-3">
                      <CiEdit size={25} className='cursor-pointer text-blue-600 hover:text-blue-800 transition duration-200' onClick={() => navigate(`/manager/update-product/${product.id}`)} />
                      <MdDeleteForever size={25} className='cursor-pointer text-red-600 hover:text-red-800 transition duration-200' onClick={() => handleDelete(product.id)} />
                    </div>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
        <ToastContainer />
      </div>
  );
}

export default ProductManagement;
