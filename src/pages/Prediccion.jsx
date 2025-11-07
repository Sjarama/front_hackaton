import React, { useState } from "react";
import { predictRisk, generateCoachPlan } from "../services/api";

export default function Prediccion() {
  const [form, setForm] = useState({
    age: 45,
    sex: "F",
    height_cm: 165,
    weight_kg: 75,
    waist_cm: 90,
    sleep_hours: 6,
    smokes_cig_day: 10,
    days_mvpa_week: 2,
    fruit_veg_portions_day: 3,
  });

  const [result, setResult] = useState(null);
  const [plan, setPlan] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    const response = await predictRisk(form);
    setResult(response);
  };

  const handleCoach = async () => {
    const data = {
      user_profile: form,
      risk_score: result.score,
      top_drivers: ["IMC alto", "Tabaquismo", "Sueño insuficiente"],
    };
    const response = await generateCoachPlan(data);
    setPlan(response);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Asistente de Salud - Riesgo de Diabetes</h1>

      <input name="age" type="number" value={form.age} onChange={handleChange} />
      <input name="sex" value={form.sex} onChange={handleChange} />
      <input name="height_cm" type="number" value={form.height_cm} onChange={handleChange} />
      <input name="weight_kg" type="number" value={form.weight_kg} onChange={handleChange} />
      <input name="waist_cm" type="number" value={form.waist_cm} onChange={handleChange} />

      <button onClick={handlePredict}>Predecir riesgo</button>

      {result && (
        <div>
          <h2>Resultado</h2>
          <p>Riesgo: {(result.score * 100).toFixed(1)}%</p>
          <p>Nivel: {result.risk_level}</p>
          <p>Recomendación: {result.recommendation}</p>
          <button onClick={handleCoach}>Generar plan personalizado</button>
        </div>
      )}

      {plan && (
        <div style={{ marginTop: "20px" }}>
          <h2>Plan Personalizado</h2>
          <pre>{plan.plan}</pre>
          <p>Fuentes: {plan.sources.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
