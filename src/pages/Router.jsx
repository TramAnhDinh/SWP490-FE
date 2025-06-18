import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminPage from "./pages/AdminPage";
import AdminPage from "./pages/AdminPage";
import MemberPage from "./pages/MemberPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Component bảo vệ route dựa theo role
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.roleId)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<HomePage />} />

        {/* Đăng nhập */}
        <Route path="/login" element={<LoginPage />} />

        {/* Phân quyền truy cập */}
        <Route
          path="/Admin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["ROLE_MANAGER"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/designer"
          element={
            <ProtectedRoute allowedRoles={["ROLE_DESIGNER"]}>
              <MemberPage />
            </ProtectedRoute>
          }
        />

        {/* Mặc định nếu nhập sai đường dẫn */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
