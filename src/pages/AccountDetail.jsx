import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
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
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const fetchAccountDetail = async () => {
        try {
            const response = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/Accounts/${id}`, {
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
        }
    };

    useEffect(() => {
        if (token) {
            fetchAccountDetail();
        }
    }, [token, id]);

    const handleSave = async () => {
        if (editedPassword === "" || editedUsername.trim() === "") {
            toast.error('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const payload = {
            accountID: account.accountID,
            username: editedUsername,
            email: account.email,
            passwordHash: editedPassword,
            isActive: editedStatus,
            roleID: account.roleID,
            role: {
                roleID: account.roleID,
                roleName: account.roleName
            }
        };

        console.log('Sending payload:', payload);

        try {
            const response = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/Accounts/${id}`, {
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

            // Hiện popup thành công
            setShowSuccessPopup(true);
        } catch (error) {
            console.error('Error updating account:', error);
            toast.error('Lỗi khi cập nhật tài khoản!');
        }
    };

    const SuccessPopup = () => {
        if (!showSuccessPopup) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                    <h3 className="text-xl font-bold mb-4 text-green-600">Cập nhật thành công!</h3>
                    <p className="text-gray-600 mb-6">Tài khoản đã được cập nhật.</p>
                    <div className="flex justify-end">
                        <button
                            onClick={() => navigate('/Admin')}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (!account) return <div className="text-center mt-10 text-lg">Đang tải...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-right" autoClose={3000} />
            <SuccessPopup />
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Chi tiết tài khoản</h1>

                <p><strong>Mã tài khoản:</strong> {account.accountID}</p>

                {isEditing ? (
                    <>
                        <div className="mt-4">
                            <label className="block mb-2">Username:</label>
                            <input
                                type="text"
                                value={editedUsername}
                                onChange={(e) => setEditedUsername(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2">Email:</label>
                            <p className="p-2 border rounded bg-gray-100">{account.email}</p>
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2">Vai trò:</label>
                            <p className="p-2 border rounded bg-gray-100">{account.roleName}</p>
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2">Trạng thái:</label>
                            <select
                                value={editedStatus ? 'true' : 'false'}
                                onChange={(e) => setEditedStatus(e.target.value === 'true')}
                                className="w-full p-2 border rounded"
                            >
                                <option value="true">Hoạt động</option>
                                <option value="false">Không hoạt động</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2">Mật khẩu mới:</label>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu mới"
                                value={editedPassword}
                                onChange={(e) => setEditedPassword(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Lưu</button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Hủy</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p><strong>Username:</strong> {account.username}</p>
                        <p><strong>Email:</strong> {account.email}</p>
                        <p><strong>Vai trò:</strong> {account.roleName}</p>
                        <p><strong>Trạng thái:</strong> {account.isActive ? "Hoạt động" : "Không hoạt động"}</p>

                        <div className="flex gap-4 mt-6">
                            <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sửa</button>
                            <button onClick={() => navigate(-1)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Quay lại</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountDetail;
