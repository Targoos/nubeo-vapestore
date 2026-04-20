import { ProductCard } from "./ProductCard";

const featuredProducts = [
  {
    id: 1,
    name: "Lost Vape Thelema Quest 200W",
    brand: "Lost Vape",
    price: 89990,
  },
  {
    id: 2,
    name: "GeekVape Aegis Legend 2",
    brand: "GeekVape",
    price: 74990,
  },
  {
    id: 3,
    name: "VooPoo Drag X Plus Pro",
    brand: "VooPoo",
    price: 64990,
  },
];

export function FeaturedProducts() {
  return (
    <section id="featured" className="bg-[#080808] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-xs tracking-[0.2em] text-[#00D4FF] uppercase font-medium">
              Featured
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-white">
              Bestsellers
            </h2>
          </div>
          <a 
            href="/productos" 
            className="hidden sm:flex items-center gap-2 text-sm text-[#444444] hover:text-white transition-colors"
          >
            <span className="uppercase tracking-[0.1em]">View All</span>
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
          </a>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              brand={product.brand}
              price={product.price}
            />
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="mt-8 sm:hidden text-center">
          <a 
            href="/productos" 
            className="inline-flex items-center gap-2 text-sm text-[#00D4FF]"
          >
            <span className="uppercase tracking-[0.1em]">View All Products</span>
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
          </a>
        </div>
      </div>
    </section>
  );
}
