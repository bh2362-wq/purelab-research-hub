import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Download, Check, Beaker, Atom, ShieldCheck, ExternalLink, ArrowUpDown } from "lucide-react";
import { ResearchFloatingPill } from "@/components/ResearchFloatingPill";

export const Route = createFileRoute("/coas")({
  head: () => ({
    meta: [
      { title: "Testing Archive — PureLab Peptides" },
      { name: "description", content: "Independent Janoshik Certificates of Analysis for every batch we dispatch. Published permanently." },
    ],
  }),
  component: Coas,
});

type Row = {
  ref: string; product: string; category: string; date: string;
  iso: string; purity: number; heavy: "Pass"; endotoxin: "Pass" | "N/A";
};

const rows: Row[] = [
  { ref: "BPC-BK2406-03", product: "BPC-157 5mg", category: "Regulatory & Repair", date: "Apr 2026", iso: "2026-04-18", purity: 99.4, heavy: "Pass", endotoxin: "Pass" },
  { ref: "IPA-BK2406-01", product: "Ipamorelin 5mg", category: "GH Secretagogue", date: "Apr 2026", iso: "2026-04-09", purity: 99.1, heavy: "Pass", endotoxin: "N/A" },
  { ref: "TB5-BK2405-02", product: "TB-500 5mg", category: "Regulatory & Repair", date: "Mar 2026", iso: "2026-03-22", purity: 98.9, heavy: "Pass", endotoxin: "Pass" },
  { ref: "GHK-BK2405-01", product: "GHK-Cu 50mg", category: "Copper Peptide", date: "Mar 2026", iso: "2026-03-11", purity: 99.5, heavy: "Pass", endotoxin: "N/A" },
  { ref: "CJC-BK2404-02", product: "CJC-1295 5mg", category: "GH Secretagogue", date: "Feb 2026", iso: "2026-02-26", purity: 99.3, heavy: "Pass", endotoxin: "N/A" },
  { ref: "SLK-BK2404-01", product: "Selank 5mg", category: "Neuropeptide", date: "Feb 2026", iso: "2026-02-14", purity: 99.1, heavy: "Pass", endotoxin: "N/A" },
  { ref: "SEM-BK2403-02", product: "Semax 5mg", category: "Neuropeptide", date: "Feb 2026", iso: "2026-02-02", purity: 98.7, heavy: "Pass", endotoxin: "N/A" },
  { ref: "PT1-BK2403-01", product: "PT-141 10mg", category: "Melanocortin", date: "Jan 2026", iso: "2026-01-28", purity: 99.0, heavy: "Pass", endotoxin: "Pass" },
  { ref: "KPV-BK2402-03", product: "KPV 10mg", category: "Regulatory & Repair", date: "Jan 2026", iso: "2026-01-17", purity: 99.2, heavy: "Pass", endotoxin: "Pass" },
  { ref: "SS3-BK2402-01", product: "SS-31 5mg", category: "Mitochondrial", date: "Jan 2026", iso: "2026-01-08", purity: 99.3, heavy: "Pass", endotoxin: "Pass" },
  { ref: "HEX-BK2401-02", product: "Hexarelin 5mg", category: "GH Secretagogue", date: "Dec 2025", iso: "2025-12-19", purity: 99.0, heavy: "Pass", endotoxin: "N/A" },
  { ref: "GH6-BK2401-01", product: "GHRP-6 5mg", category: "GH Secretagogue", date: "Dec 2025", iso: "2025-12-04", purity: 98.8, heavy: "Pass", endotoxin: "N/A" },
];

const filterPills = ["All", "GH Secretagogue", "Regulatory & Repair", "Neuropeptide", "Melanocortin", "Copper Peptide", "Mitochondrial"];

function Coas() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sortNewest, setSortNewest] = useState(true);

  const filtered = useMemo(() => {
    let r = rows.filter((x) => {
      if (cat !== "All" && x.category !== cat) return false;
      if (q && !`${x.product} ${x.ref}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
    r = [...r].sort((a, b) => sortNewest ? b.iso.localeCompare(a.iso) : a.iso.localeCompare(b.iso));
    return r;
  }, [q, cat, sortNewest]);

  return (
    <>
      <section className="py-14 lg:py-20 hex-pattern border-b">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Testing Archive</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            Analytical Transparency. <span className="text-accent">Every Batch.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Every product batch is independently tested before dispatch. Results are published here permanently for researcher reference.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { v: "142", l: "CoAs Published" },
              { v: "99.1%", l: "Average Purity" },
              { v: "0", l: "Batches Recalled" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border bg-surface p-5">
                <div className="text-3xl font-display font-bold text-accent">{s.v}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          {/* Search + Filter */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by product name or batch number..."
                className="w-full rounded-xl border bg-surface pl-10 pr-4 py-3 text-white outline-none focus:border-accent text-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-between">
              <div className="flex flex-wrap gap-2">
                {filterPills.map((p) => {
                  const active = cat === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setCat(p)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border transition ${
                        active
                          ? "bg-accent text-[var(--accent-foreground)] border-accent font-semibold"
                          : "text-white/80 border-white/15 hover:border-accent/50"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setSortNewest((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent"
              >
                <ArrowUpDown size={12} /> {sortNewest ? "Newest First" : "Oldest First"}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 rounded-2xl border bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[860px]">
                <thead className="text-left text-muted-foreground border-b">
                  <tr>
                    {["Batch Ref", "Product", "Category", "Test Date", "Purity (HPLC)", "Heavy Metals", "Endotoxin", "Download"].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((r) => (
                    <tr key={r.ref} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-mono text-white text-xs">{r.ref}</td>
                      <td className="px-4 py-3 text-white">{r.product}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.category}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-success font-medium">
                          {r.purity}% <Check size={12} />
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-success">Pass <Check size={12} /></span>
                      </td>
                      <td className="px-4 py-3">
                        {r.endotoxin === "Pass" ? (
                          <span className="inline-flex items-center gap-1 text-success">Pass <Check size={12} /></span>
                        ) : (
                          <span className="inline-flex items-center gap-1" style={{ color: "#F5B544" }}>N/A ⚠️</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <a href="#" className="inline-flex items-center gap-1 text-accent hover:underline">
                          <Download size={13} /> PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="p-10 text-center text-muted-foreground text-sm">No certificates match your filters.</div>
            )}
          </div>

          {/* Methodology */}
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Testing Methodology</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { I: Beaker, t: "HPLC-UV Purity Testing", d: "Reverse-phase high performance liquid chromatography separates peptide constituents and a UV detector quantifies them — this is the industry standard for confirming a peptide's identity and purity at or above 99%." },
                { I: Atom, t: "ICP-MS Heavy Metal Screening", d: "Inductively coupled plasma mass spectrometry detects trace amounts of metallic contaminants (lead, arsenic, mercury, cadmium) at parts-per-million sensitivity, critical for sensitive cellular assays." },
                { I: ShieldCheck, t: "Endotoxin / LAL Testing", d: "Limulus amebocyte lysate assays detect bacterial endotoxins. We perform LAL testing on batches intended for endotoxin-sensitive in vitro research such as cell culture and immunology models." },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border bg-surface p-6">
                  <x.I size={26} className="text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="font-display font-semibold text-white text-lg mb-2">{x.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{x.d}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 text-sm text-muted-foreground text-center">
            Third-party verified by{" "}
            <a href="https://janoshik.com" target="_blank" rel="noreferrer" className="text-accent hover:underline inline-flex items-center gap-1">
              Janoshik Analytical s.r.o. <ExternalLink size={12} />
            </a>{" "}
            — Independent accredited laboratory.
          </p>
        </div>
      </section>
      <ResearchFloatingPill />
    </>
  );
}
