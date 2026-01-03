// frontend/src/features/auth/ui/LoginForm.tsx
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";

import { tokenStorage } from "@/shared/utils/tokenStorage" // nếu chưa import
import type { OAuthResult } from "@/shared/types";

import { useAuth } from "../model";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ROUTES } from "@/shared/config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

interface OAuthFormProps {
  onSuccess: (result: OAuthResult) => void;
}


export const LoginForm = ({ onSuccess }: OAuthFormProps) => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      setLoginError(null)
      const result = await login(data.email, data.password)

      // ⚠️ Kiểm tra cấu trúc trả về
      console.log("Login result:", result)

      // Nếu result có dạng { responseObject: { user, accessToken, refreshToken } }
      const { user, accessToken, refreshToken } = result

      tokenStorage.setUser(user)
      tokenStorage.setAccessToken(accessToken)
      tokenStorage.setRefreshToken(refreshToken)

      if (onSuccess) {
        onSuccess(result);
      } else {
        navigate(ROUTES.DASHBOARD)
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Login failed")
    }
  }


  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input {...field} id="email" type="email" disabled={isLoading} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input {...field} id="password" type="password" disabled={isLoading} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              {loginError && (
                <div className="text-sm text-red-500 text-center p-2 bg-red-50 rounded">
                  {loginError}
                </div>
              )}
              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register" className="underline">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
