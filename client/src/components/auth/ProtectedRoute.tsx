import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "@/stores/authStore";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userData = useAuthStore((state) => state.userData);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-chart-2 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  if (!userData) {
    return <Navigate to="/auth" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
