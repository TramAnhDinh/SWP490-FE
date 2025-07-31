import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  User,
  Phone,
  Mail,
  Building2,
  Shield,
  Calendar,
  Edit,
  Save,
  X,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  MapPin,
  Briefcase,
  Clock,
  FileText,
  Settings,
  UserCheck,
  UserX
} from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";

const EmployeeDetailPage = () => {
  const { employeeID } = useParams();
  const token = useSelector((state) => state.user?.token);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
    setLoading(true);
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
      storeID: formData.storeID,
      isActive: formData.isActive,
      accountUsername: formData.accountUsername,
      accountRoleName: formData.accountRoleName
    };

    try {
      console.log("Sending payload:", payload);
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
        const errorText = await res.text();
        console.error("Update error:", errorText);
        throw new Error("Cập nhật thất bại.");
      }

      const responseText = await res.text();
      console.log("Update response:", responseText);

      toast.success("Cập nhật thông tin thành công!");
      setIsEditing(false);
      fetchEmployeeDetail();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Manager':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Designer':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Sales':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Technician':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (isActive) => {
    return isActive ? <UserCheck className="w-5 h-5 text-green-600" /> : <UserX className="w-5 h-5 text-red-600" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Đang tải thông tin nhân viên...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/employees')}
                className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Chi tiết nhân viên
                </h1>
                <p className="text-gray-600">
                  Quản lý thông tin chi tiết của nhân viên #{employeeID}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Edit className="w-5 h-5" />
                  <span>Chỉnh sửa</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleUpdate}
                    disabled={updating}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
                  >
                    {updating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Đang lưu...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Lưu</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-200 flex items-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Hủy</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-gray-600">Nhân viên #{employeeID}</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Employee Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Nhập họ"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-gray-900 font-medium">{formData.firstName}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Nhập tên"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-gray-900 font-medium">{formData.lastName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Nhập số điện thoại"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-gray-900 font-medium">{formData.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-gray-900 font-medium">{formData.email || "Chưa cập nhật"}</span>
                    </div>
                  </div>
                </div>

                {/* Store and Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cửa hàng
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-gray-900 font-medium">{formData.storeName}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vai trò
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getRoleColor(formData.accountRoleName)}`}>
                        {formData.accountRoleName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status and Store ID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trạng thái
                    </label>
                    {isEditing ? (
                      <select
                        name="isActive"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={formData.isActive ? "true" : "false"}
                        onChange={handleChange}
                      >
                        <option value="true">Đang hoạt động</option>
                        <option value="false">Tạm khóa</option>
                      </select>
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(formData.isActive)}
                          <span className={`font-medium ${formData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {formData.isActive ? "Đang hoạt động" : "Tạm khóa"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mã cửa hàng
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="storeID"
                        placeholder="Nhập mã cửa hàng"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={formData.storeID}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-gray-900 font-medium">#{formData.storeID}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Details */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <Settings className="w-6 h-6 text-blue-600" />
                <span>Thông tin chi tiết</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tài khoản</p>
                      <p className="text-sm font-medium text-gray-900">{formData.accountUsername}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="text-sm font-medium text-gray-900">{formData.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cửa hàng</p>
                      <p className="text-sm font-medium text-gray-900">{formData.storeName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Vai trò</p>
                      <p className="text-sm font-medium text-gray-900">{formData.accountRoleName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Employee Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Thông tin nhân viên</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Mã nhân viên</span>
                  <span className="text-sm font-medium text-gray-900">#{employeeID}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">Trạng thái</span>
                  <span className={`text-sm font-medium ${formData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {formData.isActive ? "Hoạt động" : "Tạm khóa"}
                  </span>
                </div>
                {/* <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-600">Ngày tạo</span>
                  <span className="text-sm font-medium text-gray-900">N/A</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm text-gray-600">Lần cập nhật</span>
                  <span className="text-sm font-medium text-gray-900">N/A</span>
                </div> */}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/employees')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-gray-700">Quay lại danh sách</span>
                  <ArrowLeft className="w-4 h-4 text-gray-500" />
                </button>
                {/* <button
                  onClick={() => window.print()}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-gray-700">In thông tin</span>
                  <FileText className="w-4 h-4 text-gray-500" />
                </button> */}
                <button
                  onClick={() => navigate(`/employees/${employeeID}/schedule`)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-gray-700">Lịch làm việc</span>
                  <Clock className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Work Schedule */}
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Lịch làm việc</span>
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Thứ 2 - Thứ 6</span>
                  <span className="text-sm font-medium text-gray-900">8:00 - 18:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Thứ 7</span>
                  <span className="text-sm font-medium text-gray-900">8:00 - 17:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Chủ nhật</span>
                  <span className="text-sm font-medium text-gray-900">Nghỉ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
