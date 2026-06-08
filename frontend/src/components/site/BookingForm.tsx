import { type ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Calendar, Clock, MapPin, Users, Car, User, Mail, Phone, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  serviceType: z.string().min(1, "Required"),
  vehicleType: z.string().min(1, "Required"),
  pickupLocation: z.string().trim().min(3, "Enter a pickup location").max(200),
  dropoffLocation: z.string().trim().min(3, "Enter a drop-off location").max(200),
  pickupDate: z.string().min(1, "Required"),
  pickupTime: z.string().min(1, "Required"),
  passengers: z.coerce.number().min(1).max(50),
  luggage: z.coerce.number().min(0).max(50),
  firstName: z.string().trim().min(1, "Required").max(50),
  lastName: z.string().trim().min(1, "Required").max(50),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z.string().trim().min(7, "Invalid phone").max(20),
  flightNumber: z.string().trim().max(20).optional().or(z.literal("")),
  specialRequests: z.string().trim().max(600).optional().or(z.literal("")),
});

type BookingFieldProps = {
  name: keyof z.infer<typeof schema>;
  value: string;
  error?: string;
  inputClassName: string;
  labelClassName: string;
  onChange: (name: string, value: string) => void;
  type?: string;
  options?: string[];
  placeholder?: string;
  children: ReactNode;
};

type BookingFormValues = z.infer<typeof schema>;

type BookingFormProps = {
  compact?: boolean;
  initialValues?: Partial<Record<keyof BookingFormValues, string>>;
  submitLabel?: string;
  successMessage?: string;
  onSubmit?: (data: BookingFormValues) => Promise<void>;
  onSuccess?: () => void;
};

const initial = {
  serviceType: "", vehicleType: "", pickupLocation: "", dropoffLocation: "",
  pickupDate: "", pickupTime: "", passengers: "1", luggage: "0",
  firstName: "", lastName: "", email: "", phone: "", flightNumber: "", specialRequests: "",
};

function BookingField({
  name,
  value,
  error,
  inputClassName,
  labelClassName,
  onChange,
  type = "text",
  placeholder,
  options,
  children,
}: BookingFieldProps) {
  return (
    <div>
      <label className={labelClassName}>{children}</label>
      {options ? (
        <select className={inputClassName} value={value} onChange={(e) => onChange(name, e.target.value)}>
          <option value="">Select...</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input
          className={inputClassName}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function BookingForm({ compact = false, initialValues, submitLabel, successMessage, onSubmit, onSuccess }: BookingFormProps) {
  const [data, setData] = useState<Record<string, string>>({ ...initial, ...initialValues });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setData({ ...initial, ...initialValues });
  }, [initialValues]);

  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((issue) => {
        errs[issue.path[0] as string] = issue.message;
      });
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(res.data);
      } else {
        const { error } = await supabase
          .from("bookings")
          .insert([
            {
              service_type: res.data.serviceType,
              vehicle_type: res.data.vehicleType,

              pickup_location: res.data.pickupLocation,
              dropoff_location: res.data.dropoffLocation,

              pickup_date: res.data.pickupDate,
              pickup_time: String(res.data.pickupTime),

              passengers: Number(res.data.passengers),
              luggage: Number(res.data.luggage),

              first_name: res.data.firstName,
              last_name: res.data.lastName,

              email: res.data.email,
              phone: res.data.phone,

              flight_number: res.data.flightNumber || null,
              special_requests: res.data.specialRequests || null,
            } as never,
          ]);

        if (error) {
          console.log(error);
          throw error;
        }
      }

      toast.success(successMessage ?? "Reservation request received — our concierge will confirm shortly.");
      if (!initialValues) {
        setData(initial);
      }
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit reservation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const input = "w-full bg-input/60 border border-border focus:border-gold focus:outline-none px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors";
  const label = "block text-[11px] uppercase tracking-[0.22em] text-gold mb-2";
  const fieldProps = { inputClassName: input, labelClassName: label, onChange: set };

  return (
    <form onSubmit={submit} className={`relative bg-card/80 backdrop-blur border border-border ${compact ? "p-6" : "p-8 md:p-10"} shadow-elegant`}>
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      {!compact && (
        <div className="mb-8 text-center">
          <span className="divider-gold">Reservation</span>
          <h3 className="mt-3 text-3xl font-display">Book Your Chauffeur</h3>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <BookingField
          {...fieldProps}
          name="serviceType"
          value={data.serviceType}
          error={errors.serviceType}
          options={["Airport Transfer", "Point-to-Point", "Hourly Charter", "Wedding", "Corporate", "Special Event", "Prom", "Night Out", "Others"]}
        >
          <span className="inline-flex items-center gap-2"><Car className="size-3.5" /> Service Type</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="vehicleType"
          value={data.vehicleType}
          error={errors.vehicleType}
          options={["Executive SUV", "Stretch Limousine", "Sprinter Van", "Party Bus"]}
        >
          <span className="inline-flex items-center gap-2"><Car className="size-3.5" /> Vehicle</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="pickupLocation"
          value={data.pickupLocation}
          error={errors.pickupLocation}
          placeholder="Address, hotel or airport"
        >
          <span className="inline-flex items-center gap-2"><MapPin className="size-3.5" /> Pickup Location</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="dropoffLocation"
          value={data.dropoffLocation}
          error={errors.dropoffLocation}
          placeholder="Destination address"
        >
          <span className="inline-flex items-center gap-2"><MapPin className="size-3.5" /> Drop-off Location</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="pickupDate"
          value={data.pickupDate}
          error={errors.pickupDate}
          type="date"
        >
          <span className="inline-flex items-center gap-2"><Calendar className="size-3.5" /> Pickup Date</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="pickupTime"
          value={data.pickupTime}
          error={errors.pickupTime}
          type="time"
        >
          <span className="inline-flex items-center gap-2"><Clock className="size-3.5" /> Pickup Time</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="passengers"
          value={data.passengers}
          error={errors.passengers}
          type="number"
        >
          <span className="inline-flex items-center gap-2"><Users className="size-3.5" /> Passengers</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="luggage"
          value={data.luggage}
          error={errors.luggage}
          type="number"
        >
          <span className="inline-flex items-center gap-2"><Users className="size-3.5" /> Luggage Pieces</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="firstName"
          value={data.firstName}
          error={errors.firstName}
          placeholder="John"
        >
          <span className="inline-flex items-center gap-2"><User className="size-3.5" /> First Name</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="lastName"
          value={data.lastName}
          error={errors.lastName}
          placeholder="Doe"
        >
          <span className="inline-flex items-center gap-2"><User className="size-3.5" /> Last Name</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="email"
          value={data.email}
          error={errors.email}
          type="email"
          placeholder="john@example.com"
        >
          <span className="inline-flex items-center gap-2"><Mail className="size-3.5" /> Email</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="phone"
          value={data.phone}
          error={errors.phone}
          type="tel"
          placeholder="+1 (555) 123-4567"
        >
          <span className="inline-flex items-center gap-2"><Phone className="size-3.5" /> Phone</span>
        </BookingField>

        <BookingField
          {...fieldProps}
          name="flightNumber"
          value={data.flightNumber}
          error={errors.flightNumber}
          placeholder="Optional"
        >
          <span className="inline-flex items-center gap-2">Flight Number</span>
        </BookingField>
        <div />

        <div className="md:col-span-2">
          <label className={label}>
            <span className="inline-flex items-center gap-2"><MessageSquare className="size-3.5" /> Special Requests</span>
          </label>
          <textarea
            className={`${input} min-h-[110px] resize-none`}
            placeholder="Child seats, beverages, signage, accessibility needs..."
            value={data.specialRequests}
            onChange={(e) => set("specialRequests", e.target.value)}
            maxLength={600}
          />
          {errors.specialRequests && <p className="mt-1 text-xs text-destructive">{errors.specialRequests}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 group relative w-full overflow-hidden bg-gold text-primary-foreground py-4 text-xs uppercase tracking-[0.3em] font-medium hover:bg-gold-light transition-colors"
      >
        <span className="relative z-10">{isSubmitting ? "Sending..." : (submitLabel ?? "Reserve My Chauffeur")}</span>
        <span className="absolute inset-0 shimmer opacity-60" />
      </button>
      <button
        type="submit"
        className="mt-8 group relative w-full overflow-hidden bg-[#25D366] hover:bg-[#1ebe5d] text-white py-4 text-xs uppercase tracking-[0.3em] font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/30"

      >
        <a href="https://wa.me/713-408-5577" target="_blank">
          Chat on WhatsApp
        </a>        <span className="absolute inset-0 shimmer opacity-60" />
      </button>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Instant confirmation • 24/7 concierge • Free cancellation up to 12h
      </p>
    </form>
  );
}
