import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user?.token);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("https://decalxeapi-production.up.railway.app/api/Employees", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("Không thể tải danh sách nhân viên");
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      toast.error(err.message);
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
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
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

  const filteredEmployees = employees.filter((emp) => {
    const keyword = searchTerm.toLowerCase();
    return (
      emp.firstName.toLowerCase().includes(keyword) ||
      emp.lastName.toLowerCase().includes(keyword) ||
      emp.phoneNumber.includes(keyword) ||
      emp.accountRoleName.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto bg-white rounded shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">👥 Quản Lý Nhân Viên</h1>
        </div>

        <input
          type="text"
          placeholder="Tìm kiếm theo tên, sđt hoặc vai trò..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-4 py-2">Mã NV</th>
                <th className="px-4 py-2">Họ tên</th>
                <th className="px-4 py-2">SĐT</th>
                <th className="px-4 py-2">Cửa hàng</th>
                <th className="px-4 py-2">Vai trò</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.employeeID} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{emp.employeeID}</td>
                    <td className="px-4 py-2">{emp.firstName} {emp.lastName}</td>
                    <td className="px-4 py-2">{emp.phoneNumber}</td>
                    <td className="px-4 py-2">{emp.storeName}</td>
                    <td className="px-4 py-2">{emp.accountRoleName}</td>
                    <td className="px-4 py-2">
                      {emp.isActive ? (
                        <span className="text-green-600 font-medium">Đang hoạt động</span>
                      ) : (
                        <span className="text-red-500 font-medium">Tạm khóa</span>
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => navigate(`/employees/${emp.employeeID}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.employeeID)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">Không tìm thấy nhân viên nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
