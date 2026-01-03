// frontend/src/pages/LoginPage/LoginPage.tsx
import { LoginForm } from "@/features/auth/ui";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "@/shared/utils/tokenStorage";
import type { User } from "@/shared/types";

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleSuccess = (result: {
    accessToken: string;
    refreshToken: string;
    user: User; // ✅ dùng kiểu rõ ràng
  }) => {
    tokenStorage.setAccessToken(result.accessToken);
    tokenStorage.setRefreshToken(result.refreshToken);
    tokenStorage.setUser(result.user);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 border rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Login Page</h1>
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};
