export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserRole = "user" | "admin";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          avatar: string | null;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          avatar?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      services: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          short_description: string | null;
          image: string | null;
          gallery: string[];
          price: number | null;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          short_description?: string | null;
          image?: string | null;
          gallery?: string[];
          price?: number | null;
          featured?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
      };
      fleet: {
        Row: {
          id: string;
          name: string;
          brand: string | null;
          model: string | null;
          year: number | null;
          seats: number | null;
          luggage: number | null;
          image: string | null;
          gallery: string[];
          price_per_hour: number | null;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand?: string | null;
          model?: string | null;
          year?: number | null;
          seats?: number | null;
          luggage?: number | null;
          image?: string | null;
          gallery?: string[];
          price_per_hour?: number | null;
          featured?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["fleet"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string;
          user_id: string | null;
          service_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          pickup_location: string;
          dropoff_location: string;
          booking_date: string;
          booking_time: string;
          passengers: number;
          notes: string | null;
          status: BookingStatus;
          payment_status: PaymentStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          service_id?: string | null;
          full_name: string;
          email: string;
          phone: string;
          pickup_location: string;
          dropoff_location: string;
          booking_date: string;
          booking_time: string;
          passengers?: number;
          notes?: string | null;
          status?: BookingStatus;
          payment_status?: PaymentStatus;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
      };
      testimonials: {
        Row: {
          id: string;
          customer_name: string;
          customer_image: string | null;
          review: string;
          rating: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          customer_image?: string | null;
          review: string;
          rating?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
      };
    };
  };
};

export type TableName = keyof Database["public"]["Tables"];
export type TableRow<T extends TableName> = Database["public"]["Tables"][T]["Row"];
export type TableInsert<T extends TableName> = Database["public"]["Tables"][T]["Insert"];
export type TableUpdate<T extends TableName> = Database["public"]["Tables"][T]["Update"];
