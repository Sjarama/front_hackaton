
// src/components/Gauge.tsx
import React from "react";

interface GaugeProps {
  score: number; // 0..1
  level: string;
}

export const Gauge: React.FC<GaugeProps> = ({ score, level }) => {
  const clamped = Math.min(Math.max(score, 0), 1);
  const pct = clamped * 100;

  const color =
    level === "Alto"
      ? "#ef4444"
      : level === "Moderado"
      ? "#f59e0b"
      : "#22c55e";

  return (
    <div className="relative w-32 h-32">
      {/* Círculo de fondo */}
      <div className="absolute inset-0 rounded-full bg-slate-800" />

      {/* Anillo de progreso con conic-gradient */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${color} 0deg ${pct * 3.6}deg, #1e293b ${pct * 3.6}deg 360deg)`,
        }}
      />

      {/* Círculo interior para hacer el efecto de anillo */}
      <div className="absolute inset-2 rounded-full bg-slate-950 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{pct.toFixed(1)}%</span>
        <span className="text-xs text-slate-400">{level}</span>
      </div>
    </div>
  );
};
