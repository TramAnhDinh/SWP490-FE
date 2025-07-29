import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Lock,
  Shield,
  Users,
  Palette,
  ShoppingCart,
  Wrench,
  ArrowRight,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    roleID: "",
  });

  const [availableRoles, setAvailableRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getRoleLabel = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "Quản trị viên";
      case "ROLE_MANAGER":
        return "Quản lý";
      case "ROLE_DESIGNER":
        return "Thiết kế viên";
      case "ROLE_SALES":
        return "Nhân viên bán hàng";
      case "ROLE_TECHNICIAN":
        return "Kỹ thuật viên";
      default:
        return role;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return Shield;
      case "ROLE_MANAGER":
        return Users;
      case "ROLE_DESIGNER":
        return Palette;
      case "ROLE_SALES":
        return ShoppingCart;
      case "ROLE_TECHNICIAN":
        return Wrench;
      default:
        return User;
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !userStr) {
      toast.error("Bạn cần đăng nhập để tạo tài khoản.");
      return;
    }

    const user = JSON.parse(userStr);
    const role = user.role;
    console.log("ROLE hiện tại:", role);

    if (role === "ROLE_ADMIN" || role === "Admin") {
      setAvailableRoles([
        "ROLE_MANAGER",
        "ROLE_DESIGNER",
        "ROLE_SALES",
        "ROLE_TECHNICIAN",
      ]);
    } else if (role === "ROLE_MANAGER" || role === "Manager") {
      setAvailableRoles([]);
    } else {
      setAvailableRoles([]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập trước.");
      setLoading(false);
      return;
    }

    if (!formData.username || !formData.password || !formData.roleID) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://decalxeapi-backend-production.up.railway.app/api/Auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Lỗi đăng ký:", errorData);
        throw new Error(
          errorData?.message || errorData?.title || "Đăng ký thất bại."
        );
      }

      toast.success("Đăng ký thành công!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.message || "Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Side - Register Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="animate-fade-in">
                <div className="text-center lg:text-left mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Tạo tài khoản mới
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Chỉ admin mới được tạo tài khoản cho nhân viên
                  </p>
                </div>

                {availableRoles.length === 0 ? (
                  <div className="animate-fade-in bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-red-700 mb-2">
                      Không có quyền
                    </h3>
                    <p className="text-red-600">
                      Bạn không có quyền tạo tài khoản. Chỉ admin mới có thể tạo tài khoản cho nhân viên.
                    </p>
                    <Link
                      to="/login"
                      className="inline-block mt-4 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                    >
                      Quay lại đăng nhập
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên đăng nhập
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="username"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Nhập tên đăng nhập"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          name="password"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Nhập mật khẩu"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vai trò
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          name="roleID"
                          value={formData.roleID}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                          required
                        >
                          <option value="">-- Chọn vai trò --</option>
                          {availableRoles.map((role) => {
                            const IconComponent = getRoleIcon(role);
                            return (
                              <option key={role} value={role}>
                                {getRoleLabel(role)}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Đang tạo tài khoản...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          Tạo tài khoản
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </div>
                      )}
                    </button>
                  </form>
                )}

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Đã có tài khoản?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Role Information */}
            <div className="hidden lg:block relative bg-gradient-to-br from-blue-600 to-purple-600">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative h-full flex items-center justify-center p-12">
                <div className="text-center text-white">
                  <div className="animate-fade-in">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-6">
                      Quản lý nhân viên
                    </h2>
                    <div className="space-y-4 text-left max-w-sm">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span className="text-sm">Quản lý cửa hàng</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span className="text-sm">Thiết kế decal</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span className="text-sm">Bán hàng</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span className="text-sm">Kỹ thuật lắp đặt</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Register;
