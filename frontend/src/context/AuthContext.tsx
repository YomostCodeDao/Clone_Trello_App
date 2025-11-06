// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Định nghĩa interface cho context
interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Tạo Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const login = (email: string, password: string) => {
        // Logic đăng nhập giả lập, thay bằng API thật
        if (email && password) {
            setIsAuthenticated(true);
            navigate("/workspace");  // Chuyển đến workspace khi đăng nhập thành công
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        navigate("/login");  // Quay lại trang đăng nhập
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook để sử dụng AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
