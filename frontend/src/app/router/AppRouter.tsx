// frontend/src/app/router/AppRouter.tsx
import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { PageLoader } from "@/shared/components/Loader";

const HomePage = lazy(() =>
  import("@/pages/HomePage/HomePage").then(module => ({ default: module.HomePage }))
);
const LoginPage = lazy(() =>
  import("@/pages/LoginPage/LoginPage").then(module => ({ default: module.LoginPage }))
);
const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage/DashboardPage")
);
const ResultPage = lazy(() =>
  import("@/pages/HomePage/ResultPage").then(module => ({ default: module.ResultPage }))
);
const RegisterPage = lazy(() =>
  import("@/pages/RegisterPage/RegisterPage").then(module => ({ default: module.RegisterPage }))
);
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage/ProfilePage").then(module => ({ default: module.ProfilePage }))
);
const ProfileEditPage = lazy(() =>
  import("@/pages/ProfilePage/ProfileEditPage").then(module => ({ default: module.ProfileEditPage }))
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.RESULT} element={<ResultPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
      </Routes>
    </Suspense>
  );
};
