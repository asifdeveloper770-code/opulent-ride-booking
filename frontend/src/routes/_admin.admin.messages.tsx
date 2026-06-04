import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listTable } from "@/services/admin-data";
import type { TableRow as TableRowType } from "@/types/database";

export const Route = createFileRoute("/_admin/admin/messages")({
  component: AdminMessages,
});

function AdminMessages() {
  const { data = [], isLoading } = useQuery<TableRowType<"contact_messages">[]>({
    queryKey: ["admin-messages"],
    queryFn: () => listTable("contact_messages"),
  });

  return (
    <>
      <AdminHeader
        eyebrow="Messages"
        title="Guest inquiries"
        description="Read and respond to incoming contact messages from prospective clients."
      />

      {isLoading ? (
        <div className="rounded-3xl border border-border bg-card/60 p-10 text-center text-muted-foreground">Loading messages…</div>
      ) : data.length === 0 ? (
        <EmptyState title="No messages" description="Incoming conversations from the contact form will appear here." />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-card/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.phone ?? "—"}</TableCell>
                  <TableCell className="max-w-[28rem] overflow-hidden text-ellipsis whitespace-nowrap">{message.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
