import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"] & {
  services?: { title: string } | null;
};

export type BookingFormValues = {
  serviceType: string;
  vehicleType: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  luggage: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  flightNumber: string;
  specialRequests: string;
};

function buildBookingNotes(values: BookingFormValues) {
  const parts: string[] = [];

  if (values.vehicleType) {
    parts.push(`Vehicle: ${values.vehicleType}`);
  }

  if (typeof values.luggage === "number") {
    parts.push(`Luggage: ${values.luggage}`);
  }

  if (values.flightNumber) {
    parts.push(`Flight: ${values.flightNumber}`);
  }

  if (values.specialRequests) {
    parts.push(`Requests: ${values.specialRequests}`);
  }

  return parts.join(" | ");
}

function parseBookingNotes(notes?: string) {
  const output = {
    vehicleType: "",
    luggage: "0",
    flightNumber: "",
    specialRequests: "",
  };

  if (!notes) {
    return output;
  }

  notes.split(" | ").forEach((segment) => {
    if (segment.startsWith("Vehicle: ")) {
      output.vehicleType = segment.replace("Vehicle: ", "");
    } else if (segment.startsWith("Luggage: ")) {
      output.luggage = segment.replace("Luggage: ", "");
    } else if (segment.startsWith("Flight: ")) {
      output.flightNumber = segment.replace("Flight: ", "");
    } else if (segment.startsWith("Requests: ")) {
      output.specialRequests = segment.replace("Requests: ", "");
    }
  });

  return output;
}

export async function getUserBookings(userId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, services(title)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as BookingRow[];
}

export async function createBooking(values: BookingFormValues, userId?: string | null) {
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: userId ?? null,
      full_name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phone,
      pickup_location: values.pickupLocation,
      dropoff_location: values.dropoffLocation,
      booking_date: values.pickupDate,
      booking_time: values.pickupTime,
      passengers: values.passengers,
      notes: buildBookingNotes(values),
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as BookingRow;
}

export async function updateBooking(id: string, values: BookingFormValues) {
  const { data, error } = await supabase
    .from("bookings")
    .update({
      full_name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phone,
      pickup_location: values.pickupLocation,
      dropoff_location: values.dropoffLocation,
      booking_date: values.pickupDate,
      booking_time: values.pickupTime,
      passengers: values.passengers,
      notes: buildBookingNotes(values),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as BookingRow;
}

export async function deleteBooking(id: string) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw error;
}

export function parseBookingValues(booking: BookingRow) {
  const [firstName, ...rest] = booking.full_name.split(" ");
  const lastName = rest.join(" ");
  const parsedNotes = parseBookingNotes(booking.notes ?? "");

  return {
    serviceType: "",
    vehicleType: parsedNotes.vehicleType,
    pickupLocation: booking.pickup_location,
    dropoffLocation: booking.dropoff_location,
    pickupDate: booking.booking_date,
    pickupTime: booking.booking_time,
    passengers: String(booking.passengers),
    luggage: parsedNotes.luggage,
    firstName,
    lastName,
    email: booking.email,
    phone: booking.phone,
    flightNumber: parsedNotes.flightNumber,
    specialRequests: parsedNotes.specialRequests,
  };
}
