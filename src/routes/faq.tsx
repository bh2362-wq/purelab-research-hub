import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — PureLab Peptides" }] }),
  component: Faq,
});

const faqs = [
  { q: "Are these peptides for human use?", a: "No. All products are supplied strictly for in vitro laboratory research and are not licensed for human or veterinary use." },
  { q: "Who tests your peptides?", a: "Every batch is independently tested by Janoshik Analytical, an accredited third-party laboratory." },
  { q: "How quickly do orders dispatch?", a: "Orders placed before 2PM UK time dispatch the same working day with tracked 24h delivery." },
  { q: "Do you offer free shipping?", a: "Yes — free tracked UK delivery on orders over £99." },
  { q: "How should I store my peptides?", a: "Lyophilised peptides should be stored at -20°C. Once reconstituted, store at 2–8°C and use within 30 days." },
  { q: "Can I get the CoA for my batch?", a: "Yes — every batch CoA is downloadable from the Testing Archive, and is included with your shipment." },
];

function Faq() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">FAQ</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-10">Frequently Asked Questions</h1>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border bg-surface p-5 open:border-accent/40">
              <summary className="cursor-pointer list-none flex justify-between items-center font-display font-semibold text-white">
                {f.q}
                <span className="text-accent transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
