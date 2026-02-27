import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// GET /api/availability?date=2025-07-15&time=20:00
// Returns list of table_ids that are already booked (pending or confirmed) for that slot
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  const time = req.nextUrl.searchParams.get("time");

  if (!date || !time) {
    return NextResponse.json({ error: "Missing date or time" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("bookings")
    .select("table_id")
    .eq("date", date)
    .eq("time", time)
    .in("status", ["pending", "confirmed"]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const bookedIds = data.map((b) => b.table_id);
  return NextResponse.json({ bookedIds });
}
