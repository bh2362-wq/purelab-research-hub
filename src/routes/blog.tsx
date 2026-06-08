import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen, FlaskConical, Snowflake, FileCheck, Scale, Beaker } from "lucide-react";
import { ReconstitutionCalculator } from "@/components/ReconstitutionCalculator";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Research Library — PureLab Peptides" },
      { name: "description", content: "Evidence-based guides for research professionals: peptide science, protocols, safety, and UK regulatory information." },
      { property: "og:title", content: "Research Library — PureLab Peptides" },
      { property: "og:description", content: "Evidence-based guides for research professionals." },
    ],
  }),
  component: Blog,
});

const categories = ["All", "Peptide Science", "Protocols", "Safety & Storage", "Regulatory"] as const;
type Category = typeof categories[number];

const featured = {
  title: "Understanding HPLC Purity Testing: What Researchers Should Know",
  category: "Peptide Science" as Category,
  readTime: "8 min read",
  excerpt:
    "High-performance liquid chromatography is the gold standard for quantifying peptide purity. This primer explains how reverse-phase HPLC separates target peptide from related impurities and what the resulting chromatograms actually tell you.",
  author: "PureLab Research Team",
  date: "May 2026",
};

const posts: Array<{ t: string; c: Category; r: string; d: string; date: string; icon: React.ComponentType<{ className?: string }> }> = [
  { t: "BPC-157 in Preclinical Research: A Literature Review", c: "Peptide Science", r: "12 min read", d: "Summary of in vitro and animal model findings across the published literature.", date: "Apr 2026", icon: FlaskConical },
  { t: "How to Reconstitute Lyophilised Peptides: Step-by-Step Protocol", c: "Protocols", r: "6 min read", d: "Bacteriostatic water selection, swirling technique, and sterile handling.", date: "Apr 2026", icon: Beaker },
  { t: "Cold Chain Integrity: Why Storage Temperature Matters for Peptide Research", c: "Safety & Storage", r: "5 min read", d: "Degradation kinetics and recommended storage windows for reconstituted vials.", date: "Mar 2026", icon: Snowflake },
  { t: "What Is a Certificate of Analysis and How to Read One", c: "Peptide Science", r: "7 min read", d: "Mass spec, HPLC, heavy metals, endotoxin — line by line.", date: "Mar 2026", icon: FileCheck },
  { t: "UK Regulations on Research Chemicals: A Researcher's Guide", c: "Regulatory", r: "10 min read", d: "MHRA, Home Office, and the legal framework for in vitro research materials.", date: "Feb 2026", icon: Scale },
  { t: "Ipamorelin vs GHRP-6: Comparative Preclinical Research Overview", c: "Peptide Science", r: "9 min read", d: "Receptor selectivity, secretagogue mechanisms, and study design considerations.", date: "Feb 2026", icon: FlaskConical },
];

function Blog() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.c === active);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Education Hub</p>
        <h1 className="font-heading text-4xl md:text-5xl text-white">Research Library</h1>
        <p className="text-slate-400 mt-3 max-w-2xl">Evidence-based guides for research professionals.</p>

        <div className="flex flex-wrap gap-2 mt-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                active === c
                  ? "bg-accent text-[#0B1829] border-accent"
                  : "border-white/10 text-slate-300 hover:border-accent/40 hover:text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured */}
        {(active === "All" || active === featured.category) && (
          <article className="mt-10 grid md:grid-cols-[1.1fr_1fr] gap-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0E1B2D]">
            <div className="relative aspect-[16/10] md:aspect-auto bg-gradient-to-br from-accent/20 via-[#0B1829] to-[#0B1829] flex items-center justify-center">
              <BookOpen className="h-20 w-20 text-accent/70" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs bg-accent text-[#0B1829] font-medium">Featured</span>
            </div>
            <div className="p-8 flex flex-col">
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent">{featured.category}</span>
                <span className="text-slate-500">{featured.readTime}</span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-white mt-4 leading-tight">{featured.title}</h2>
              <p className="text-slate-400 mt-3">{featured.excerpt}</p>
              <div className="mt-auto pt-6 flex items-center justify-between">
                <p className="text-xs text-slate-500">{featured.author} · {featured.date}</p>
                <button className="text-accent inline-flex items-center gap-1.5 text-sm hover:gap-2.5 transition-all">
                  Read Article <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {filtered.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.t} className="rounded-xl overflow-hidden border border-white/10 bg-[#0E1B2D] hover:border-accent/40 transition group">
                <div className="aspect-[16/10] bg-gradient-to-br from-[#111E30] to-[#0B1829] flex items-center justify-center border-b border-white/5">
                  <Icon className="h-12 w-12 text-accent/60 group-hover:text-accent transition" />
                </div>
                <div className="p-5">
                  <span className="px-2.5 py-1 rounded-full text-xs bg-accent/10 text-accent">{p.c}</span>
                  <h3 className="font-heading text-lg text-white mt-3 leading-snug">{p.t}</h3>
                  <p className="text-sm text-slate-400 mt-2">{p.d}</p>
                  <p className="text-xs text-slate-500 mt-4">{p.r} · {p.date}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Newsletter */}
        <div className="mt-14 rounded-2xl p-8 md:p-10 bg-gradient-to-r from-[#0E1B2D] via-[#0E1B2D] to-accent/10 border border-accent/20">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-6 items-center">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl text-white">Stay Updated with New Research Summaries</h3>
              <p className="text-slate-400 mt-2 text-sm">No spam. Research updates only. Unsubscribe anytime.</p>
            </div>
            <div className="flex gap-2">
              <input type="email" placeholder="you@institution.ac.uk" className="flex-1 bg-[#111E30] border border-white/10 focus:border-accent focus:outline-none text-white rounded-lg px-4 py-3 text-sm" />
              <button className="px-5 py-3 rounded-lg bg-accent text-[#0B1829] font-medium hover:brightness-110 transition">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Calculator embed */}
        <div className="mt-14">
          <ReconstitutionCalculator />
          <p className="text-center mt-4">
            <Link to="/tools/reconstitution" className="text-accent text-sm hover:underline">Open standalone calculator →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
