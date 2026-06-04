import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
 TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_dashboard/bookings")({
  component: BookingsPage,
});

function BookingsPage() {

  // FETCH BOOKINGS FROM SUPABASE
  const {
    data: bookings = [],
    isLoading,
  } = useQuery({
    queryKey: ["bookings"],

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

      <AdminHeader
        eyebrow="Reservations"
        title="My Bookings"
        description="Track chauffeur requests, confirmation status, and payment state."
      />

      {isLoading ? (
        <p className="mt-6 text-muted-foreground">
          Loading bookings...
        </p>
      ) : bookings.length === 0 ? (

        <EmptyState
          title="No bookings found"
          description="Book your next chauffeur from the reservation page."
        />

      ) : (

        <div className="rounded-xl border border-border bg-card/50 p-4">

          <Table>

            <TableHeader>
              <TableRow>

                <TableHead>
                  Customer
                </TableHead>

                <TableHead>
                  Route
                </TableHead>

                <TableHead>
                  Date
                </TableHead>

                <TableHead>
                  Vehicle
                </TableHead>

                <TableHead>
                  Passengers
                </TableHead>

                <TableHead>
                  Contact
                </TableHead>

              </TableRow>
            </TableHeader>

            <TableBody>

              {bookings.map((booking: any) => (
                <TableRow key={booking.id}>

                  {/* Customer */}
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {booking.first_name}{" "}
                        {booking.last_name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {booking.email}
                      </p>
                    </div>
                  </TableCell>

                  {/* Route */}
                  <TableCell>
                    <div>
                      <p>
                        {booking.pickup_location}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        to{" "}
                        {booking.dropoff_location}
                      </p>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    <div>
                      <p>
                        {booking.pickup_date}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {booking.pickup_time}
                      </p>
                    </div>
                  </TableCell>

                  {/* Vehicle */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="capitalize"
                    >
                      {booking.vehicle_type}
                    </Badge>
                  </TableCell>

                  {/* Passengers */}
                  <TableCell>
                    {booking.passengers}
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div>
                      <p>
                        {booking.phone}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {booking.flight_number}
                      </p>
                    </div>
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

        </div>

      )}

      <Link
        to="/booking"
        className="mt-6 inline-flex bg-gold px-5 py-3 text-xs uppercase tracking-[0.22em] text-primary-foreground"
      >
        Create Booking
      </Link>

    </>
  );
}