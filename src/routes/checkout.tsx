import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — PureLab Peptides" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, cartTotal, clear } = useCart();
  const shipping = cartTotal >= 99 || cartTotal === 0 ? 0 : 6.95;
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-4xl font-bold text-white">Order received</h1>
        <p className="mt-3 text-muted-foreground">A confirmation has been emailed. Dispatch from our UK lab same-day before 2PM.</p>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-3 gap-8">
        <form
          className="lg:col-span-2 space-y-6"
          onSubmit={(e) => { e.preventDefault(); clear(); setPlaced(true); }}
        >
          <div className="rounded-2xl border bg-surface p-6">
            <h2 className="font-display font-semibold text-white text-lg mb-4">Contact</h2>
            <Field label="Email" type="email" required />
          </div>
          <div className="rounded-2xl border bg-surface p-6">
            <h2 className="font-display font-semibold text-white text-lg mb-4">Shipping address (UK)</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name" required />
              <Field label="Last name" required />
              <Field label="Address" required className="sm:col-span-2" />
              <Field label="City" required />
              <Field label="Postcode" required />
            </div>
          </div>
          <div className="rounded-2xl border bg-surface p-6">
            <h2 className="font-display font-semibold text-white text-lg mb-4">Payment</h2>
            <Field label="Card number" placeholder="•••• •••• •••• ••••" required />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Field label="Expiry" placeholder="MM/YY" required />
              <Field label="CVC" placeholder="123" required />
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input type="checkbox" required className="mt-1 accent-[var(--color-accent)]" />
            <span>I confirm I am a qualified researcher and these products are for in vitro research use only.</span>
          </label>

          <button className="w-full rounded-xl bg-accent py-3.5 font-semibold" style={{ color: "var(--accent-foreground)" }}>
            Place Order — £{(cartTotal + shipping).toFixed(2)}
          </button>
        </form>

        <aside className="rounded-2xl border bg-surface p-6 h-fit">
          <h2 className="font-display font-semibold text-white text-lg mb-4">Order</h2>
          <ul className="divide-y divide-white/5 text-sm">
            {items.map(({ product, qty }) => (
              <li key={product.slug} className="flex justify-between py-3">
                <span className="text-white">{product.name} {product.size} <span className="text-muted-foreground">× {qty}</span></span>
                <span className="text-white">£{(product.price * qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-3 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>£{cartTotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between text-white font-semibold text-base pt-2 border-t"><span>Total</span><span>£{(cartTotal + shipping).toFixed(2)}</span></div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({ label, className = "", ...rest }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      <input
        {...rest}
        className="w-full rounded-lg bg-background border px-3 py-2.5 text-white outline-none focus:border-accent"
      />
    </label>
  );
}
