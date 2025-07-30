import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreDetailPage = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.user?.token);
    const navigate = useNavigate();

    const [store, setStore] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedStoreName, setEditedStoreName] = useState("");
    const [editedAddress, setEditedAddress] = useState("");

    const fetchStoreDetail = async () => {
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

            // Quay lại danh sách store
            setTimeout(() => {
                navigate('/store');
            }, 1000);

        } catch (error) {
            console.error('Error updating store:', error);
            toast.error('Lỗi khi cập nhật cửa hàng!');
        }
    };

    if (!store) return <div className="text-center mt-10 text-lg">Đang tải chi tiết cửa hàng...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Chi tiết cửa hàng</h1>

                <p><strong>Mã cửa hàng:</strong> {store.storeID}</p>

                {isEditing ? (
                    <>
                        <div className="mt-4">
                            <label className="block mb-2">Tên cửa hàng:</label>
                            <input
                                type="text"
                                value={editedStoreName}
                                onChange={(e) => setEditedStoreName(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2">Địa chỉ:</label>
                            <input
                                type="text"
                                value={editedAddress}
                                onChange={(e) => setEditedAddress(e.target.value)}
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
                        <p><strong>Tên cửa hàng:</strong> {store.storeName}</p>
                        <p><strong>Địa chỉ:</strong> {store.address || "Chưa cập nhật địa chỉ"}</p>

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

export default StoreDetailPage;
