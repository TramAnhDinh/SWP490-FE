import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeDetailPage = () => {
  const { employeeID } = useParams();
  const token = useSelector((state) => state.user?.token);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    storeID: "",
    isActive: false,
    accountUsername: "",
    accountRoleName: "",
    storeName: ""
  });

  useEffect(() => {
    if (!employeeID) {
      toast.error("Không tìm thấy mã nhân viên");
      navigate("/employees");
      return;
    }
    fetchEmployeeDetail();
  }, []);

  const fetchEmployeeDetail = async () => {
    try {
      const res = await fetch(
        `https://decalxeapi-production.up.railway.app/api/Employees/${employeeID}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (!res.ok) throw new Error("Không thể tải thông tin nhân viên");
      const data = await res.json();
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phoneNumber: data.phoneNumber || "",
        email: data.email || "",
        storeID: data.storeID || "",
        isActive: data.isActive,
        accountUsername: data.accountUsername || "",
        accountRoleName: data.accountRoleName || "",
        storeName: data.storeName || ""
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      storeID: formData.storeID
    };

    try {
      const res = await fetch(
        `https://decalxeapi-production.up.railway.app/api/Employees/${employeeID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );
      if (!res.ok) {
        const errorText = await res.text(); // xem chi tiết lỗi nếu có
        console.error("Update error:", errorText);
        throw new Error("Cập nhật thất bại.");
      }

      toast.success("Cập nhật thông tin thành công!");
      navigate("/employees");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };


  if (loading) return <div className="text-center mt-10">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">✏️ Cập Nhật Nhân Viên</h2>
        <form onSubmit={handleUpdate} className="space-y-4 text-sm">
          {/* Read-only info */}
          <div className="grid grid-cols-1 gap-3 bg-gray-100 p-3 rounded">
            <div><strong>Mã NV:</strong> {employeeID}</div>
            <div><strong>Tài khoản:</strong> {formData.accountUsername}</div>
            <div><strong>Vai trò:</strong> {formData.accountRoleName}</div>
            <div><strong>Cửa hàng:</strong> {formData.storeName}</div>
          </div>

          {/* Editable fields */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label>Họ</label>
              <input
                name="firstName"
                placeholder="Họ"
                className="w-full border p-2 rounded"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Tên</label>
              <input
                name="lastName"
                placeholder="Tên"
                className="w-full border p-2 rounded"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Số điện thoại</label>
              <input
                name="phoneNumber"
                placeholder="SĐT"
                className="w-full border p-2 rounded"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            {/* <div>
              <label>Email</label>
              <input
                name="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                value={formData.email}
                onChange={handleChange}
              />
            </div> */}
            <div>
              <label>Mã cửa hàng</label>
              <input
                name="storeID"
                placeholder="Mã cửa hàng"
                className="w-full border p-2 rounded"
                value={formData.storeID}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Trạng thái hoạt động</label>
              <select
                name="isActive"
                className="w-full border p-2 rounded"
                value={formData.isActive ? "true" : "false"}
                onChange={handleChange}
              >
                <option value="true">Đang hoạt động</option>
                <option value="false">Tạm khóa</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Quay lại
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {updating ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
