import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listTable } from "@/services/admin-data";
import type { TableRow as TableRowType } from "@/types/database";

export const Route = createFileRoute("/_admin/admin/fleet")({
  component: AdminFleet,
});

function AdminFleet() {
  const { data = [], isLoading } = useQuery<TableRowType<"fleet">[]>({
    queryKey: ["admin-fleet"],
    queryFn: () => listTable("fleet"),
  });

  return (
    <>
      <AdminHeader
        eyebrow="Fleet"
        title="Vehicle inventory"
        description="Review your fleet profile and ensure every vehicle is ready for premium dispatch."
      />

      {isLoading ? (
        <div className="rounded-3xl border border-border bg-card/60 p-10 text-center text-muted-foreground">Loading vehicles…</div>
      ) : data.length === 0 ? (
        <EmptyState title="No vehicles found" description="Add fleet vehicles in the database to manage them here." />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-card/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Luggage</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell>{vehicle.seats ?? "—"}</TableCell>
                  <TableCell>{vehicle.luggage ?? "—"}</TableCell>
                  <TableCell>${vehicle.price_per_hour?.toFixed(2) ?? "—"}/hr</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
