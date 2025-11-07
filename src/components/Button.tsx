
import React from "react";

type Variant = "primary" | "secondary" | "danger";

const styles: Record<Variant, string> = {
  primary: "bg-emerald-500 hover:bg-emerald-400 text-slate-950",
  secondary: "bg-blue-500 hover:bg-blue-400 text-slate-950",
  danger: "bg-red-500 hover:bg-red-400 text-slate-950",
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: Variant}> = ({ variant="primary", className="", ...props }) => {
  return (
    <button
      {...props}
      className={`py-2 px-4 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    />
  );
};
