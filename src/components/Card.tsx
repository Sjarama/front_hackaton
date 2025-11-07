
import React from "react";

export const Card: React.FC<React.PropsWithChildren<{className?: string; title?: string; action?: React.ReactNode;}>> = ({ className = "", title, action, children }) => {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-3">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
};
