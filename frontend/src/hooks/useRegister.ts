// frontend/src/hooks/useRegister.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFactory, API_ENDPOINTS } from "@/shared/api";
import { tokenStorage } from "@/shared/utils/tokenStorage";
import type { RegisterRequest, AuthResponse } from "@/shared/types";

export const useRegister = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registerUser = async (formValues: RegisterRequest) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await apiFactory.post<AuthResponse>(
                API_ENDPOINTS.AUTH.REGISTER,
                formValues
            );

            // Lưu token và user
            tokenStorage.setAccessToken(response.accessToken);
            tokenStorage.setRefreshToken(response.refreshToken);
            tokenStorage.setUser(response.user);

            // Chuyển sang dashboard
            navigate("/dashboard");
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Registration failed";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        registerUser,
        isLoading,
        error,
    };
};
