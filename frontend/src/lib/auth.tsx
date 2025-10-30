import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAccessToken } from "@/lib/api";

type User = { id: string; email: string; name?: string | null };
type Ctx = {
    user: User | null;
    loading: boolean;
    error?: string;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name?: string) => Promise<void>;
};
const AuthCtx = createContext<Ctx>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    // Interceptor: nếu 401 thì thử refresh, fail => về /login
    useEffect(() => {
        let isRefreshing = false;
        let queue: ((t: string | null) => void)[] = [];
        const flush = (t: string | null) => { queue.forEach(fn => fn(t)); queue = [] };

        const id = api.interceptors.response.use(
            r => r,
            async (err) => {
                const original = err.config;
                if (err.response?.status === 401 && !original._retry) {
                    original._retry = true;
                    if (!isRefreshing) {
                        isRefreshing = true;
                        try {
                            const r = await api.post("/auth/refresh");         // cookie httpOnly
                            const t = r.data?.accessToken as string;
                            setAccessToken(t);
                            try { const me = await api.get("/auth/me"); setUser(me.data.user); } catch { }
                            flush(t);
                        } catch {
                            setAccessToken(null);
                            setUser(null);
                            flush(null);
                            navigate("/login", { replace: true });
                        } finally { isRefreshing = false; }
                    }
                    return new Promise((resolve, reject) => {
                        queue.push((t) => {
                            if (!t) return reject(err);
                            original.headers.Authorization = `Bearer ${t}`;
                            resolve(api(original));
                        });
                    });
                }
                return Promise.reject(err);
            }
        );
        return () => api.interceptors.response.eject(id);
    }, [navigate]);

    // Khởi động: thử refresh để phục hồi phiên
    useEffect(() => {
        (async () => {
            try {
                const r = await api.post("/auth/refresh");
                setAccessToken(r.data.accessToken);
                const me = await api.get("/auth/me");
                setUser(me.data.user);
            } catch {
                setAccessToken(null);
                setUser(null);
            } finally { setLoading(false); }
        })();
    }, []);

    const login = async (email: string, password: string) => {
        setError(undefined);
        const res = await api.post("/auth/login", { email, password });
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
    };

    const register = async (email: string, password: string, name?: string) => {
        const res = await api.post("/auth/register", { email, password, name });
        setAccessToken(res.data.accessToken); // BE trả token ngay → đăng nhập luôn
        setUser(res.data.user);
    };

    const logout = async () => {
        try { await api.post("/auth/logout"); } catch { }
        setAccessToken(null);
        setUser(null);
        navigate("/login", { replace: true });
    };

    const value = useMemo(() => ({ user, loading, error, login, logout, register }), [user, loading, error]);
    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => {
    const ctx = useContext(AuthCtx);
    if (!ctx) {
        throw new Error("useAuth must be used within <AuthProvider>");
    }
    return ctx;
};
