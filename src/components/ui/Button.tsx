import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
};

const variants = {
  primary: "bg-emerald-700 text-white hover:bg-emerald-800 focus:ring-emerald-200",
  secondary: "border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 focus:ring-emerald-100",
  danger: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-200",
};

export default function Button({ children, className = "", disabled, loading = false, variant = "primary", ...props }: ButtonProps) {
  return (
    <button {...props} disabled={disabled || loading} className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}>
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />}
      {children}
    </button>
  );
}
