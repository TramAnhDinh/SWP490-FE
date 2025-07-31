import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Users,
    Calendar,
    Edit,
    Save,
    X,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    Globe,
    Clock,
    FileText,
    Settings
} from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const StoreDetailPage = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.user?.token);
    const navigate = useNavigate();

    const [store, setStore] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedStoreName, setEditedStoreName] = useState("");
    const [editedAddress, setEditedAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchStoreDetail = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://decalxeapi-production.up.railway.app/api/Stores/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Không thể tải chi tiết cửa hàng!');
            }

            const data = await response.json();
            console.log('Fetched store:', data);
            setStore(data);
            setEditedStoreName(data.storeName);
            setEditedAddress(data.address || "");
        } catch (error) {
            console.error('Error fetching store detail:', error);
            toast.error('Lỗi khi tải chi tiết cửa hàng!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchStoreDetail();
        }
    }, [token, id]);

    const handleSave = async () => {
        if (!editedStoreName) {
            toast.error('Vui lòng nhập tên cửa hàng!');
            return;
        }

        const payload = {
            storeID: store.storeID,
            storeName: editedStoreName,
            address: editedAddress
        };

        console.log('Sending payload:', payload);

        try {
            const response = await fetch(`https://decalxeapi-production.up.railway.app/api/Stores/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Cập nhật thất bại!');
            }

            toast.success('Cập nhật cửa hàng thành công!');
            setIsEditing(false);
            fetchStoreDetail();
        } catch (error) {
            console.error('Error updating store:', error);
            toast.error('Lỗi khi cập nhật cửa hàng!');
        }
    };

    const getStoreStatus = () => {
        // Giả sử tất cả cửa hàng đều hoạt động
        return { active: true, status: "Hoạt động", color: "text-green-600" };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Đang tải thông tin cửa hàng...</p>
                </div>
            </div>
        );
    }

    if (!store) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy cửa hàng</h2>
                    <p className="text-gray-600 mb-4">Cửa hàng này có thể đã bị xóa hoặc không tồn tại</p>
                    <button
                        onClick={() => navigate('/store')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        );
    }

    const storeStatus = getStoreStatus();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/store')}
                                className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Chi tiết cửa hàng
                                </h1>
                                <p className="text-gray-600">
                                    Quản lý thông tin chi tiết của cửa hàng #{store.storeID}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                                >
                                    <Edit className="w-5 h-5" />
                                    <span>Chỉnh sửa</span>
                                </button>
                            ) : (
                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center space-x-2"
                                    >
                                        <Save className="w-5 h-5" />
                                        <span>Lưu</span>
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-200 flex items-center space-x-2"
                                    >
                                        <X className="w-5 h-5" />
                                        <span>Hủy</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                                    <Building2 className="w-8 h-8 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {store.storeName}
                                    </h2>
                                    <p className="text-gray-600">Cửa hàng #{store.storeID}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Store Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tên cửa hàng
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedStoreName}
                                            onChange={(e) => setEditedStoreName(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Nhập tên cửa hàng"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                                            <span className="text-gray-900 font-medium">{store.storeName}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Địa chỉ
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={editedAddress}
                                            onChange={(e) => setEditedAddress(e.target.value)}
                                            rows="3"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="Nhập địa chỉ cửa hàng"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                                            <span className="text-gray-900">
                                                {store.address || "Chưa cập nhật địa chỉ"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Trạng thái
                                    </label>
                                    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <span className={`font-medium ${storeStatus.color}`}>
                                                {storeStatus.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Store Details */}
                        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                                <Settings className="w-6 h-6 text-blue-600" />
                                <span>Thông tin chi tiết</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Địa chỉ</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {store.address || "Chưa cập nhật"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Số điện thoại</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                Chưa cập nhật
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                Chưa cập nhật
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <Users className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Nhân viên</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                0 người
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Store Stats */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                                <Building2 className="w-5 h-5 text-blue-600" />
                                <span>Thống kê cửa hàng</span>
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Mã cửa hàng</span>
                                    <span className="text-sm font-medium text-gray-900">#{store.storeID}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Trạng thái</span>
                                    <span className="text-sm font-medium text-green-600">Hoạt động</span>
                                </div>
                                {/* <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Ngày tạo</span>
                                    <span className="text-sm font-medium text-gray-900">N/A</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Lần cập nhật</span>
                                    <span className="text-sm font-medium text-gray-900">N/A</span>
                                </div> */}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/store')}
                                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <span className="text-sm text-gray-700">Quay lại danh sách</span>
                                    <ArrowLeft className="w-4 h-4 text-gray-500" />
                                </button>
                                {/* <button
                                    onClick={() => window.print()}
                                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <span className="text-sm text-gray-700">In thông tin</span>
                                    <FileText className="w-4 h-4 text-gray-500" />
                                </button> */}
                                <button
                                    onClick={() => navigate(`/store/${store.storeID}/employees`)}
                                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <span className="text-sm text-gray-700">Quản lý nhân viên</span>
                                    <Users className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Store Hours */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <span>Giờ làm việc</span>
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Thứ 2 - Thứ 6</span>
                                    <span className="text-sm font-medium text-gray-900">8:00 - 18:00</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Thứ 7</span>
                                    <span className="text-sm font-medium text-gray-900">8:00 - 17:00</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Chủ nhật</span>
                                    <span className="text-sm font-medium text-gray-900">Nghỉ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreDetailPage;
