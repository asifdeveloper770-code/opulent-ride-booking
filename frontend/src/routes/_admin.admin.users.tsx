import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listTable } from "@/services/admin-data";
import type { TableRow as TableRowType } from "@/types/database";

export const Route = createFileRoute("/_admin/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const { data = [], isLoading } = useQuery<TableRowType<"profiles">[]>({
    queryKey: ["admin-users"],
    queryFn: () => listTable("profiles"),
  });

  return (
    <>
      <AdminHeader
        eyebrow="Users"
        title="Customer profiles"
        description="Browse the registered user list and review account roles."
      />

      {isLoading ? (
        <div className="rounded-3xl border border-border bg-card/60 p-10 text-center text-muted-foreground">Loading profiles…</div>
      ) : data.length === 0 ? (
        <EmptyState title="No profiles" description="Registered accounts will appear here once users sign up." />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-card/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>{profile.full_name ?? "Guest"}</TableCell>
                  <TableCell>{profile.email}</TableCell>
                  <TableCell className="capitalize">{profile.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
