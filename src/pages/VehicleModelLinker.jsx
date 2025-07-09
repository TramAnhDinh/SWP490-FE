import React, { useEffect, useState } from "react";

const VehicleModelLinker = ({ templateID, templateName, token, onClose }) => {
    const [vehicleModels, setVehicleModels] = useState([]);
    const [linkedModels, setLinkedModels] = useState([]);
    const [selectedModelID, setSelectedModelID] = useState("");

    // Lấy tất cả dòng xe
    const fetchAllModels = async () => {
        try {
            const res = await fetch("https://decalxeapi-backend-production.up.railway.app/api/VehicleModels", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setVehicleModels(data);
        } catch (err) {
            console.error("Lỗi lấy danh sách VehicleModels:", err);
        }
    };

    // Lấy dòng xe đã gắn
    const fetchLinkedModels = async () => {
    try {
        const res = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates/${templateID}/vehicles`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 204) {
            setLinkedModels([]); // không có dữ liệu
            return;
        }

        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();
        setLinkedModels(data);
    } catch (err) {
        console.error("Lỗi lấy dòng xe đã gắn:", err);
    }
};

    const handleAddModel = async () => {
    if (!selectedModelID) return;

    try {
        const response = await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates/${templateID}/vehicles/${selectedModelID}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}) // body rỗng
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Thêm dòng xe thất bại: ${errorText}`);
        }

        toast.success("Gắn dòng xe thành công!");
        fetchLinkedModels();
    } catch (err) {
        console.error("Lỗi khi gắn dòng xe:", err);
        toast.error("Lỗi khi gắn dòng xe!");
    }
};


    const handleRemoveModel = async (modelID) => {
        try {
            await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTemplates/${templateID}/vehicles/${modelID}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchLinkedModels();
        } catch (err) {
            console.error("Lỗi khi gỡ dòng xe:", err);
        }
    };

    useEffect(() => {
        fetchAllModels();
        fetchLinkedModels();
    }, [templateID]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full mx-4">
                <h2 className="text-xl font-bold mb-4">
                    🚗 Gắn dòng xe cho mẫu decal: <br />
                    <span className="text-blue-600">{templateName}</span> ({templateID})
                </h2>

                <ul className="mb-4 max-h-40 overflow-y-auto">
                    {linkedModels.length === 0 && <li className="text-gray-500">Chưa có dòng xe nào</li>}
                    {linkedModels.map((model) => (
                        <li key={model.modelID} className="flex items-center justify-between mb-2">
                            <span>{model.modelName}</span>
                            <button
                                onClick={() => handleRemoveModel(model.modelID)}
                                className="text-red-600 hover:underline"
                            >
                                Xóa
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4 mb-4">
                    <select
                        value={selectedModelID}
                        onChange={(e) => setSelectedModelID(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">-- Chọn dòng xe --</option>
                        {vehicleModels.map((model) => (
                            <option key={model.modelID} value={model.modelID}>
                                {model.modelName} ({model.brandName})
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddModel}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Gắn dòng xe
                    </button>
                </div>

                <div className="text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VehicleModelLinker;
