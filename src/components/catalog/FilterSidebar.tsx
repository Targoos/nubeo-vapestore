import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";
import { FilterSection } from "./FilterSection";

export interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  filters: {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
    inStockOnly: boolean;
  };
  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  setFilters: React.Dispatch<
    React.SetStateAction<FilterSidebarProps["filters"]>
  >;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function FilterSidebar({
  categories,
  brands,
  filters,
  toggleCategory,
  toggleBrand,
  setFilters,
  clearFilters,
  hasActiveFilters,
}: FilterSidebarProps) {
  return (
    <div className="sticky top-24 space-y-8">
      <FilterSection title="CATEGORÍAS">
        {categories.map((category) => (
          <Checkbox
            key={category}
            label={category}
            checked={filters.categories.includes(category)}
            onChange={() => toggleCategory(category)}
          />
        ))}
      </FilterSection>

      <FilterSection title="MARCAS">
        {brands.map((brand) => (
          <Checkbox
            key={brand}
            label={brand}
            checked={filters.brands.includes(brand)}
            onChange={() => toggleBrand(brand)}
          />
        ))}
      </FilterSection>

      <FilterSection title="PRECIO">
        <PriceRangeSlider
          min={0}
          max={150000}
          value={filters.priceRange}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, priceRange: value }))
          }
        />
      </FilterSection>

      <FilterSection title="DISPONIBILIDAD">
        <Checkbox
          label="Solo en stock"
          checked={filters.inStockOnly}
          onChange={() =>
            setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }))
          }
        />
      </FilterSection>

      {hasActiveFilters && (
        <Button
          variant="secondary"
          size="md"
          onClick={clearFilters}
          className="w-full"
        >
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}

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
    onChange([Math.min(Number(e.target.value), value[1] - 1000), value[1]]);
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange([value[0], Math.max(Number(e.target.value), value[0] + 1000)]);
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
