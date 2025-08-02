import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import {
    User,
    Shield,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit,
    Save,
    X,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    Eye,
    EyeOff,
    Lock,
    Building2
} from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const AccountDetail = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.user?.token);
    const navigate = useNavigate();

    const [account, setAccount] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState("");
    const [editedStatus, setEditedStatus] = useState(true);
    const [editedPassword, setEditedPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchAccountDetail = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://decalxeapi-production.up.railway.app/api/Accounts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Fetched account:', data);
            setAccount(data);
            setEditedUsername(data.username);
            setEditedStatus(data.isActive);
        } catch (error) {
            console.error('Error fetching account detail:', error);
            toast.error('Lỗi khi tải chi tiết tài khoản!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAccountDetail();
        }
    }, [token, id]);

    const handleSave = async () => {
        if (editedUsername.trim() === "") {
            toast.error('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const payload = {
            accountID: account.accountID,
            username: editedUsername,
            // passwordHash: editedPassword,
            isActive: editedStatus,
            roleID: account.roleID,
            role: {
                roleID: account.roleID,
                roleName: account.roleName
            }
        };
        // Nếu có nhập mật khẩu thì thêm vào payload
        if (editedPassword.trim() !== "") {
            payload.passwordHash = editedPassword;
        }
        // console.log('Sending payload:', payload);

        try {
            const response = await fetch(`https://decalxeapi-production.up.railway.app/api/Accounts/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Response error:', errorData);
                if (errorData.errors) {
                    const errorMessages = Object.values(errorData.errors).flat().join(' ');
                    toast.error(errorMessages);
                } else {
                    toast.error('Cập nhật thất bại!');
                }
                return;
            }

            setShowSuccessPopup(true);
            setIsEditing(false);
            fetchAccountDetail();
        } catch (error) {
            console.error('Error updating account:', error);
            toast.error('Lỗi khi cập nhật tài khoản!');
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Admin':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Manager':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Designer':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Sales':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Technician':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (isActive) => {
        return isActive ? <CheckCircle className="w-5 h-5 text-green-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />;
    };

    const SuccessPopup = () => {
        if (!showSuccessPopup) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Cập nhật thành công!</h3>
                        <p className="text-gray-600 mb-6">Thông tin tài khoản đã được cập nhật.</p>
                        <button
                            onClick={() => {
                                setShowSuccessPopup(false);
                                navigate('/Account');
                            }}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            Quay lại danh sách
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Đang tải thông tin tài khoản...</p>
                </div>
            </div>
        );
    }

    if (!account) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy tài khoản</h2>
                    <p className="text-gray-600 mb-4">Tài khoản này có thể đã bị xóa hoặc không tồn tại</p>
                    <button
                        onClick={() => navigate('/Account')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <ToastContainer position="top-right" autoClose={3000} />
            <SuccessPopup />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/Account')}
                                className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Chi tiết tài khoản
                                </h1>
                                <p className="text-gray-600">
                                    Quản lý thông tin chi tiết của tài khoản #{account.accountID}
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
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {account.username}
                                    </h2>
                                    <p className="text-gray-600">Tài khoản #{account.accountID}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Username */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tên đăng nhập
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedUsername}
                                            onChange={(e) => setEditedUsername(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Nhập tên đăng nhập"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                                            <span className="text-gray-900 font-medium">{account.username}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Role */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Vai trò
                                    </label>
                                    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getRoleColor(account.roleName)}`}>
                                            {account.roleName}
                                        </span>
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Trạng thái
                                    </label>
                                    {isEditing ? (
                                        <select
                                            value={editedStatus ? 'true' : 'false'}
                                            onChange={(e) => setEditedStatus(e.target.value === 'true')}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option value="true">Hoạt động</option>
                                            <option value="false">Không hoạt động</option>
                                        </select>
                                    ) : (
                                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(account.isActive)}
                                                <span className={`font-medium ${account.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                                    {account.isActive ? "Hoạt động" : "Không hoạt động"}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Password */}
                                {isEditing && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mật khẩu mới
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Nhập mật khẩu mới"
                                                value={editedPassword}
                                                onChange={(e) => setEditedPassword(e.target.value)}
                                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Để trống nếu không muốn thay đổi mật khẩu
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Account Stats */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-blue-600" />
                                <span>Thông tin tài khoản</span>
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Mã tài khoản</span>
                                    <span className="text-sm font-medium text-gray-900">#{account.accountID}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Ngày tạo</span>
                                    <span className="text-sm font-medium text-gray-900">N/A</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Lần cập nhật</span>
                                    <span className="text-sm font-medium text-gray-900">N/A</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/Account')}
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
                                    <Building2 className="w-4 h-4 text-gray-500" />
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDetail;
