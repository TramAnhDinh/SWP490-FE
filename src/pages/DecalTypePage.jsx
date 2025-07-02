// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Trash2, PlusCircle } from "lucide-react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const DecalTypePage = () => {
//     const [decalTypes, setDecalTypes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedDecalTypeId, setSelectedDecalTypeId] = useState(null);
//     const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//     const [showCreateModal, setShowCreateModal] = useState(false);

//     const [decalTypeID, setDecalTypeID] = useState("");
//     const [decalTypeName, setDecalTypeName] = useState("");
//     const [material, setMaterial] = useState("");
//     const [width, setWidth] = useState("");
//     const [height, setHeight] = useState("");
//     const [creating, setCreating] = useState(false);

//     const token = useSelector((state) => state.user?.token);
//     const navigate = useNavigate();
//     const inputRef = useRef(null);

//     useEffect(() => {
//         fetchDecalTypes();
//     }, []);

//     useEffect(() => {
//         if (showCreateModal && inputRef.current) {
//             const timer = setTimeout(() => {
//                 inputRef.current.focus();
//             }, 100);
//             return () => clearTimeout(timer);
//         }
//     }, [showCreateModal]);

//     const fetchDecalTypes = async () => {
//         try {
//             const response = await fetch("https://decalxeapi-backend-production.up.railway.app/api/DecalTypes", {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Accept': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Không thể tải decal types.');
//             }

//             const data = await response.json();
//             setDecalTypes(data);
//         } catch (error) {
//             toast.error("Lỗi khi tải decal types.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCreateDecalType = async (e) => {
//         e.preventDefault();

//         if (!decalTypeID || !decalTypeName || !material || !width || !height) {
//             toast.error("Vui lòng nhập đầy đủ thông tin.");
//             return;
//         }

//         setCreating(true);

//         try {
//             const response = await fetch("https://decalxeapi-backend-production.up.railway.app/api/DecalTypes", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     decalTypeID,
//                     decalTypeName,
//                     material,
//                     width: parseFloat(width),
//                     height: parseFloat(height),
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData?.message || "Tạo decal type thất bại.");
//             }

//             toast.success("Tạo decal type thành công!");
//             resetForm();
//             setShowCreateModal(false);
//             fetchDecalTypes();
//         } catch (error) {
//             toast.error(error.message || "Lỗi kết nối đến máy chủ.");
//         } finally {
//             setCreating(false);
//         }
//     };

//     const resetForm = () => {
//         setDecalTypeID("");
//         setDecalTypeName("");
//         setMaterial("");
//         setWidth("");
//         setHeight("");
//     };

//     const handleDelete = (decalTypeID) => {
//         setSelectedDecalTypeId(decalTypeID);
//         setShowConfirmDialog(true);
//     };

//     const handleConfirmDelete = async () => {
//         try {
//             await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTypes/${selectedDecalTypeId}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                 },
//             });

//             toast.success("Xóa decal type thành công!");
//             fetchDecalTypes();
//             setShowConfirmDialog(false);
//             setSelectedDecalTypeId(null);
//         } catch (error) {
//             toast.error("Lỗi khi xóa decal type.");
//         }
//     };

//     if (loading) return <div className="text-center mt-10 text-lg">Đang tải decal types...</div>;

//     return (
//         <div className="max-w-6xl mx-auto p-4">
//             <ToastContainer position="top-right" autoClose={3000} />

//             {/* Modal Xác Nhận Xóa */}
//             {showConfirmDialog && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
//                         <h3 className="text-xl font-bold mb-4">Xác nhận xóa</h3>
//                         <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa decal type này?</p>
//                         <div className="flex justify-end gap-4">
//                             <button onClick={() => setShowConfirmDialog(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
//                                 Hủy
//                             </button>
//                             <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
//                                 Xóa
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Modal Tạo Decal Type */}
//             {showCreateModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
//                         <h3 className="text-xl font-bold mb-4 text-center">Tạo Decal Type Mới</h3>
//                         <form onSubmit={handleCreateDecalType} className="flex flex-col gap-4">
//                             <input
//                                 ref={inputRef}
//                                 type="text"
//                                 placeholder="ID Decal Type"
//                                 value={decalTypeID}
//                                 onChange={(e) => setDecalTypeID(e.target.value)}
//                                 className="border px-4 py-2 rounded"
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Tên Decal Type"
//                                 value={decalTypeName}
//                                 onChange={(e) => setDecalTypeName(e.target.value)}
//                                 className="border px-4 py-2 rounded"
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Chất liệu"
//                                 value={material}
//                                 onChange={(e) => setMaterial(e.target.value)}
//                                 className="border px-4 py-2 rounded"
//                                 required
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Chiều rộng (m)"
//                                 value={width}
//                                 onChange={(e) => setWidth(e.target.value)}
//                                 className="border px-4 py-2 rounded"
//                                 required
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Chiều cao (m)"
//                                 value={height}
//                                 onChange={(e) => setHeight(e.target.value)}
//                                 className="border px-4 py-2 rounded"
//                                 required
//                             />

//                             <div className="flex justify-end gap-3 mt-4">
//                                 <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Hủy</button>
//                                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={creating}>
//                                     {creating ? "Đang tạo..." : "Tạo"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Quản Lý Decal Types</h1>

//             <div className="flex justify-center mb-8">
//                 <button
//                     onClick={() => setShowCreateModal(true)}
//                     className="bg-green-500 text-white py-2 px-6 rounded-xl hover:bg-green-600"
//                 >
//                     <PlusCircle className="inline-block mr-2" /> Tạo Decal Type
//                 </button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {decalTypes.map((type) => (
//                     <div
//                         key={type.decalTypeID}
//                         className="border border-gray-200 p-6 rounded-2xl shadow-md bg-white flex flex-col justify-center items-center aspect-square hover:shadow-xl hover:scale-105 transition-transform duration-300 relative"
//                     >
//                         <div
//                             onClick={() => navigate(`/Decal-type/${type.decalTypeID}`)}
//                             className="flex flex-col justify-center items-center cursor-pointer w-full h-full"
//                         >
//                             <h2 className="text-xl font-bold text-gray-800 text-center mb-2">{type.decalTypeName}</h2>
//                             <p className="text-gray-600">Chất liệu: {type.material}</p>
//                             <p className="text-gray-600">Kích thước: {type.width}m x {type.height}m</p>
//                         </div>
//                         <button
//                             onClick={() => handleDelete(type.decalTypeID)}
//                             className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
//                         >
//                             <Trash2 size={16} />
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DecalTypePage;

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DecalTypePage = () => {
    const [decalTypes, setDecalTypes] = useState([]);
    const [loading, setLoading] = useState(true);

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
            const timer = setTimeout(() => {
                inputRef.current.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [showCreateModal]);

    const fetchDecalTypes = async () => {
        try {
            const response = await fetch("https://decalxeapi-backend-production.up.railway.app/api/DecalTypes", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Không thể tải decal types.');

            const data = await response.json();
            setDecalTypes(data);
        } catch (error) {
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
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    decalTypeID,
                    decalTypeName,
                    material,
                    width: parseFloat(width),
                    height: parseFloat(height),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || "Tạo decal type thất bại.");
            }

            toast.success("Tạo decal type thành công!");
            resetForm();
            setShowCreateModal(false);
            fetchDecalTypes();
        } catch (error) {
            toast.error(error.message || "Lỗi kết nối đến máy chủ.");
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

    const handleDelete = (decalTypeID) => {
        setSelectedDecalTypeId(decalTypeID);
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await fetch(`https://decalxeapi-backend-production.up.railway.app/api/DecalTypes/${selectedDecalTypeId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            toast.success("Xóa decal type thành công!");
            fetchDecalTypes();
            setShowConfirmDialog(false);
            setSelectedDecalTypeId(null);
        } catch (error) {
            toast.error("Lỗi khi xóa decal type.");
        }
    };

    if (loading) return <div className="text-center mt-10 text-lg">Đang tải decal types...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Modal xác nhận xóa */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-xl font-bold mb-4">Xác nhận xóa</h3>
                        <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa decal type này?</p>
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
            )}

            {/* Modal tạo decal type */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-xl font-bold mb-4 text-center">Tạo Decal Type Mới</h3>
                        <form onSubmit={handleCreateDecalType} className="flex flex-col gap-4">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="ID Decal Type"
                                value={decalTypeID}
                                onChange={(e) => setDecalTypeID(e.target.value)}
                                className="border px-4 py-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Tên Decal Type"
                                value={decalTypeName}
                                onChange={(e) => setDecalTypeName(e.target.value)}
                                className="border px-4 py-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Chất liệu"
                                value={material}
                                onChange={(e) => setMaterial(e.target.value)}
                                className="border px-4 py-2 rounded"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Chiều rộng (m)"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                className="border px-4 py-2 rounded"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Chiều cao (m)"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="border px-4 py-2 rounded"
                                required
                            />

                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Hủy</button>
                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={creating}>
                                    {creating ? "Đang tạo..." : "Tạo"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Quản Lý Decal Types</h1>

            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-green-500 text-white py-2 px-6 rounded-xl hover:bg-green-600"
                >
                    <PlusCircle className="inline-block mr-2" /> Tạo Decal Type
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Decal Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Decal Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất Liệu</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kích Thước</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {decalTypes.length > 0 ? (
                            decalTypes.map((type) => (
                                <tr key={type.decalTypeID} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{type.decalTypeID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{type.decalTypeName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{type.material}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{type.width}m x {type.height}m</td>
                                    <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                                        <button
                                            onClick={() => navigate(`/Decal-type/${type.decalTypeID}`)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Chi tiết
                                        </button>
                                        <button
                                            onClick={() => handleDelete(type.decalTypeID)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Không có decal type nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DecalTypePage;
