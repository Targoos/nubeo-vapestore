import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../cart/CartContext";

export function FeaturedProducts() {
  const { data, loading, error } = useProducts({ onlyActive: true });
  const { addToCart } = useCart();
  const featured = data.slice(0, 3);

  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || loading || data.length === 0 || hasAnimated.current)
      return;

    hasAnimated.current = true;
    const count = Math.min(data.length, 3);
    Array.from({ length: count }).forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
      }, index * 100);
    });
  }, [isInView, loading, data.length]);

  return (
    <section id="featured" className="bg-[#080808] py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-xs tracking-[0.2em] text-[#00D4FF] uppercase font-medium">
              Destacados
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-white">
              Más Vendidos
            </h2>
          </div>
          <Link
            to="/catalogo"
            className="hidden sm:flex items-center gap-2 text-sm text-[#444444] hover:text-white transition-colors"
          >
            <span className="uppercase tracking-[0.1em]">Ver Todo</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-[#111111]" />
                <div className="p-4 space-y-2">
                  <div className="h-2 bg-[#1a1a1a] rounded w-1/4" />
                  <div className="h-3 bg-[#1a1a1a] rounded w-3/4" />
                  <div className="h-5 bg-[#1a1a1a] rounded w-1/3 mt-3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-[#666666] text-sm">
            No se pudieron cargar los productos. Intenta recargar la página.
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, index) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                brand={product.brand ?? undefined}
                price={product.price}
                visible={visibleCards.includes(index)}
                onAddToCart={() => addToCart(product, 1)}
              />
            ))}
          </div>
        )}

        <div className="mt-8 sm:hidden text-center">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm text-[#00D4FF]"
          >
            <span className="uppercase tracking-[0.1em]">
              Ver Todos los Productos
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
