import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Lock, Truck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Research-Grade Peptides. Verified. Dispatched from the UK.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">Registered in England &amp; Wales</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-accent">Shop</Link></li>
            <li><Link to="/coas" className="hover:text-accent">Testing Archive</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/about" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Trusted &amp; Secure</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Truck size={16} className="text-accent" /> UK Dispatch</span>
            <span className="inline-flex items-center gap-2"><Lock size={16} className="text-accent" /> Secure Payments</span>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col sm:flex-row gap-2 justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} PureLab Peptides Ltd.</span>
          <span>For Research Use Only</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
