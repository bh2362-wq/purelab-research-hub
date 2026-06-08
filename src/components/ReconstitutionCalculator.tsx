import { useMemo, useState } from "react";
import { FlaskConical } from "lucide-react";

const presets = [
  { label: "BPC-157 5mg @ 500mcg/mL", mg: 5, conc: 500, vial: 10 },
  { label: "Ipamorelin 5mg @ 1000mcg/mL", mg: 5, conc: 1000, vial: 5 },
  { label: "TB-500 5mg @ 500mcg/mL", mg: 5, conc: 500, vial: 10 },
];

export function ReconstitutionCalculator() {
  const [mg, setMg] = useState(5);
  const [conc, setConc] = useState(1000);
  const [vial, setVial] = useState(3);

  const { mlToAdd, perUnit, totalUnits, status } = useMemo(() => {
    const m = Number(mg) || 0;
    const c = Number(conc) || 0;
    const ml = c > 0 ? (m * 1000) / c : 0;
    const per = c * 0.1;
    const units = ml > 0 ? ml / 0.1 : 0;
    let s: "ok" | "warn" = "ok";
    if (ml < 0.5 || ml > vial) s = "warn";
    return { mlToAdd: ml, perUnit: per, totalUnits: units, status: s };
  }, [mg, conc, vial]);

  const overflow = mlToAdd > vial;

  return (
    <div className="relative rounded-2xl border border-accent/40 bg-[#0E1B2D] p-6 md:p-8 shadow-[0_0_60px_-20px_rgba(0,212,255,0.35)]">
      <FlaskConical className="absolute top-5 right-5 h-6 w-6 text-accent/60" />
      <h3 className="font-heading text-2xl md:text-3xl text-white">Peptide Reconstitution Calculator</h3>
      <p className="text-slate-400 mt-1 text-sm">
        Calculate the exact volume of bacteriostatic water needed to achieve your target concentration.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Field label="Peptide amount" suffix="mg">
          <input type="number" min={0} value={mg} onChange={(e) => setMg(Number(e.target.value))} className={inputCls} />
        </Field>
        <Field label="Desired concentration" suffix="mcg/mL">
          <input type="number" min={0} value={conc} onChange={(e) => setConc(Number(e.target.value))} className={inputCls} />
        </Field>
        <Field label="Vial size" suffix="mL">
          <select value={vial} onChange={(e) => setVial(Number(e.target.value))} className={inputCls}>
            {[1, 2, 3, 5, 10].map((v) => <option key={v} value={v}>{v} mL</option>)}
          </select>
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => { setMg(p.mg); setConc(p.conc); setVial(p.vial); }}
            className="text-xs px-3 py-1.5 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className={`mt-6 rounded-xl border p-5 ${status === "ok" ? "border-emerald-500/40 bg-emerald-500/5" : "border-amber-500/40 bg-amber-500/5"}`}>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Water to add" value={`${mlToAdd.toFixed(2)} mL`} />
          <Stat label="Per 0.1 mL (10 IU)" value={`${perUnit.toFixed(1)} mcg`} />
          <Stat label="Total units in vial" value={`${totalUnits.toFixed(0)} units`} />
        </div>
        {overflow && (
          <p className="text-amber-300 text-sm mt-4">
            ⚠ Required volume ({mlToAdd.toFixed(2)} mL) exceeds selected vial capacity ({vial} mL). Choose a larger vial or higher concentration.
          </p>
        )}
        {!overflow && status === "warn" && (
          <p className="text-amber-300 text-sm mt-4">⚠ Resulting volume is outside typical range. Verify your inputs.</p>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-4">
        This calculator is provided as a convenience tool for research planning only. Always verify calculations independently before use in research settings.
      </p>
    </div>
  );
}

const inputCls = "w-full bg-[#111E30] border border-white/10 focus:border-accent focus:outline-none text-white rounded-lg px-3 py-2.5 text-sm";

function Field({ label, suffix, children }: { label: string; suffix: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-slate-400">{label} <span className="text-slate-500 normal-case">({suffix})</span></span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="font-heading text-2xl text-white mt-1">{value}</p>
    </div>
  );
}
