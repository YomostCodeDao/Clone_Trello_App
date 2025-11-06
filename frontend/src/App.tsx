// src/App.tsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import LoginPage from './pages/Login';
import WorkspacePage from './pages/Workspace';
import { ProtectedRoute, GuestOnlyRoute } from './router'; // Tạo Route Guard

export default function App() {
  return (
    <AuthProvider> {/* Bao bọc ứng dụng với AuthProvider */}
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />

        {/* Chỉ cho phép khách truy cập login và register */}
        <Route element={<GuestOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Các trang bảo vệ, chỉ cho phép truy cập khi đã đăng nhập */}
        <Route element={<ProtectedRoute />}>
          <Route path="/workspace" element={<WorkspacePage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
