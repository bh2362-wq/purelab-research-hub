import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, FlaskConical, Minus, Plus, Lock, Truck, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — PureLab Peptides" }] }),
  component: Cart,
});

const SHIPPING = 4.95;
const FREE_THRESHOLD = 99;

function Cart() {
  const { items, updateQty, removeItem, cartTotal, itemCount } = useCart();
  const shipping = cartTotal === 0 ? 0 : cartTotal >= FREE_THRESHOLD ? 0 : SHIPPING;
  const vat = (cartTotal + shipping) * 0.2;
  const total = cartTotal + shipping + vat;

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Your Cart <span className="text-muted-foreground font-normal text-xl">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          </h1>
          <Link to="/shop" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
            ← Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border bg-surface p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
              <FlaskConical size={28} />
            </div>
            <h2 className="text-xl font-display font-semibold text-foreground">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Browse our verified research catalogue to get started.</p>
            <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold" style={{ color: "var(--accent-foreground)" }}>
              Browse Catalogue <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.85fr_1fr] gap-8">
            <div className="space-y-3">
              {items.map(({ product, qty }) => {
                const lineTotal = product.price * qty;
                return (
                  <div key={`${product.slug}-${product.size}`} className="flex gap-4 rounded-2xl border bg-surface p-4 sm:p-5">
                    <Link
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "linear-gradient(160deg, #F5F8FB, #E8EEF4)" }}
                    >
                      <FlaskConical className="text-accent" size={36} strokeWidth={1.25} />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-3 items-start flex-wrap">
                        <div>
                          <Link to="/product/$slug" params={{ slug: product.slug }} className="font-display font-semibold text-foreground hover:text-accent">
                            {product.name} — {product.size}
                          </Link>
                          <div className="mt-1 text-xs text-muted-foreground">Batch: <span className="text-foreground/85">{product.batch}</span></div>
                          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/10 text-success text-[11px] font-medium px-2.5 py-1 border border-success/20">
                            ✓ {product.purity}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-display font-bold text-foreground text-lg">£{lineTotal.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">£{product.price.toFixed(2)} ea</div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                        <div className="inline-flex items-center rounded-lg border">
                          <button onClick={() => updateQty(product.slug, qty - 1)} className="px-2.5 py-1.5 text-foreground hover:text-accent"><Minus size={14} /></button>
                          <span className="w-9 text-center text-foreground text-sm">{qty}</span>
                          <button onClick={() => updateQty(product.slug, qty + 1)} className="px-2.5 py-1.5 text-foreground hover:text-accent"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeItem(product.slug)} className="text-muted-foreground hover:text-danger inline-flex items-center gap-1.5 text-sm">
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="rounded-xl p-4 border text-sm leading-relaxed" style={{ background: "#FFF8E6", borderColor: "rgba(245,181,68,0.3)", color: "#92400E" }}>
                <strong className="font-display">Research Use Only:</strong> By proceeding to checkout you confirm that you are a professional
                researcher and that these products will be used exclusively for in vitro scientific research. These are not
                medicines and are not for human use.
              </div>
            </div>

            <aside className="rounded-2xl border bg-surface p-6 h-fit lg:sticky lg:top-32">
              <h2 className="font-display font-semibold text-foreground text-lg mb-5">Order Summary</h2>

              <ul className="divide-y divide-white/5 text-sm mb-4 max-h-48 overflow-y-auto pr-1">
                {items.map(({ product, qty }) => (
                  <li key={`s-${product.slug}-${product.size}`} className="flex justify-between gap-3 py-2.5">
                    <span className="text-foreground/85 truncate">
                      {product.name} {product.size} <span className="text-muted-foreground">× {qty}</span>
                    </span>
                    <span className="text-foreground whitespace-nowrap">£{(product.price * qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <dl className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between text-muted-foreground"><dt>Subtotal</dt><dd>£{cartTotal.toFixed(2)}</dd></div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? <span className="text-success">Free</span> : `£${shipping.toFixed(2)} Tracked 24`}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground"><dt>VAT (20%)</dt><dd>£{vat.toFixed(2)}</dd></div>
                <div className="border-t pt-3 flex justify-between items-baseline">
                  <dt className="text-foreground font-semibold">Order Total</dt>
                  <dd className="text-foreground font-display font-bold text-2xl">£{total.toFixed(2)}</dd>
                </div>
              </dl>

              {cartTotal < FREE_THRESHOLD && cartTotal > 0 && (
                <p className="mt-3 text-xs text-accent">
                  Add £{(FREE_THRESHOLD - cartTotal).toFixed(2)} more for free tracked delivery.
                </p>
              )}

              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-semibold hover:brightness-110 transition"
                style={{ color: "var(--accent-foreground)" }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>

              <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Lock size={12} className="text-accent" /> Secure checkout</span>
                <span className="inline-flex items-center gap-1.5"><Truck size={12} className="text-accent" /> Fast UK dispatch</span>
              </div>

              <Link to="/shop" className="mt-4 block text-center text-sm text-muted-foreground hover:text-accent">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
