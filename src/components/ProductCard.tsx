import { Link } from "react-router-dom";

interface ProductCardProps {
  slug: string;
  name: string;
  brand?: string;
  price: number;
  image?: string;
  visible?: boolean;
  onAddToCart?: () => void;
}

export function ProductCard({ slug, name, brand, price, visible = true, onAddToCart }: ProductCardProps) {
  return (
    <Link
      to={`/producto/${slug}`}
      className={`group relative bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg overflow-hidden transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#00D4FF44] block ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionProperty: "opacity, transform, border-color", transitionDuration: "0.6s, 0.2s, 0.2s" }}
    >
      {/* Product image area */}
      <div className="relative aspect-square bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
        <div className="w-24 h-32 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-lg" />

        {/* Quick add overlay — stopPropagation para que el click no navegue */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart?.(); }}
            className="px-6 py-2.5 bg-[#00D4FF] text-black text-xs font-semibold uppercase tracking-[0.1em] rounded-md hover:bg-[#00D4FF]/90 transition-colors cursor-pointer"
          >
            AGREGAR
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        {/* Marca o categoría — solo se muestra si el dato está disponible */}
        {brand && (
          <span className="text-xs text-[#444444] uppercase tracking-[0.1em]">
            {brand}
          </span>
        )}

        {/* Name */}
        <h3 className="mt-1 text-sm font-medium text-white line-clamp-2">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-[#00D4FF]">
            ${price.toLocaleString()}
          </span>
          <button
            onClick={(e) => e.preventDefault()}
            className="p-2 text-[#444444] hover:text-white transition-colors"
            aria-label="Agregar a favoritos"
          >
            <HeartIcon />
          </button>
        </div>
      </div>
    </Link>
  );
}

function HeartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
