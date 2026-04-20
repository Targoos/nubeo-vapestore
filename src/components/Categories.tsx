import { CategoryCard } from "./CategoryCard";

const categories = [
  {
    name: "Equipos",
    slug: "equipos",
    icon: <EquiposIcon />,
    accentColor: "#FFE600",
  },
  {
    name: "Atomizadores",
    slug: "atomizadores",
    icon: <AtomizadoresIcon />,
    accentColor: "#00FF94",
  },
  {
    name: "Repuestos",
    slug: "repuestos",
    icon: <RepuestosIcon />,
    accentColor: "#FFE600",
  },
  {
    name: "Esencias",
    slug: "esencias",
    icon: <EsenciasIcon />,
    accentColor: "#00FF94",
  },
];

export function Categories() {
  return (
    <section id="categorias" className="bg-[#0a0a0a] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-1 bg-[#FFE600]" />
            <span className="text-sm font-mono uppercase tracking-widest text-gray-500">
              CATEGORIAS
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            EXPLORA NUESTRO
            <br />
            <span className="text-[#FFE600]">CATÁLOGO</span>
          </h2>
        </div>

        {/* Categories grid - asymmetric layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.slug}
              className={index === 1 ? "lg:translate-y-8" : index === 3 ? "lg:-translate-y-4" : ""}
            >
              <CategoryCard
                name={category.name}
                slug={category.slug}
                icon={category.icon}
                accentColor={category.accentColor}
              />
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="w-4 h-4 bg-[#FFE600] border-2 border-black" />
          <div className="w-4 h-4 bg-white border-2 border-black" />
          <div className="w-4 h-4 bg-[#00FF94] border-2 border-black" />
        </div>
      </div>
    </section>
  );
}

// Category Icons - Bold, geometric style
function EquiposIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="square"
    >
      <rect x="20" y="8" width="24" height="48" />
      <line x1="20" y1="16" x2="44" y2="16" />
      <line x1="20" y1="48" x2="44" y2="48" />
      <rect x="28" y="24" width="8" height="16" fill="currentColor" />
    </svg>
  );
}

function AtomizadoresIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="square"
    >
      <rect x="24" y="4" width="16" height="8" />
      <path d="M20 12h24v8H20z" />
      <rect x="16" y="20" width="32" height="40" />
      <line x1="16" y1="36" x2="48" y2="36" />
      <circle cx="32" cy="50" r="6" fill="currentColor" />
    </svg>
  );
}

function RepuestosIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="square"
    >
      <circle cx="32" cy="32" r="24" />
      <circle cx="32" cy="32" r="12" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
      <line x1="32" y1="8" x2="32" y2="16" />
      <line x1="32" y1="48" x2="32" y2="56" />
      <line x1="8" y1="32" x2="16" y2="32" />
      <line x1="48" y1="32" x2="56" y2="32" />
    </svg>
  );
}

function EsenciasIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="square"
    >
      <path d="M24 4h16v12l8 8v32H16V24l8-8V4z" />
      <line x1="24" y1="4" x2="40" y2="4" />
      <line x1="16" y1="40" x2="48" y2="40" />
      <rect x="24" y="46" width="16" height="8" fill="currentColor" />
    </svg>
  );
}
