import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
