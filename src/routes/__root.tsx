import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResearchBanner } from "@/components/Disclaimer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-muted-foreground">This page doesn't exist.</p>
        <a href="/" className="mt-6 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold" style={{ color: "var(--accent-foreground)" }}>Go home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-md bg-accent px-4 py-2 text-sm font-semibold" style={{ color: "var(--accent-foreground)" }}>Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PureLab Peptides — Research-Grade Peptides, Verified, UK Dispatch" },
      { name: "description", content: "Research-grade peptides independently tested to 99%+ purity. Batch-traceable. Dispatched from the UK." },
      { property: "og:title", content: "PureLab Peptides — Research-Grade Peptides, Verified, UK Dispatch" },
      { name: "twitter:title", content: "PureLab Peptides — Research-Grade Peptides, Verified, UK Dispatch" },
      { property: "og:description", content: "Research-grade peptides independently tested to 99%+ purity. Batch-traceable. Dispatched from the UK." },
      { name: "twitter:description", content: "Research-grade peptides independently tested to 99%+ purity. Batch-traceable. Dispatched from the UK." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/64c49358-9937-4d93-9526-d71ae6f65e87/id-preview-dc29568c--bbe5cd74-6cee-4c85-a275-a10f0b6f2e96.lovable.app-1780941727669.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/64c49358-9937-4d93-9526-d71ae6f65e87/id-preview-dc29568c--bbe5cd74-6cee-4c85-a275-a10f0b6f2e96.lovable.app-1780941727669.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1"><Outlet /></main>
          <ResearchBanner />
          <Footer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
