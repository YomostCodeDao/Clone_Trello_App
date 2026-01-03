// frontend/src/features/auth/ui/RegisterForm.tsx
import React from "react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { useForm, Controller } from "react-hook-form";

interface RegisterFormProps {
    onSubmit: (data: { name: string; email: string; password: string }) => void;
    isLoading: boolean;
    error: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading, error }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Name Input */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id="name"
                            type="text"
                            placeholder="Your name"
                            disabled={isLoading}
                        />
                    )}
                />
                {errors.name && (
                    <span className="text-sm text-red-500">{errors.name.message}</span>
                )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            disabled={isLoading}
                        />
                    )}
                />
                {errors.email && (
                    <span className="text-sm text-red-500">{errors.email.message}</span>
                )}
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                    )}
                />
                {errors.password && (
                    <span className="text-sm text-red-500">{errors.password.message}</span>
                )}
            </div>

            {/* Error message */}
            {error && (
                <div className="text-sm text-red-500 text-center p-2 bg-red-50 rounded">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Signing up..." : "Sign up"}
            </Button>

            {/* Google sign-up Button */}
            <Button variant="outline" className="w-full" disabled={isLoading}>
                Sign up with Google
            </Button>

            {/* Link to Login Page */}
            <p className="px-1 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a href="/login" className="underline hover:underline text-primary">
                    Login
                </a>
            </p>
        </form>
    );
};

export default RegisterForm;
