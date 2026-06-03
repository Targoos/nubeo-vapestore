interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-12 pt-12 border-t border-[#1a1a1a]">
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange?.(currentPage - 1)}
        className="p-2 text-[#444444] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
        aria-label="Página anterior"
      >
        <ChevronLeftIcon />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button 
          key={page} 
          onClick={() => onPageChange?.(page)}
          className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-150 ${
            page === currentPage ? "bg-[#00D4FF] text-black" : "text-[#444444] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
          }`}
        >
          {page}
        </button>
      ))}
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange?.(currentPage + 1)}
        className="p-2 text-[#444444] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
        aria-label="Página siguiente"
      >
        <ChevronRightIcon />
      </button>
    </div>
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
