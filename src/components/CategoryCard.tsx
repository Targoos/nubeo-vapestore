interface CategoryCardProps {
  name: string;
  slug: string;
  icon: React.ReactNode;
  accentColor?: string;
}

export function CategoryCard({
  name,
  slug,
  icon,
  accentColor = "#FFE600",
}: CategoryCardProps) {
  return (
    <a
      href={`/${slug}`}
      className="group relative block aspect-square bg-[#111111] border-4 border-white shadow-[6px_6px_0px_0px_#000] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-150 overflow-hidden"
    >
      {/* Hover background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{ backgroundColor: accentColor }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
        {/* Icon */}
        <div className="mb-6 text-white group-hover:text-black transition-colors duration-150">
          {icon}
        </div>

        {/* Category name */}
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-black transition-colors duration-150 text-center">
          {name}
        </h3>

        {/* Arrow indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
            className="text-black"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-8 h-8 border-l-4 border-b-4 border-current"
        style={{ borderColor: accentColor }}
      />
    </a>
  );
}
