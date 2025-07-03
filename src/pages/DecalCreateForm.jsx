import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DecalCreateForm = ({ onDecalCreated }) => {
    const token = useSelector((state) => state.user?.token);

    const [templateID, setTemplateID] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [decalTypeID, setDecalTypeID] = useState('');
    const [decalTypeName, setDecalTypeName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!templateID || !templateName || !imageURL || !decalTypeID || !decalTypeName) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    templateID,
                    templateName,
                    imageURL,
                    decalTypeID,
                    decalTypeName,
                }),
            });

            if (response.ok) {
                toast.success('Tạo decal thành công!');
                onDecalCreated(); // Reload list
                setTemplateID('');
                setTemplateName('');
                setImageURL('');
                setDecalTypeID('');
                setDecalTypeName('');
            } else {
                toast.error('Tạo decal thất bại!');
            }
        } catch (error) {
            console.error('Error creating decal:', error);
            toast.error('Lỗi khi tạo decal!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">➕ Thêm Decal Mới</h2>

            <div>
                <label className="block mb-1 font-medium">Mã Decal</label>
                <input
                    type="text"
                    value={templateID}
                    onChange={(e) => setTemplateID(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Tên Decal</label>
                <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Link Hình Ảnh</label>
                <input
                    type="url"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Mã Loại Decal</label>
                <input
                    type="text"
                    value={decalTypeID}
                    onChange={(e) => setDecalTypeID(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Tên Loại Decal</label>
                <input
                    type="text"
                    value={decalTypeName}
                    onChange={(e) => setDecalTypeName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                {loading ? 'Đang tạo...' : 'Tạo Decal'}
            </button>
        </form>
    );
};

export default DecalCreateForm;
