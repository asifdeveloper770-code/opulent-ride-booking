import { supabase } from "@/lib/supabase";
import type { BookingStatus, PaymentStatus, TableInsert, TableName, TableRow, TableUpdate } from "@/types/database";

export async function listTable<T extends TableName>(table: T) {
  const { data, error } = await supabase.from(table as string).select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as any as TableRow<T>[];
}

export async function upsertRow<T extends TableName>(table: T, row: TableInsert<T> | TableUpdate<T>) {
  const { data, error } = await supabase.from(table as string).upsert(row as any).select("*").single();
  if (error) throw error;
  return data as any as TableRow<T>;
}

export async function deleteRow<T extends TableName>(table: T, id: string) {
  const { error } = await supabase.from(table as string).delete().eq("id" as any, id);
  if (error) throw error;
}

export async function updateBookingStatus(id: string, status: BookingStatus, payment_status: PaymentStatus) {
  const bookings = supabase.from("bookings") as any;
  const { data, error } = await bookings
    .update({ status, payment_status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function getAdminCounts() {
  const tables: TableName[] = ["bookings", "services", "fleet", "profiles", "contact_messages", "testimonials"];
  const entries = await Promise.all(
    tables.map(async (table) => {
      const { count, error } = await supabase.from(table).select("id", { count: "exact", head: true });
      if (error) throw error;
      return [table, count ?? 0] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<TableName, number>;
}

export async function listBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, services(title)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getUserBookings(userId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, services(title)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
