import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Order } from "../../../models/Order";
import { deleteOrder, getOrdersByStatus, getOrderStatuses } from "../../../services/order.service";
import { format } from "date-fns";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "../../common/Pagination";
import { Statuses } from "../../../models/response/Statuses";

const OrderManagement: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [statuses, setStatuses] = useState<Statuses[]>([]);

  const fetchAllOrders = async (page: number) => {
    const response = await getOrdersByStatus(keyword, page, 10, '', '', selectedStatus, startDate, endDate);
    setOrders(response.data.content);
    setTotalPages(response.data.page.totalPages);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa đơn này?',
      text: "Dữ liệu sẽ không thể khôi phục sau khi xóa!",
      icon: 'warning',
      confirmButtonText: 'Xóa',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (id !== undefined) {
          const response = await deleteOrder(id);
          if (response.status === 200) {
            fetchAllOrders(currentPage);
            toast.success('Xóa đơn thành công', {
              autoClose: 3000,
            });
          }
        }
      }
    });
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      const response = await getOrderStatuses();
      setStatuses(response);
    };

    fetchStatuses();
  }, []);

  const handleStatusClick = (value: string) => {
    setSelectedStatus(value);
  };

  useEffect(() => {
    fetchAllOrders(currentPage);
  }, [selectedStatus, currentPage]);

  // ✅ Hàm export Excel
  const exportToExcel = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/orders/export/excel", {
        method: "GET",
        headers: {
          Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "orders.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Xuất Excel thất bại!");
      console.error("Export error", error);
    }
  };

  return (
      <Box sx={{ padding: 4 }}>
        <Typography
            className="text-blue-600 font-semibold"
            variant="h5"
            sx={{ mb: 3 }}
        >
          🧾 Danh sách đơn hàng
        </Typography>

        {/* Status Tabs */}
        <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {statuses.map((status, index) => (
              <Chip
                  key={index}
                  label={`${status.label}${status.count !== null ? ` (${status.count})` : ""}`}
                  color={selectedStatus === status.value ? "primary" : "default"}
                  onClick={() => handleStatusClick(status.value)}
                  clickable
                  sx={{
                    fontWeight: 600,
                    backgroundColor: selectedStatus === status.value ? "rgba(59, 130, 246, 0.15)" : "white",
                    border: "1px solid #e0e0e0",
                    boxShadow: selectedStatus === status.value ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
                  }}
              />
          ))}
        </Box>

        {/* Action Buttons */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
              variant="outlined"
              color="success"
              onClick={exportToExcel}
              className="text-sm px-4 py-2 rounded-md hover:shadow-md transition duration-300"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                borderColor: "#4caf50",
                color: "#4caf50",
              }}
          >
            📤 Xuất Excel
          </Button>

          <Button
              variant="contained"
              onClick={() => navigate("/manager/sales-counter")}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                background: "linear-gradient(to right, #38b2ac, #4299e1)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(to left, #38b2ac, #4299e1)",
                },
              }}
          >
            + Tạo đơn
          </Button>
        </Box>

        {/* Table Container */}
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                {[
                  "STT",
                  "Mã đơn hàng",
                  "Tên khách hàng",
                  "Tên nhân viên",
                  "Hình thức",
                  "Ngày tạo",
                  "Tiền giảm",
                  "Tổng tiền",
                  "Thanh toán",
                  "Trạng thái",
                  "Thao tác",
                ].map((header, idx) => (
                    <TableCell
                        key={idx}
                        align="center"
                        sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {header}
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.length > 0 ? (
                  orders.map((order, index) => (
                      <TableRow key={order.id} hover sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
                        <TableCell align="center">{index + 1 + currentPage * 10}</TableCell>
                        <TableCell align="center">HD{order.id}</TableCell>
                        <TableCell align="center">{order.user?.name}</TableCell>
                        <TableCell align="center">{order.staff?.name}</TableCell>
                        <TableCell align="center">
                          <Chip
                              label={
                                order.orderType === "POS"
                                    ? "Tại quầy"
                                    : order.orderType === "ONLINE"
                                        ? "Trực tuyến"
                                        : "Giao hàng"
                              }
                              color={
                                order.orderType === "POS"
                                    ? "primary"
                                    : order.orderType === "ONLINE"
                                        ? "secondary"
                                        : "success"
                              }
                              size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm:ss")}
                        </TableCell>
                        <TableCell align="center">
                          {order.discountAmount?.toLocaleString()}₫
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontWeight={600} color="error">
                            {order.totalPrice.toLocaleString()}₫
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                              label={
                                order.paymentType === "CASH"
                                    ? "Tiền mặt"
                                    : order.paymentType === "TRANSFER"
                                        ? "Chuyển khoản"
                                        : "Thanh toán khi nhận"
                              }
                              color={
                                order.paymentType === "CASH"
                                    ? "primary"
                                    : order.paymentType === "TRANSFER"
                                        ? "secondary"
                                        : "default"
                              }
                              size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                              label={order.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                              color={order.paid ? "success" : "error"}
                              size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                              variant="text"
                              size="small"
                              onClick={() => navigate(`/manager/order-details/${order.id}`)}
                              sx={{ color: "#1976d2", minWidth: "auto" }}
                          >
                            <CiEdit size={22} />
                          </Button>
                        </TableCell>
                      </TableRow>
                  ))
              ) : (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      <Typography variant="body1" sx={{ py: 4, color: "gray" }}>
                        Không có dữ liệu phù hợp
                      </Typography>
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
          <ToastContainer />
        </TableContainer>

        <Box mt={3}>
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </Box>
      </Box>
  );
};

export default OrderManagement;
