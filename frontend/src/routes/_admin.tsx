import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { Car, CalendarCheck, LayoutDashboard, LogOut, MessageSquare, Settings, Shield, Sparkles, Star, Users } from "lucide-react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/services", label: "Services", icon: Sparkles },
  { to: "/admin/fleet", label: "Fleet", icon: Car },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function AdminLayout() {
  const { signOut, profile } = useAuth();

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-border bg-card/60 p-5 backdrop-blur lg:min-h-screen lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md border border-gold/50 bg-gold/10">
              <Shield className="size-5 text-gold" />
            </div>
            <div>
              <Link to="/admin" className="block text-sm uppercase tracking-[0.24em] text-gold">Admin</Link>
              <p className="text-xs text-muted-foreground">{profile?.email ?? "Operations"}</p>
            </div>
          </div>
          <nav className="mt-8 grid gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&.active]:bg-gold [&.active]:text-primary-foreground"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <Button variant="ghost" className="mt-8 w-full justify-start" onClick={() => void signOut()}>
            <LogOut className="size-4" />
            Sign out
          </Button>
        </aside>
        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}
