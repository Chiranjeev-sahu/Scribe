import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "@/stores/authStore";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userData = useAuthStore((state) => state.userData);

  if (!userData) {
    return <Navigate to="/auth" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
