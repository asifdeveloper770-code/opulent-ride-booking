import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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

import { listTable, upsertRow, deleteRow } from "@/services/admin-data";
import type { TableRow as TableRowType } from "@/types/database";

export const Route = createFileRoute("/_admin/admin/services")({
  component: AdminServices,
});

function AdminServices() {
  const queryClient = useQueryClient();
  const { data = [], isLoading } = useQuery<TableRowType<"services">[]>({
    queryKey: ["admin-services"],
    queryFn: () => listTable("services"),
  });

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const selectedService = useMemo(
    () => data.find((service) => service.id === selectedServiceId) ?? data[0] ?? null,
    [data, selectedServiceId],
  );

  const [formState, setFormState] = useState({
    title: "",
    slug: "",
    price: 0,
    featured: false,
    short_description: "",
  });

  useEffect(() => {
    if (selectedService) {
      setFormState({
        title: selectedService.title,
        slug: selectedService.slug,
        price: selectedService.price ?? 0,
        featured: selectedService.featured,
        short_description: selectedService.short_description ?? "",
      });
    }
  }, [selectedService]);

  const saveMutation = useMutation({
    mutationFn: (payload: TableRowType<"services">) => upsertRow("services", payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-services"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRow("services", id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      setSelectedServiceId(null);
    },
  });

  return (
    <>
      <AdminHeader
        eyebrow="Services"
        title="Service catalog"
        description="Manage the list of chauffeur services, prices, and featured experiences."
      />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <section className="rounded-3xl border border-border bg-card/60 p-6">
          <div className="pb-4">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Service list</p>
            <p className="mt-2 text-sm text-muted-foreground">Select a service to edit or review its details.</p>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-border bg-background/40 p-10 text-center text-muted-foreground">Loading services…</div>
          ) : data.length === 0 ? (
            <EmptyState
              title="No services yet"
              description="Create your first premium ride service to make it available for bookings."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((service) => (
                  <TableRow
                    key={service.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedServiceId(service.id)}
                  >
                    <TableCell>
                      <div className="font-medium">{service.title}</div>
                      <div className="text-xs text-muted-foreground">{service.slug}</div>
                    </TableCell>
                    <TableCell>${service.price?.toFixed(2) ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant={service.featured ? "destructive" : "outline"} className="capitalize">
                        {service.featured ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs uppercase tracking-[0.24em] text-gold">Edit</span>
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
              <p className="text-sm uppercase tracking-[0.3em] text-gold">Service details</p>
              <p className="mt-2 text-sm text-muted-foreground">Edit the currently selected offering.</p>
            </div>
            {selectedService && (
              <Badge variant="outline">Live</Badge>
            )}
          </div>

          {!selectedService ? (
            <EmptyState
              title="Select a service"
              description="Click a service on the left to open its details."
            />
          ) : (
            <div className="space-y-6">
              <div className="space-y-4 rounded-3xl border border-border bg-background/40 p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Title</p>
                  <p className="mt-1 font-semibold">{selectedService.title}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Slug</p>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedService.slug}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Description</p>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedService.short_description ?? selectedService.description}</p>
                </div>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  saveMutation.mutate({
                    id: selectedService.id,
                    title: formState.title,
                    slug: formState.slug,
                    price: formState.price,
                    featured: formState.featured,
                    description: selectedService.description,
                    short_description: formState.short_description,
                    image: selectedService.image,
                    gallery: selectedService.gallery,
                    created_at: selectedService.created_at,
                  });
                }}
                className="space-y-4"
              >
                <label className="block text-sm font-medium text-muted-foreground">
                  Service title
                  <input
                    value={formState.title}
                    onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm"
                  />
                </label>

                <label className="block text-sm font-medium text-muted-foreground">
                  URL slug
                  <input
                    value={formState.slug}
                    onChange={(event) => setFormState((prev) => ({ ...prev, slug: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm"
                  />
                </label>

                <label className="block text-sm font-medium text-muted-foreground">
                  Short description
                  <textarea
                    value={formState.short_description}
                    onChange={(event) => setFormState((prev) => ({ ...prev, short_description: event.target.value }))}
                    className="mt-2 w-full min-h-[120px] rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm"
                  />
                </label>

                <label className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={formState.featured}
                    onChange={(event) => setFormState((prev) => ({ ...prev, featured: event.target.checked }))}
                    className="h-4 w-4 rounded border border-border bg-background"
                  />
                  Featured
                </label>

                <label className="block text-sm font-medium text-muted-foreground">
                  Price
                  <input
                    type="number"
                    value={formState.price}
                    onChange={(event) => setFormState((prev) => ({ ...prev, price: Number(event.target.value) }))}
                    className="mt-2 w-full rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" className="w-full sm:w-auto">
                    Save changes
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() => selectedService && deleteMutation.mutate(selectedService.id)}
                  >
                    Delete service
                  </Button>
                </div>
              </form>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
