import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ReconstitutionCalculator } from "@/components/ReconstitutionCalculator";

export const Route = createFileRoute("/tools/reconstitution")({
  head: () => ({
    meta: [
      { title: "Reconstitution Calculator — PureLab Peptides" },
      { name: "description", content: "Free interactive peptide reconstitution calculator for research planning. Calculate bacteriostatic water volume for any target concentration." },
      { property: "og:title", content: "Peptide Reconstitution Calculator — PureLab Peptides" },
      { property: "og:description", content: "Free interactive tool for research planning." },
    ],
  }),
  component: ToolPage,
});

function ToolPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-accent text-sm mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Research Library
        </Link>
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Research Tools</p>
        <h1 className="font-heading text-4xl text-white mb-8">Reconstitution Calculator</h1>
        <ReconstitutionCalculator />
      </div>
    </section>
  );
}
