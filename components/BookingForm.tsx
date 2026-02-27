"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import type { TableSpot } from "@/lib/tables";
import { TABLE_ZONES } from "@/lib/tables";

const ZONE_COLORS: Record<TableSpot["zone"], string> = {
  vip: "#c084fc",
  beach: "#00ffb8",
  pool: "#38bdf8",
  restaurant: "#f5c842",
};

// Generate 30-min time slots 10:00 → 23:30
function generateTimeSlots() {
  const slots: string[] = [];
  for (let h = 10; h <= 23; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 23) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function maxDateStr() {
  const d = new Date();
  d.setMonth(d.getMonth() + 6);
  return d.toISOString().split("T")[0];
}

export function BookingForm({
  table,
  defaultDate,
  defaultTime,
}: {
  table: TableSpot;
  defaultDate?: string;
  defaultTime?: string;
}) {
  const router = useRouter();
  const color = ZONE_COLORS[table.zone];

  const [form, setForm] = useState({
    date: defaultDate ?? "",
    time: defaultTime ?? "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState<string>("");

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_id: table.id,
          table_label: table.label,
          table_type: table.type,
          zone: table.zone,
          guests: Number(form.guests),
          date: form.date,
          time: form.time,
          name: form.name,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
          min_consumption: table.minConsumption,
          deposit: table.deposit,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setBookingRef(data.id?.slice(0, 8).toUpperCase() ?? "—");
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center text-center py-16 px-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `${color}22` }}>
          <CheckCircle size={32} style={{ color }} />
        </div>
        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-2" style={{ color }}>
          Booking Received
        </p>
        <h2 className="text-white text-2xl font-light tracking-wider mb-3">
          See you soon!
        </h2>
        <p className="text-white/50 text-sm leading-relaxed mb-2">
          Your request for <span className="text-white">{table.type} · {table.label}</span> on{" "}
          <span className="text-white">{form.date}</span> at{" "}
          <span className="text-white">{form.time}</span> has been received.
        </p>
        <p className="text-white/40 text-xs mb-8">
          Reference: <span className="font-mono text-white/70">#{bookingRef}</span>
          <br />
          A confirmation email has been sent to <span className="text-white/70">{form.email}</span>
        </p>
        <button
          onClick={() => router.push("/booking")}
          className="text-xs uppercase tracking-[0.2em] font-semibold px-8 py-3 rounded transition-all hover:opacity-80"
          style={{ background: color, color: "#0a0a0a" }}
        >
          Back to Map
        </button>
      </div>
    );
  }

  const guestOptions = Array.from({ length: table.capacity }, (_, i) => i + 1);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      {/* Table summary card */}
      <div className="rounded-xl p-5 mb-8" style={{ background: "#111", border: `1px solid ${color}33` }}>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color }}>
              {TABLE_ZONES[table.zone].label}
            </span>
            <h3 className="text-white font-semibold mt-0.5">{table.type} · {table.label}</h3>
            <p className="text-white/45 text-xs mt-1 leading-relaxed max-w-xs">{table.description}</p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <div className="text-white/40 text-[10px] uppercase tracking-wide">Min. Order</div>
            <div className="text-white font-semibold text-lg" style={{ color }}>€{table.minConsumption}</div>
            {table.deposit > 0 && (
              <div className="text-white/35 text-[10px] mt-1">€{table.deposit} deposit</div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/50 text-[10px] uppercase tracking-[0.2em] mb-2">
              <Calendar size={10} className="inline mr-1.5" />Date
            </label>
            <input
              type="date"
              required
              min={todayStr()}
              max={maxDateStr()}
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-colors"
              style={{
                background: "#111",
                border: `1px solid ${form.date ? color + "66" : "#ffffff22"}`,
                colorScheme: "dark",
              }}
            />
          </div>
          <div>
            <label className="block text-white/50 text-[10px] uppercase tracking-[0.2em] mb-2">
              <Clock size={10} className="inline mr-1.5" />Time
            </label>
            <select
              required
              value={form.time}
              onChange={(e) => set("time", e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-colors"
              style={{
                background: "#111",
                border: `1px solid ${form.time ? color + "66" : "#ffffff22"}`,
                colorScheme: "dark",
              }}
            >
              <option value="">Select time</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-white/50 text-[10px] uppercase tracking-[0.2em] mb-2">
            <Users size={10} className="inline mr-1.5" />Number of Guests
          </label>
          <div className="flex gap-2 flex-wrap">
            {guestOptions.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set("guests", String(n))}
                className="w-10 h-10 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: form.guests === String(n) ? color : "#111",
                  color: form.guests === String(n) ? "#0a0a0a" : "#ffffff88",
                  border: `1px solid ${form.guests === String(n) ? color : "#ffffff22"}`,
                }}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="text-white/30 text-[10px] mt-1.5">Max {table.capacity} guests for this spot</p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-white/50 text-[10px] uppercase tracking-[0.2em] mb-2">
            <User size={10} className="inline mr-1.5" />Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none"
            style={{ background: "#111", border: `1px solid ${form.name ? color + "66" : "#ffffff22"}` }}
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/50 text-[10px] uppercase tracking-[0.2em] mb-2">
              <Mail size={10} className="inline mr-1.5" />Email
            </label>
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none"
              style={{ background: "#111", border: `1px solid ${form.email ? color + "66" : "#ffffff22"}` }}
            />
          </div>
          <div>
            <label className="block text-white/50 text-[10px] uppercase tracking-[0.2em] mb-2">
              <Phone size={10} className="inline mr-1.5" />Phone
            </label>
            <input
              type="tel"
              required
              placeholder="+30 69..."
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none"
              style={{ background: "#111", border: `1px solid ${form.phone ? color + "66" : "#ffffff22"}` }}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-white/50 text-[10px] uppercase tracking-[0.2em] mb-2">
            <MessageSquare size={10} className="inline mr-1.5" />Special Requests{" "}
            <span className="normal-case text-white/25">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Allergies, special occasions, preferences…"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            className="w-full rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none resize-none"
            style={{ background: "#111", border: "1px solid #ffffff22" }}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg px-4 py-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 text-sm font-bold uppercase tracking-[0.15em] rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: color, color: "#0a0a0a" }}
        >
          {loading ? "Sending…" : "Confirm Reservation"}
        </button>

        <p className="text-white/25 text-[10px] text-center leading-relaxed">
          By confirming you agree to our booking policies.
          {table.deposit > 0 && ` A deposit of €${table.deposit} will be required to finalize your booking.`}
        </p>
      </div>
    </form>
  );
}
