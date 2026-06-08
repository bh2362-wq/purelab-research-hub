import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { FlaskConical, FileCheck2, Snowflake, Truck, ShieldCheck } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { DisclaimerPill } from "@/components/Disclaimer";

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
    <div className="py-20 text-center text-muted-foreground">Product not found. <Link to="/shop" className="text-accent">Return to shop</Link>.</div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12">
        <div className="rounded-3xl border aspect-square flex items-center justify-center" style={{ background: "linear-gradient(160deg, #0F1B2C, #14253A)" }}>
          <FlaskConical size={180} className="text-accent/70" strokeWidth={1.25} />
        </div>
        <div>
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-accent">← Back to catalogue</Link>
          <p className="text-xs uppercase tracking-[0.2em] text-accent mt-4 mb-2">{product.category}</p>
          <h1 className="text-4xl font-bold text-white">{product.name} <span className="text-muted-foreground font-normal">{product.size}</span></h1>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 text-success text-xs font-medium px-3 py-1 border border-success/20">
              {product.purity} HPLC Verified
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 text-white text-xs font-medium px-3 py-1 border">
              Batch {product.batch}
            </span>
          </div>
          <div className="mt-6 text-4xl font-display font-bold text-white">£{product.price.toFixed(2)}</div>
          <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center rounded-xl border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-white hover:text-accent">−</button>
              <span className="w-10 text-center text-white">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-white hover:text-accent">+</button>
            </div>
            <button
              onClick={() => addItem(product, qty)}
              className="flex-1 rounded-xl bg-accent py-3 font-semibold hover:brightness-110 transition"
              style={{ color: "var(--accent-foreground)" }}
            >
              Add to Cart — £{(product.price * qty).toFixed(2)}
            </button>
          </div>
          <Link to="/coas" className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline">
            <FileCheck2 size={14} /> View Certificate of Analysis (Batch {product.batch})
          </Link>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            {[
              { I: Truck, t: "Free UK over £99" },
              { I: Snowflake, t: "Cold dispatch" },
              { I: ShieldCheck, t: "Janoshik tested" },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border bg-surface p-3 flex flex-col items-center gap-1 text-center text-muted-foreground">
                <x.I size={18} className="text-accent" />
                {x.t}
              </div>
            ))}
          </div>

          <div className="mt-8"><DisclaimerPill /></div>
        </div>
      </div>
    </section>
  );
}
