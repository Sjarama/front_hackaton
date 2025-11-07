
export type Sex = "M" | "F";

export interface UserProfile {
  age: number;
  sex: Sex;
  height_cm: number;
  weight_kg: number;
  waist_cm: number;
  sleep_hours?: number | null;
  smokes_cig_day?: number | null;
  days_mvpa_week?: number | null;
  fruit_veg_portions_day?: number | null;
}

export interface RiskResponse {
  score: number;           // 0..1
  risk_level: "Bajo" | "Moderado" | "Alto" | string;
  recommendation: string;
  // opcionalmente el back puede incluir drivers si lo agregas luego
  drivers?: string[];
}

export interface CoachRequest {
  user_profile: UserProfile;
  risk_score: number;
  top_drivers: string[];
}

export interface CoachResponse {
  plan: string;
  sources: string[];
}
