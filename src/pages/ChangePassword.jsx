import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", content: "" });

    if (newPassword !== confirmNewPassword) {
      return setMessage({ type: "error", content: "Mật khẩu mới và xác nhận không khớp!" });
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Bạn chưa đăng nhập.");

      await axios.put(
        "https://decalxeapi-backend-production.up.railway.app/api/Auth/change-password",
        {
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({ type: "success", content: "Đổi mật khẩu thành công!" });
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setMessage({
        type: "error",
        content: err.response?.data?.message || "Đổi mật khẩu thất bại!",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#fff6e9] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#915621] text-center">Đổi mật khẩu</h2>

        <input
          type="password"
          placeholder="Mật khẩu hiện tại"
          className="w-full p-3 border rounded-xl"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mật khẩu mới"
          className="w-full p-3 border rounded-xl"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Xác nhận mật khẩu mới"
          className="w-full p-3 border rounded-xl"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />

        {message.content && (
        <div
            className={`p-3 text-sm rounded-md text-center ${
                message.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
        }`}
        >
            {message.content}
        </div>
    )}

        <button
          type="submit"
          className="w-full bg-[#915621] text-white py-3 rounded-xl hover:scale-105 duration-300">Xác nhận đổi mật khẩu</button>
      </form>
    </section>
  );
};

export default ChangePassword;
