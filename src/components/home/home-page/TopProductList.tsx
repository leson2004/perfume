import React, { useEffect, useState } from "react";
import DiscountLabel from "../../common/DiscountLabel";
import { CgDetailsMore } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa6";
import { Variant } from "../../../models/Variant";
import { getTopSellingProducts } from "../../../services/product.service";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../services/cart.service";
import { toast, ToastContainer } from "react-toastify";
import ProductDialog from "../product-page/ProductDialog";
import { useCart } from "../../../contexts/CartContext";
import { isAuthenticated } from "../../../services/auth.service";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const TopProductList: React.FC = () => {
  const [products, setProducts] = useState<Variant[]>([]);
  const [isOpenProductDialog, setOpenProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { addItemToCart } = useCart();
  const navigate = useNavigate();

  const getAllProductVariant = async () => {
    try {
      const response = await getTopSellingProducts();
      setProducts(response.data);
    } catch (err) {
      console.error("Lỗi:", err);
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
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-14"
        >
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
            SẢN PHẨM BÁN CHẠY
          </h2>
          <span className="mt-3 h-1 w-32 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full"></span>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10, rotateX: 4, rotateY: 4 }}
              className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 hover:border-orange-400 transition-all group overflow-hidden"
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
                      <span className="block text-orange-600 font-bold text-xl">
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

              {/* Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl"
                  onClick={(e) => addProductToCart(product.id, e)}
                >
                  <FaCartPlus size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl"
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

export default TopProductList;
