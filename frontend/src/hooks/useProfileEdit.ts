// frontend/src/hooks/useProfileEdit.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "@/shared/utils/tokenStorage";
import { apiFactory, API_ENDPOINTS } from "@/shared/api";
import type { User } from "@/shared/types";

export const useProfileEdit = () => {
    const navigate = useNavigate();
    const user = tokenStorage.getUser();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (data: { name: string; bio: string; avatar?: FileList }) => {
        setError(null);
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("bio", data.bio);
            if (data.avatar && data.avatar[0]) {
                formData.append("avatar", data.avatar[0]);
            }

            // Chỉnh sửa lại cú pháp truyền đối số cho apiFactory.put
            const response = await apiFactory.put(
                `${API_ENDPOINTS.AUTH.PROFILE.replace("{userId}", user?.id ?? "")}`,
                formData, // Đây là dữ liệu body (FormData)
                { headers: { "Content-Type": "multipart/form-data" } } // Cấu hình headers như một đối số duy nhất
            );

            const updatedUser: User = response.data.responseObject;
            tokenStorage.setUser(updatedUser);

            navigate("/profile");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Update failed";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { updateProfile, isLoading, error, user };
};
