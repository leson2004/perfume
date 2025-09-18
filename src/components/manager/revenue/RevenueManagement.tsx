import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography, Grid, Card, Button } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getDailyStatistics } from '../../../services/order.service';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Thống kê Doanh thu và Đơn hàng',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const RevenueManagement: React.FC = () => {
    const [revenueData, setRevenueData] = useState<any>(null);
    const [orderData, setOrderData] = useState<any>(null);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const fetchRevenueData = async () => {
        try {
            const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
            const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : '';

            const response = await getDailyStatistics(formattedStartDate, formattedEndDate);
            console.log('Response:', response.data);

            setRevenueData({
                labels: response.data.labels,
                datasets: [
                    {
                        label: 'Doanh thu',
                        data: response.data.revenue,
                        borderColor: '#8884d8',
                        backgroundColor: 'rgba(136, 132, 216, 0.2)',
                        fill: true,
                    },
                ],
            });

            setOrderData({
                labels: response.data.labels,
                datasets: [
                    {
                        label: 'Số lượng đơn hàng',
                        data: response.data.orders,
                        borderColor: '#82ca9d',
                        backgroundColor: 'rgba(130, 202, 157, 0.2)',
                        fill: true,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching revenue data:', error);
        }
    };

    const handleFetchData = () => {
        fetchRevenueData();
    };

    useEffect(() => {
        fetchRevenueData();
    }, []);

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: "#2c3e50" }}>
                📊 Quản lý Doanh Thu và Đơn Hàng
            </Typography>

            {/* Bộ lọc thời gian */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Từ ngày"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            sx={{ width: "100%" }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Đến ngày"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            sx={{ width: "100%" }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleFetchData}
                        sx={{
                            height: "56px",
                            background: "linear-gradient(to right, #1976d2, #42a5f5)",
                            fontWeight: 600,
                            color: "white",
                            "&:hover": {
                                background: "linear-gradient(to left, #1976d2, #42a5f5)",
                            },
                        }}
                    >
                        📈 Xem thống kê
                    </Button>
                </Grid>
            </Grid>

            {/* Tổng quan */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            p: 3,
                            textAlign: "center",
                            backgroundColor: "#e3f2fd",
                            borderRadius: 3,
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ color: "#555", mb: 1 }}>
                            Tổng doanh thu
                        </Typography>
                        <Typography variant="h5" color="primary" fontWeight={600}>
                            {revenueData
                                ? revenueData.datasets[0].data
                            .reduce((a: number, b: number) => a + b, 0)
                            .toLocaleString() + " VNĐ"
                                : "0 VNĐ"}
                        </Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            p: 3,
                            textAlign: "center",
                            backgroundColor: "#e8f5e9",
                            borderRadius: 3,
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ color: "#555", mb: 1 }}>
                            Tổng số đơn hàng thành công
                        </Typography>
                        <Typography variant="h5" color="primary" fontWeight={600}>
                            {orderData
                                ? orderData.datasets[0].data
                            .reduce((a: number, b: number) => a + b, 0)
                            .toLocaleString() + " đơn"
                                : "0 đơn"}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

            {/* Biểu đồ */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            p: 3,
                            backgroundColor: "#ffffff",
                            borderRadius: 3,
                            boxShadow: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                            📅 Doanh thu theo thời gian
                        </Typography>
                        {revenueData && <Line data={revenueData} options={options} />}
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            p: 3,
                            backgroundColor: "#ffffff",
                            borderRadius: 3,
                            boxShadow: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                            🛒 Số lượng đơn hàng theo thời gian
                        </Typography>
                        {orderData && <Line data={orderData} options={options} />}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RevenueManagement;
