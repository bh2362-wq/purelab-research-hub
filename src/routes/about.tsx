import { createFileRoute, Link } from "@tanstack/react-router";
import { Microscope, Landmark, Snowflake } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PureLab Peptides" },
      { name: "description", content: "PureLab Peptides — a UK supplier of independently verified research-grade peptides, built on analytical transparency." },
    ],
  }),
  component: About,
});

function About() {
  const steps = [
    { t: "Sourcing from cGMP-certified synthesis partners", d: "We work only with synthesis facilities operating under current Good Manufacturing Practice with documented quality systems." },
    { t: "Independent third-party purity testing (HPLC)", d: "Every incoming batch is submitted to Janoshik Analytical for reverse-phase HPLC analysis — no batch is sold without an external CoA." },
    { t: "ICP-MS heavy metal screening", d: "Trace metals are screened by inductively coupled plasma mass spectrometry at ppm sensitivity." },
    { t: "Cold storage from receipt to dispatch", d: "Lyophilised peptides are held at -20°C from receipt to shipment, with chilled handling on dispatch." },
    { t: "Batch documentation published before sale", d: "Each CoA is uploaded to our public Testing Archive before the batch is listed for purchase." },
  ];

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">About</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          About PureLab Peptides
        </h1>
        <p className="mt-6 text-lg text-white/85 leading-relaxed">
          PureLab Peptides exists to support the academic and independent research community with peptide reagents
          whose composition, purity, and handling can be independently verified. We publish a Certificate of
          Analysis for every batch we ship, store inventory under cold-chain conditions, and dispatch from the
          United Kingdom — because reproducible research begins with reagents you can trust.
        </p>

        {/* Pillars */}
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { I: Microscope, t: "Analytical Rigor", d: "Every batch tested by HPLC-UV against documented specifications." },
            { I: Landmark, t: "Independent Verification", d: "Third-party CoAs from Janoshik Analytical — never in-house only." },
            { I: Snowflake, t: "Cold Chain Integrity", d: "Continuous -20°C storage with chilled-pack dispatch." },
          ].map((p) => (
            <div key={p.t} className="rounded-2xl border bg-surface p-6">
              <p.I size={26} className="text-accent mb-4" strokeWidth={1.5} />
              <h3 className="font-display font-semibold text-white text-lg">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Our Testing Process</h2>
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={s.t} className="rounded-2xl border bg-surface p-5 flex gap-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-[var(--accent-foreground)] font-display font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-white">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Legal */}
        <div className="mt-16 rounded-2xl p-6 border text-sm leading-relaxed" style={{ background: "#1A1200", borderColor: "rgba(245,181,68,0.3)", color: "#F5B544" }}>
          <strong className="font-display block text-base mb-2">Legal &amp; Compliance</strong>
          All products supplied by PureLab Peptides are strictly for in vitro research applications. We operate in
          full compliance with UK regulations regarding research chemical supply. Products are not licensed
          medicines and are not intended for human or veterinary use.
        </div>

        <div className="mt-10 rounded-2xl border bg-surface p-6">
          <h3 className="font-display font-semibold text-white text-lg">Contact</h3>
          <p className="mt-2 text-sm text-muted-foreground">research@purelabpeptides.co.uk</p>
          <p className="mt-1 text-sm text-muted-foreground">PureLab Peptides Ltd, Registered in England &amp; Wales</p>
          <Link to="/faq" className="mt-4 inline-flex text-sm text-accent hover:underline">Read our FAQ →</Link>
        </div>
      </div>
    </section>
  );
}
