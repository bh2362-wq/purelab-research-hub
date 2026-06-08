import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — PureLab Peptides" },
      { name: "description", content: "Answers to common questions about ordering, peptide testing, and UK research compliance." },
    ],
  }),
  component: Faq,
});

type Q = { q: string; a: string };
const groups: { title: string; items: Q[] }[] = [
  {
    title: "Ordering & Delivery",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, American Express) via Stripe's PCI-DSS compliant payment gateway. We do not store card details on our servers. UK bank transfer is available on request for institutional accounts." },
      { q: "How quickly will my order be dispatched?", a: "Orders placed before 2:00 PM (UK time) on a working day are dispatched the same day from our UK facility. Orders placed after 2:00 PM or on weekends ship the next working day. You will receive an email with tracking once your parcel is collected." },
      { q: "Do you offer free delivery?", a: "Yes — all UK orders over £99 qualify for free Royal Mail Tracked 24 delivery. Orders below the threshold are charged £4.95 for Tracked 24 or £2.95 for Tracked 48. International shipping is available at checkout." },
      { q: "Can I track my order?", a: "Once your parcel is collected by Royal Mail you will receive a tracking number by email. You can monitor delivery progress on the Royal Mail website. Tracked 24 typically delivers the next working day; Tracked 48 within 2–3 working days." },
    ],
  },
  {
    title: "Products & Testing",
    items: [
      { q: "How do I know your peptides are genuine?", a: "Every batch we sell ships with a batch-matched Certificate of Analysis issued by Janoshik Analytical s.r.o., an independent accredited laboratory. The batch reference printed on your vial matches the CoA, which is also published permanently in our Testing Archive for verification." },
      { q: "What does HPLC testing mean?", a: "HPLC (High Performance Liquid Chromatography) is the industry-standard analytical technique for quantifying peptide purity. Reverse-phase HPLC with UV detection separates the peptide from impurities and synthesis by-products, reporting purity as a percentage of total detected mass. All PureLab batches are HPLC-tested to ≥98%." },
      { q: "What is a Certificate of Analysis (CoA)?", a: "A CoA is a document issued by the testing laboratory that records the methods used, the results obtained, and the specifications met for a specific batch. Our CoAs include HPLC purity, identity confirmation (mass spectrometry), heavy metals (ICP-MS), and where applicable endotoxin levels (LAL)." },
      { q: "How should I store peptides?", a: "Lyophilised (freeze-dried) peptides should be stored at -20°C in their sealed vial, protected from light and moisture. Once reconstituted in bacteriostatic water or saline, store at 2–8°C and use within 28 days. Avoid repeated freeze-thaw cycles of reconstituted material." },
    ],
  },
  {
    title: "Legal & Compliance",
    items: [
      { q: "Are research peptides legal in the UK?", a: "Yes. The peptides PureLab supplies are not controlled substances under the Misuse of Drugs Act 1971 and are not licensed medicines under the Human Medicines Regulations 2012. They are supplied lawfully for in vitro laboratory research only and are not intended for human or veterinary use." },
      { q: "Who can purchase from PureLab Peptides?", a: "Our products are intended for qualified researchers, academic institutions, and laboratories engaged in bona fide in vitro scientific research. By placing an order you confirm you are over 18, are purchasing for legitimate research purposes, and accept our Terms of Use." },
      { q: "What is your returns policy?", a: "Due to the temperature-sensitive and biological nature of our products, opened or partially used vials cannot be returned for safety and quality reasons. Unopened, undamaged items may be returned within 14 days of receipt in their original packaging. Quality complaints relating to a specific batch are investigated against the corresponding CoA — contact research@purelabpeptides.co.uk with your batch reference." },
      { q: "What does \"for research use only\" mean?", a: "It means a product has been manufactured, tested, and supplied for use exclusively in laboratory research conducted in vitro (outside of a living organism). Such products are not licensed medicines, have not been evaluated for safety or efficacy in humans or animals, and must not be administered to people or pets under any circumstances." },
    ],
  },
];

function Faq() {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">FAQ</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">Frequently Asked Questions</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Practical answers about ordering, peptide testing, and UK research compliance.
        </p>

        <div className="mt-12 space-y-12">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="font-display font-semibold text-foreground text-sm uppercase tracking-[0.2em] text-accent mb-4">{g.title}</h2>
              <div className="space-y-3">
                {g.items.map((item) => <AccordionItem key={item.q} {...item} />)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border bg-surface p-6 text-center">
          <h3 className="font-display font-semibold text-foreground text-lg">Still have a question?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Reach our research team for technical or compliance enquiries.</p>
          <a href="mailto:research@purelabpeptides.co.uk" className="mt-4 inline-flex rounded-xl bg-accent px-6 py-3 font-semibold" style={{ color: "var(--accent-foreground)" }}>
            research@purelabpeptides.co.uk
          </a>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ q, a }: Q) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border bg-surface transition ${open ? "border-accent/40" : ""}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-display font-semibold text-foreground">{q}</span>
        <ChevronDown
          size={18}
          className={`text-accent shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}
