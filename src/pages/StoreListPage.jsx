import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStores } from "../redux/slices/storeService";
import { MapPin } from "lucide-react";

const StoreListPage = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const data = await getStores();
                setStores(data);
            } catch (error) {
                console.error("Không thể load cửa hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    if (loading) return <div className="text-center mt-10 text-lg">Đang tải cửa hàng...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Quản Lý Cửa Hàng</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {stores.map((store) => (
                    <div
                        key={store.storeID}
                        onClick={() => navigate(`/Stores/${store.storeID}`)}
                        className="cursor-pointer border border-gray-200 p-6 rounded-2xl shadow-md bg-white flex flex-col justify-center items-center aspect-square hover:shadow-xl hover:scale-105 transition-transform duration-300"
                    >
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                            <MapPin className="text-yellow-500 w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">{store.storeName}</h2>
                        <p className="text-gray-600 text-center">{store.address || "Chưa cập nhật địa chỉ"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreListPage;
