import { useEffect } from "react";
import { Button } from "../ui/Button";
import { FilterSidebar, type FilterSidebarProps } from "./FilterSidebar";

interface MobileFilterDrawerProps extends FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  ...sidebarProps
}: MobileFilterDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
        onClick={onClose} 
      />
      <div className={`fixed top-0 left-0 h-full w-[300px] max-w-[80vw] bg-[#080808] border-r border-[#1a1a1a] z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
          <h2 className="text-lg font-semibold text-white uppercase tracking-[0.1em]">Filtros</h2>
          <button 
            onClick={onClose} 
            className="p-2 text-[#444444] hover:text-white transition-colors" 
            aria-label="Cerrar filtros"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-6">
          <FilterSidebar {...sidebarProps} />
        </div>
        <div className="sticky bottom-0 p-6 bg-[#080808] border-t border-[#1a1a1a]">
          <Button 
            onClick={onClose}
            className="w-full"
          >
            Aplicar filtros
          </Button>
        </div>
      </div>
    </>
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
