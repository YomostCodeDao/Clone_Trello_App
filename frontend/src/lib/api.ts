import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE ?? "http://localhost:3000/api",
    withCredentials: true, // gửi/nhận cookie httpOnly refresh
});

let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => { accessToken = t };

api.interceptors.request.use((cfg) => {
    if (accessToken) cfg.headers.Authorization = `Bearer ${accessToken}`;
    return cfg;
});
