import { Link } from "@tanstack/react-router";
import { FlaskConical, FileCheck2 } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <div className="group flex flex-col rounded-2xl border bg-surface overflow-hidden hover:border-accent/40 transition-colors">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="aspect-square flex items-center justify-center" style={{ background: "linear-gradient(160deg, #0F1B2C, #14253A)" }}>
        <FlaskConical size={80} className="text-accent/70 group-hover:scale-105 transition-transform" strokeWidth={1.25} />
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="font-display font-semibold text-white hover:text-accent">
          {product.name} {product.size}
        </Link>
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-success/10 text-success text-[11px] font-medium px-2.5 py-1 border border-success/20">
          {product.purity} HPLC Verified
        </span>
        <div className="mt-1 text-xl font-display font-bold text-white">£{product.price.toFixed(2)}</div>
        <button
          onClick={() => addItem(product)}
          className="mt-2 rounded-lg bg-accent text-[var(--accent-foreground)] font-semibold py-2.5 text-sm hover:brightness-110 transition"
        >
          Add to Cart
        </button>
        <Link to="/coas" className="text-xs text-muted-foreground hover:text-accent inline-flex items-center gap-1 mt-1">
          <FileCheck2 size={12} /> View CoA
        </Link>
      </div>
    </div>
  );
}
