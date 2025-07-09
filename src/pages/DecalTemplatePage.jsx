

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { FaTrash, FaPlus, FaEdit, FaCar } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import VehicleModelLinker from "./VehicleModelLinker";

const FormPopup = ({ title, initialData, onSubmit, onClose, isEdit }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Tên Decal</label>
                        <input
                            type="text"
                            name="templateName"
                            value={formData.templateName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Link Hình Ảnh</label>
                        <input
                            type="text"
                            name="imageURL"
                            value={formData.imageURL}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Mã Loại Decal</label>
                        <input
                            type="text"
                            name="decalTypeID"
                            value={formData.decalTypeID}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Đóng</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DecalTemplatePage = () => {
    const token = useSelector((state) => state.user?.token);
    const [decals, setDecals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDecalId, setSelectedDecalId] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentEditData, setCurrentEditData] = useState(null);
    const [showVehicleLinker, setShowVehicleLinker] = useState(false);
    const [vehicleTarget, setVehicleTarget] = useState(null);

  const fetchDecals = async () => {
    try {
        const response = await fetch('https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const list = await response.json();

        // Gọi chi tiết từng decal template để lấy vehicleModels
        const detailedDecals = await Promise.all(
            list.map(async (decal) => {
                try {
                    const detailRes = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates/${decal.templateID}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const detail = await detailRes.json();
                    return { ...decal, vehicleModels: detail.vehicleModels || [] };
                } catch (err) {
                    console.error('Lỗi khi lấy chi tiết decal:', err);
                    return { ...decal, vehicleModels: [] };
                }
            })
        );

        setDecals(detailedDecals);
    } catch (error) {
        console.error('Error fetching decals:', error);
        toast.error('Lỗi khi tải danh sách decal!');
    }
};



    useEffect(() => {
        if (token) fetchDecals();
    }, [token]);

    const handleDelete = async (id) => {
        setSelectedDecalId(id);
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates/${selectedDecalId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            toast.success('Xóa decal thành công!');
            fetchDecals();
            setShowConfirmDialog(false);
            setSelectedDecalId(null);
        } catch (error) {
            console.error('Error deleting decal:', error);
            toast.error('Lỗi khi xóa decal!');
        }
    };

    const handleCreateDecal = async (data) => {
        try {
            const response = await fetch('https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success('Tạo decal thành công!');
                fetchDecals();
                setShowCreateForm(false);
            } else {
                const errorText = await response.text();
                toast.error(`Tạo decal thất bại: ${errorText}`);
            }
        } catch (error) {
            console.error('Error creating decal:', error);
            toast.error('Lỗi khi tạo decal!');
        }
    };

    const handleEdit = (decal) => {
        setCurrentEditData(decal);
        setShowEditForm(true);
    };

    const handleUpdateDecal = async (data) => {
        try {
            const response = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates/${data.templateID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success('Cập nhật decal thành công!');
                fetchDecals();
                setShowEditForm(false);
            } else {
                const errorText = await response.text();
                toast.error(`Cập nhật decal thất bại: ${errorText}`);
            }
        } catch (error) {
            console.error('Error updating decal:', error);
            toast.error('Lỗi khi cập nhật decal!');
        }
    };

    const openVehicleLinker = (templateID, templateName) => {
        setVehicleTarget({ templateID, templateName });
        setShowVehicleLinker(true);
    };

    const filteredDecals = decals.filter(decal =>
        decal.templateName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const DeleteConfirmDialog = () => {
        if (!showConfirmDialog) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                    <h3 className="text-xl font-bold mb-4">Xác nhận xóa</h3>
                    <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa decal này?</p>
                    <div className="flex justify-end gap-4">
                        <button onClick={() => setShowConfirmDialog(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Hủy</button>
                        <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Xóa</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-right" autoClose={3000} />
            <DeleteConfirmDialog />

            {showCreateForm && (
                <FormPopup
                    title="➕ Thêm Decal Mới"
                    initialData={{ templateName: '', imageURL: '', decalTypeID: '' }}
                    onSubmit={handleCreateDecal}
                    onClose={() => setShowCreateForm(false)}
                    isEdit={false}
                />
            )}

            {showEditForm && currentEditData && (
                <FormPopup
                    title="✏️ Chỉnh Sửa Decal"
                    initialData={currentEditData}
                    onSubmit={handleUpdateDecal}
                    onClose={() => setShowEditForm(false)}
                    isEdit={true}
                />
            )}

            {showVehicleLinker && vehicleTarget && (
                <VehicleModelLinker
                    token={token}
                    templateID={vehicleTarget.templateID}
                    templateName={vehicleTarget.templateName}
                    onClose={() => setShowVehicleLinker(false)}
                />
            )}

            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">🎨 Quản Lý Mẫu Decal</h1>
                        <button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            <FaPlus /> Thêm Decal
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
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Mã Decal</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hình ảnh</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tên Decal</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Loại Decal</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Dòng Xe Gắn</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
    {filteredDecals.length > 0 ? (
        filteredDecals.map(decal => (
            <tr key={decal.templateID} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{decal.templateID}</td>
                <td className="px-6 py-4">
                    <img src={decal.imageURL} alt={decal.templateName} className="w-24 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{decal.templateName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{decal.decalTypeName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                    {(decal.vehicleModels && decal.vehicleModels.length > 0) ? (
                        <ul className="list-disc list-inside">
                            {decal.vehicleModels.map(vm => (
                                <li key={vm.vehicleModelID}>{vm.vehicleModelName}</li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-gray-500 italic">Chưa gắn</span>
                    )}
                </td>
                <td className="px-6 py-4 text-sm flex gap-3">
                    <button onClick={() => handleEdit(decal)} className="text-blue-600 hover:text-blue-900"><FaEdit /></button>
                    <button onClick={() => handleDelete(decal.templateID)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                    <button onClick={() => openVehicleLinker(decal.templateID, decal.templateName)} className="text-green-600 hover:text-green-900" title="Gắn dòng xe">
                        <FaCar />
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Không có decal nào</td>
        </tr>
    )}
</tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecalTemplatePage;

                  