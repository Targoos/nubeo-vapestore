interface CategoryCardProps {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

export function CategoryCard({ name, slug, icon }: CategoryCardProps) {
  return (
    <a
      href={`/${slug}`}
      className="group relative block aspect-square bg-[#0a0a0a] border-3 border-white hover:shadow-[5px_5px_0px_0px_#FF2020] transition-all duration-100"
    >
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
        {/* Icon */}
        <div className="mb-8 text-white group-hover:text-[#FF2020] transition-colors duration-100">
          {icon}
        </div>

        {/* Category name */}
        <h3 className="text-xl font-black uppercase tracking-[0.1em] text-white text-center">
          {name}
        </h3>

        {/* Arrow on hover */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            className="text-[#FF2020]"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}
