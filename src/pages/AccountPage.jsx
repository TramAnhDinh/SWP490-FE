import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import {
    Search,
    Trash2,
    Eye,
    Users,
    Plus,
    Shield,
    UserCheck,
    UserX,
    Filter,
    RefreshCw
} from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const token = useSelector((state) => state.user?.token);
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [selectedAccountDetail, setSelectedAccountDetail] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");
    const navigate = useNavigate();

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://decalxeapi-production.up.railway.app/api/Accounts', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setAccounts(data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
            toast.error('Lỗi khi tải danh sách tài khoản!');
        } finally {
            setLoading(false);
        }
    };

    const fetchAccountDetail = async (id) => {
        try {
            const response = await fetch(`https://decalxeapi-production.up.railway.app/api/Accounts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setSelectedAccountDetail(data);
        } catch (error) {
            console.error('Error fetching account detail:', error);
            toast.error('Lỗi khi tải chi tiết tài khoản!');
        }
    };

    useEffect(() => {
        if (token) {
            fetchAccounts();
        }
    }, [token]);

    const handleDelete = async (id) => {
        setSelectedAccountId(id);
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`https://decalxeapi-production.up.railway.app/api/Accounts/${selectedAccountId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            toast.success('Xóa tài khoản thành công!');
            fetchAccounts();
            setShowConfirmDialog(false);
            setSelectedAccountId(null);
        } catch (error) {
            console.error('Error deleting account:', error);
            toast.error('Lỗi khi xóa tài khoản!');
        }
    };

    const handleViewDetail = (id) => {
        setSelectedAccountId(id);
        fetchAccountDetail(id);
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Admin':
                return 'bg-red-100 text-red-800';
            case 'Manager':
                return 'bg-blue-100 text-blue-800';
            case 'Designer':
                return 'bg-purple-100 text-purple-800';
            case 'Sales':
                return 'bg-green-100 text-green-800';
            case 'Technician':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (isActive) => {
        return isActive ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />;
    };

    const filteredAccounts = accounts.filter(account => {
        const matchesSearch = account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.roleName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" ||
            (filterStatus === "active" && account.isActive) ||
            (filterStatus === "inactive" && !account.isActive);
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: accounts.length,
        active: accounts.filter(acc => acc.isActive).length,
        inactive: accounts.filter(acc => !acc.isActive).length
    };

    const DeleteConfirmDialog = () => {
        if (!showConfirmDialog) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
                    <div className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <Trash2 className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Xác nhận xóa</h3>
                                <p className="text-gray-600">Bạn có chắc chắn muốn xóa tài khoản này?</p>
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Quản lý tài khoản
                            </h1>
                            <p className="text-gray-600">
                                Quản lý tất cả tài khoản nhân viên trong hệ thống
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Thêm tài khoản</span>
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Tổng tài khoản</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <UserCheck className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Không hoạt động</p>
                                    <p className="text-3xl font-bold text-red-600">{stats.inactive}</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <UserX className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                    {/* Search and Filter */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo username hoặc vai trò..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                            <div className="flex gap-3">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="active">Đang hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                                <button
                                    onClick={fetchAccounts}
                                    disabled={loading}
                                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Mã tài khoản
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Vai trò
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center">
                                            <div className="flex items-center justify-center">
                                                <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                                                <span className="text-gray-600">Đang tải...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredAccounts.length > 0 ? (
                                    filteredAccounts.map(account => (
                                        <tr key={account.accountID} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900">
                                                    #{account.accountID}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                        <Shield className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {account.username}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getRoleColor(account.roleName)}`}>
                                                    {account.roleName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getStatusIcon(account.isActive)}
                                                    <span className={`ml-2 text-sm font-medium ${account.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                                        {account.isActive ? "Hoạt động" : "Không hoạt động"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => navigate(`/Account/${account.accountID}`)}
                                                        className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span>Chi tiết</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(account.accountID)}
                                                        className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        <span>Xóa</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="text-gray-500">
                                                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                                <p className="text-lg font-medium">Không có tài khoản nào</p>
                                                <p className="text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Account Detail Modal */}
                {selectedAccountDetail && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-fade-in">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Chi tiết tài khoản</h2>
                                    <button
                                        onClick={() => setSelectedAccountDetail(null)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <span className="text-2xl">×</span>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Mã tài khoản</label>
                                            <p className="text-lg font-semibold text-gray-900">#{selectedAccountDetail.accountID}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Username</label>
                                            <p className="text-lg font-semibold text-gray-900">{selectedAccountDetail.username}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Họ và tên</label>
                                            <p className="text-lg font-semibold text-gray-900">{selectedAccountDetail.fullName}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Email</label>
                                            <p className="text-lg font-semibold text-gray-900">{selectedAccountDetail.email}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Vai trò</label>
                                            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRoleColor(selectedAccountDetail.roleName)}`}>
                                                {selectedAccountDetail.roleName}
                                            </span>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                                            <div className="flex items-center">
                                                {getStatusIcon(selectedAccountDetail.isActive)}
                                                <span className={`ml-2 text-lg font-semibold ${selectedAccountDetail.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                                    {selectedAccountDetail.isActive ? "Hoạt động" : "Không hoạt động"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
