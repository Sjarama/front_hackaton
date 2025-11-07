
import React, { useEffect, useState } from "react";
import type { UserProfile, RiskResponse, CoachRequest } from "../types";
import { predictRisk, generateCoachPlan, health } from "./services/api";
import ProfileScreen from "./screens/ProfileScreen";
import Dashboard from "./screens/Dashboard";
import MealScreen from "./screens/MealScreen";
import { Toasts, type Toast } from "./components/Toast";

type Screen = "loading" | "profile" | "dashboard" | "meal";

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("loading");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [risk, setRisk] = useState<RiskResponse | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [planSources, setPlanSources] = useState<string[]>([]);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = (message: string, type: Toast["type"]="info") => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), 3500);
  };

  useEffect(() => {
    (async () => {
      try {
        await health();
        const saved = localStorage.getItem("profile");
        if (saved) {
          const p = JSON.parse(saved) as UserProfile;
          setProfile(p);
          const r = await predictRisk(p);
          setRisk(r);
          setScreen("dashboard");
        } else {
          setScreen("profile");
        }
      } catch (e:any) {
        pushToast(`Backend no disponible: ${e.message || e}`, "error");
        setScreen("profile");
      }
    })();
  }, []);

  const onSaveProfile = async (p: UserProfile) => {
    try {
      setProfile(p);
      localStorage.setItem("profile", JSON.stringify(p));
      const r = await predictRisk(p);
      setRisk(r);
      pushToast("Perfil guardado y riesgo calculado", "success");
      setScreen("dashboard");
    } catch (e:any) {
      pushToast(`Error al calcular riesgo: ${e.message || e}`, "error");
    }
  };

  const onGeneratePlan = async () => {
    if (!profile || !risk) return;
    setLoadingPlan(true);
    try {
      const req: CoachRequest = {
        user_profile: profile,
        risk_score: risk.score,
        top_drivers: risk.drivers ?? ["IMC elevado", "Poca actividad", "Sueño insuficiente"],
      };
      const res = await generateCoachPlan(req);
      setPlan(res.plan);
      setPlanSources(res.sources || []);
    } catch (e:any) {
      pushToast(`No se pudo generar el plan: ${e.message || e}`, "error");
    } finally {
      setLoadingPlan(false);
    }
  };

  const reset = () => {
    localStorage.removeItem("profile");
    setProfile(null);
    setRisk(null);
    setPlan(null);
    setPlanSources([]);
    setScreen("profile");
    pushToast("Perfil reiniciado", "success");
  };

  if (screen === "loading") {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-50">
        <div className="animate-pulse text-slate-400">Cargando...</div>
      </div>
    );
  }

  return (
    <>
      <Toasts items={toasts} onClose={(id)=>setToasts(t=>t.filter(x=>x.id!==id))} />
      {screen === "profile" && <ProfileScreen onSave={onSaveProfile} />}
      {screen === "dashboard" && profile && (
        <Dashboard
          profile={profile}
          risk={risk}
          plan={plan}
          planSources={planSources}
          onGeneratePlan={onGeneratePlan}
          loadingPlan={loadingPlan}
          goToMeals={() => setScreen("meal")}
          reset={reset}
        />
      )}
      {screen === "meal" && <MealScreen goBack={() => setScreen("dashboard")} />}
    </>
  );
};

export default App;
