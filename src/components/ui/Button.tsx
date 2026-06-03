import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "font-semibold uppercase tracking-[0.1em] rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-[#00D4FF] text-black hover:bg-[#00D4FF]/90",
    secondary: "bg-transparent text-white border border-[#1a1a1a] hover:border-[rgba(0,212,255,0.5)] hover:bg-[rgba(0,212,255,0.05)]",
    ghost: "bg-transparent text-[#444444] hover:text-white hover:bg-[rgba(255,255,255,0.05)]",
  };
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-xs",
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
