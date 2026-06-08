import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart-context";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/coas", label: "Testing" },
  { to: "/blog", label: "Education" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "rgba(11,24,41,0.85)" }}>
      <div className="border-b text-center text-[11px] sm:text-xs py-2 px-4 text-muted-foreground">
        🧪 Free tracked delivery on orders over £99 &nbsp;|&nbsp; Same-day dispatch before 2PM &nbsp;|&nbsp; All batches third-party verified
      </div>
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0"><Logo /></Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-white/80 hover:text-accent transition-colors"
                activeProps={{ className: "text-accent" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button aria-label="Search" className="p-2 text-white/80 hover:text-accent">
              <Search size={18} />
            </button>
            <Link to="/cart" className="relative p-2 text-white/80 hover:text-accent" aria-label="Cart">
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-accent text-[10px] font-semibold flex items-center justify-center px-1" style={{ color: "var(--accent-foreground)" }}>
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/about" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-accent">
              <User size={16} /> My Account
            </Link>
            <button className="md:hidden p-2 text-white" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col px-4 py-3 gap-2 text-sm">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-white/85 hover:text-accent">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
