
import React from "react";
import type { UserProfile, RiskResponse } from "../../types";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Gauge } from "../components/Gauge";

interface DashboardProps {
  profile: UserProfile;
  risk: RiskResponse | null;
  plan: string | null;
  planSources: string[];
  onGeneratePlan: () => void;
  loadingPlan: boolean;
  goToMeals: () => void;
  reset: () => void;
}

export default function Dashboard({
  profile, risk, plan, planSources, onGeneratePlan, loadingPlan, goToMeals, reset
}: DashboardProps) {

  const colorByLevel = (level: string) =>
    level === "Alto" ? "text-red-400" : level === "Moderado" ? "text-amber-400" : "text-emerald-400";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panel de Bienestar</h1>
        <p className="text-slate-400">
          Edad {profile.age} — Sexo {profile.sex === "M" ? "Masculino" : "Femenino"}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" title="Riesgo estimado">
          {risk ? (
            <div className="flex items-start justify-between">
              <Gauge score={risk.score} level={risk.risk_level} />
              <div className="text-right">
                <div className={`text-lg font-semibold ${colorByLevel(risk.risk_level)}`}>
                  {risk.risk_level}
                </div>
                <div className="text-slate-300 mt-2 max-w-xs">
                  {risk.recommendation}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-400">Calculando riesgo...</div>
          )}
        </Card>

        <Card title="Acciones rápidas">
          <div className="flex flex-col gap-3">
            <Button onClick={onGeneratePlan} disabled={loadingPlan}>
              {loadingPlan ? "Generando..." : "Generar Plan Personalizado"}
            </Button>
            <Button variant="secondary" onClick={goToMeals}>Registrar comida 🍽️</Button>
            <Button variant="danger" onClick={reset}>Reiniciar perfil</Button>
          </div>
        </Card>
      </div>

      {plan && (
        <Card className="mt-6" title="Plan de acción">
          <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{plan}</pre>
          {planSources.length > 0 && (
            <p className="text-slate-500 text-sm mt-2">Fuentes: {planSources.join(", ")}</p>
          )}
        </Card>
      )}
    </div>
  );
}
