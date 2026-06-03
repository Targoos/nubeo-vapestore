import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-xs text-[#444444] uppercase tracking-[0.15em] mb-2 block">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-md text-white px-4 py-3 focus:outline-none focus:border-[#00D4FF] transition-colors disabled:opacity-50 placeholder:text-[#444444] ${className}`}
        {...props}
      />
    </div>
  );
}
