import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function PrivateRoute({
  children,
  requireAdmin = false,
}: PrivateRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-[#444444] text-sm tracking-widest uppercase animate-pulse">
          Verificando sesión...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.user_metadata?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
