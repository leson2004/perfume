import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Switch,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { createAccount, getAccountById, updateAccount } from "../../../services/account.service";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../models/User";
import { getUserPrimaryAddress } from "../../../services/address.service";

const UpdateUser: React.FC = () => {
    const navigate = useNavigate();
    const param = useParams();
    const [account, setAccount] = useState<User | null>(null);
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await updateAccount(Number(param.id), name, username, email, phoneNumber, account?.enabled || false);
            if (response) {
                toast.success(response.message, { autoClose: 3000 });
                fetchUser();
            }
        } catch (error) {
            toast.error("Cập nhật tài khoản thất bại, vui lòng kiểm tra lại thông tin", { autoClose: 3000 });
        }
    }

    const fetchUser = async () => {
        try {
            const response = await getAccountById(Number(param.id));
            if (!response) throw new Error("User not found");
            setAccount(response);
            setName(response.name);
            setUsername(response.username);
            setEmail(response.email);
            setPhoneNumber(response.phoneNumber);
            const primaryAddress = await getUserPrimaryAddress(response.username);
            setAddress(primaryAddress?.data ? `${primaryAddress.data.province} - ${primaryAddress.data.district} - ${primaryAddress.data.ward} - ${primaryAddress.data.street}` : "Chưa cập nhật");
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Box borderRadius={2} p={3} boxShadow={3} bgcolor="#f9f9f9">
            <Typography variant="h4" textAlign="center" mb={4} fontWeight="bold" color="#1976d2">
                CHỈNH SỬA THÔNG TIN TÀI KHOẢN
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box component="form">
                        <Grid container spacing={3}>
                            {/* Basic Information */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Tên hiển thị"
                                    name="name"
                                    fullWidth
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    variant="outlined"
                                    sx={{ bgcolor: "white" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Tên đăng nhập"
                                    name="username"
                                    fullWidth
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    variant="outlined"
                                    sx={{ bgcolor: "white" }}
                                />
                            </Grid>

                            {/* Contact Information */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                    sx={{ bgcolor: "white" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    fullWidth
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    variant="outlined"
                                    sx={{ bgcolor: "white" }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Địa chỉ"
                                    name="address"
                                    fullWidth
                                    required
                                    value={address}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                    sx={{ bgcolor: "white" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label>
                                    Chặn tài khoản
                                </label>
                                <Switch
                                    checked={!account?.enabled}
                                    onChange={(e) => {
                                        if (account) {
                                            setAccount({ ...account, enabled: !e.target.checked });
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Box mt={4} display="flex" justifyContent="flex-end">
                            <Button variant="outlined" color="secondary" sx={{ marginX: 2 }} onClick={() => navigate("/manager/user-management")}>
                                Quay lại
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Cập nhật
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <ToastContainer />
        </Box>
    );
};

export default UpdateUser;
