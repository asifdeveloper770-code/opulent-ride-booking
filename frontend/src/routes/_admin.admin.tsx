import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarCheck, Car, MessageSquare, Sparkles, Star, Users } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { getAdminCounts } from "@/services/admin-data";

export const Route = createFileRoute("/_admin/admin")({
  component: AdminOverview,
});

function AdminOverview() {
  const { data, isLoading } = useQuery({ queryKey: ["admin-counts"], queryFn: getAdminCounts });

  return (
    <>
      <AdminHeader
        eyebrow="Operations"
        title="Admin Dashboard"
        description="A premium operations cockpit for reservations, service content, fleet, customers, and concierge messages."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Bookings" value={isLoading ? "..." : data?.bookings ?? 0} icon={CalendarCheck} />
        <StatCard label="Services" value={isLoading ? "..." : data?.services ?? 0} icon={Sparkles} />
        <StatCard label="Fleet" value={isLoading ? "..." : data?.fleet ?? 0} icon={Car} />
        <StatCard label="Users" value={isLoading ? "..." : data?.profiles ?? 0} icon={Users} />
        <StatCard label="Messages" value={isLoading ? "..." : data?.contact_messages ?? 0} icon={MessageSquare} />
        <StatCard label="Testimonials" value={isLoading ? "..." : data?.testimonials ?? 0} icon={Star} />
      </div>
      <section className="mt-8 border border-border bg-card/40 p-6">
        <h2 className="font-display text-2xl">Deployment readiness</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Run the SQL in `supabase/schema.sql`, set your first profile role to `admin`, and configure Supabase Auth redirect URLs for this dashboard.
        </p>
      </section>
    </>
  );
}
