import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/userSlice";
import { loadUserCart } from "../redux/slices/cartSlice";
import axios from "axios";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import xx from "../assets/xx.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://decalxeapi-backend-production.up.railway.app/api/Auth/login",
        { username, password }
      );

      const token = response.data?.token || response.data;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      dispatch(setUser({ token, role, username }));
      dispatch(loadUserCart());
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ username, role }));

      toast.success("Đăng nhập thành công!");

      setTimeout(() => {
        navigate(role === "Admin" ? "/order-tracking" : "/");
      }, 1000);
    } catch (err) {
      toast.error("Tài khoản hoặc mật khẩu không chính xác!");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!username) {
      toast.error("Vui lòng nhập tên đăng nhập.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await axios.post(
        "https://decalxeapi-backend-production.up.railway.app/api/Auth/reset-password-by-username",
        {
          username,
          newPassword,
          confirmNewPassword: confirmPassword,
        }
      );

      toast.success("Mật khẩu đã được cập nhật thành công!");
      setShowResetModal(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Cập nhật mật khẩu thất bại!");
    }
  };

  return (
    <section className="bg-[#dfa674] min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-7xl w-full p-12 items-center min-h-[600px]">
        <div className="w-full md:w-1/2 px-4 md:px-12">
          <h2 className="font-bold text-4xl text-[#915621]">Đăng nhập</h2>
          <p className="text-lg mt-4 text-[#915621]">Nếu bạn đã có tài khoản, hãy đăng nhập ngay.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-12">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type="text"
                className="pl-12 pr-4 py-3 w-full border rounded-xl text-lg"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type={showPassword ? "text" : "password"}
                className="pl-12 pr-12 py-3 w-full border rounded-xl text-lg"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="bg-[#915621] text-white py-3 rounded-xl hover:scale-105 duration-300 text-lg"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowResetModal(true)}
              className="text-indigo-600 hover:underline text-base"
            >
              Quên mật khẩu?
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between text-base">
            <p>Chưa có tài khoản?</p>
            <a href="/register" className="bg-[#915621] text-white py-2 px-6 rounded-xl hover:scale-105 font-semibold">
              Đăng ký
            </a>
          </div>
        </div>

        <div className="hidden md:block w-1/2 h-full">
          <img src={xx} alt="Login" className="rounded-2xl w-full h-[550px] object-cover" />
        </div>

        {/* Reset Password Modal */}
        {showResetModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-center mb-4">Quên mật khẩu</h3>
              <input
                type="text"
                className="w-full mb-3 border px-3 py-2 rounded"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                className="w-full mb-3 border px-3 py-2 rounded"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                className="w-full mb-3 border px-3 py-2 rounded"
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleResetPassword}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
};

export default Login;
