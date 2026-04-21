import { useEffect, useRef, useState } from "react";
import { CategoryCard } from "../../components/CategoryCard";
import { useCategories } from "../../hooks/useCategories";

// El ícono de cada categoría se deriva del slug porque la DB no guarda íconos.
// Si en el futuro agregas más categorías, añade el slug y su ícono aquí.
const ICON_BY_SLUG: Record<string, React.ReactNode> = {
  equipos: <EquiposIcon />,
  atomizadores: <AtomizadoresIcon />,
  repuestos: <RepuestosIcon />,
  esencias: <EsenciasIcon />,
};

export function Categories() {
  const { data: categories, loading, error } = useCategories();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  // Guardamos si la sección ya entró en pantalla
  const [isInView, setIsInView] = useState(false);

  // Efecto 1: detectar cuando la sección entra en pantalla
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Efecto 2: disparar la animación cuando AMBAS condiciones se cumplan:
  // la sección es visible Y los datos de Supabase ya llegaron
  useEffect(() => {
    if (!isInView || loading || categories.length === 0 || hasAnimated.current) return;

    hasAnimated.current = true;
    categories.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
      }, index * 100);
    });
  }, [isInView, loading, categories.length]);

  return (
    <section id="categorias" className="bg-[#080808] py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.2em] text-[#00D4FF] uppercase font-medium">
            Explorar por categoría
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-white">
            Categorías
          </h2>
        </div>

        {/* Estado de carga: 4 tarjetas esqueleto animadas */}
        {loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-6 animate-pulse"
              >
                {/* Ícono placeholder */}
                <div className="w-8 h-8 bg-[#1a1a1a] rounded mb-4" />
                {/* Nombre placeholder */}
                <div className="h-3 bg-[#1a1a1a] rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* Estado de error */}
        {error && (
          <p className="text-[#666666] text-sm">
            No se pudieron cargar las categorías. Intenta recargar la página.
          </p>
        )}

        {/* Datos reales de Supabase */}
        {!loading && !error && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                name={category.name.toUpperCase()}
                slug={category.slug}
                icon={ICON_BY_SLUG[category.slug] ?? <DefaultIcon />}
                active={index === 0}
                visible={visibleCards.includes(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// --- Íconos SVG ---
// Están en este archivo porque son exclusivos de esta sección y no se reusan en otro lugar.

function EquiposIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="4" width="12" height="24" rx="2" />
      <line x1="10" y1="8" x2="22" y2="8" />
      <line x1="10" y1="24" x2="22" y2="24" />
      <rect x="14" y="12" width="4" height="8" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function AtomizadoresIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="2" width="8" height="4" rx="1" />
      <path d="M10 6h12v4H10z" />
      <rect x="8" y="10" width="16" height="20" rx="2" />
      <line x1="8" y1="18" x2="24" y2="18" />
    </svg>
  );
}

function RepuestosIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="10" />
      <circle cx="16" cy="16" r="4" />
      <line x1="16" y1="6" x2="16" y2="10" />
      <line x1="16" y1="22" x2="16" y2="26" />
      <line x1="6" y1="16" x2="10" y2="16" />
      <line x1="22" y1="16" x2="26" y2="16" />
    </svg>
  );
}

function EsenciasIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4h8v6l4 4v14a2 2 0 01-2 2H10a2 2 0 01-2-2V14l4-4V4z" />
      <line x1="8" y1="20" x2="24" y2="20" />
      <circle cx="16" cy="24" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Ícono genérico por si en Supabase hay una categoría sin ícono definido aquí
function DefaultIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="24" height="24" rx="2" />
      <line x1="4" y1="12" x2="28" y2="12" />
    </svg>
  );
}
