import { createFileRoute } from "@tanstack/react-router";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState } from "@/components/admin/EmptyState";

export const Route = createFileRoute("/_admin/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <>
      <AdminHeader
        eyebrow="Settings"
        title="Admin configuration"
        description="Manage operational settings and admin-level preferences for the booking portal."
      />

      <EmptyState
        title="Settings panel"
        description="This area is reserved for advanced admin controls like account and business configuration."
      />
    </>
  );
}
