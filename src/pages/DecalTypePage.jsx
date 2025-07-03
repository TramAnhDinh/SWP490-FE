import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DecalTypePage = () => {
    const [decalTypes, setDecalTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedDecalTypeId, setSelectedDecalTypeId] = useState(null);
    const [decalTypeID, setDecalTypeID] = useState("");
    const [decalTypeName, setDecalTypeName] = useState("");
    const [material, setMaterial] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [creating, setCreating] = useState(false);

    const token = useSelector((state) => state.user?.token);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        fetchDecalTypes();
    }, []);

    useEffect(() => {
        if (showCreateModal && inputRef.current) {
            const timer = setTimeout(() => inputRef.current.focus(), 100);
            return () => clearTimeout(timer);
        }
    }, [showCreateModal]);

    const fetchDecalTypes = async () => {
        try {
            const response = await fetch("https://decalxeapi-backend-production.up.railway.app/api/DecalTypes", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });
            if (!response.ok) throw new Error("Không thể tải decal types.");
            const data = await response.json();
            setDecalTypes(data);
        } catch {
            toast.error("Lỗi khi tải decal types.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDecalType = async (e) => {
        e.preventDefault();
        if (!decalTypeID || !decalTypeName || !material || !width || !height) {
            toast.error("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        if (parseFloat(width) <= 0 || parseFloat(height) <= 0) {
            toast.error("Kích thước phải lớn hơn 0.");
            return;
        }

        setCreating(true);
        try {
            const response = await fetch("https://decalxeapi-backend-production.up.railway.app/api/DecalTypes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    decalTypeID,
                    decalTypeName,
                    material,
                    width: parseFloat(width),
                    height: parseFloat(height)
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || "Tạo decal type thất bại.");
            }
            toast.success("Tạo decal type thành công!");
            resetForm();
            setShowCreateModal(false);
            fetchDecalTypes();
        } catch (err) {
            toast.error(err.message || "Lỗi kết nối.");
        } finally {
            setCreating(false);
        }
    };

    const resetForm = () => {
        setDecalTypeID("");
        setDecalTypeName("");
        setMaterial("");
        setWidth("");
        setHeight("");
    };

    const handleDelete = (id) => {
        setSelectedDecalTypeId(id);
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTypes/${selectedDecalTypeId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Xóa decal type thành công!");
            fetchDecalTypes();
            setShowConfirmDialog(false);
            setSelectedDecalTypeId(null);
        } catch {
            toast.error("Lỗi khi xóa decal type.");
        }
    };

    const filteredData = decalTypes.filter(type =>
        type.decalTypeID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.decalTypeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">🎨 Quản Lý Loại Decal</h1>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <PlusCircle size={18} /> Thêm Decal Type
                        </button>
                    </div>

                    <div className="p-6">
                        <input
                            type="text"
                            placeholder="Tìm kiếm decal..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                        />

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Mã Decal Type</th>
                                        <th className="px-4 py-3">Tên Decal Type</th>
                                        <th className="px-4 py-3">Chất liệu</th>
                                        <th className="px-4 py-3">Kích thước</th>
                                        <th className="px-4 py-3">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData.length > 0 ? (
                                        filteredData.map((type) => (
                                            <tr key={type.decalTypeID} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">{type.decalTypeID}</td>
                                                <td className="px-4 py-3">{type.decalTypeName}</td>
                                                <td className="px-4 py-3">{type.material}</td>
                                                <td className="px-4 py-3">{type.width}m x {type.height}m</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => navigate(`/Decal-type/${type.decalTypeID}`)}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            <FaEdit size={18} />
                                                        </button> 
                                                        <button
                                                            onClick={() => handleDelete(type.decalTypeID)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            <FaTrash size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center text-gray-500 px-4 py-6">
                                                Không có decal type nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal tạo mới */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4 text-center">Tạo Decal Type Mới</h3>
                        <form onSubmit={handleCreateDecalType} className="space-y-3">
                            <input ref={inputRef} type="text" placeholder="Mã decal type" className="w-full border p-2 rounded" value={decalTypeID} onChange={(e) => setDecalTypeID(e.target.value)} />
                            <input type="text" placeholder="Tên decal type" className="w-full border p-2 rounded" value={decalTypeName} onChange={(e) => setDecalTypeName(e.target.value)} />
                            <input type="text" placeholder="Chất liệu" className="w-full border p-2 rounded" value={material} onChange={(e) => setMaterial(e.target.value)} />
                            <input type="number" placeholder="Chiều rộng (m)" className="w-full border p-2 rounded" value={width} onChange={(e) => setWidth(e.target.value)} />
                            <input type="number" placeholder="Chiều cao (m)" className="w-full border p-2 rounded" value={height} onChange={(e) => setHeight(e.target.value)} />
                            <div className="flex justify-end gap-3 pt-3">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Hủy</button>
                                <button type="submit" disabled={creating} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                    {creating ? "Đang tạo..." : "Tạo"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal xác nhận xóa */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4">Xác nhận xóa</h3>
                        <p className="mb-4">Bạn có chắc chắn muốn xóa decal type này?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowConfirmDialog(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Hủy</button>
                            <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Xóa</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DecalTypePage;
