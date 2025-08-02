// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import {
//   Search,
//   Trash2,
//   Edit,
//   Plus,
//   Users,
//   UserCheck,
//   UserX,
//   Phone,
//   Building2,
//   Shield,
//   RefreshCw,
//   AlertTriangle,
//   Eye
// } from 'lucide-react';
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const EmployeePage = () => {
//   const [employees, setEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const token = useSelector((state) => state.user?.token);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://decalxeapi-production.up.railway.app/api/Employees", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (!response.ok) throw new Error("Không thể tải danh sách nhân viên");
//       const data = await response.json();
//       setEmployees(data);
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     toast.info(
//       <div>
//         <p>Bạn có chắc chắn muốn xóa nhân viên này?</p>
//         <div className="flex justify-end gap-2 mt-2">
//           <button
//             onClick={async () => {
//               try {
//                 await fetch(`https://decalxeapi-production.up.railway.app/api/Employees/${id}`, {
//                   method: "DELETE",
//                   headers: {
//                     Authorization: `Bearer ${token}`
//                   }
//                 });
//                 toast.dismiss();
//                 toast.success("Xóa nhân viên thành công!");
//                 fetchEmployees();
//               } catch {
//                 toast.error("Lỗi khi xóa nhân viên.");
//               }
//             }}
//             className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Xóa
//           </button>
//           <button
//             onClick={() => toast.dismiss()}
//             className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Hủy
//           </button>
//         </div>
//       </div>,
//       { autoClose: false }
//     );
//   };

//   const getRoleColor = (role) => {
//     switch (role) {
//       case 'Admin':
//         return 'bg-red-100 text-red-800';
//       case 'Manager':
//         return 'bg-blue-100 text-blue-800';
//       case 'Designer':
//         return 'bg-purple-100 text-purple-800';
//       case 'Sales':
//         return 'bg-green-100 text-green-800';
//       case 'Technician':
//         return 'bg-orange-100 text-orange-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusIcon = (isActive) => {
//     return isActive ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />;
//   };

//   const filteredEmployees = employees.filter((emp) => {
//     // Ẩn các nhân viên có role Admin
//     if (emp.accountRoleName === "Admin") {
//       return false;
//     }

//     const keyword = searchTerm.toLowerCase();
//     const matchesSearch =
//       emp.firstName.toLowerCase().includes(keyword) ||
//       emp.lastName.toLowerCase().includes(keyword) ||
//       emp.phoneNumber.includes(keyword) ||
//       emp.accountRoleName.toLowerCase().includes(keyword);

//     const matchesFilter = filterStatus === "all" ||
//       (filterStatus === "active" && emp.isActive) ||
//       (filterStatus === "inactive" && !emp.isActive);

//     return matchesSearch && matchesFilter;
//   });

//   const stats = {
//     total: employees.filter(emp => emp.accountRoleName !== "Admin").length,
//     active: employees.filter(emp => emp.isActive && emp.accountRoleName !== "Admin").length,
//     inactive: employees.filter(emp => !emp.isActive && emp.accountRoleName !== "Admin").length
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8 animate-fade-in">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">
//                 Quản lý nhân viên
//               </h1>
//               <p className="text-gray-600">
//                 Quản lý tất cả nhân viên trong hệ thống
//               </p>
//             </div>
//             <button
//               onClick={() => navigate('/register')}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Thêm nhân viên</span>
//             </button>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Tổng nhân viên</p>
//                   <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                   <Users className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
//                   <p className="text-3xl font-bold text-green-600">{stats.active}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <UserCheck className="w-6 h-6 text-green-600" />
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Tạm khóa</p>
//                   <p className="text-3xl font-bold text-red-600">{stats.inactive}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//                   <UserX className="w-6 h-6 text-red-600" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
//           {/* Search and Filter */}
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex flex-col lg:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Tìm kiếm theo tên, sđt hoặc vai trò..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 >
//                   <option value="all">Tất cả trạng thái</option>
//                   <option value="active">Đang hoạt động</option>
//                   <option value="inactive">Tạm khóa</option>
//                 </select>
//                 <button
//                   onClick={fetchEmployees}
//                   disabled={loading}
//                   className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
//                 >
//                   <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Mã NV
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Họ tên
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     SĐT
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Cửa hàng
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Vai trò
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Trạng thái
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Hành động
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-8 text-center">
//                       <div className="flex items-center justify-center">
//                         <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mr-2" />
//                         <span className="text-gray-600">Đang tải...</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : filteredEmployees.length > 0 ? (
//                   filteredEmployees.map((emp) => (
//                     <tr key={emp.employeeID} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="text-sm font-medium text-gray-900">
//                           #{emp.employeeID}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                             <Users className="w-4 h-4 text-blue-600" />
//                           </div>
//                           <span className="text-sm font-medium text-gray-900">
//                             {emp.firstName} {emp.lastName}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <Phone className="w-4 h-4 text-gray-400 mr-2" />
//                           <span className="text-sm text-gray-900">{emp.phoneNumber}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <Building2 className="w-4 h-4 text-gray-400 mr-2" />
//                           <span className="text-sm text-gray-900">{emp.storeName}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getRoleColor(emp.accountRoleName)}`}>
//                           {emp.accountRoleName}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           {getStatusIcon(emp.isActive)}
//                           <span className={`ml-2 text-sm font-medium ${emp.isActive ? 'text-green-600' : 'text-red-600'}`}>
//                             {emp.isActive ? "Đang hoạt động" : "Tạm khóa"}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex items-center space-x-3">
//                           <button
//                             onClick={() => navigate(`/employees/${emp.employeeID}`)}
//                             className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
//                             title="Xem chi tiết"
//                           >
//                             <Eye className="w-4 h-4" />
//                             <span>Chi tiết</span>
//                           </button>
//                           <button
//                             onClick={() => handleDelete(emp.employeeID)}
//                             className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1"
//                             title="Xóa"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             <span>Xóa</span>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-12 text-center">
//                       <div className="text-gray-500">
//                         <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">Không có nhân viên nào</p>
//                         <p className="text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeePage;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Trash2,
  Plus,
  Users,
  UserCheck,
  UserX,
  Eye,
  RefreshCw
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    employeeID: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    storeID: "",
    storeName: "",
    accountID: "",
    accountUsername: "",
    accountRoleName: "",
    isActive: true
  });
  const token = useSelector((state) => state.user?.token);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://decalxeapi-production.up.railway.app/api/Employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Không thể tải danh sách nhân viên");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    toast.info(
      <div>
        <p>Bạn có chắc chắn muốn xóa nhân viên này?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={async () => {
              try {
                await fetch(`https://decalxeapi-production.up.railway.app/api/Employees/${id}`, {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${token}` },
                });
                toast.dismiss();
                toast.success("Xóa nhân viên thành công!");
                fetchEmployees();
              } catch {
                toast.error("Lỗi khi xóa nhân viên.");
              }
            }}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://decalxeapi-production.up.railway.app/api/Employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Lỗi khi thêm nhân viên");
      toast.success("Thêm nhân viên thành công!");
      setFormData({
        employeeID: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        storeID: "",
        storeName: "",
        accountID: "",
        accountUsername: "",
        accountRoleName: "",
        isActive: true,
      });
      setFormVisible(false);
      fetchEmployees();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      Admin: "bg-red-100 text-red-800",
      Manager: "bg-blue-100 text-blue-800",
      Designer: "bg-purple-100 text-purple-800",
      Sales: "bg-green-100 text-green-800",
      Technician: "bg-orange-100 text-orange-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (isActive) =>
    isActive ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />;

  const filteredEmployees = employees.filter((emp) => {
    if (emp.accountRoleName === "Admin") return false;
    const keyword = searchTerm.toLowerCase();
    const matchesSearch =
      emp.firstName.toLowerCase().includes(keyword) ||
      emp.lastName.toLowerCase().includes(keyword) ||
      emp.phoneNumber.includes(keyword) ||
      emp.accountRoleName.toLowerCase().includes(keyword);
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && emp.isActive) ||
      (filterStatus === "inactive" && !emp.isActive);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: employees.filter(emp => emp.accountRoleName !== "Admin").length,
    active: employees.filter(emp => emp.isActive && emp.accountRoleName !== "Admin").length,
    inactive: employees.filter(emp => !emp.isActive && emp.accountRoleName !== "Admin").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Quản lý nhân viên</h1>
            <p className="text-gray-600">Quản lý tất cả nhân viên trong hệ thống</p>
          </div>
          <button
            onClick={() => setFormVisible(!formVisible)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Thêm nhân viên
          </button>
        </div>

        {formVisible && (
          <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              // { label: "Mã NV", name: "employeeID" },
              { label: "Họ", name: "firstName" },
              { label: "Tên", name: "lastName" },
              { label: "SĐT", name: "phoneNumber" },
              { label: "Địa chỉ", name: "address" },
              { label: "ID cửa hàng", name: "storeID" },
              { label: "Tên cửa hàng", name: "storeName" },
              { label: "Account ID", name: "accountID" },
              { label: "Username", name: "accountUsername" },
              { label: "Vai trò", name: "accountRoleName" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            ))}
            <div className="flex items-center col-span-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleFormChange}
                className="mr-2"
              />
              <label>Hoạt động</label>
            </div>
            <div className="col-span-2 flex justify-end">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Thêm mới
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<Users />} label="Tổng nhân viên" value={stats.total} color="blue" />
          <StatCard icon={<UserCheck />} label="Đang hoạt động" value={stats.active} color="green" />
          <StatCard icon={<UserX />} label="Tạm khóa" value={stats.inactive} color="red" />
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm theo tên, sđt hoặc vai trò..."
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border rounded-xl"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Tạm khóa</option>
              </select>
              <button
                onClick={fetchEmployees}
                disabled={loading}
                className="px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Mã NV", "Họ tên", "SĐT", "Cửa hàng", "Vai trò", "Trạng thái", "Hành động"].map((h, i) => (
                    <th key={i} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="7" className="py-8 text-center">Đang tải...</td></tr>
                ) : filteredEmployees.length ? (
                  filteredEmployees.map(emp => (
                    <tr key={emp.employeeID} className="hover:bg-gray-50">
                      <td className="px-6 py-4">#{emp.employeeID}</td>
                      <td className="px-6 py-4">{emp.firstName} {emp.lastName}</td>
                      <td className="px-6 py-4">{emp.phoneNumber}</td>
                      <td className="px-6 py-4">{emp.storeName}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getRoleColor(emp.accountRoleName)}`}>
                          {emp.accountRoleName}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        {getStatusIcon(emp.isActive)}
                        <span className={`text-sm ${emp.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          {emp.isActive ? "Đang hoạt động" : "Tạm khóa"}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-3">
                        <button onClick={() => navigate(`/employees/${emp.employeeID}`)} className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(emp.employeeID)} className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7" className="py-12 text-center text-gray-500">Không có nhân viên nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center`}>
        {React.cloneElement(icon, { className: `w-6 h-6 text-${color}-600` })}
      </div>
    </div>
  </div>
);

export default EmployeePage;

