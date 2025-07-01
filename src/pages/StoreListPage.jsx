import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStores } from "../redux/slices/storeService";
import { MapPin, Trash2 } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreListPage = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStoreId, setSelectedStoreId] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const token = useSelector((state) => state.user?.token);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const data = await getStores();
            setStores(data);
        } catch (error) {
            console.error("Không thể load cửa hàng.");
            toast.error("Không thể load cửa hàng.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (storeID) => {
        setSelectedStoreId(storeID);
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`https://decalxeapi-backend-production.up.railway.app/api/Stores/${selectedStoreId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            toast.success('Xóa cửa hàng thành công!');
            fetchStores();
            setShowConfirmDialog(false);
            setSelectedStoreId(null);
        } catch (error) {
            console.error('Error deleting store:', error);
            toast.error('Lỗi khi xóa cửa hàng!');
        }
    };

    const DeleteConfirmDialog = () => {
        if (!showConfirmDialog) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                    <h3 className="text-xl font-bold mb-4">Xác nhận xóa</h3>
                    <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa cửa hàng này?</p>
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

    if (loading) return <div className="text-center mt-10 text-lg">Đang tải cửa hàng...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <DeleteConfirmDialog />
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Quản Lý Cửa Hàng</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {stores.map((store) => (
                    <div
                        key={store.storeID}
                        className="border border-gray-200 p-6 rounded-2xl shadow-md bg-white flex flex-col justify-center items-center aspect-square hover:shadow-xl hover:scale-105 transition-transform duration-300 relative"
                    >
                        <div
                            onClick={() => navigate(`/Stores/${store.storeID}`)}
                            className="flex flex-col justify-center items-center cursor-pointer w-full h-full"
                        >
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                                <MapPin className="text-yellow-500 w-8 h-8" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">{store.storeName}</h2>
                            <p className="text-gray-600 text-center">{store.address || "Chưa cập nhật địa chỉ"}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(store.storeID)}
                            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreListPage;
