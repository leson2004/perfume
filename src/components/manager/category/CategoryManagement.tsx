import React, { ChangeEvent, useEffect, useState } from 'react';
import { TbCategory } from "react-icons/tb";
import { Category } from '../../../models/Category';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../../../services/category.service';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, TextField, CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from '../../common/Pagination';
import 'react-toastify/dist/ReactToastify.css';

const CategoryManagement: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState('');
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newCategoryUpdate, setNewCategoryUpdate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewCategory('');
    };

    const handleSave = async () => {
        try {
            const response = await createCategory(newCategory);
            setCategories((prev) => [...prev, response.data]);
            toast.success('Thêm thể loại thành công');
            handleClose();
        } catch (error) {
            console.error('Lỗi khi tạo thể loại:', error);
            toast.error('Thêm thể loại thất bại');
        }
    };

    const fetchAllCategories = async (page: number) => {
        setLoading(true);
        try {
            const response = await getAllCategories(keyword, status, page, 10, '', '');
            setCategories(response.data.content);
            setTotalPages(response.data.page.totalPages);
        } catch (error) {
            setError('Không thể tải dữ liệu');
            toast.error('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const getCategory = async (id: number) => {
        try {
            const response = await getCategoryById(id);
            setSelectedCategory(response.data);
            setNewCategoryUpdate(response.data.name);
        } catch (error) {
            console.error('Lỗi khi lấy thể loại theo id:', error);
        }
    };

    const handleShow = (id: number) => {
        setOpenEdit(true);
        getCategory(id);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setNewCategoryUpdate('');
        setSelectedCategory(null); // Reset selected category
    };

    const handleSaveEdit = async () => {
        if (!selectedCategory) return;
        try {
            await updateCategory(selectedCategory.id, newCategoryUpdate, selectedCategory.status);
            fetchAllCategories(currentPage);
            toast.success('Chỉnh sửa thể loại thành công');
            handleCloseEdit();
        } catch (error) {
            console.error('Lỗi khi cập nhật thể loại:', error);
            toast.error('Chỉnh sửa thể loại thất bại');
        }
    };

    const handleStatusChange = async (id: number, name: string, status: boolean) => {
        try {
            await updateCategory(id, name, status);
            toast.success('Cập nhật trạng thái thành công');
            fetchAllCategories(currentPage);
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái thể loại:', error);
            toast.error('Cập nhật trạng thái thất bại');
        }
    };

    useEffect(() => {
        fetchAllCategories(currentPage);
    }, [keyword, currentPage, status]);

    const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa thể loại này?',
            text: "Dữ liệu sẽ không thể khôi phục sau khi xóa!",
            icon: 'warning',
            confirmButtonText: 'Xóa',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteCategory(id);
                    fetchAllCategories(currentPage);
                    Swal.fire('Đã xóa!', 'Thể loại đã được xóa.', 'success');
                } catch (error) {
                    toast.error("Không thể xóa thể loại");
                }
            }
        });
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-white">
            <div className="mb-4">
                <h1 className="text-4xl font-bold flex items-center text-blue-600">
                    <TbCategory className='mr-4 text-blue-700' />
                    Quản lý thể loại
                </h1>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4">Bộ lọc và tìm kiếm</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className='flex col-span-1 items-center'>
                        <label className="text-gray-700 mb-1 w-28">Tên thể loại:</label>
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={keyword}
                            onChange={handleKeywordChange}
                        />
                    </div>
                    <div className='flex col-span-1 items-center'>
                        <label className="text-gray-700 mb-1 w-52">Trạng thái:</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Danh sách thể loại</h2>
                <div className="flex justify-end mb-4">
                    <button onClick={handleOpen} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md hover:bg-gradient-to-l transition duration-300 shadow-lg">
                        Thêm thể loại
                    </button>
                </div>

                {/* Hiển thị loading */}
                {loading ? (
                    <div className="flex justify-center">
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        {/* Modal thêm thể loại */}
                        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                            <DialogTitle>Thêm thể loại mới</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Tên thể loại"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">Hủy</Button>
                                <Button onClick={handleSave} color="primary" variant="contained">Thêm</Button>
                            </DialogActions>
                        </Dialog>

                        {/* Modal chỉnh sửa thể loại */}
                        <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="xs" fullWidth>
                            <DialogTitle>Chỉnh sửa thể loại</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Tên thể loại"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={newCategoryUpdate}
                                    onChange={(e) => setNewCategoryUpdate(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseEdit} color="secondary">Hủy</Button>
                                <Button onClick={handleSaveEdit} color="primary" variant="contained">Chỉnh sửa</Button>
                            </DialogActions>
                        </Dialog>

                        <table className="w-full table-auto border-collapse mt-4">
                            <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border p-4">STT</th>
                                <th className="border p-4">Tên Thể Loại</th>
                                <th className="border p-4">Trạng Thái</th>
                                <th className="border p-4">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map((category, index) => (
                                <tr key={category.id} className="bg-white hover:bg-gray-100 transition duration-200">
                                    <td className="border p-4 text-center">{(index + 1) + (currentPage * 10)}</td>
                                    <td className="border p-4">{category.name}</td>
                                    <td className="border p-4 text-center">
                                        <Switch
                                            color="primary"
                                            checked={category.status}
                                            onChange={() => handleStatusChange(category.id, category.name, !category.status)}
                                        />
                                    </td>
                                    <td className="border p-4 text-center">
                                        <div className="flex justify-center items-center space-x-3">
                                            <CiEdit size={25} className='cursor-pointer text-blue-600 hover:text-blue-800' onClick={() => handleShow(category.id)} />
                                            <MdDeleteForever size={25} className='cursor-pointer text-red-600 hover:text-red-800' onClick={() => handleDelete(category.id)} />
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
                    </>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default CategoryManagement;
