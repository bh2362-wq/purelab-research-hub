import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — PureLab Peptides" }, { name: "description", content: "PureLab Peptides — a UK supplier of independently verified research-grade peptides." }] }),
  component: About,
});

function About() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">About</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">A UK lab built on analytical transparency.</h1>
        <p className="text-muted-foreground leading-relaxed">
          PureLab Peptides supplies the academic and independent research community with peptides
          that are batch-traceable, independently verified, and dispatched cold from the United Kingdom.
          We publish every certificate of analysis and we never ship a batch that hasn't been tested.
        </p>
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { t: "Independent", d: "Janoshik Analytical, an accredited third-party lab." },
            { t: "Transparent", d: "Every batch CoA published in our Testing Archive." },
            { t: "UK Based", d: "Same-day dispatch before 2PM. Free tracked over £99." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border bg-surface p-5">
              <div className="font-display font-semibold text-white">{x.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border bg-surface p-6">
          <h2 className="font-display font-semibold text-white text-lg">Contact</h2>
          <p className="mt-2 text-sm text-muted-foreground">research@purelabpeptides.co.uk</p>
          <p className="text-sm text-muted-foreground">PureLab Peptides Ltd, Registered in England &amp; Wales</p>
        </div>
      </div>
    </section>
  );
}
