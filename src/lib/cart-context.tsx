import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  addItem: (p: Product, qty?: number) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clear: () => void;
  cartTotal: number;
  itemCount: number;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "purelab_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => ({
    items,
    addItem: (product, qty = 1) =>
      setItems((cur) => {
        const i = cur.findIndex((it) => it.product.slug === product.slug);
        if (i >= 0) {
          const next = [...cur];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        }
        return [...cur, { product, qty }];
      }),
    removeItem: (slug) => setItems((cur) => cur.filter((it) => it.product.slug !== slug)),
    updateQty: (slug, qty) =>
      setItems((cur) =>
        cur
          .map((it) => (it.product.slug === slug ? { ...it, qty } : it))
          .filter((it) => it.qty > 0)
      ),
    clear: () => setItems([]),
    cartTotal: items.reduce((s, it) => s + it.product.price * it.qty, 0),
    itemCount: items.reduce((s, it) => s + it.qty, 0),
  }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
