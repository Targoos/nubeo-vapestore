import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCart } from "../features/cart/CartContext";
import { useAuth } from "../features/auth/AuthContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems: cartCount } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCategoria = searchParams.get("categoria");

  const isCatalogActive =
    location.pathname === "/catalogo" && !currentCategoria;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-sm border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - left */}
          <Link to="/" className="flex items-center">
            <span className="text-lg font-semibold tracking-[0.2em] text-white uppercase">
              NUBEO
            </span>
          </Link>

          {/* Navigation Links - center */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/catalogo" active={isCatalogActive}>
              CATÁLOGO
            </NavLink>
            <NavLink
              to="/catalogo?categoria=equipos"
              active={currentCategoria === "equipos"}
            >
              EQUIPOS
            </NavLink>
            <NavLink
              to="/catalogo?categoria=atomizadores"
              active={currentCategoria === "atomizadores"}
            >
              ATOMIZADORES
            </NavLink>
            <NavLink
              to="/catalogo?categoria=repuestos"
              active={currentCategoria === "repuestos"}
            >
              REPUESTOS
            </NavLink>
            <NavLink
              to="/catalogo?categoria=esencias"
              active={currentCategoria === "esencias"}
            >
              ESENCIAS
            </NavLink>
          </div>

          {/* Right side: auth + cart */}
          <div className="flex items-center gap-3">
            {/* Autenticación: muestra MI CUENTA o INICIAR SESIÓN según el estado */}
            {user ? (
              <>
                <Link
                  to="/perfil"
                  className="text-xs font-medium tracking-[0.15em] text-[#444444] hover:text-white transition-colors uppercase hidden md:block"
                >
                  MI CUENTA
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-xs font-medium tracking-[0.15em] text-[#444444] hover:text-red-400 transition-colors uppercase hidden md:block"
                >
                  SALIR
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-xs font-medium tracking-[0.15em] text-[#444444] hover:text-white transition-colors uppercase hidden md:block"
              >
                INICIAR SESIÓN
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2 bg-transparent text-white border border-[#00D4FF] rounded-md hover:bg-[#00D4FF]/10 transition-colors duration-200"
              aria-label="Carrito de compras"
            >
              <CartIcon />
              <span className="text-xs font-medium tracking-wider text-[#00D4FF]">
                {cartCount}
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#444444] hover:text-white transition-colors"
              aria-label="Menú"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#080808] border-t border-[#1a1a1a] shadow-xl z-50">
          <div className="px-6 py-4 space-y-3">
            <NavLink to="/catalogo" active={isCatalogActive} mobile>
              CATÁLOGO
            </NavLink>
            <NavLink
              to="/catalogo?categoria=equipos"
              active={currentCategoria === "equipos"}
              mobile
            >
              EQUIPOS
            </NavLink>
            <NavLink
              to="/catalogo?categoria=atomizadores"
              active={currentCategoria === "atomizadores"}
              mobile
            >
              ATOMIZADORES
            </NavLink>
            <NavLink
              to="/catalogo?categoria=repuestos"
              active={currentCategoria === "repuestos"}
              mobile
            >
              REPUESTOS
            </NavLink>
            <NavLink
              to="/catalogo?categoria=esencias"
              active={currentCategoria === "esencias"}
              mobile
            >
              ESENCIAS
            </NavLink>

            <div className="pt-4 border-t border-[#1a1a1a] space-y-2">
              {user ? (
                <>
                  <Link
                    to="/perfil"
                    className="block py-3 text-xs font-medium tracking-[0.15em] text-[#444444] hover:text-white transition-colors uppercase"
                  >
                    MI CUENTA
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left py-3 text-xs font-medium tracking-[0.15em] text-[#444444] hover:text-red-400 transition-colors uppercase"
                  >
                    SALIR
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block py-3 text-xs font-medium tracking-[0.15em] text-[#444444] hover:text-white transition-colors uppercase"
                >
                  INICIAR SESIÓN
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  active?: boolean;
  mobile?: boolean;
}

function NavLink({ to, children, active, mobile }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`nav-link text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
        mobile ? "block py-3" : ""
      } ${active ? "text-[#00D4FF]" : "text-[#444444] hover:text-white"}`}
    >
      {children}
    </Link>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
