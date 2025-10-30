import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import { ProtectedRoute, GuestOnlyRoute } from "@/router"; // nếu bạn đã có guard

export default function App() {
  return (
    <Routes>
      {/* mở "/" → về /login */}
      <Route index element={<Navigate to="/login" replace />} />

      {/* Khách mới: login + register */}
      <Route element={<GuestOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Bảo vệ: đã đăng nhập */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
