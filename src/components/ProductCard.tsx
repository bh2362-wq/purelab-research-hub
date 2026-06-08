import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FlaskConical, FileCheck2, Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState(
    product.sizes?.find((s) => s.size === product.size) ?? { size: product.size, price: product.price }
  );
  const [wished, setWished] = useState(false);

  return (
    <div className="group flex flex-col rounded-2xl border bg-surface overflow-hidden hover:border-accent/40 transition-colors">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative aspect-square flex items-center justify-center"
        style={{ background: "linear-gradient(160deg, #F5F8FB, #E8EEF4)" }}
      >
        <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-white/70 backdrop-blur border border-border text-[10px] uppercase tracking-wider text-accent px-2.5 py-1">
          {product.category.replace(" Research", "")}
        </span>
        <FlaskConical size={88} className="text-accent/70 group-hover:scale-105 transition-transform" strokeWidth={1.25} />
      </Link>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="font-display font-bold text-foreground hover:text-accent leading-tight"
        >
          {product.name} {selected.size}
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-1">{product.shortDesc}</p>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 text-success text-[11px] font-medium px-2.5 py-1 border border-success/20">
            ✓ {product.purity} HPLC
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full text-[11px] font-medium px-2.5 py-1 border ${
              product.inStock
                ? "bg-success/5 text-success border-success/20"
                : "bg-danger/5 text-danger border-danger/30"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-success" : "bg-danger"}`} />
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {product.sizes && product.sizes.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {product.sizes.map((s) => {
              const active = s.size === selected.size;
              return (
                <button
                  key={s.size}
                  onClick={() => setSelected(s)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition ${
                    active
                      ? "bg-accent text-[var(--accent-foreground)] border-accent"
                      : "text-foreground/80 border-border hover:border-accent/50"
                  }`}
                >
                  {s.size}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-display font-bold text-foreground">£{selected.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">£{product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <button
            disabled={!product.inStock}
            onClick={() => addItem({ ...product, size: selected.size, price: selected.price })}
            className="flex-1 rounded-lg bg-accent text-[var(--accent-foreground)] font-semibold py-2.5 text-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
          <button
            onClick={() => setWished((v) => !v)}
            aria-label="Wishlist"
            className={`p-2.5 rounded-lg border transition ${
              wished ? "border-danger text-danger" : "border-border text-foreground/70 hover:text-accent hover:border-accent/50"
            }`}
          >
            <Heart size={16} fill={wished ? "currentColor" : "none"} />
          </button>
        </div>

        <Link to="/coas" className="text-xs text-muted-foreground hover:text-accent inline-flex items-center gap-1 mt-1">
          <FileCheck2 size={12} /> View CoA
        </Link>
      </div>
    </div>
  );
}
