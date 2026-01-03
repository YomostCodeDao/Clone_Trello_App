// frontend/src/shared/types/index.ts
export interface User {
  id: string;
  email: string;
  name: string ; //không để name null được
  bio: string | null;
  avatarUrl: string | null;
//   isActive: boolean;
//   googleId: string | null;
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
}

export interface Workspace {
  id: string;
  title: string;
  description: string | null;
  visibility: 'private' | 'public';
  updatedAt: string;
  createdAt: string;
}

// DTO for login/register responses
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// DTO for login request
export interface LoginRequest {
  email: string;
  password: string;
}

// DTO for register request
export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

// DTO for update user profile
export interface UpdateUserRequest {
  name?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface OAuthResult {
  accessToken: string;
  refreshToken: string;
  user: User;
}
// frontend/src/shared/types/index.ts

export interface Board {
  id: string
  name: string
  description?: string | null
  lists?: number
  members?: number
}

export interface Workspace {
  id: string
  title: string
  description: string | null
  visibility: "private" | "public"
  updatedAt: string
  createdAt: string
  boards?: Board[] // thêm optional
}

