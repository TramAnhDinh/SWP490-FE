

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import {
    Trash2,
    Plus,
    Edit,
    Car,
    Search,
    Image,
    Palette,
    Settings,
    Eye,
    RefreshCw,
    AlertTriangle
} from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import VehicleModelLinker from "./VehicleModelLinker";

const FormPopup = ({ title, initialData, onSubmit, onClose, isEdit }) => {
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-fade-in">
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Palette className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                            <p className="text-gray-600">Điền thông tin decal mới</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên Decal
                            </label>
                            <input
                                type="text"
                                name="templateName"
                                value={formData.templateName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Nhập tên decal"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Link Hình Ảnh
                            </label>
                            <input
                                type="url"
                                name="imageURL"
                                value={formData.imageURL}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mã Loại Decal
                            </label>
                            <input
                                type="text"
                                name="decalTypeID"
                                value={formData.decalTypeID}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Nhập mã loại decal"
                                required
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                                        Đang lưu...
                                    </>
                                ) : (
                                    <>
                                        <Settings className="w-5 h-5 mr-2" />
                                        Lưu
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const DecalTemplatePage = () => {
    const token = useSelector((state) => state.user?.token);
    const [decals, setDecals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDecalId, setSelectedDecalId] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentEditData, setCurrentEditData] = useState(null);
    const [showVehicleLinker, setShowVehicleLinker] = useState(false);
    const [vehicleTarget, setVehicleTarget] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDecals = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const list = await response.json();

            // Gọi chi tiết từng decal template để lấy vehicleModels
            const detailedDecals = await Promise.all(
                list.map(async (decal) => {
                    try {
                        const detailRes = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates/${decal.templateID}`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        const detail = await detailRes.json();
                        return { ...decal, vehicleModels: detail.vehicleModels || [] };
                    } catch (err) {
                        console.error('Lỗi khi lấy chi tiết decal:', err);
                        return { ...decal, vehicleModels: [] };
                    }
                })
            );

            setDecals(detailedDecals);
        } catch (error) {
            console.error('Error fetching decals:', error);
            toast.error('Lỗi khi tải danh sách decal!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchDecals();
    }, [token]);

    const handleDelete = async (id) => {
        setSelectedDecalId(id);
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates/${selectedDecalId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            toast.success('Xóa decal thành công!');
            fetchDecals();
            setShowConfirmDialog(false);
            setSelectedDecalId(null);
        } catch (error) {
            console.error('Error deleting decal:', error);
            toast.error('Lỗi khi xóa decal!');
        }
    };

    const handleCreateDecal = async (data) => {
        try {
            const response = await fetch('https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success('Tạo decal thành công!');
                fetchDecals();
                setShowCreateForm(false);
            } else {
                const errorText = await response.text();
                toast.error(`Tạo decal thất bại: ${errorText}`);
            }
        } catch (error) {
            console.error('Error creating decal:', error);
            toast.error('Lỗi khi tạo decal!');
        }
    };

    const handleEdit = (decal) => {
        setCurrentEditData(decal);
        setShowEditForm(true);
    };

    const handleUpdateDecal = async (data) => {
        try {
            const response = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates/${data.templateID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success('Cập nhật decal thành công!');
                fetchDecals();
                setShowEditForm(false);
            } else {
                const errorText = await response.text();
                toast.error(`Cập nhật decal thất bại: ${errorText}`);
            }
        } catch (error) {
            console.error('Error updating decal:', error);
            toast.error('Lỗi khi cập nhật decal!');
        }
    };

    const openVehicleLinker = (templateID, templateName) => {
        setVehicleTarget({ templateID, templateName });
        setShowVehicleLinker(true);
    };

    const filteredDecals = decals.filter(decal =>
        decal.templateName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: decals.length,
        withVehicles: decals.filter(decal => decal.vehicleModels && decal.vehicleModels.length > 0).length,
        withoutVehicles: decals.filter(decal => !decal.vehicleModels || decal.vehicleModels.length === 0).length
    };

    const DeleteConfirmDialog = () => {
        if (!showConfirmDialog) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
                    <div className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Xác nhận xóa</h3>
                                <p className="text-gray-600">Bạn có chắc chắn muốn xóa decal này?</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirmDialog(false)}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <ToastContainer position="top-right" autoClose={3000} />
            <DeleteConfirmDialog />

            {showCreateForm && (
                <FormPopup
                    title="Thêm Decal Mới"
                    initialData={{ templateName: '', imageURL: '', decalTypeID: '' }}
                    onSubmit={handleCreateDecal}
                    onClose={() => setShowCreateForm(false)}
                    isEdit={false}
                />
            )}

            {showEditForm && currentEditData && (
                <FormPopup
                    title="Chỉnh Sửa Decal"
                    initialData={currentEditData}
                    onSubmit={handleUpdateDecal}
                    onClose={() => setShowEditForm(false)}
                    isEdit={true}
                />
            )}

            {showVehicleLinker && vehicleTarget && (
                <VehicleModelLinker
                    token={token}
                    templateID={vehicleTarget.templateID}
                    templateName={vehicleTarget.templateName}
                    onClose={() => setShowVehicleLinker(false)}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Quản lý mẫu decal
                            </h1>
                            <p className="text-gray-600">
                                Quản lý tất cả mẫu decal và liên kết với dòng xe
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Thêm Decal</span>
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Tổng mẫu decal</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Palette className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Đã gắn xe</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.withVehicles}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Car className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Chưa gắn xe</p>
                                    <p className="text-3xl font-bold text-orange-600">{stats.withoutVehicles}</p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                    {/* Search */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm decal..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Mã Decal
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Hình ảnh
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Tên Decal
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Loại Decal
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Dòng Xe Gắn
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center">
                                            <div className="flex items-center justify-center">
                                                <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                                                <span className="text-gray-600">Đang tải...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredDecals.length > 0 ? (
                                    filteredDecals.map(decal => (
                                        <tr key={decal.templateID} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900">
                                                    #{decal.templateID}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-24 h-16 rounded-lg overflow-hidden shadow-md">
                                                    <img
                                                        src={decal.imageURL}
                                                        alt={decal.templateName}
                                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/96x64?text=No+Image';
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {decal.templateName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {decal.decalTypeName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {(decal.vehicleModels && decal.vehicleModels.length > 0) ? (
                                                    <div className="space-y-1">
                                                        {decal.vehicleModels.slice(0, 2).map(vm => (
                                                            <span key={vm.vehicleModelID} className="block text-xs text-gray-600">
                                                                {vm.vehicleModelName}
                                                            </span>
                                                        ))}
                                                        {decal.vehicleModels.length > 2 && (
                                                            <span className="text-xs text-blue-600">
                                                                +{decal.vehicleModels.length - 2} xe khác
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 italic text-sm">Chưa gắn</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => handleEdit(decal)}
                                                        className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                        <span className="text-sm">Sửa</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(decal.templateID)}
                                                        className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1"
                                                        title="Xóa"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        <span className="text-sm">Xóa</span>
                                                    </button>
                                                    <button
                                                        onClick={() => openVehicleLinker(decal.templateID, decal.templateName)}
                                                        className="text-green-600 hover:text-green-800 transition-colors flex items-center space-x-1"
                                                        title="Gắn dòng xe"
                                                    >
                                                        <Car className="w-4 h-4" />
                                                        <span className="text-sm">Gắn xe</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="text-gray-500">
                                                <Palette className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                                <p className="text-lg font-medium">Không có decal nào</p>
                                                <p className="text-sm">Thử thay đổi từ khóa tìm kiếm hoặc thêm decal mới</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecalTemplatePage;

