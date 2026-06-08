import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, FlaskConical, Check, ShieldAlert, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — PureLab Peptides" }] }),
  component: Checkout,
});

const FREE_THRESHOLD = 99;
type ShipKey = "tracked24" | "tracked48" | "free";
const shippingOptions: { key: ShipKey; name: string; price: number; eta: string }[] = [
  { key: "tracked24", name: "Royal Mail Tracked 24", price: 4.95, eta: "Est. next working day" },
  { key: "tracked48", name: "Royal Mail Tracked 48", price: 2.95, eta: "Est. 2–3 working days" },
  { key: "free", name: "Free Tracked 24", price: 0, eta: "Orders over £99" },
];

function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, clear } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [placed, setPlaced] = useState(false);
  const eligibleFree = cartTotal >= FREE_THRESHOLD;
  const [shipKey, setShipKey] = useState<ShipKey>(eligibleFree ? "free" : "tracked24");
  const [showDiscount, setShowDiscount] = useState(false);

  useEffect(() => {
    if (eligibleFree) setShipKey("free");
  }, [eligibleFree]);

  const shipping = shippingOptions.find((s) => s.key === shipKey)!;
  const shipCost = shipping.key === "free" && !eligibleFree ? 4.95 : shipping.price;
  const vat = (cartTotal + shipCost) * 0.2;
  const total = cartTotal + shipCost + vat;

  if (placed) {
    return (
      <section className="py-24 text-center px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/15 text-success mb-4">
          <Check size={32} />
        </div>
        <h1 className="text-4xl font-bold text-white">Order received</h1>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          A confirmation has been emailed. Dispatch from our UK lab same-day before 2PM.
        </p>
        <Link to="/" className="mt-6 inline-flex rounded-xl bg-accent px-6 py-3 font-semibold" style={{ color: "var(--accent-foreground)" }}>
          Back to home
        </Link>
      </section>
    );
  }

  if (!confirmed) {
    return (
      <ComplianceGate
        onConfirm={() => setConfirmed(true)}
        onCancel={() => navigate({ to: "/shop" })}
      />
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-24 text-center px-4">
        <h1 className="text-3xl font-bold text-white">Your cart is empty</h1>
        <Link to="/shop" className="mt-6 inline-flex rounded-xl bg-accent px-6 py-3 font-semibold" style={{ color: "var(--accent-foreground)" }}>
          Browse Catalogue
        </Link>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8">
          {/* LEFT: form */}
          <div className="space-y-6">
            {/* Contact */}
            <Section step="1" title="Contact">
              <Field label="Email address" type="email" placeholder="researcher@lab.ac.uk" />
              <label className="mt-4 flex items-center gap-2 text-sm text-white/85 cursor-pointer">
                <input type="checkbox" className="accent-[var(--color-accent)]" />
                Create an account for faster checkout next time
              </label>
            </Section>

            {/* Delivery */}
            <Section step="2" title="Delivery Address">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First name" />
                <Field label="Last name" />
                <Field label="Address line 1" className="sm:col-span-2" />
                <Field label="Address line 2" optional className="sm:col-span-2" />
                <Field label="City" />
                <Field label="County" />
                <Field label="Postcode" />
                <SelectField label="Country" options={["United Kingdom", "Ireland", "Germany", "France"]} />
                <Field label="Phone number" type="tel" className="sm:col-span-2" />
              </div>
            </Section>

            {/* Shipping */}
            <Section step="3" title="Delivery Method">
              <div className="space-y-3">
                {shippingOptions.map((s) => {
                  const disabled = s.key === "free" && !eligibleFree;
                  const active = shipKey === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      disabled={disabled}
                      onClick={() => setShipKey(s.key)}
                      className={`w-full text-left rounded-xl border p-4 flex items-center gap-4 transition ${
                        active ? "border-accent bg-accent/5" : "border-white/10 hover:border-white/25"
                      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? "border-accent" : "border-white/30"}`}>
                        {active && <span className="w-2 h-2 rounded-full bg-accent" />}
                      </span>
                      <div className="flex-1">
                        <div className="text-white font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.eta}</div>
                      </div>
                      <div className="font-display font-semibold text-white">{s.price === 0 ? "Free" : `£${s.price.toFixed(2)}`}</div>
                    </button>
                  );
                })}
              </div>
            </Section>

            {/* Payment */}
            <Section step="4" title="Payment">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Lock size={14} className="text-accent" /> Secure payment powered by Stripe
              </div>
              <div className="space-y-4">
                <Field label="Card number" placeholder="•••• •••• •••• ••••" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry" placeholder="MM / YY" />
                  <Field label="CVV" placeholder="•••" />
                </div>
                <Field label="Name on card" />
              </div>

              <button
                onClick={() => { clear(); setPlaced(true); }}
                className="mt-6 w-full rounded-xl bg-accent py-4 font-semibold text-base hover:brightness-110 transition"
                style={{ color: "var(--accent-foreground)" }}
              >
                Pay £{total.toFixed(2)}
              </button>

              <div className="mt-4 flex items-center justify-center gap-3 opacity-70">
                <CardBadge label="VISA" />
                <CardBadge label="Mastercard" />
                <CardBadge label="AMEX" />
              </div>
            </Section>
          </div>

          {/* RIGHT: summary */}
          <aside className="rounded-2xl border bg-surface p-6 h-fit lg:sticky lg:top-32">
            <h2 className="font-display font-semibold text-white text-lg mb-5">Order Summary</h2>
            <ul className="space-y-3 mb-5 max-h-72 overflow-y-auto pr-1">
              {items.map(({ product, qty }) => (
                <li key={`co-${product.slug}-${product.size}`} className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#14253A" }}>
                    <FlaskConical size={20} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0 text-sm">
                    <div className="text-white truncate">{product.name} {product.size}</div>
                    <div className="text-xs text-muted-foreground">Qty {qty} · £{product.price.toFixed(2)}</div>
                  </div>
                  <div className="text-white font-medium text-sm">£{(product.price * qty).toFixed(2)}</div>
                </li>
              ))}
            </ul>

            <div className="border-t pt-4">
              <button
                onClick={() => setShowDiscount((v) => !v)}
                className="w-full flex items-center justify-between text-sm text-accent hover:underline"
              >
                <span>Have a discount code?</span>
                <ChevronDown size={14} className={`transition ${showDiscount ? "rotate-180" : ""}`} />
              </button>
              {showDiscount && (
                <div className="mt-3 flex gap-2">
                  <input className="flex-1 rounded-lg bg-background border px-3 py-2 text-sm text-white outline-none focus:border-accent" placeholder="Enter code" />
                  <button className="rounded-lg border border-accent/40 text-accent px-3 py-2 text-sm hover:bg-accent/10">Apply</button>
                </div>
              )}
            </div>

            <dl className="mt-5 space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between text-muted-foreground"><dt>Subtotal</dt><dd>£{cartTotal.toFixed(2)}</dd></div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Shipping</dt>
                <dd>{shipCost === 0 ? <span className="text-success">Free</span> : `£${shipCost.toFixed(2)}`}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground"><dt>VAT (20%)</dt><dd>£{vat.toFixed(2)}</dd></div>
              <div className="border-t pt-3 flex justify-between items-baseline">
                <dt className="text-white font-semibold">Order Total</dt>
                <dd className="text-white font-display font-bold text-2xl">£{total.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-start gap-2 text-[11px] text-muted-foreground">
              <Lock size={12} className="text-accent mt-0.5" /> Your payment details are encrypted and processed securely. PureLab never stores card data.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Section({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-surface p-6">
      <h2 className="font-display font-semibold text-white text-lg mb-5 flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/15 text-accent text-sm">{step}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, optional, className = "", ...rest }: { label: string; optional?: boolean; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
        <span>{label}</span>
        {optional && <span className="text-muted-foreground/70 normal-case tracking-normal">Optional</span>}
      </span>
      <input
        {...rest}
        className="w-full rounded-lg border px-3 py-2.5 text-white outline-none focus:border-accent transition"
        style={{ background: "#0E1B2D" }}
      />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      <select
        className="w-full rounded-lg border px-3 py-2.5 text-white outline-none focus:border-accent transition"
        style={{ background: "#0E1B2D" }}
        defaultValue={options[0]}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function CardBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white/80">
      {label}
    </span>
  );
}

function ComplianceGate({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
      <div className="max-w-lg w-full rounded-2xl border bg-surface p-7 shadow-2xl" style={{ borderColor: "rgba(245,181,68,0.3)" }}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: "rgba(245,181,68,0.15)", color: "#F5B544" }}>
          <ShieldAlert size={22} />
        </div>
        <h2 className="font-display font-bold text-white text-2xl">Research Use Confirmation</h2>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          Before proceeding, please confirm:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-white/85">
          <li className="flex gap-2"><Check size={16} className="text-accent mt-0.5 shrink-0" /> I am a qualified researcher.</li>
          <li className="flex gap-2"><Check size={16} className="text-accent mt-0.5 shrink-0" /> These products will be used solely for in vitro scientific research.</li>
          <li className="flex gap-2"><Check size={16} className="text-accent mt-0.5 shrink-0" /> I am not purchasing for personal use, human administration, or veterinary use.</li>
        </ul>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-accent py-3 font-semibold hover:brightness-110 transition"
            style={{ color: "var(--accent-foreground)" }}
          >
            I Confirm — Continue to Checkout
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-white/25 text-white py-3 font-semibold hover:bg-white/5 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
