import React from 'react';
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { changePassword } from '../../services/profile.service';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

// Schema validation với yup
const schema = yup.object().shape({
  oldPassword: yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
  newPassword: yup
  .string()
  .required('Vui lòng nhập mật khẩu mới')
  .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự')
  .notOneOf([yup.ref('oldPassword')], 'Mật khẩu mới không được giống mật khẩu hiện tại'),
  confirmPassword: yup
  .string()
  .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
  .required('Vui lòng xác nhận mật khẩu')
});

const ChangePassword: React.FC = () => {
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
    try {
      const response = await changePassword(data.oldPassword, data.newPassword, data.confirmPassword);
      toast.success(response.message, { autoClose: 3000 });
    } catch (error) {
      toast.error('Đã xảy ra lỗi, vui lòng thử lại sau', { autoClose: 3000 });
    }
  };

  return (
      <Card
          elevation={6}
          sx={{
            maxWidth: 600,
            mx: 'auto',
            mt: 10,
            p: 4,
            borderRadius: 3,
            backgroundColor: '#fafafa',
          }}
      >
        <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: '#1976d2',
              fontWeight: 600,
              textAlign: 'center',
              textTransform: 'uppercase'
            }}
        >
          Thay đổi mật khẩu
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
          {/* Mật khẩu hiện tại */}
          <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                  <TextField
                      {...field}
                      label="Mật khẩu hiện tại"
                      type={showOldPassword ? 'text' : 'password'}
                      fullWidth
                      error={!!errors.oldPassword}
                      helperText={errors.oldPassword?.message}
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                  edge="end"
                                  onClick={() => setShowOldPassword(!showOldPassword)}
                                  sx={{ borderRadius: '50%' }}
                              >
                                {showOldPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                        )
                      }}
                  />
              )}
          />

          {/* Mật khẩu mới */}
          <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                  <TextField
                      {...field}
                      label="Mật khẩu mới"
                      type={showNewPassword ? 'text' : 'password'}
                      fullWidth
                      error={!!errors.newPassword}
                      helperText={errors.newPassword?.message}
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                  edge="end"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  sx={{ borderRadius: '50%' }}
                              >
                                {showNewPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                        )
                      }}
                  />
              )}
          />

          {/* Xác nhận mật khẩu */}
          <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                  <TextField
                      {...field}
                      label="Xác nhận mật khẩu"
                      type={showConfirmPassword ? 'text' : 'password'}
                      fullWidth
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                  edge="end"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  sx={{ borderRadius: '50%' }}
                              >
                                {showConfirmPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                        )
                      }}
                  />
              )}
          />

          {/* Nút lưu */}
          <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#1565c0'
                }
              }}
          >
            Lưu thay đổi
          </Button>
        </Box>

        <ToastContainer />
      </Card>
  );
};

export default ChangePassword;
