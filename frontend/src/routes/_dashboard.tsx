import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import {
  CalendarClock,
  LayoutDashboard,
  Settings,
  User,
  LogOut,
} from "lucide-react";

import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
});

const nav = [
  {
    to: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    to: "/bookings",
    label: "Bookings",
    icon: CalendarClock,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

function DashboardLayout() {
  const { signOut, profile } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[260px_1fr]">
        
        <aside className="border-b border-border bg-card/50 p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
          
          <Link
            to="/"
            className="block text-2xl font-script text-gold"
          >
            Say Limousine
          </Link>

          <p className="mt-2 text-xs text-muted-foreground">
            {profile?.full_name ?? "Guest account"}
          </p>

          <nav className="mt-8 grid gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{
                  className: "bg-gold text-primary-foreground",
                }}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            className="mt-8 w-full justify-start"
            onClick={() => void signOut()}
          >
            <LogOut className="mr-2 size-4" />
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