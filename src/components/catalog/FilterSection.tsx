import type { ReactNode } from "react";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

export function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div className="pb-6 border-b border-[#1a1a1a]">
      <h3 className="text-xs font-medium text-white uppercase tracking-[0.15em] mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
