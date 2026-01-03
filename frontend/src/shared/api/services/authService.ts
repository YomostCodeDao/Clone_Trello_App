/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFactory, API_ENDPOINTS } from "../index"
import type { ServiceResponse } from "@/shared/model/service-response"
import type { User } from "@/shared/types"

// ✅ TokenData chỉ cần khai báo 1 lần
export interface TokenData {
  accessToken: string
  refreshToken: string
  expiresIn?: string
  tokenType?: string
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

// ✅ FIX: authService return ServiceResponse trực tiếp (không có ApiResponse wrapper)
export type LoginResponse = ServiceResponse<TokenData>

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export const authService = {
  // ✅ Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
  },

  // ✅ Register
  register: async (data: RegisterRequest): Promise<ServiceResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.REGISTER, data)
  },

  // ✅ Logout
  logout: async (): Promise<ServiceResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.LOGOUT)
  },

  // ✅ Refresh Token
  refreshToken: async (refreshToken: string): Promise<ServiceResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken })
  },

  // ✅ Forgot Password
  forgotPassword: async (email: string): Promise<ServiceResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
  },

  // ✅ Reset Password
  resetPassword: async (
    accessToken: string,
    newPassword: string
  ): Promise<ServiceResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      accessToken,
      newPassword,
    })
  },
}
