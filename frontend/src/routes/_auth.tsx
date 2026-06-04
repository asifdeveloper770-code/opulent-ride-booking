import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { Car } from "lucide-react";

export const Route = createFileRoute("/_auth")({
  component: AuthShell,
});

function AuthShell() {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden border-r border-border bg-card/40 p-10 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-gold">
          <Car className="size-5" />
          SAY Limousine
        </Link>
        <div>
          <p className="divider-gold">Private Chauffeur Platform</p>
          <h1 className="mt-6 max-w-xl text-6xl font-display leading-tight">
            Luxury reservations, managed with quiet precision.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
            Access bookings, fleet operations, guest messages, and premium service content from one secure workspace.
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">24/7 concierge operations</p>
      </section>
      <main className="flex items-center justify-center px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
}
