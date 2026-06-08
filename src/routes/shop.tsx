import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Shop — PureLab Peptides" }, { name: "description", content: "Browse our full catalogue of research-grade peptides, independently verified to 99%+ purity." }] }),
  component: Shop,
});

function Shop() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Catalogue</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Research Peptide Catalogue</h1>
        <p className="text-muted-foreground max-w-2xl mb-10">All products are supplied for in vitro research only. Each batch ships with an independent Janoshik CoA.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>
  );
}
