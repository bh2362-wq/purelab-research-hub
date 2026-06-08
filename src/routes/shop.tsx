import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ResearchFloatingPill } from "@/components/ResearchFloatingPill";
import { products, CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Research Peptides UK | PureLab Peptides" },
      { name: "description", content: "Browse our full catalogue of research-grade peptides, independently verified to 99%+ purity. UK dispatched." },
    ],
  }),
  component: Shop,
});

type SortKey = "best" | "price-asc" | "price-desc" | "newest";

function priceOf(p: (typeof products)[number]) {
  if (!p.sizes || p.sizes.length === 0) return p.price;
  return Math.min(...p.sizes.map((s) => s.price));
}

function Shop() {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("best");

  const filtered = useMemo(() => {
    let r = products.filter((p) => {
      if (selectedCats.length && !selectedCats.includes(p.category)) return false;
      if (priceOf(p) > maxPrice) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": r = [...r].sort((a, b) => priceOf(a) - priceOf(b)); break;
      case "price-desc": r = [...r].sort((a, b) => priceOf(b) - priceOf(a)); break;
      case "newest": r = [...r].reverse(); break;
    }
    return r;
  }, [selectedCats, maxPrice, inStockOnly, sort]);

  const toggleCat = (c: string) =>
    setSelectedCats((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));

  const clearFilters = () => {
    setSelectedCats([]);
    setMaxPrice(200);
    setInStockOnly(false);
  };

  return (
    <>
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-foreground">Shop</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Catalogue</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Research Peptides UK <span className="text-muted-foreground font-normal text-2xl">(24 products)</span>
              </h1>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground whitespace-nowrap">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-lg bg-surface border border-foreground/10 px-3 py-2 text-foreground outline-none focus:border-accent text-sm"
              >
                <option value="best">Best Selling</option>
                <option value="price-asc">Price Low–High</option>
                <option value="price-desc">Price High–Low</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>

          <div className="grid lg:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-32 lg:self-start rounded-2xl border bg-surface p-5 h-fit">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-semibold text-foreground">Filter Results</h2>
                <button onClick={clearFilters} className="text-xs text-accent hover:underline inline-flex items-center gap-1">
                  <X size={12} /> Clear
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Category</h3>
                <ul className="space-y-2.5">
                  {CATEGORIES.map((c) => (
                    <li key={c}>
                      <label className="flex items-start gap-2.5 text-sm text-foreground/85 cursor-pointer hover:text-accent">
                        <input
                          type="checkbox"
                          checked={selectedCats.includes(c)}
                          onChange={() => toggleCat(c)}
                          className="mt-0.5 accent-[var(--color-accent)]"
                        />
                        <span className="leading-tight">{c}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Price Range</h3>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={5}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[var(--color-accent)]"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>£0</span>
                  <span className="text-foreground">Up to £{maxPrice}</span>
                </div>
              </div>

              <div>
                <label className="flex items-center justify-between gap-3 text-sm text-foreground/85 cursor-pointer">
                  <span>In Stock Only</span>
                  <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${inStockOnly ? "bg-accent" : "bg-white/15"}`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                    />
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${inStockOnly ? "translate-x-4" : "translate-x-0.5"}`} />
                  </span>
                </label>
              </div>
            </aside>

            {/* Grid */}
            <div>
              {filtered.length === 0 ? (
                <div className="rounded-2xl border bg-surface p-12 text-center text-muted-foreground">
                  No products match your filters.
                  <button onClick={clearFilters} className="ml-2 text-accent hover:underline">Clear filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
                </div>
              )}

              {/* Pagination */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">Showing 1–{filtered.length} of 24</p>
                <div className="flex items-center gap-2">
                  <button disabled className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm text-foreground/40 cursor-not-allowed">
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-accent text-[var(--accent-foreground)] text-sm font-semibold">1</button>
                  <button className="w-9 h-9 rounded-lg border text-sm text-foreground/80 hover:border-accent">2</button>
                  <button className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm text-foreground hover:border-accent">
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ResearchFloatingPill />
    </>
  );
}
