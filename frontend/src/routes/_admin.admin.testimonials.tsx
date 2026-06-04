import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listTable } from "@/services/admin-data";
import type { TableRow as TableRowType } from "@/types/database";

export const Route = createFileRoute("/_admin/admin/testimonials")({
  component: AdminTestimonials,
});

function AdminTestimonials() {
  const { data = [], isLoading } = useQuery<TableRowType<"testimonials">[]>({
    queryKey: ["admin-testimonials"],
    queryFn: () => listTable("testimonials"),
  });

  return (
    <>
      <AdminHeader
        eyebrow="Testimonials"
        title="Client reviews"
        description="Monitor and curate customer feedback shown throughout the public site."
      />

      {isLoading ? (
        <div className="rounded-3xl border border-border bg-card/60 p-10 text-center text-muted-foreground">Loading testimonials…</div>
      ) : data.length === 0 ? (
        <EmptyState title="No testimonials" description="Recent reviews will populate here once submitted." />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-card/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>{testimonial.customer_name}</TableCell>
                  <TableCell>{testimonial.rating}/5</TableCell>
                  <TableCell className="max-w-[28rem] overflow-hidden text-ellipsis whitespace-nowrap">{testimonial.review}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
