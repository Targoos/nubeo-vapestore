import { useEffect, useRef, useState } from "react";
import { CategoryCard } from "../../components/CategoryCard";

const categories = [
  {
    name: "EQUIPOS",
    slug: "equipos",
    productCount: 124,
    icon: <EquiposIcon />,
  },
  {
    name: "ATOMIZADORES",
    slug: "atomizadores",
    productCount: 89,
    icon: <AtomizadoresIcon />,
  },
  {
    name: "REPUESTOS",
    slug: "repuestos",
    productCount: 256,
    icon: <RepuestosIcon />,
  },
  {
    name: "ESENCIAS",
    slug: "esencias",
    productCount: 312,
    icon: <EsenciasIcon />,
  },
];

export function Categories() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          categories.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 100);
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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

        {/* Categories grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              name={category.name}
              slug={category.slug}
              icon={category.icon}
              productCount={category.productCount}
              active={index === 0}
              visible={visibleCards.includes(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EquiposIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="10" y="4" width="12" height="24" rx="2" />
      <line x1="10" y1="8" x2="22" y2="8" />
      <line x1="10" y1="24" x2="22" y2="24" />
      <rect x="14" y="12" width="4" height="8" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function AtomizadoresIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="12" y="2" width="8" height="4" rx="1" />
      <path d="M10 6h12v4H10z" />
      <rect x="8" y="10" width="16" height="20" rx="2" />
      <line x1="8" y1="18" x2="24" y2="18" />
    </svg>
  );
}

function RepuestosIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4h8v6l4 4v14a2 2 0 01-2 2H10a2 2 0 01-2-2V14l4-4V4z" />
      <line x1="8" y1="20" x2="24" y2="20" />
      <circle cx="16" cy="24" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
