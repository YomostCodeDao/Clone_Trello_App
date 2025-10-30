import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export function ProtectedRoute() {
    const { user, loading } = useAuth();
    const loc = useLocation();
    if (loading) return <div className="text-white p-8">Loading…</div>;
    if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;
    return <Outlet />;
}

export function GuestOnlyRoute() {
    const { user, loading } = useAuth();
    if (loading) return <div className="text-white p-8">Loading…</div>;
    if (user) return <Navigate to="/" replace />;
    return <Outlet />;
}
