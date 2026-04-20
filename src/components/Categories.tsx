import { CategoryCard } from "./CategoryCard";

const categories = [
  {
    name: "EQUIPOS",
    slug: "equipos",
    icon: <EquiposIcon />,
  },
  {
    name: "ATOMIZADORES",
    slug: "atomizadores",
    icon: <AtomizadoresIcon />,
  },
  {
    name: "REPUESTOS",
    slug: "repuestos",
    icon: <RepuestosIcon />,
  },
  {
    name: "ESENCIAS",
    slug: "esencias",
    icon: <EsenciasIcon />,
  },
];

export function Categories() {
  return (
    <section id="categorias" className="bg-[#0a0a0a] py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header - minimal */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
              CATEGORIES
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em] text-white">
              BROWSE
            </h2>
          </div>
          <div className="hidden sm:block w-24 h-[3px] bg-[#FF2020] mb-3" />
        </div>

        {/* Categories grid - clean 4-column */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              name={category.name}
              slug={category.slug}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Icons - simplified, industrial
function EquiposIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    >
      <rect x="16" y="6" width="16" height="36" />
      <line x1="16" y1="12" x2="32" y2="12" />
      <line x1="16" y1="36" x2="32" y2="36" />
      <rect x="21" y="18" width="6" height="12" fill="currentColor" />
    </svg>
  );
}

function AtomizadoresIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    >
      <rect x="18" y="4" width="12" height="6" />
      <path d="M14 10h20v6H14z" />
      <rect x="12" y="16" width="24" height="28" />
      <line x1="12" y1="28" x2="36" y2="28" />
    </svg>
  );
}

function RepuestosIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    >
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="8" />
      <line x1="24" y1="8" x2="24" y2="14" />
      <line x1="24" y1="34" x2="24" y2="40" />
      <line x1="8" y1="24" x2="14" y2="24" />
      <line x1="34" y1="24" x2="40" y2="24" />
    </svg>
  );
}

function EsenciasIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    >
      <path d="M18 4h12v8l6 6v24H12V18l6-6V4z" />
      <line x1="12" y1="30" x2="36" y2="30" />
    </svg>
  );
}
