import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, FlaskConical } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — PureLab Peptides" }] }),
  component: Cart,
});

function Cart() {
  const { items, updateQty, removeItem, cartTotal } = useCart();
  const shipping = cartTotal >= 99 || cartTotal === 0 ? 0 : 6.95;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border bg-surface p-12 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/shop" className="mt-4 inline-flex rounded-xl bg-accent px-6 py-3 font-semibold" style={{ color: "var(--accent-foreground)" }}>Browse catalogue</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              {items.map(({ product, qty }) => (
                <div key={product.slug} className="flex gap-4 rounded-2xl border bg-surface p-4">
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#14253A" }}>
                    <FlaskConical className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-white">{product.name} {product.size}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{product.purity} HPLC · Batch {product.batch}</div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex items-center rounded-lg border text-sm">
                        <button onClick={() => updateQty(product.slug, qty - 1)} className="px-3 py-1.5 text-white hover:text-accent">−</button>
                        <span className="w-8 text-center text-white">{qty}</span>
                        <button onClick={() => updateQty(product.slug, qty + 1)} className="px-3 py-1.5 text-white hover:text-accent">+</button>
                      </div>
                      <button onClick={() => removeItem(product.slug)} className="text-muted-foreground hover:text-danger inline-flex items-center gap-1 text-sm">
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-display font-bold text-white">£{(product.price * qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <aside className="rounded-2xl border bg-surface p-6 h-fit">
              <h2 className="font-display font-semibold text-white text-lg mb-4">Order Summary</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><dt>Subtotal</dt><dd>£{cartTotal.toFixed(2)}</dd></div>
                <div className="flex justify-between text-muted-foreground"><dt>Tracked UK shipping</dt><dd>{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</dd></div>
                <div className="border-t pt-3 flex justify-between text-white font-semibold text-base"><dt>Total</dt><dd>£{(cartTotal + shipping).toFixed(2)}</dd></div>
              </dl>
              <Link to="/checkout" className="mt-6 block w-full text-center rounded-xl bg-accent py-3 font-semibold" style={{ color: "var(--accent-foreground)" }}>Proceed to Checkout</Link>
              <p className="mt-4 text-xs text-muted-foreground">For Research Use Only. Order confirms qualified researcher status.</p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
