import { useState } from "react";

export function Navbar() {
  const [cartCount] = useState(0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b-3 border-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - left */}
          <a href="/" className="flex items-center">
            <span className="text-2xl font-black tracking-[-0.08em] text-white uppercase">
              NUBEO
            </span>
          </a>

          {/* Navigation Links - center */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/equipos">EQUIPOS</NavLink>
            <NavLink href="/atomizadores">ATOMIZADORES</NavLink>
            <NavLink href="/repuestos">REPUESTOS</NavLink>
            <NavLink href="/esencias">ESENCIAS</NavLink>
          </div>

          {/* Cart - right */}
          <button
            className="relative p-3 bg-[#0a0a0a] text-white border-3 border-white hover:bg-[#FF2020] hover:border-[#FF2020] hover:text-white transition-all duration-100"
            aria-label="Shopping cart"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF2020] text-white text-xs font-black w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white border-2 border-white hover:bg-[#FF2020] hover:border-[#FF2020] transition-colors"
            aria-label="Menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm font-bold tracking-[0.1em] text-white uppercase hover:text-[#FF2020] transition-colors duration-100"
    >
      {children}
    </a>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1" fill="currentColor" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
      <path d="M6 6L5 2H2" />
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
      strokeWidth="2.5"
      strokeLinecap="square"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
