import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";

import {
  CalendarClock,
  Settings,
  User,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { StatCard } from "@/components/admin/StatCard";
import { Badge } from "@/components/ui/badge";

import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute(
  "/_dashboard/dashboard"
)({
  component: DashboardHome,
});

function DashboardHome() {

  const { profile } = useAuth();

  // FETCH BOOKINGS FROM SUPABASE
  const {
    data: bookings = [],
    isLoading,
  } = useQuery({
    queryKey: ["dashboard-bookings"],

    queryFn: async () => {

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      return data;
    },
  });

  return (
    <>

      {/* Header */}
      <AdminHeader
        eyebrow="Guest Dashboard"
        title={`Welcome${
          profile?.full_name
            ? `, ${profile.full_name}`
            : ""
        }`}
        description="Review booking history, manage your profile, and keep chauffeur requests organized."
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">

        <StatCard
          label="Bookings"
          value={
            isLoading
              ? "..."
              : bookings.length
          }
          icon={CalendarClock}
        />

        <StatCard
          label="Profile"
          value={
            profile?.role ?? "User"
          }
          icon={User}
        />

        <StatCard
          label="Settings"
          value="Ready"
          icon={Settings}
        />

      </div>

      {/* Recent Bookings */}
      <section className="mt-8 rounded-xl border border-border bg-card/40 p-6">

        <div className="flex items-center justify-between gap-4">

          <h2 className="font-display text-2xl">
            Recent Bookings
          </h2>

          <Link
            to="/booking"
            className="text-sm font-medium text-gold hover:underline"
          >
            New Booking
          </Link>

        </div>

        {isLoading ? (

          <p className="mt-5 text-muted-foreground">
            Loading bookings...
          </p>

        ) : bookings.length === 0 ? (

          <div className="mt-5">

            <EmptyState
              title="No bookings yet"
              description="Your reservations will appear here once submitted."
            />

          </div>

        ) : (

          <div className="mt-5 grid gap-4">

            {bookings
              .slice(0, 4)
              .map((booking: any) => (

                <div
                  key={booking.id}
                  className="flex flex-col justify-between gap-4 rounded-lg border border-border bg-background/40 p-4 md:flex-row md:items-center"
                >

                  {/* Booking Info */}
                  <div>

                    <p className="font-medium">

                      {booking.pickup_location}

                      <span className="mx-2 text-muted-foreground">
                        →
                      </span>

                      {booking.dropoff_location}

                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">

                      {booking.pickup_date}

                      {" at "}

                      {booking.pickup_time}

                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">

                      {booking.first_name}{" "}
                      {booking.last_name}

                    </p>

                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3">

                    <Badge
                      variant="outline"
                      className="capitalize"
                    >
                      {booking.vehicle_type}
                    </Badge>

                    <Badge
                      variant="secondary"
                      className="capitalize"
                    >
                      {booking.passengers} Passengers
                    </Badge>

                  </div>

                </div>

              ))}

          </div>

        )}

      </section>

    </>
  );
}