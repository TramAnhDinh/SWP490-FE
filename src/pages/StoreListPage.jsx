import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStores } from "../redux/slices/storeService";
import {
    MapPin,
    Trash2,
    Plus,
    Building2,
    Search,
    AlertTriangle,
    Settings,
    RefreshCw,
    Users,
    Phone,
    Mail
} from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreListPage = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStoreId, setSelectedStoreId] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [storeName, setStoreName] = useState("");
    const [address, setAddress] = useState("");
    const [creating, setCreating] = useState(false);

    const inputRef = useRef(null);
    const token = useSelector((state) => state.user?.token);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("StoreListPage mounted, token:", token ? "Có token" : "Không có token");
        fetchStores();
    }, []);

    // Focus input khi mở modal
    useEffect(() => {
        if (showCreateModal && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showCreateModal]);

    // Chặn space cuộn trang, không chặn trong input
    useEffect(() => {
        const handleKeyDown = (e) => {
            const tag = e.target.tagName.toLowerCase();
            if ((tag !== 'input' && tag !== 'textarea') && e.code === 'Space') {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const fetchStores = async () => {
        setLoading(true);
        try {
            console.log("Đang fetch stores với token:", token ? "Có token" : "Không có token");
            const data = await getStores();
            console.log("Stores data:", data);
            setStores(data);
        } catch (error) {
            console.error("Không thể load cửa hàng.", error);
            toast.error("Không thể load cửa hàng.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateStore = async (e) => {
        e.preventDefault();

        if (!storeName || !address) {
            toast.error("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (!token) {
            toast.error("Vui lòng đăng nhập để thực hiện thao tác này.");
            navigate('/login');
            return;
        }

        setCreating(true);

        try {
            console.log("Đang tạo store:", { storeName, address });
            console.log("Token:", token ? token.substring(0, 20) + "..." : "Không có token");

            const response = await fetch("https://decalxeapi-production.up.railway.app/api/Stores", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ storeName, address }),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

                // Thử parse JSON response nếu có
                try {
                    const errorData = await response.json();
                    errorMessage = errorData?.message || errorMessage;
                } catch (parseError) {
                    console.log("Response không phải JSON, sử dụng text");
                    const errorText = await response.text();
                    errorMessage = errorText || errorMessage;
                }

                throw new Error(errorMessage);
            }

            const result = await response.json();
            console.log("Tạo store thành công:", result);

            toast.success("Tạo cửa hàng thành công!");
            setStoreName("");
            setAddress("");
            setShowCreateModal(false);
            fetchStores();
        } catch (error) {
            console.error("Error creating store:", error);

            // Xử lý lỗi 401 - Unauthorized
            if (error.message.includes('401')) {
                toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                navigate('/login');
            } else {
                toast.error(`Lỗi tạo cửa hàng: ${error.message}`);
            }
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = (storeID) => {
        setSelectedStoreId(storeID);
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!token) {
            toast.error("Vui lòng đăng nhập để thực hiện thao tác này.");
            navigate('/login');
            return;
        }

        try {
            console.log("Đang xóa store với ID:", selectedStoreId);
            console.log("Token:", token ? token.substring(0, 20) + "..." : "Không có token");

            const response = await fetch(`https://decalxeapi-production.up.railway.app/api/Stores/${selectedStoreId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

                // Thử parse JSON response nếu có
                try {
                    const errorData = await response.json();
                    errorMessage = errorData?.message || errorMessage;
                } catch (parseError) {
                    console.log("Response không phải JSON, sử dụng text");
                    const errorText = await response.text();
                    errorMessage = errorText || errorMessage;
                }

                throw new Error(errorMessage);
            }

            console.log("Xóa store thành công");
            toast.success('Xóa cửa hàng thành công!');
            fetchStores();
            setShowConfirmDialog(false);
            setSelectedStoreId(null);
        } catch (error) {
            console.error('Error deleting store:', error);

            // Xử lý lỗi 401 - Unauthorized
            if (error.message.includes('401')) {
                toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                // Có thể redirect về trang login
                navigate('/login');
            } else {
                toast.error(`Lỗi khi xóa cửa hàng: ${error.message}`);
            }
        }
    };

    const filteredStores = stores.filter(store =>
        store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: stores.length,
        active: stores.length, // Giả sử tất cả đều active
        inactive: 0
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Cần đăng nhập</h2>
                    <p className="text-gray-600 mb-4">Vui lòng đăng nhập để xem danh sách cửa hàng</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Đang tải cửa hàng...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Modal Xác Nhận Xóa */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
                        <div className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Xác nhận xóa</h3>
                                    <p className="text-gray-600">Bạn có chắc chắn muốn xóa cửa hàng này?</p>
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
            )}

            {/* Modal Tạo Cửa Hàng */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
                        <div className="p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Tạo cửa hàng mới</h3>
                                    <p className="text-gray-600">Thêm cửa hàng mới vào hệ thống</p>
                                </div>
                            </div>
                            <form onSubmit={handleCreateStore} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tên cửa hàng
                                    </label>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Nhập tên cửa hàng"
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Địa chỉ cửa hàng
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nhập địa chỉ cửa hàng"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        disabled={creating}
                                    >
                                        {creating ? (
                                            <>
                                                <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                                                Đang tạo...
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-5 h-5 mr-2" />
                                                Tạo
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Quản lý cửa hàng
                            </h1>
                            <p className="text-gray-600">
                                Quản lý tất cả cửa hàng trong hệ thống
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Tạo cửa hàng</span>
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Tổng cửa hàng</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-blue-600" />
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
                                    <Users className="w-6 h-6 text-green-600" />
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
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-8 animate-fade-in">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm cửa hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Stores Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                    {filteredStores.length > 0 ? (
                        filteredStores.map((store) => (
                            <div
                                key={store.storeID}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 relative group"
                            >
                                <div
                                    onClick={() => navigate(`/Stores/${store.storeID}`)}
                                    className="p-6 cursor-pointer"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-4 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                                        <MapPin className="text-blue-600 w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 text-center mb-3 group-hover:text-blue-600 transition-colors">
                                        {store.storeName}
                                    </h3>
                                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                                        {store.address || "Chưa cập nhật địa chỉ"}
                                    </p>

                                    {/* Store Info */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Phone className="w-3 h-3" />
                                                <span>Liên hệ</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Mail className="w-3 h-3" />
                                                <span>Email</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDelete(store.storeID)}
                                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                    title="Xóa cửa hàng"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-gray-500">
                                <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p className="text-lg font-medium">Không có cửa hàng nào</p>
                                <p className="text-sm">Thử thay đổi từ khóa tìm kiếm hoặc tạo cửa hàng mới</p>
                                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                                    <p className="text-xs text-gray-600">Debug info:</p>
                                    <p className="text-xs text-gray-600">Total stores: {stores.length}</p>
                                    <p className="text-xs text-gray-600">Search term: "{searchTerm}"</p>
                                    <p className="text-xs text-gray-600">Token: {token ? "Có" : "Không có"}</p>
                                    <p className="text-xs text-gray-600">Token preview: {token ? token.substring(0, 20) + "..." : "N/A"}</p>
                                    <p className="text-xs text-gray-600">API URL: https://decalxeapi-production.up.railway.app/api/Stores</p>
                                    <button
                                        onClick={fetchStores}
                                        className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                                    >
                                        Thử lại
                                    </button>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="mt-2 ml-2 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                                    >
                                        Đăng nhập lại
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreListPage;
