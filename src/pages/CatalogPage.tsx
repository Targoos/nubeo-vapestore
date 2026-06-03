import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { FilterSidebar } from "../components/catalog/FilterSidebar";
import { Pagination } from "../components/catalog/Pagination";
import { MobileFilterDrawer } from "../components/catalog/MobileFilterDrawer";
import { Button } from "../components/ui/Button";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { useCart } from "../features/cart/CartContext";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "price-asc", label: "Precio menor" },
  { value: "price-desc", label: "Precio mayor" },
  { value: "newest", label: "Más nuevos" },
];

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const {
    data: allProducts,
    loading,
    error,
  } = useProducts({ onlyActive: true });
  const { data: categories } = useCategories();
  const { addToCart } = useCart();

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

  const availableBrands = useMemo(() => {
    const brands = allProducts
      .map((p) => p.brand)
      .filter((b): b is string => Boolean(b));
    return [...new Set(brands)].sort();
  }, [allProducts]);

  useEffect(() => {
    const slug = searchParams.get("categoria");
    if (!slug || categories.length === 0) {
      setFilters((prev) => ({ ...prev, categories: [] }));
      return;
    }
    const match = categories.find((c) => c.slug === slug);
    setFilters((prev) => ({
      ...prev,
      categories: match ? [match.name] : [],
    }));
  }, [searchParams, categories]);

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        if (
          filters.categories.length > 0 &&
          !filters.categories.includes(product.category?.name ?? "")
        )
          return false;
        if (
          filters.brands.length > 0 &&
          !filters.brands.includes(product.brand ?? "")
        )
          return false;
        if (
          product.price < filters.priceRange[0] ||
          product.price > filters.priceRange[1]
        )
          return false;
        if (filters.inStockOnly && product.stock === 0) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          // Los productos ya vienen ordenados por created_at DESC desde Supabase.
          // Aquí reforzamos ese orden para el caso "newest".
          case "newest":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          default:
            return 0;
        }
      });
  }, [allProducts, filters, sortBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setTimeout(
                () => {
                  setVisibleProducts((prev) => [...new Set([...prev, index])]);
                },
                (index % 6) * 100,
              );
            }
          }
        });
      },
      { threshold: 0.2 },
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredProducts]);

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

      <main className="pt-16">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <aside className="hidden lg:block w-[260px] flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
              <FilterSidebar
                categories={categories.map((c) => c.name)}
                brands={availableBrands}
                filters={filters}
                toggleCategory={toggleCategory}
                toggleBrand={toggleBrand}
                setFilters={setFilters}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </aside>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight uppercase">
                    CATÁLOGO
                  </h1>
                  {!loading && (
                    <span className="text-xs text-[#444444] tracking-[0.15em] uppercase">
                      {filteredProducts.length} productos
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2"
                  >
                    <FilterIcon />
                    <span>Filtros</span>
                  </Button>

                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full appearance-none bg-[#0d0d0d] border border-[#1a1a1a] rounded-md text-white text-sm px-4 py-2.5 pr-10 focus:outline-none focus:border-[#00D4FF] transition-colors cursor-pointer"
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

              {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
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
                  No se pudieron cargar los productos. Intenta recargar la
                  página.
                </p>
              )}

              {!loading && !error && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product, index) => (
                      <div
                        key={product.id}
                        ref={(el) => {
                          productRefs.current[index] = el;
                        }}
                        data-index={index}
                      >
                        <ProductCard
                          slug={product.slug}
                          name={product.name}
                          brand={product.brand ?? undefined}
                          price={product.price}
                          visible={visibleProducts.includes(index)}
                          onAddToCart={() => addToCart(product, 1)}
                        />
                      </div>
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-24">
                      <p className="text-[#444444] text-lg">
                        No se encontraron productos con los filtros
                        seleccionados.
                      </p>
                      <Button onClick={clearFilters} className="mt-4">
                        Limpiar filtros
                      </Button>
                    </div>
                  )}

                  {filteredProducts.length > 0 && (
                    <Pagination
                      currentPage={1}
                      totalPages={Math.ceil(filteredProducts.length / 9)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        categories={categories.map((c) => c.name)}
        brands={availableBrands}
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

function FilterIcon() {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
