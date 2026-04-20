interface CategoryCardProps {
  name: string;
  slug: string;
  icon: React.ReactNode;
  productCount: number;
  active?: boolean;
  visible?: boolean;
}

export function CategoryCard({ name, slug, icon, productCount, active, visible = true }: CategoryCardProps) {
  return (
    <a
      href={`/${slug}`}
      className={`group relative block bg-[#0d0d0d] border rounded-lg p-6 transition-all duration-200 ${
        active 
          ? "border-[#00D4FF]" 
          : "border-[#1a1a1a] hover:border-[#00D4FF]/50"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      style={{ transitionProperty: "opacity, transform, border-color", transitionDuration: "0.6s, 0.6s, 0.2s" }}
    >
      {/* Icon */}
      <div className={`mb-4 transition-colors duration-200 ${
        active ? "text-[#00D4FF]" : "text-[#444444] group-hover:text-[#00D4FF]"
      }`}>
        {icon}
      </div>

      {/* Category name */}
      <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white mb-1">
        {name}
      </h3>

      {/* Product count */}
      <span className="text-xs text-[#444444]">
        {productCount} productos
      </span>

      {/* Arrow indicator */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#00D4FF]"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </a>
  );
}
