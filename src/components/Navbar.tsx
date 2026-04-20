import { useState } from "react";

export function Navbar() {
  const [cartCount] = useState(0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b-4 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-3xl font-black tracking-tighter text-white uppercase">
              NUBEO
            </span>
          </a>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink href="/equipos">EQUIPOS</NavLink>
            <NavLink href="/atomizadores">ATOMIZADORES</NavLink>
            <NavLink href="/repuestos">REPUESTOS</NavLink>
            <NavLink href="/esencias">ESENCIAS</NavLink>
          </div>

          {/* Cart */}
          <button
            className="relative p-3 bg-[#FFE600] text-black border-4 border-black shadow-[4px_4px_0px_0px_#fff] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-150"
            aria-label="Shopping cart"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-black w-6 h-6 flex items-center justify-center border-2 border-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white border-2 border-white"
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
      className="px-4 py-2 text-sm font-bold tracking-wide text-white uppercase hover:bg-[#FFE600] hover:text-black transition-colors duration-150 border-2 border-transparent hover:border-black"
    >
      {children}
    </a>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
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
      strokeWidth="3"
      strokeLinecap="square"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
