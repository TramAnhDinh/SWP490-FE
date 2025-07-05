import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { FaSearch, FaTrash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const token = useSelector((state) => state.user?.token);
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [selectedAccountDetail, setSelectedAccountDetail] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const navigate = useNavigate();

    const fetchAccounts = async () => {
        try {
            const response = await fetch('https://decalxeapi-backend-production.up.railway.app/api/Accounts', {
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
        }
    };

    const fetchAccountDetail = async (id) => {
        try {
            const response = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/Accounts/${id}`, {
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
            await fetch(`https://decalxeapi-backend-production.up.railway.app/api/Accounts/${selectedAccountId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            // if(!response.ok){
            //     const errorData = await response.json();
            //     if(errorData.message?.includes("công việc chưa hoàn thành")){
            //         toast.error("Không thể xóa! Nhân viên này vẫn còn công việc chưa hoàn thành.");
            //     }else{
            //         toast.error(errorData.message || "Xóa tài khoản thất bại!");
            //     }
            //     setShowConfirmDialog(false);
            //     setSelectedAccountId(null);
            //     return;
            // }
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

    const filteredAccounts = accounts.filter(account =>
        account.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const DeleteConfirmDialog = () => {
        if (!showConfirmDialog) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                    <h3 className="text-xl font-bold mb-4">Xác nhận xóa</h3>
                    <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa tài khoản này?</p>
                    <div className="flex justify-end gap-4">
                        <button onClick={() => setShowConfirmDialog(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                            Hủy
                        </button>
                        <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-right" autoClose={3000} />
            <DeleteConfirmDialog />

            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">🗂️ Quản Lý Tài Khoản</h1>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div className="relative flex-1 max-w-md">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tài khoản..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã tài khoản</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredAccounts.length > 0 ? (
                                        filteredAccounts.map(account => (
                                            <tr key={account.accountID} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.accountID}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.username}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.roleName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <span className={account.isActive ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                                        {account.isActive ? "Hoạt động" : "Không hoạt động"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-4">
                                                    <button onClick={() => navigate(`/Account/${account.accountID}`)} className="text-blue-600 hover:underline">
                                                        Chi tiết
                                                    </button>
                                                    <button onClick={() => handleDelete(account.accountID)} className="text-red-600 hover:text-red-900">
                                                        <FaTrash className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Không có tài khoản nào</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {selectedAccountDetail && (
                            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-900">Chi Tiết Tài Khoản</h2>
                                    <button onClick={() => setSelectedAccountDetail(null)} className="text-red-500 hover:underline">Đóng</button>
                                </div>
                                <div className="space-y-2 text-gray-700">
                                    <div><strong>Mã tài khoản:</strong> {selectedAccountDetail.accountID}</div>
                                    <div><strong>Username:</strong> {selectedAccountDetail.username}</div>
                                    <div><strong>Full Name:</strong> {selectedAccountDetail.fullName}</div>
                                    <div><strong>Email:</strong> {selectedAccountDetail.email}</div>
                                    <div><strong>Vai trò:</strong> {selectedAccountDetail.roleName}</div>
                                    <div><strong>Trạng thái:</strong> {selectedAccountDetail.isActive ? "Hoạt động" : "Không hoạt động"}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
