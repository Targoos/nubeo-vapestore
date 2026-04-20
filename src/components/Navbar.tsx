import { useState } from "react";

export function Navbar() {
  const [cartCount] = useState(2);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-sm border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - left */}
          <a href="/" className="flex items-center">
            <span className="text-lg font-semibold tracking-[0.2em] text-white uppercase">
              NUBEO
            </span>
          </a>

          {/* Navigation Links - center */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink href="/equipos" active>EQUIPOS</NavLink>
            <NavLink href="/atomizadores">ATOMIZADORES</NavLink>
            <NavLink href="/repuestos">REPUESTOS</NavLink>
            <NavLink href="/esencias">ESENCIAS</NavLink>
          </div>

          {/* Cart - right */}
          <button
            className="relative flex items-center gap-2 px-4 py-2 bg-transparent text-white border border-[#00D4FF] rounded-md hover:bg-[#00D4FF]/10 transition-colors duration-200"
            aria-label="Shopping cart"
          >
            <CartIcon />
            <span className="text-xs font-medium tracking-wider text-[#00D4FF]">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#444444] hover:text-white transition-colors"
            aria-label="Menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

function NavLink({ href, children, active }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
        active ? "text-[#00D4FF]" : "text-[#444444] hover:text-white"
      }`}
    >
      {children}
    </a>
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
