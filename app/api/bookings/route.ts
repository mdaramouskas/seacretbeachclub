import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { sendPushToAllAdmins } from "@/lib/push";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ── Email templates ──────────────────────────────────────────────────────────

function customerEmailHtml(data: {
  name: string;
  tableType: string;
  tableLabel: string;
  zone: string;
  date: string;
  time: string;
  guests: number;
  minConsumption: number;
  deposit: number;
  bookingRef: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;border:1px solid #00ffb822;overflow:hidden">

        <!-- Header -->
        <tr>
          <td style="background:#0a1a12;padding:32px;text-align:center;border-bottom:1px solid #00ffb822">
            <p style="color:#00ffb8;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 8px">Seacret Beach Club</p>
            <h1 style="color:#fff;font-size:22px;font-weight:300;letter-spacing:0.1em;margin:0">Booking Confirmed</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <p style="color:#ffffff99;font-size:14px;margin:0 0 24px">
              Hi <strong style="color:#fff">${data.name}</strong>, your reservation request has been received. We'll confirm it shortly.
            </p>

            <!-- Booking details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border-radius:8px;border:1px solid #ffffff0f;margin-bottom:24px">
              ${[
                ["Spot", `${data.tableType} · ${data.tableLabel}`],
                ["Area", data.zone.charAt(0).toUpperCase() + data.zone.slice(1)],
                ["Date", data.date],
                ["Time", data.time],
                ["Guests", String(data.guests)],
                ["Min. Consumption", `€${data.minConsumption}`],
                ...(data.deposit > 0 ? [["Deposit", `€${data.deposit} (credited to your bill)`]] : []),
                ["Reference", `#${data.bookingRef}`],
              ]
                .map(
                  ([label, value]) => `
              <tr>
                <td style="padding:10px 16px;color:#ffffff55;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;border-bottom:1px solid #ffffff08">${label}</td>
                <td style="padding:10px 16px;color:#fff;font-size:13px;font-weight:500;border-bottom:1px solid #ffffff08">${value}</td>
              </tr>`
                )
                .join("")}
            </table>

            <p style="color:#ffffff55;font-size:12px;line-height:1.7;margin:0 0 8px">
              Questions? Contact us at <a href="mailto:info@seacretbeachclub.com" style="color:#00ffb8">info@seacretbeachclub.com</a> or call <a href="tel:+302695042222" style="color:#00ffb8">+30 26950 42222</a>.
            </p>
            <p style="color:#ffffff33;font-size:11px;margin:0">
              Cancellations 48h+ in advance receive a full refund. Reservations are held for 15 minutes.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #ffffff0a;text-align:center">
            <p style="color:#ffffff33;font-size:11px;margin:0">Tsilivi, Zakynthos · Greece</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function businessEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  tableType: string;
  tableLabel: string;
  zone: string;
  date: string;
  time: string;
  guests: number;
  minConsumption: number;
  deposit: number;
  notes: string | null;
  bookingRef: string;
}) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f5f5f5;padding:32px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:8px;padding:32px;border:1px solid #e5e5e5">
    <h2 style="margin:0 0 4px;color:#111;font-size:18px">New Booking Request</h2>
    <p style="color:#888;font-size:12px;margin:0 0 24px">Ref #${data.bookingRef}</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${[
        ["Spot", `${data.tableType} · ${data.tableLabel} (${data.zone})`],
        ["Date", data.date],
        ["Time", data.time],
        ["Guests", String(data.guests)],
        ["Min. Consumption", `€${data.minConsumption}`],
        ...(data.deposit > 0 ? [["Deposit", `€${data.deposit}`]] : []),
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ...(data.notes ? [["Notes", data.notes]] : []),
      ]
        .map(
          ([label, value]) => `
      <tr>
        <td style="padding:8px 0;color:#888;font-size:12px;width:140px;border-bottom:1px solid #f0f0f0">${label}</td>
        <td style="padding:8px 0;color:#111;font-size:13px;font-weight:500;border-bottom:1px solid #f0f0f0">${value}</td>
      </tr>`
        )
        .join("")}
    </table>
    <div style="margin-top:24px;padding:12px;background:#f9f9f9;border-radius:6px;text-align:center">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"}/admin?key=${process.env.ADMIN_KEY}"
         style="color:#111;font-size:12px;font-weight:600;text-decoration:none">
        → Open Admin Panel
      </a>
    </div>
  </div>
</body>
</html>`;
}

// ── POST /api/bookings ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      table_id, table_label, table_type, zone,
      guests, date, time, name, email, phone,
      notes, min_consumption, deposit,
    } = body;

    // Basic validation
    if (!table_id || !date || !time || !name || !email || !phone || !guests) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Save to Supabase
    const supabase = getSupabase();
    const { data: booking, error: dbError } = await supabase
      .from("bookings")
      .insert([{
        table_id, table_label, table_type, zone,
        guests, date, time, name, email, phone,
        notes: notes || null, min_consumption, deposit,
        status: "pending",
      }])
      .select()
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Could not save booking. Please try again." }, { status: 500 });
    }

    const bookingRef = booking.id.slice(0, 8).toUpperCase();

    // Send emails (non-blocking — don't fail the booking if email fails)
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      // Use onboarding@resend.dev until domain is verified in Resend
      const fromEmail = process.env.FROM_EMAIL ?? "onboarding@resend.dev";
      const businessEmail = process.env.BUSINESS_EMAIL ?? "onboarding@resend.dev";

      await Promise.all([
        // Customer confirmation
        resend.emails.send({
          from: `Seacret Beach Club <${fromEmail}>`,
          to: email,
          subject: `Booking Received · #${bookingRef} — ${table_type} on ${date}`,
          html: customerEmailHtml({
            name, tableType: table_type, tableLabel: table_label,
            zone, date, time, guests, minConsumption: min_consumption,
            deposit, bookingRef,
          }),
        }),
        // Business notification
        resend.emails.send({
          from: `Seacret Bookings <${fromEmail}>`,
          to: businessEmail,
          subject: `[New Booking] ${name} · ${table_type} · ${date} ${time}`,
          html: businessEmailHtml({
            name, email, phone, tableType: table_type, tableLabel: table_label,
            zone, date, time, guests, minConsumption: min_consumption,
            deposit, notes: notes || null, bookingRef,
          }),
        }),
      ]);
    } catch (emailErr) {
      console.error("Email error (non-fatal):", emailErr);
    }

    // Send push notification to admin devices (non-blocking)
    sendPushToAllAdmins({
      title: `New Booking · #${bookingRef}`,
      body: `${name} · ${table_type} ${table_label} · ${date} ${time} · ${guests} guests`,
      bookingId: booking.id,
      adminKey: process.env.ADMIN_KEY,
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/admin?key=${process.env.ADMIN_KEY}`,
    }).catch((err) => console.error("Push error (non-fatal):", err));

    return NextResponse.json({ id: booking.id, ref: bookingRef }, { status: 201 });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

// ── GET /api/bookings (admin) ─────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: false })
    .order("time", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
