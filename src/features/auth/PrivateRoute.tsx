import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

// PrivateRoute actúa como guardia de ruta: el equivalente al
// "beforeEach" + "meta: { requiresAuth: true }" de Vue Router.
//
// Si el usuario no está autenticado, lo manda a /login.
// Pasamos { state: { from: location } } para que LoginPage pueda
// redirigirlo de vuelta a la página que intentaba visitar.
//
// Ejemplo: el usuario intenta ir a /checkout sin estar logueado.
// → Redirige a /login?from=/checkout (via state)
// → Tras loguearse, LoginPage lee ese state y lo lleva a /checkout

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Mientras Supabase verifica si hay sesión guardada, mostramos
  // una pantalla de carga en vez de redirigir prematuramente a /login.
  // Sin esto, un usuario logueado vería el login por un instante al recargar.
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
    // "replace" reemplaza la entrada en el historial del navegador.
    // Si no lo usáramos, el usuario podría presionar "Atrás" y volver
    // a la página protegida (que lo volvería a redirigir al login).
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
