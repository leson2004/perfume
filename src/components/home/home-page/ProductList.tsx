import React, { useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Variant } from "../../../models/Variant";
import { getAllProductVariantDefaults } from "../../../services/product.service";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../services/cart.service";
import { toast, ToastContainer } from "react-toastify";
import ProductDialog from "../product-page/ProductDialog";
import { useCart } from "../../../contexts/CartContext";
import { isAuthenticated } from "../../../services/auth.service";
import Swal from "sweetalert2";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Variant[]>([]);
  const [isOpenProductDialog, setOpenProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { addItemToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const getAllProductVariant = async () => {
    try {
      setIsLoading(true);
      const response = await getAllProductVariantDefaults("", 0, 8, "", "");
      setProducts(response.data.content);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Không thể tải danh sách sản phẩm.");
      setIsLoading(false);
    }
  };

  const addProductToCart = async (productVariantId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated()) {
      const response = await addToCart(productVariantId, 1);
      if (response) {
        await addItemToCart();
        toast.success("Thêm vào giỏ hàng thành công");
      }
    } else {
      handleCloseProductDialog();
      Swal.fire({
        title: "Vui lòng đăng nhập",
        text: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const handleOpenProductDialog = (product: Variant, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setOpenProductDialog(true);
  };

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
  };

  useEffect(() => {
    getAllProductVariant();
  }, []);

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent relative">
            SẢN PHẨM MỚI
            <span className="absolute -bottom-2 left-0 h-1 w-28 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 font-semibold hover:text-purple-600 flex items-center"
            onClick={() => navigate("/product-page")}
          >
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8, rotateX: 5, rotateY: 5 }}
              className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden group border border-gray-100 hover:border-blue-400 transition-all"
              onClick={() => navigate(`/product-detail/${product.id}`)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/files/preview/${product.imageAvatar}`}
                  alt={product.product.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.discountRate > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    -{product.discountRate}%
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col justify-between min-h-[160px]">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {product.product.name}
                </h3>
                <div className="mt-3 text-right">
                  {product.discountRate > 0 ? (
                    <>
                      <span className="block text-gray-400 line-through text-sm">
                        {product.price.toLocaleString()} VNĐ
                      </span>
                      <span className="block text-red-600 font-bold text-xl">
                        {product.priceAfterDiscount.toLocaleString()} VNĐ
                      </span>
                    </>
                  ) : (
                    <span className="block text-gray-800 font-bold text-xl">
                      {product.price.toLocaleString()} VNĐ
                    </span>
                  )}
                </div>
              </div>

              {/* Floating Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl"
                  onClick={(e) => addProductToCart(product.id, e)}
                >
                  <FaCartPlus size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl"
                  onClick={(e) => handleOpenProductDialog(product, e)}
                >
                  <CgDetailsMore size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ProductDialog */}
      {selectedProduct && (
        <ProductDialog
          isOpen={isOpenProductDialog}
          onClose={handleCloseProductDialog}
          handleCloseProductDialog={handleCloseProductDialog}
          product={selectedProduct}
          setProduct={setSelectedProduct}
        />
      )}
      <ToastContainer position="bottom-right" />
    </section>
  );
};

export default ProductList;
