// frontend/src/pages/RegisterPage/RegisterPage.tsx
import RegisterForm from "@/features/auth/ui/RegisterForm";
import { useRegister } from "@/hooks/useRegister";

export const RegisterPage = () => {
    const { registerUser, isLoading, error } = useRegister();

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-6 border rounded-xl shadow-xl">
                <RegisterForm
                    onSubmit={registerUser}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </div>
    );
};
