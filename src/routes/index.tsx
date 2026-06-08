import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical, ShieldCheck, Truck, Globe, PackageSearch, Atom, Brain, Sun, Zap, Beaker, FileCheck2, ArrowRight } from "lucide-react";
import { DisclaimerPill } from "@/components/Disclaimer";
import { Vial } from "@/components/Vial";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PureLab Peptides — Research-Grade Peptides. Verified. UK Dispatched." },
      { name: "description", content: "Independent third-party tested peptides at 99%+ purity. Batch-traceable. Free tracked UK delivery over £99." },
    ],
  }),
  component: Home,
});

const catIcons: Record<string, typeof FlaskConical> = {
  flask: FlaskConical, shield: ShieldCheck, brain: Brain, sun: Sun, atom: Atom, zap: Zap,
};

const usps = [
  { I: Truck, t: "Same Day Dispatch", d: "Order before 2PM, Mon–Fri" },
  { I: Globe, t: "International Delivery", d: "Discreet tracked shipping" },
  { I: PackageSearch, t: "Track & Trace", d: "Follow every order" },
  { I: ShieldCheck, t: "Research Use Only", d: "99%+ verified purity" },
];

function Home() {
  const bestSellers = products.slice(0, 6);
  return (
    <>
      {/* HERO */}
      <section className="relative hex-pattern border-b">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> UK Lab · Janoshik Verified
            </div>
            <h1 className="font-display font-bold text-foreground leading-[1.05] text-5xl sm:text-6xl lg:text-[68px]">
              Research Peptides.
              <span className="block text-accent">Verified to 99%+ Purity.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Independent third-party tested. Batch-traceable. Dispatched from the UK.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold hover:brightness-110 transition" style={{ color: "var(--accent-foreground)" }}>
                Shop Verified Catalogue <ArrowRight size={16} />
              </Link>
              <Link to="/coas" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background text-foreground px-6 py-3.5 font-semibold hover:bg-surface transition">
                View Testing Archive
              </Link>
            </div>
            <div className="mt-6"><DisclaimerPill /></div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-border p-8 lg:p-10" style={{ background: "linear-gradient(160deg, #FFFFFF, #EAF1F7)" }}>
              <div className="absolute inset-0 -z-0 blur-3xl opacity-20" style={{ background: "radial-gradient(circle, #00D4FF, transparent 60%)" }} />
              <div className="relative z-10"><Vial /></div>
            </div>
          </div>
        </div>
      </section>

      {/* USP ICON ROW */}
      <section className="border-b bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-7 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((u) => (
            <div key={u.t} className="flex items-center gap-3.5">
              <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                <u.I size={20} strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground leading-tight">{u.t}</div>
                <div className="text-xs text-muted-foreground">{u.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Research Categories</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Browse by Research Area</h2>
            </div>
            <Link to="/shop" className="text-sm text-accent hover:underline inline-flex items-center gap-1">View full catalogue <ArrowRight size={14} /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c) => {
              const Icon = catIcons[c.icon] ?? FlaskConical;
              return (
                <Link key={c.slug} to="/shop" className="group rounded-2xl border border-border bg-surface p-6 hover:border-accent/50 hover:shadow-sm transition">
                  <Icon size={28} className="text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="font-display font-semibold text-foreground text-lg">{c.name}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-accent">
                    Explore <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Best Sellers</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Most Researched This Month</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex text-sm text-accent hover:underline items-center gap-1">All products <ArrowRight size={14} /></Link>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
            {bestSellers.map((p) => (
              <div key={p.slug} className="min-w-[260px] sm:min-w-[280px] snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="py-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Analytical Transparency. Every Batch.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { I: Beaker, t: "HPLC Purity Testing", d: "Every peptide batch is tested by Janoshik Analytical, an independent accredited laboratory, to confirm purity at or above 99%." },
              { I: Atom, t: "ICP-MS Heavy Metal Screening", d: "Inductively coupled plasma mass spectrometry detects trace metal contaminants — results published per batch." },
              { I: ShieldCheck, t: "Endotoxin Analysis", d: "LAL endotoxin testing is performed where required for sensitive research applications." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-background p-6">
                <c.I size={26} className="text-accent mb-4" strokeWidth={1.5} />
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">{c.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/coas" className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold" style={{ color: "var(--accent-foreground)" }}>
              <FileCheck2 size={16} /> Browse Testing Archive
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
