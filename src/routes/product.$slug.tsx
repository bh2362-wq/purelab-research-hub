import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  FlaskConical, FileCheck2, Snowflake, Truck, Microscope,
  Star, Check, Heart, ExternalLink, Download, Minus, Plus,
} from "lucide-react";
import { products, type Product, type SizeVariant } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/ProductCard";
import { ResearchFloatingPill } from "@/components/ResearchFloatingPill";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} ${loaderData.product.size} — PureLab Peptides` : "Product" },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="py-20 text-center text-muted-foreground">
      Product not found. <Link to="/shop" className="text-accent">Return to shop</Link>.
    </div>
  ),
  component: ProductPage,
});

type Chem = { formula: string; mw: string; cas: string; sequence: string; subname: string };
const chemistry: Record<string, Chem> = {
  "bpc-157-5mg": {
    subname: "Body Protection Compound — Lyophilised Powder",
    formula: "C₆₂H₉₈N₁₆O₂₂",
    mw: "1419.55 g/mol",
    cas: "137525-51-0",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
  },
};

const fallbackChem = (p: Product): Chem => ({
  subname: `${p.name} — Lyophilised Powder`,
  formula: "—",
  mw: "—",
  cas: "—",
  sequence: "—",
});

const tabs = ["Description", "Certificate of Analysis", "Research Notes", "Reviews"] as const;
type Tab = (typeof tabs)[number];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const chem = chemistry[product.slug] ?? fallbackChem(product);

  const variants: SizeVariant[] = product.sizes ?? [{ size: product.size, price: product.price }];
  const [selected, setSelected] = useState<SizeVariant>(
    variants.find((v) => v.size === product.size) ?? variants[0]
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [tab, setTab] = useState<Tab>("Description");

  const batchRef = `${product.batch.slice(0, 3).toUpperCase()}-BK2406-03`;

  const related = useMemo(
    () => products.filter((p) => p.slug !== product.slug).slice(0, 3),
    [product.slug]
  );

  const handleAdd = () => {
    addItem({ ...product, size: selected.size, price: selected.price }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-accent">Home</Link><span className="mx-2">›</span>
            <Link to="/shop" className="hover:text-accent">Shop</Link><span className="mx-2">›</span>
            <span className="hover:text-accent">{product.category.replace(" Research", "")}</span>
            <span className="mx-2">›</span>
            <span className="text-white">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14">
            {/* LEFT: gallery */}
            <div>
              <div
                className="relative rounded-3xl border aspect-square flex items-center justify-center overflow-hidden"
                style={{ background: "linear-gradient(160deg, #0F1B2C, #14253A)" }}
              >
                <div className="absolute inset-0 hex-pattern opacity-40" />
                <FlaskConical
                  size={240}
                  strokeWidth={1.1}
                  className="relative z-10 text-accent/80 animate-vial drop-shadow-[0_30px_60px_rgba(0,212,255,0.35)]"
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className="aspect-square rounded-xl border bg-surface hover:border-accent/50 transition flex items-center justify-center"
                  >
                    <FlaskConical size={36} className="text-accent/40" strokeWidth={1.25} />
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">Batch: <span className="text-white">{batchRef}</span></span>
                <Link
                  to="/coas"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-full bg-success/10 text-success text-xs font-medium px-3 py-1.5 border border-success/20 hover:bg-success/20"
                >
                  <Check size={12} /> CoA Available
                </Link>
              </div>
            </div>

            {/* RIGHT: details */}
            <div>
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] uppercase tracking-wider text-accent">
                {product.category}
              </span>
              <h1 className="mt-3 font-display font-bold text-white text-4xl lg:text-[36px] leading-tight">
                {product.name}
              </h1>
              <p className="mt-1 text-muted-foreground">{chem.subname}</p>

              <div className="mt-5 flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-display font-bold text-accent leading-none">{product.purity}</span>
                <span className="text-sm text-white/80">HPLC Verified</span>
                <Link to="/coas" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
                  Independent CoA <ExternalLink size={12} />
                </Link>
              </div>

              <button
                onClick={() => setTab("Reviews")}
                className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
              >
                <span className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className={i <= 4 ? "fill-accent text-accent" : "text-accent"} />
                  ))}
                </span>
                <span className="text-white font-medium">4.8</span>/5
                <span>(32 reviews)</span>
              </button>

              <div className="mt-6 border-t pt-6">
                <div className="text-4xl font-display font-bold text-white">£{selected.price.toFixed(2)}</div>

                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Size</div>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => {
                      const active = v.size === selected.size;
                      return (
                        <button
                          key={v.size}
                          onClick={() => setSelected(v)}
                          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition ${
                            active
                              ? "bg-accent text-[var(--accent-foreground)] border-accent font-semibold"
                              : "text-white border-white/15 hover:border-accent/50"
                          }`}
                        >
                          <span>{v.size}</span>
                          <span className={active ? "opacity-80" : "text-muted-foreground"}>£{v.price.toFixed(2)}</span>
                          {active && <Check size={14} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="inline-flex items-center rounded-xl border">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3.5 py-3 text-white hover:text-accent"><Minus size={14} /></button>
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                      className="w-12 bg-transparent text-center text-white outline-none"
                    />
                    <button onClick={() => setQty((q) => q + 1)} className="px-3.5 py-3 text-white hover:text-accent"><Plus size={14} /></button>
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  className={`mt-4 w-full rounded-xl py-4 font-semibold text-base transition ${
                    added ? "bg-success text-white" : "bg-accent hover:brightness-110"
                  }`}
                  style={added ? undefined : { color: "var(--accent-foreground)" }}
                >
                  {added ? "Added ✓" : `Add to Cart — £${(selected.price * qty).toFixed(2)}`}
                </button>

                <button
                  onClick={() => setWished((v) => !v)}
                  className={`mt-3 inline-flex items-center gap-2 text-sm hover:text-accent ${wished ? "text-danger" : "text-muted-foreground"}`}
                >
                  <Heart size={14} fill={wished ? "currentColor" : "none"} />
                  {wished ? "Saved to Wishlist" : "Add to Wishlist"}
                </button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
                {[
                  { I: Truck, t: "Dispatched Today", s: "Before 2PM" },
                  { I: Snowflake, t: "Cold Storage", s: "Chilled handling" },
                  { I: Microscope, t: "Batch Tested", s: "Janoshik HPLC" },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border bg-surface p-3 flex flex-col items-center gap-1 text-center">
                    <x.I size={18} className="text-accent" />
                    <span className="text-white font-medium leading-tight">{x.t}</span>
                    <span className="text-muted-foreground text-[10px]">{x.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="mt-16">
            <div className="border-b flex flex-wrap gap-1 overflow-x-auto no-scrollbar">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 -mb-px transition ${
                    tab === t ? "border-accent text-white font-semibold" : "border-transparent text-muted-foreground hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="py-10">
              {tab === "Description" && <DescriptionTab product={product} chem={chem} />}
              {tab === "Certificate of Analysis" && <CoaTab batchRef={batchRef} purity={product.purity} />}
              {tab === "Research Notes" && <ResearchTab name={product.name} />}
              {tab === "Reviews" && <ReviewsTab />}
            </div>
          </div>

          {/* RELATED */}
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently Researched Together</h2>
            <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
              {related.map((p) => (
                <div key={p.slug} className="min-w-[260px] sm:min-w-[300px] snap-start">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ResearchFloatingPill />
    </>
  );
}

function DescriptionTab({ product, chem }: { product: Product; chem: Chem }) {
  return (
    <div className="grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-4 text-white/85 leading-relaxed">
        <h3 className="font-display font-semibold text-white text-xl">About {product.name} for Research</h3>
        <p>
          {product.name} (Body Protection Compound 157) is a synthetic pentadecapeptide composed of 15 amino acids.
          Derived from a protective protein sequence identified in gastric juice, it has been studied extensively in
          preclinical and in vitro models for its reported effects on tissue repair mechanisms, angiogenesis, and
          gastrointestinal cytoprotection.
        </p>
        <p>
          In published in vitro research, {product.name} has been investigated for its interactions with growth factor
          pathways and cellular migration assays. The pentadecapeptide demonstrates stability across a range of pH
          conditions, which has made it a frequent subject of laboratory characterisation studies.
        </p>
        <p>
          PureLab supplies {product.name} as a lyophilised white powder, sealed under inert gas, intended exclusively
          for in vitro laboratory research. Each vial is accompanied by a batch-matched independent Certificate of
          Analysis from Janoshik Analytical s.r.o.
        </p>
        <p>
          Researchers reconstituting {product.name} should follow established protocols for sterile peptide handling
          and document batch numbers in their experimental records to support reproducibility.
        </p>

        <div className="mt-8 rounded-xl p-4 border" style={{ background: "#1A1200", borderColor: "rgba(245,181,68,0.3)", color: "#F5B544" }}>
          <strong className="font-display">Research Disclaimer:</strong> This product is supplied strictly for in vitro
          laboratory research. It is not a licensed medicine, is not for human or veterinary use, and must not be
          administered to humans or animals.
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-2xl border bg-surface p-5">
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Chemical Data</h4>
          <dl className="text-sm divide-y divide-white/5">
            {[
              ["Molecular Formula", chem.formula],
              ["Molecular Weight", chem.mw],
              ["CAS Number", chem.cas],
              ["Sequence", chem.sequence],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 py-2.5">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-white text-right font-mono text-xs break-all">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-2xl border bg-surface p-5">
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Storage</h4>
          <p className="text-sm text-white/85 leading-relaxed">
            Store lyophilised at <span className="text-accent">-20°C</span>. Once reconstituted, refrigerate at
            <span className="text-accent"> 2–8°C</span> and use within <span className="text-accent">28 days</span>.
          </p>
        </div>
      </aside>
    </div>
  );
}

function CoaTab({ batchRef, purity }: { batchRef: string; purity: string }) {
  const rows = [
    ["Purity", "HPLC-UV", purity, "≥98.0%"],
    ["Identity", "MS", "Confirmed", "Matches reference"],
    ["Heavy metals", "ICP-MS", "<1 ppm", "<10 ppm"],
    ["Appearance", "Visual", "White powder", "White/off-white powder"],
  ];
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <aside className="space-y-3 text-sm">
        <Meta label="Batch Reference" value={batchRef} />
        <Meta label="Test Date" value="April 2026" />
        <Meta label="Testing Laboratory" value="Janoshik Analytical s.r.o." />
        <div className="flex flex-col gap-2 pt-2">
          <a href="#" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3 font-semibold" style={{ color: "var(--accent-foreground)" }}>
            <Download size={16} /> Download CoA PDF
          </a>
          <a href="https://janoshik.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1 text-sm text-accent hover:underline">
            Verify on Janoshik <ExternalLink size={12} />
          </a>
        </div>
      </aside>

      <div className="lg:col-span-2 rounded-2xl border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground border-b">
            <tr>
              <th className="px-4 py-3 font-medium">Test</th>
              <th className="px-4 py-3 font-medium">Method</th>
              <th className="px-4 py-3 font-medium">Result</th>
              <th className="px-4 py-3 font-medium">Specification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r) => (
              <tr key={r[0]}>
                <td className="px-4 py-3 text-white">{r[0]}</td>
                <td className="px-4 py-3 text-muted-foreground">{r[1]}</td>
                <td className="px-4 py-3 text-success font-medium">{r[2]}</td>
                <td className="px-4 py-3 text-muted-foreground">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-surface px-4 py-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-white font-medium">{value}</div>
    </div>
  );
}

function ResearchTab({ name }: { name: string }) {
  const refs = [
    "Sikiric P et al. (2018). Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract. Curr Pharm Des. PMID: 29879882.",
    "Chang CH et al. (2014). The effects of BPC-157 on tendon-to-bone healing. J Orthop Res. PMID: 24255741.",
    "Krivic A et al. (2008). Achilles detachment in rat and stable gastric pentadecapeptide BPC 157. J Orthop Res. PMID: 18438954.",
    "Seiwerth S et al. (2014). BPC 157 and standard angiogenic growth factors. Curr Pharm Des. PMID: 24345253.",
  ];
  return (
    <div className="max-w-3xl space-y-4 text-white/85 leading-relaxed">
      <h3 className="font-display font-semibold text-white text-xl">Key In Vitro &amp; Preclinical Findings</h3>
      <p>
        Across published preclinical literature, {name} has been characterised in models examining angiogenic
        signalling, collagen organisation, and gastrointestinal mucosal integrity. Reported observations include
        modulation of growth factor receptor expression and cytoskeletal reorganisation in cultured fibroblast lines.
      </p>
      <p>
        Researchers have also evaluated {name} in studies of nitric oxide pathway interactions and dopaminergic
        signalling using animal model systems. As with any peptide, results vary by experimental protocol,
        reconstitution method, and batch source — making batch-traceable supply important for reproducibility.
      </p>

      <h4 className="font-display font-semibold text-white text-lg mt-8">References</h4>
      <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
        {refs.map((r) => <li key={r}>{r}</li>)}
      </ol>
    </div>
  );
}

function ReviewsTab() {
  const dist = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 16 },
    { stars: 3, pct: 4 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];
  const reviews = [
    { name: "Dr. M. Patel", role: "Postdoctoral Researcher", date: "March 2026", stars: 5, body: "Consistent purity batch-to-batch. The CoA from Janoshik matched the lot we received. Reconstitution was clean and lyophilisate was a uniform white cake." },
    { name: "L. Hwang, MSc", role: "Cell Biology Lab", date: "February 2026", stars: 5, body: "We used this in fibroblast migration assays. Results were within expected ranges and the cold-pack shipping arrived intact in 24 hours." },
    { name: "Dr. R. Costa", role: "Independent Researcher", date: "January 2026", stars: 4, body: "Good documentation and transparent batch reporting. Would appreciate sub-mg vial options for pilot studies." },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-10">
      <aside className="rounded-2xl border bg-surface p-6 h-fit">
        <div className="text-5xl font-display font-bold text-white">4.8<span className="text-2xl text-muted-foreground">/5</span></div>
        <div className="flex mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={16} className={i <= 4 ? "fill-accent text-accent" : "text-accent"} />
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-1">Based on 32 reviews</div>
        <div className="mt-5 space-y-2">
          {dist.map((d) => (
            <div key={d.stars} className="flex items-center gap-2 text-xs">
              <span className="w-8 text-muted-foreground">{d.stars}★</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${d.pct}%` }} />
              </div>
              <span className="w-8 text-right text-muted-foreground">{d.pct}%</span>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full rounded-xl bg-accent py-2.5 font-semibold text-sm" style={{ color: "var(--accent-foreground)" }}>
          Write a Review
        </button>
      </aside>

      <div className="lg:col-span-2 space-y-4">
        {reviews.map((r) => (
          <article key={r.name} className="rounded-2xl border bg-surface p-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="text-white font-display font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role} · {r.date}</div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className={i <= r.stars ? "fill-accent text-accent" : "text-white/20"} />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-white/85 leading-relaxed">{r.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export { FileCheck2 };
