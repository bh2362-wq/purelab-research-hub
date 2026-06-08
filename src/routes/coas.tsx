import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2, Download } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/coas")({
  head: () => ({ meta: [{ title: "Testing Archive — PureLab Peptides" }, { name: "description", content: "Independent Janoshik Certificates of Analysis for every batch we ship." }] }),
  component: Coas,
});

function Coas() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Testing Archive</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Certificates of Analysis</h1>
        <p className="text-muted-foreground max-w-2xl mb-10">Every batch is independently tested by Janoshik Analytical. Download the CoA for the batch you receive.</p>

        <div className="rounded-2xl border bg-surface overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Peptide</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Batch</th>
                <th className="px-4 py-3 font-medium">Purity (HPLC)</th>
                <th className="px-4 py-3 font-medium text-right">CoA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => (
                <tr key={p.slug} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-white">{p.name} {p.size}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.batch}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/10 text-success text-xs font-medium px-2.5 py-1 border border-success/20">{p.purity}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a href="#" className="inline-flex items-center gap-1.5 text-accent hover:underline">
                      <Download size={14} /> PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <Info t="HPLC" d="Identity & purity confirmation ≥99%." />
          <Info t="ICP-MS" d="Heavy metals trace screening." />
          <Info t="LAL" d="Endotoxin analysis where applicable." />
        </div>
      </div>
    </section>
  );
}

function Info({ t, d }: { t: string; d: string }) {
  return (
    <div className="rounded-xl border bg-surface p-4">
      <div className="text-white font-display font-semibold inline-flex items-center gap-2"><FileCheck2 size={16} className="text-accent" /> {t}</div>
      <p className="mt-1">{d}</p>
    </div>
  );
}
