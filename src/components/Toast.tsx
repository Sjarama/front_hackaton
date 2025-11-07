
import React from "react";

export type Toast = { id: number; message: string; type?: "success" | "info" | "error" };
export const Toasts: React.FC<{ items: Toast[]; onClose: (id:number)=>void }> = ({ items, onClose }) => (
  <div className="fixed top-4 right-4 space-y-2 z-50">
    {items.map(t => (
      <div key={t.id} className={`px-4 py-2 rounded-lg shadow text-sm ${t.type==="error" ? "bg-red-500" : t.type==="success" ? "bg-emerald-500" : "bg-slate-700"}`}>
        <div className="flex items-center gap-3">
          <span>{t.message}</span>
          <button onClick={()=>onClose(t.id)} className="opacity-80 hover:opacity-100">✕</button>
        </div>
      </div>
    ))}
  </div>
);
