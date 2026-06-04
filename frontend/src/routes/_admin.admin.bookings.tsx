import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { listBookings, updateBookingStatus } from "@/services/admin-data";
import type { BookingStatus, PaymentStatus } from "@/types/database";

const statusOptions: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];
const paymentOptions: PaymentStatus[] = ["unpaid", "paid", "refunded"];

export const Route = createFileRoute("/_admin/admin/bookings")({
  component: AdminBookings,
});

function AdminBookings() {
  const queryClient = useQueryClient();
  const { data = [], isLoading } = useQuery<
    Array<{
      id: string;
      full_name: string;
      email: string;
      phone: string;
      pickup_location: string;
      dropoff_location: string;
      booking_date: string;
      booking_time: string;
      status: BookingStatus;
      payment_status: PaymentStatus;
      service_id: string | null;
      services: { title: string } | null;
    }>
  >({
    queryKey: ["admin-bookings"],
    queryFn: listBookings,
  });

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const selectedBooking = useMemo(
    () => data.find((booking) => booking.id === selectedBookingId) ?? data[0] ?? null,
    [data, selectedBookingId],
  );

  const bookingMutation = useMutation({
    mutationFn: (payload: { id: string; status: BookingStatus; payment_status: PaymentStatus }) =>
      updateBookingStatus(payload.id, payload.status, payload.payment_status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-bookings"] }),
  });

  return (
    <>
      <AdminHeader
        eyebrow="Bookings"
        title="Reservation management"
        description="Review passenger pickup details, confirm payments, and manage booking status from one dashboard."
      />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <section className="rounded-3xl border border-border bg-card/60 p-6">
          <div className="flex items-center justify-between gap-4 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gold">Active reservations</p>
              <p className="mt-2 text-sm text-muted-foreground">Tap a booking to inspect details.</p>
            </div>
            <Link to="/booking" className="inline-flex items-center rounded-full bg-gold px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary-foreground">
              New booking
            </Link>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-border bg-background/40 p-10 text-center text-muted-foreground">Loading bookings…</div>
          ) : data.length === 0 ? (
            <EmptyState
              title="No reservations yet"
              description="New chauffeur requests will appear here once your guests book a ride."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((booking) => (
                  <TableRow key={booking.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedBookingId(booking.id)}>
                    <TableCell>
                      {booking.pickup_location} → {booking.dropoff_location}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{booking.full_name}</div>
                      <div className="text-xs text-muted-foreground">{booking.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {booking.payment_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs uppercase tracking-[0.24em] text-gold">View</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>

        <aside className="rounded-3xl border border-border bg-card/60 p-6">
          <div className="flex items-center justify-between gap-3 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gold">Booking details</p>
              <p className="mt-2 text-sm text-muted-foreground">Inspect and update the selected reservation.</p>
            </div>
            {selectedBooking && (
              <Badge variant="outline" className="capitalize">
                {selectedBooking.status}
              </Badge>
            )}
          </div>

          {!selectedBooking ? (
            <EmptyState
              title="Select a booking"
              description="Choose a reservation from the list to view or update it."
            />
          ) : (
            <div className="space-y-5">
              <div className="space-y-3 rounded-3xl border border-border bg-background/40 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Passenger</p>
                <p className="font-semibold">{selectedBooking.full_name}</p>
                <p className="text-sm text-muted-foreground">{selectedBooking.email}</p>
                <p className="text-sm text-muted-foreground">{selectedBooking.phone}</p>
              </div>

              <div className="space-y-3 rounded-3xl border border-border bg-background/40 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Journey</p>
                <p className="font-semibold">{selectedBooking.pickup_location} → {selectedBooking.dropoff_location}</p>
                <p className="text-sm text-muted-foreground">{selectedBooking.booking_date} at {selectedBooking.booking_time}</p>
                <p className="text-sm text-muted-foreground">Service: {selectedBooking.services?.title ?? selectedBooking.service_id ?? "Unknown"}</p>
              </div>

              <div className="grid gap-3">
                <label className="block text-sm font-medium text-muted-foreground">
                  Reservation status
                  <select
                    value={selectedBooking.status}
                    onChange={(event) =>
                      bookingMutation.mutate({
                        id: selectedBooking.id,
                        status: event.target.value as BookingStatus,
                        payment_status: selectedBooking.payment_status,
                      })
                    }
                    className="mt-2 w-full rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-medium text-muted-foreground">
                  Payment status
                  <select
                    value={selectedBooking.payment_status}
                    onChange={(event) =>
                      bookingMutation.mutate({
                        id: selectedBooking.id,
                        status: selectedBooking.status,
                        payment_status: event.target.value as PaymentStatus,
                      })
                    }
                    className="mt-2 w-full rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm"
                  >
                    {paymentOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <Button
                  type="button"
                  onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-bookings"] })}
                  className="w-full"
                >
                  Refresh bookings
                </Button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
