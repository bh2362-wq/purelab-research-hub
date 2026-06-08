import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Education Hub — PureLab Peptides" }, { name: "description", content: "Research notes, methodology guides and analytical references." }] }),
  component: Blog,
});

const posts = [
  { t: "Understanding HPLC Purity in Peptide Research", d: "How reverse-phase HPLC quantifies peptide purity and why 99%+ matters.", c: "Methodology" },
  { t: "ICP-MS Heavy Metal Screening Explained", d: "What trace metal results mean for sensitive in vitro assays.", c: "Analytical" },
  { t: "Cold-Chain Handling for Lyophilised Peptides", d: "Best practices for storage and reconstitution in the laboratory.", c: "Handling" },
  { t: "Reading a Janoshik Certificate of Analysis", d: "A walkthrough of the data on every PureLab CoA.", c: "Reference" },
];

function Blog() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Education</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-10">Research Notes &amp; Methodology</h1>
        <div className="grid md:grid-cols-2 gap-5">
          {posts.map((p) => (
            <article key={p.t} className="rounded-2xl border bg-surface p-6 hover:border-accent/40 transition">
              <span className="text-xs uppercase tracking-wider text-accent">{p.c}</span>
              <h2 className="mt-2 font-display font-semibold text-white text-xl">{p.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm text-accent">Read article <ArrowRight size={14} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
