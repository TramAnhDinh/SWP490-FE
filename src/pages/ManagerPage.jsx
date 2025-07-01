import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { FaTrash, FaPlus } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const ManagerPage = () => {
    const token = useSelector((state) => state.user?.token);
    const [decals, setDecals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDecalId, setSelectedDecalId] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Form states
    const [templateID, setTemplateID] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [decalTypeID, setDecalTypeID] = useState('');
    const [decalTypeName, setDecalTypeName] = useState('');

    const fetchDecals = async () => {
        try {
            const response = await fetch('https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setDecals(data);
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
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
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

    const handleCreateDecal = async (e) => {
        e.preventDefault();

        if (!templateID || !templateName || !imageURL || !decalTypeID || !decalTypeName) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const decalData = {
            templateID,
            templateName,
            imageURL,
            decalTypeID,
            decalTypeName
        };

        try {
            const response = await fetch('https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(decalData),
            });

            if (response.ok) {
                toast.success('Tạo decal thành công!');
                fetchDecals();
                setShowCreateForm(false);
                resetForm();
            } else {
                const errorText = await response.text();
                console.error('Lỗi tạo decal:', errorText);
                toast.error(`Tạo decal thất bại: ${errorText}`);

            }
        } catch (error) {
            console.error('Error creating decal:', error);
            toast.error('Lỗi khi tạo decal!');
        }
    };

    const resetForm = () => {
        setTemplateID('');
        setTemplateName('');
        setImageURL('');
        setDecalTypeID('');
        setDecalTypeName('');
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

            {/* Popup Form Thêm Decal */}
            {showCreateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4">
                        <h2 className="text-xl font-bold mb-4">➕ Thêm Decal Mới</h2>
                        <form onSubmit={handleCreateDecal} className="space-y-4">
                            {[
                                { label: "Mã Decal", value: templateID, setter: setTemplateID },
                                { label: "Tên Decal", value: templateName, setter: setTemplateName },
                                { label: "Link Hình Ảnh", value: imageURL, setter: setImageURL },
                                { label: "Mã Loại Decal", value: decalTypeID, setter: setDecalTypeID },
                                { label: "Tên Loại Decal", value: decalTypeName, setter: setDecalTypeName },
                            ].map((field, index) => (
                                <div key={index}>
                                    <label className="block mb-1 font-medium">{field.label}</label>
                                    <input type="text" value={field.value} onChange={(e) => field.setter(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" required />
                                </div>
                            ))}

                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => { setShowCreateForm(false); resetForm(); }} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                                    Đóng
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Tạo Decal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">🎨 Quản Lý Decal</h1>
                        <button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            <FaPlus /> Thêm Decal
                        </button>
                    </div>

                    <div className="p-6">

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Decal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình ảnh</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Decal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại Decal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredDecals.length > 0 ? (
                                        filteredDecals.map(decal => (
                                            <tr key={decal.templateID} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{decal.templateID}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <img src={decal.imageURL} alt={decal.templateName} className="w-24 h-16 object-cover rounded" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{decal.templateName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{decal.decalTypeName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-4">
                                                    <button onClick={() => handleDelete(decal.templateID)} className="text-red-600 hover:text-red-900">
                                                        <FaTrash className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Không có decal nào</td>
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

export default ManagerPage;
