import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Browser client (read-only public data)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only client (full access for API routes & admin)
export function supabaseAdmin() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

export type Booking = {
  id: string;
  table_id: string;
  table_label: string;
  table_type: string;
  zone: string;
  guests: number;
  date: string;       // "2025-07-15"
  time: string;       // "20:00"
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  min_consumption: number;
  deposit: number;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
};
