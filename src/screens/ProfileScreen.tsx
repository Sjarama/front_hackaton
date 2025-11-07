
import React, { useState } from "react";
import type { UserProfile } from "../../types";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

export default function ProfileScreen({ onSave }: { onSave: (p: UserProfile) => void }) {
  const [form, setForm] = useState<UserProfile>({
    age: 40, sex: "F", height_cm: 165, weight_kg: 70, waist_cm: 85,
    sleep_hours: 7, smokes_cig_day: 0, days_mvpa_week: 3, fruit_veg_portions_day: 3,
  });

  const update = (k: keyof UserProfile) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const v = e.target.type === "number" ? Number(e.target.value) : (e.target as HTMLSelectElement).value;
    setForm(s => ({ ...s, [k]: isNaN(v as number) ? e.target.value : Number(v) } as any));
  };

  const valid = form.age>=18 && form.age<=85 && form.height_cm>=120 && form.height_cm<=220 &&
                form.weight_kg>=30 && form.weight_kg<=220 && form.waist_cm>=40 && form.waist_cm<=170;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Tu Perfil</h1>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-slate-300">Edad</span>
            <input type="number" className="bg-slate-800 rounded-lg px-3 py-2" value={form.age} onChange={update("age")} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-slate-300">Sexo</span>
            <select className="bg-slate-800 rounded-lg px-3 py-2" value={form.sex} onChange={update("sex")}>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-slate-300">Altura (cm)</span>
            <input type="number" className="bg-slate-800 rounded-lg px-3 py-2" value={form.height_cm} onChange={update("height_cm")} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-slate-300">Peso (kg)</span>
            <input type="number" className="bg-slate-800 rounded-lg px-3 py-2" value={form.weight_kg} onChange={update("weight_kg")} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-slate-300">Cintura (cm)</span>
            <input type="number" className="bg-slate-800 rounded-lg px-3 py-2" value={form.waist_cm} onChange={update("waist_cm")} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-slate-300">Horas de sueño</span>
            <input type="number" className="bg-slate-800 rounded-lg px-3 py-2" value={form.sleep_hours ?? 7} onChange={update("sleep_hours")} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-slate-300">Cigarrillos/día</span>
            <input type="number" className="bg-slate-800 rounded-lg px-3 py-2" value={form.smokes_cig_day ?? 0} onChange={update("smokes_cig_day")} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-slate-300">Días con actividad/sem</span>
            <input type="number" className="bg-slate-800 rounded-lg px-3 py-2" value={form.days_mvpa_week ?? 0} onChange={update("days_mvpa_week")} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-slate-300">Porciones de frutas/verduras</span>
            <input type="number" className="bg-slate-800 rounded-lg px-3 py-2" value={form.fruit_veg_portions_day ?? 0} onChange={update("fruit_veg_portions_day")} />
          </label>
        </div>
        <div className="mt-6">
          <Button onClick={() => onSave(form)} disabled={!valid}>Guardar y calcular riesgo</Button>
        </div>
      </Card>
    </div>
  );
}
