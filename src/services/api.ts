
import type { UserProfile, RiskResponse, CoachRequest, CoachResponse } from "../../types";

const API_URL = (import.meta as any).env?.VITE_API_URL || "http://127.0.0.1:8000";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function predictRisk(userProfile: UserProfile): Promise<RiskResponse> {
  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userProfile),
  });
  return handle<RiskResponse>(res);
}

export async function generateCoachPlan(request: CoachRequest): Promise<CoachResponse> {
  const res = await fetch(`${API_URL}/coach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  return handle<CoachResponse>(res);
}

export async function health() {
  const res = await fetch(`${API_URL}/health`);
  return handle<{status: string; model_loaded: boolean}>(res);
}
