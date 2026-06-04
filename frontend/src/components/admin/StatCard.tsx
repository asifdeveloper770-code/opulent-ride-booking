import type { LucideIcon } from "lucide-react";

export function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: LucideIcon }) {
  return (
    <div className="border border-border bg-card/50 p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
        <Icon className="size-5 text-gold" />
      </div>
      <p className="mt-4 text-3xl font-display">{value}</p>
    </div>
  );
}
