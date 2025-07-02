import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DecalTypeDetailPage = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.user?.token);
    const navigate = useNavigate();

    const [decalType, setDecalType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [decalTypeName, setDecalTypeName] = useState("");
    const [material, setMaterial] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");

    useEffect(() => {
        fetchDecalType();
    }, []);

    const fetchDecalType = async () => {
        try {
            const response = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTypes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Không thể tải decal type.');

            const data = await response.json();
            setDecalType(data);
            setDecalTypeName(data.decalTypeName);
            setMaterial(data.material);
            setWidth(data.width);
            setHeight(data.height);
        } catch (error) {
            toast.error("Lỗi khi tải decal type.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTypes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    decalTypeID: id,
                    decalTypeName,
                    material,
                    width: parseFloat(width),
                    height: parseFloat(height)
                })
            });

            if (!response.ok) throw new Error('Cập nhật thất bại.');

            toast.success("Cập nhật thành công!");
            setTimeout(() => {
                navigate("/Decal-type");
            }, 1000);
            setIsEditing(false);
            fetchDecalType();
        } catch (error) {
            toast.error("Lỗi khi cập nhật decal type.");
        }
    };

    if (loading) return <div className="text-center mt-10 text-lg">Đang tải...</div>;

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Chi Tiết Decal Type</h1>

            <table className="w-full text-left mb-6">
                <tbody>
                    <tr className="border-b">
                        <th className="py-2 pr-4">ID:</th>
                        <td className="py-2">{decalType.decalTypeID}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="py-2 pr-4">Tên Decal Type:</th>
                        <td className="py-2">
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="border px-3 py-1 rounded w-full"
                                    value={decalTypeName}
                                    onChange={(e) => setDecalTypeName(e.target.value)}
                                />
                            ) : decalType.decalTypeName}
                        </td>
                    </tr>
                    <tr className="border-b">
                        <th className="py-2 pr-4">Chất liệu:</th>
                        <td className="py-2">
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="border px-3 py-1 rounded w-full"
                                    value={material}
                                    onChange={(e) => setMaterial(e.target.value)}
                                />
                            ) : decalType.material}
                        </td>
                    </tr>
                    <tr className="border-b">
                        <th className="py-2 pr-4">Chiều rộng (m):</th>
                        <td className="py-2">
                            {isEditing ? (
                                <input
                                    type="number"
                                    className="border px-3 py-1 rounded w-full"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                />
                            ) : decalType.width}
                        </td>
                    </tr>
                    <tr>
                        <th className="py-2 pr-4">Chiều cao (m):</th>
                        <td className="py-2">
                            {isEditing ? (
                                <input
                                    type="number"
                                    className="border px-3 py-1 rounded w-full"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            ) : decalType.height}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-center gap-4">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Lưu
                        </button>
                        <button
                            onClick={() => { setIsEditing(false); fetchDecalType(); }}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Hủy
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Sửa
                    </button>
                )}
                <button
                    onClick={() => navigate("/Decal-type")}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Quay lại
                </button>
            </div>
        </div>
    );
};

export default DecalTypeDetailPage;
