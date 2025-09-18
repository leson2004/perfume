import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Select,
    MenuItem,
    Avatar,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import axios from "axios";
import { createStaff } from "../../../services/staff.service";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { differenceInYears } from 'date-fns';

// Schema for validation
const schema = yup.object().shape({
    name: yup.string().required("Tên hiển thị không được để trống"),
    username: yup.string()
        .required("Tên đăng nhập không được để trống")
        .min(5, "Tên đăng nhập phải nhiều hơn 5 kí tự"),
    password: yup.string()
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải nhiều hơn 6 kí tự"),
    rePassword: yup.string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([yup.ref('password')], "Mật khẩu không khớp"),
    email: yup.string()
        .required("Email không được để trống")
        .email("Email không đúng định dạng"),
    staffName: yup.string().required("Tên nhân viên không được để trống"),
    staffPhoneNumber: yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .min(10, "Số điện thoại phải có ít nhất 10 số"),
    staffDob: yup
        .string().required("Ngày sinh không được để trống")
        .test(
            'is-18',
            'Nhân viên phải đủ 18 tuổi trở lên',
            (value) => !!value && differenceInYears(new Date(), new Date(value)) >= 18
        ),
    staffGender: yup.string().required("Giới tính phải chọn"),
    staffCccd: yup.string()
        .required("Số CCCD không được để trống")
        .matches(/^[0-9]+$/, "CCCD chỉ được chứa số")
        .length(12, "CCCD phải có 12 số"),
}).required();

const CreateStaff: React.FC = () => {
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState<{ name: string; code: number }[]>([]);
    const [districts, setDistricts] = useState<{ name: string; code: number }[]>([]);
    const [wards, setWards] = useState<{ name: string; code: number }[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
    const [selectedWard, setSelectedWard] = useState<number | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [staffImage, setStaffImage] = useState<File | null>(null);

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            username: '',
            password: '',
            rePassword: '',
            email: '',
            staffName: '',
            staffPhoneNumber: '',
            staffDob: '',
            staffGender: '',
            staffCccd: '',
        },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    // Fetch provinces on mount
    useEffect(() => {
        axios
            .get("https://provinces.open-api.vn/api/p/")
            .then((response) => {
                const formattedProvinces = response.data.map((province: any) => ({
                    name: province.name,
                    code: province.code,
                }));
                setProvinces(formattedProvinces);
            })
            .catch((error) => console.error("Error fetching provinces:", error));
    }, []);

    // Handle province change
    const handleProvinceChange = (e: SelectChangeEvent<number>) => {
        const provinceCode = e.target.value as number;
        setSelectedProvince(provinceCode);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setDistricts([]);
        setWards([]);

        axios
            .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
            .then((response) => {
                const formattedDistricts = response.data.districts.map((district: any) => ({
                    name: district.name,
                    code: district.code,
                }));
                setDistricts(formattedDistricts);
            })
            .catch((error) => console.error("Error fetching districts:", error));
    };

    // Handle district change
    const handleDistrictChange = (e: SelectChangeEvent<number>) => {
        const districtCode = e.target.value as number;
        setSelectedDistrict(districtCode);
        setSelectedWard(null);
        setWards([]);

        axios
            .get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
            .then((response) => {
                const formattedWards = response.data.wards.map((ward: any) => ({
                    name: ward.name,
                    code: ward.code,
                }));
                setWards(formattedWards);
            })
            .catch((error) => console.error("Error fetching wards:", error));
    };

    const handleWardChange = (e: SelectChangeEvent<number>) => {
        const wardCode = e.target.value as number;
        setSelectedWard(wardCode);
    };

    // Handle form submission
    const onSubmit = async (data: any) => {
        const staffAccountSignup = {
            ...data,
            staffImage
        };

        try {
            const response = await createStaff(staffAccountSignup);
            if (response) {
                toast.success("Thêm mới nhân viên thành công");
                // Reset form fields
                setSelectedProvince(null);
                setSelectedDistrict(null);
                setSelectedWard(null);
                setStaffImage(null);
                setPreviewUrl(null);
            }
        } catch (error) {
            console.error("Error creating staff:", error);
            toast.error("Không thể thêm mới nhân viên, vui lòng kiểm tra lại thông tin");
        }
    };

    return (
        <Box borderRadius={2} p={3} boxShadow={3} bgcolor="#f5f5f5">
            <Typography variant="h4" textAlign="center" mb={4} fontWeight="bold" color="#1976d2">
                THÊM MỚI NHÂN VIÊN
            </Typography>
            <Grid container spacing={2}>
                {/* Avatar */}
                <Grid item xs={12} sm={3}>
                    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                        <Button variant="contained" component="label" sx={{ width: 130, height: 130, borderRadius: '100%', overflow: 'hidden' }}>
                            <Avatar
                                src={previewUrl || "/default-avatar.png"}
                                alt="Avatar"
                                sx={{ width: 130, height: 130 }}
                            />
                            <input
                                hidden
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        setStaffImage(file);
                                        const fileUrl = URL.createObjectURL(file);
                                        setPreviewUrl(fileUrl);
                                    }
                                }}
                                required
                            />
                        </Button>
                    </Box>
                </Grid>

                {/* Form Fields */}
                <Grid item xs={12} sm={8}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            {/* Basic Information */}
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="staffName"
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            label="Tên nhân viên"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.staffName)}
                                            helperText={errors.staffName?.message}
                                            variant="outlined"
                                            sx={{ bgcolor: "white" }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            label="Tên hiển thị"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.name)}
                                            helperText={errors.name?.message}
                                            variant="outlined"
                                            sx={{ bgcolor: "white" }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="username"
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            label="Tên đăng nhập"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.username)}
                                            helperText={errors.username?.message}
                                            variant="outlined"
                                            sx={{ bgcolor: "white" }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            label="Mật khẩu"
                                            type="password"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.password)}
                                            helperText={errors.password?.message}
                                            variant="outlined"
                                            sx={{ bgcolor: "white" }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="rePassword"
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            label="Nhập lại mật khẩu"
                                            type="password"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.rePassword)}
                                            helperText={errors.rePassword?.message}
                                            variant="outlined"
                                            sx={{ bgcolor: "white" }}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Contact Information */}
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.email)}
                                            helperText={errors.email?.message}
                                            variant="outlined"
                                            sx={{ bgcolor: "white" }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="staffPhoneNumber"
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            label="Số điện thoại"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.staffPhoneNumber)}
                                            helperText={errors.staffPhoneNumber?.message}
                                            variant="outlined"
                                            sx={{ bgcolor: "white" }}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Additional Information */}
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="staffDob"
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            label="Ngày sinh"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={value || ''}
                                            onChange={onChange}
                                            error={Boolean(errors.staffDob)}
                                            helperText={errors.staffDob?.message}
                                            variant="outlined"
                                            sx={{ bgcolor: "white" }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="staffCccd"
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            label="Số CCCD"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.staffCccd)}
                                            helperText={errors.staffCccd?.message}
                                            variant="outlined"
                                            sx={{ bgcolor: "white" }}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Gender */}
                            <Grid item xs={12} sm={6}>
                                <FormControl component="fieldset" fullWidth error={Boolean(errors.staffGender)}>
                                    <Typography component="legend">Giới tính</Typography>
                                    <Controller
                                        control={control}
                                        name="staffGender"
                                        render={({ field: { onChange, value } }) => (
                                            <RadioGroup
                                                row
                                                value={value}
                                                onChange={onChange}
                                                sx={{ justifyContent: "center" }}
                                            >
                                                <FormControlLabel
                                                    value="MALE"
                                                    control={<Radio />}
                                                    label="Nam"
                                                />
                                                <FormControlLabel
                                                    value="FEMALE"
                                                    control={<Radio />}
                                                    label="Nữ"
                                                />
                                            </RadioGroup>
                                        )}
                                    />
                                    {errors.staffGender && (
                                        <Typography color="error" variant="caption">
                                            {errors.staffGender.message}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            {/* Location */}
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Tỉnh/Thành phố</InputLabel>
                                    <Select
                                        value={selectedProvince || ""}
                                        onChange={handleProvinceChange}
                                    >
                                        {provinces.map((province) => (
                                            <MenuItem key={province.code} value={province.code}>
                                                {province.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Quận/Huyện</InputLabel>
                                    <Select
                                        value={selectedDistrict || ""}
                                        onChange={handleDistrictChange}
                                        disabled={!selectedProvince}
                                    >
                                        {districts.map((district) => (
                                            <MenuItem key={district.code} value={district.code}>
                                                {district.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Phường/Xã</InputLabel>
                                    <Select
                                        value={selectedWard || ""}
                                        onChange={handleWardChange}
                                        disabled={!selectedDistrict}
                                    >
                                        {wards.map((ward) => (
                                            <MenuItem key={ward.code} value={ward.code}>
                                                {ward.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Box mt={4} display="flex" justifyContent="space-between">
                            <Button variant="outlined" color="secondary" sx={{ marginX: 2 }} onClick={() => navigate("/manager/staff-management")}>
                                Quay lại
                            </Button>
                            <Button variant="contained" color="success" type="submit">
                                Tạo mới
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <ToastContainer />
        </Box>
    );
};

export default CreateStaff;
