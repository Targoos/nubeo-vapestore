import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";

// Mock product data
const PRODUCTS = [
  { id: 1, slug: "aegis-legend-2-kit", name: "Aegis Legend 2 Kit", brand: "GeekVape", price: 89900, category: "Equipos", inStock: true },
  { id: 2, slug: "centaurus-m200-mod", name: "Centaurus M200 Mod", brand: "Lost Vape", price: 125000, category: "Equipos", inStock: true },
  { id: 3, slug: "luxe-x-pro-kit", name: "LUXE X Pro Kit", brand: "Vaporesso", price: 65000, category: "Equipos", inStock: false },
  { id: 4, slug: "drag-4-kit", name: "Drag 4 Kit", brand: "VooPoo", price: 79900, category: "Equipos", inStock: true },
  { id: 5, slug: "zeus-x-rta", name: "Zeus X RTA", brand: "GeekVape", price: 45000, category: "Atomizadores", inStock: true },
  { id: 6, slug: "destiny-2-rta", name: "Destiny 2 RTA", brand: "Hellvape", price: 52000, category: "Atomizadores", inStock: true },
  { id: 7, slug: "xros-4-pod", name: "XROS 4 Pod", brand: "Vaporesso", price: 35000, category: "Equipos", inStock: true },
  { id: 8, slug: "argus-p2-kit", name: "Argus P2 Kit", brand: "VooPoo", price: 42000, category: "Equipos", inStock: false },
  { id: 9, slug: "dead-rabbit-v3-rda", name: "Dead Rabbit V3 RDA", brand: "Hellvape", price: 38000, category: "Atomizadores", inStock: true },
  { id: 10, slug: "thelema-quest-mod", name: "Thelema Quest Mod", brand: "Lost Vape", price: 95000, category: "Equipos", inStock: true },
  { id: 11, slug: "resistencias-gti-mesh", name: "Resistencias GTi Mesh", brand: "Vaporesso", price: 15000, category: "Repuestos", inStock: true },
  { id: 12, slug: "algodon-organico-premium", name: "Algodón Orgánico Premium", brand: "GeekVape", price: 8500, category: "Repuestos", inStock: true },
  { id: 13, slug: "esencia-mango-ice-60ml", name: "Esencia Mango Ice 60ml", brand: "VooPoo", price: 22000, category: "Esencias", inStock: true },
  { id: 14, slug: "esencia-strawberry-cream-30ml", name: "Esencia Strawberry Cream 30ml", brand: "Lost Vape", price: 18000, category: "Esencias", inStock: false },
  { id: 15, slug: "z-series-coils-5-pack", name: "Z Series Coils 5-Pack", brand: "GeekVape", price: 19500, category: "Repuestos", inStock: true },
];

const CATEGORIES = ["Equipos", "Atomizadores", "Repuestos", "Esencias"];
const BRANDS = ["GeekVape", "Lost Vape", "Vaporesso", "VooPoo", "Hellvape"];
const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "price-asc", label: "Precio menor" },
  { value: "price-desc", label: "Precio mayor" },
  { value: "newest", label: "Más nuevos" },
];

// Maps URL slug → display name used in product data
const CATEGORY_SLUG_MAP: Record<string, string> = {
  equipos: "Equipos",
  atomizadores: "Atomizadores",
  repuestos: "Repuestos",
  esencias: "Esencias",
};

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 150000] as [number, number],
    inStockOnly: false,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sync ?categoria= query param to the categories filter
  useEffect(() => {
    const slug = searchParams.get("categoria");
    const categoryName = slug ? CATEGORY_SLUG_MAP[slug] : null;
    setFilters((prev) => ({
      ...prev,
      categories: categoryName ? [categoryName] : [],
    }));
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = PRODUCTS.filter((product) => {
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    if (filters.inStockOnly && !product.inStock) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Intersection observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setTimeout(() => {
                setVisibleProducts((prev) => [...new Set([...prev, index])]);
              }, (index % 6) * 100); // Stagger delay based on design tokens
            }
          }
        });
      },
      { threshold: 0.2 } // observerThreshold.default from tokens
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredProducts]);

  // Reset visible products when filters change
  useEffect(() => {
    setVisibleProducts([]);
  }, [filters, sortBy]);

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 150000],
      inStockOnly: false,
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 150000 ||
    filters.inStockOnly;

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      
      <main className="pt-16"> {/* navbar.height from tokens */}
        <div className="max-w-[80rem] mx-auto px-6 lg:px-8 py-24"> {/* container.maxWidth, section.paddingX, section.paddingY */}
          <div className="flex gap-8">
            {/* Desktop Sidebar - fixed width 260px */}
            <aside className="hidden lg:block w-[260px] flex-shrink-0">
              <FilterSidebar
                filters={filters}
                toggleCategory={toggleCategory}
                toggleBrand={toggleBrand}
                setFilters={setFilters}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl font-bold text-white tracking-tight uppercase">
                    CATÁLOGO
                  </h1>
                  <span className="text-xs text-[#444444] tracking-[0.15em] uppercase">
                    {filteredProducts.length} productos
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-transparent text-white border border-[#1a1a1a] rounded-md hover:border-[rgba(0,212,255,0.5)] transition-colors duration-200"
                  >
                    <FilterIcon />
                    <span className="text-xs font-semibold uppercase tracking-[0.1em]">Filtros</span>
                  </button>

                  {/* Sort dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-[#0d0d0d] border border-[#1a1a1a] rounded-md text-white text-sm px-4 py-2.5 pr-10 focus:outline-none focus:border-[#00D4FF] transition-colors cursor-pointer"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444444] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Product Grid - 3 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    ref={(el) => { productRefs.current[index] = el; }}
                    data-index={index}
                  >
                    <ProductCard
                      slug={product.slug}
                      name={product.name}
                      brand={product.brand}
                      price={product.price}
                      visible={visibleProducts.includes(index)}
                    />
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-[#444444] text-lg">No se encontraron productos con los filtros seleccionados.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-8 py-3.5 bg-[#00D4FF] text-black text-xs font-semibold uppercase tracking-[0.1em] rounded-md hover:bg-[#00D4FF]/90 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <Pagination currentPage={1} totalPages={3} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        toggleCategory={toggleCategory}
        toggleBrand={toggleBrand}
        setFilters={setFilters}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}

// Filter Sidebar Component
interface FilterSidebarProps {
  filters: {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
    inStockOnly: boolean;
  };
  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterSidebarProps["filters"]>>;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

function FilterSidebar({
  filters,
  toggleCategory,
  toggleBrand,
  setFilters,
  clearFilters,
  hasActiveFilters,
}: FilterSidebarProps) {
  return (
    <div className="sticky top-24 space-y-8">
      {/* Categories */}
      <FilterSection title="CATEGORÍAS">
        {CATEGORIES.map((category) => (
          <Checkbox
            key={category}
            label={category}
            checked={filters.categories.includes(category)}
            onChange={() => toggleCategory(category)}
          />
        ))}
      </FilterSection>

      {/* Brands */}
      <FilterSection title="MARCAS">
        {BRANDS.map((brand) => (
          <Checkbox
            key={brand}
            label={brand}
            checked={filters.brands.includes(brand)}
            onChange={() => toggleBrand(brand)}
          />
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="PRECIO">
        <PriceRangeSlider
          min={0}
          max={150000}
          value={filters.priceRange}
          onChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
        />
      </FilterSection>

      {/* Availability */}
      <FilterSection title="DISPONIBILIDAD">
        <Checkbox
          label="Solo en stock"
          checked={filters.inStockOnly}
          onChange={() => setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }))}
        />
      </FilterSection>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full px-4 py-3 bg-transparent text-white border border-[rgba(255,255,255,0.2)] rounded-md text-xs font-semibold uppercase tracking-[0.1em] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.4)] transition-colors duration-200"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

// Filter Section Component
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pb-6 border-b border-[#1a1a1a]">
      <h3 className="text-xs font-medium text-white uppercase tracking-[0.15em] mb-4">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// Checkbox Component
function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className={`w-5 h-5 rounded flex items-center justify-center transition-colors duration-150 ${
          checked
            ? "bg-[#00D4FF] border border-[#00D4FF]"
            : "bg-[#0d0d0d] border border-[#1a1a1a] group-hover:border-[rgba(0,212,255,0.5)]"
        }`}
        onClick={onChange}
      >
        {checked && <CheckIcon />}
      </div>
      <span className="text-sm text-[#444444] group-hover:text-white transition-colors duration-150">
        {label}
      </span>
    </label>
  );
}

// Price Range Slider Component
function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1] - 1000);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0] + 1000);
    onChange([value[0], newMax]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs text-[#444444] mb-1 block">Mín</label>
          <input
            type="number"
            value={value[0]}
            onChange={handleMinChange}
            min={min}
            max={max}
            step={1000}
            className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md text-white text-sm px-3 py-2 focus:outline-none focus:border-[#00D4FF] transition-colors"
          />
        </div>
        <span className="text-[#444444] mt-5">—</span>
        <div className="flex-1">
          <label className="text-xs text-[#444444] mb-1 block">Máx</label>
          <input
            type="number"
            value={value[1]}
            onChange={handleMaxChange}
            min={min}
            max={max}
            step={1000}
            className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md text-white text-sm px-3 py-2 focus:outline-none focus:border-[#00D4FF] transition-colors"
          />
        </div>
      </div>
      <div className="relative h-1 bg-[#1a1a1a] rounded-full">
        <div
          className="absolute h-full bg-[#00D4FF] rounded-full"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((value[1] - min) / (max - min)) * 100}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={value[0]}
          onChange={handleMinChange}
          className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00D4FF] [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={value[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00D4FF] [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-xs text-[#444444]">
        <span>${value[0].toLocaleString()}</span>
        <span>${value[1].toLocaleString()}</span>
      </div>
    </div>
  );
}

// Pagination Component
function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-12 pt-12 border-t border-[#1a1a1a]">
      <button
        disabled={currentPage === 1}
        className="p-2 text-[#444444] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Página anterior"
      >
        <ChevronLeftIcon />
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-150 ${
            page === currentPage
              ? "bg-[#00D4FF] text-black"
              : "text-[#444444] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        disabled={currentPage === totalPages}
        className="p-2 text-[#444444] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Página siguiente"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

// Mobile Filter Drawer Component
function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  toggleCategory,
  toggleBrand,
  setFilters,
  clearFilters,
  hasActiveFilters,
}: FilterSidebarProps & { isOpen: boolean; onClose: () => void }) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] max-w-[80vw] bg-[#080808] border-r border-[#1a1a1a] z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
          <h2 className="text-lg font-semibold text-white uppercase tracking-[0.1em]">
            Filtros
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#444444] hover:text-white transition-colors"
            aria-label="Cerrar filtros"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6">
          <FilterSidebar
            filters={filters}
            toggleCategory={toggleCategory}
            toggleBrand={toggleBrand}
            setFilters={setFilters}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Apply Button */}
        <div className="sticky bottom-0 p-6 bg-[#080808] border-t border-[#1a1a1a]">
          <button
            onClick={onClose}
            className="w-full px-8 py-3.5 bg-[#00D4FF] text-black text-xs font-semibold uppercase tracking-[0.1em] rounded-md hover:bg-[#00D4FF]/90 transition-colors"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </>
  );
}

// Icons
function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
