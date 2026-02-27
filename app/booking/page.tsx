"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, RotateCcw, Info } from "lucide-react";
import { VenueMap } from "@/components/VenueMap";

function generateTimeSlots() {
  const slots: string[] = [];
  for (let h = 10; h <= 23; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 23) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}
const TIME_SLOTS = generateTimeSlots();
const todayStr = () => new Date().toISOString().split("T")[0];
const maxDateStr = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 6);
  return d.toISOString().split("T")[0];
};

export default function BookingPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookedIds, setBookedIds] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!date || !time) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/availability?date=${date}&time=${time}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBookedIds(data.bookedIds ?? []);
    } catch {
      setError("Could not check availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full" style={{ height: "100vh" }}>

      {/* Venue background image */}
      <Image
        src="/images/venue.png"
        alt="Seacret Beach Club aerial view"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)", zIndex: 1 }} />

      {/* ── Top bar: date/time picker ── */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center gap-3 flex-wrap px-4"
        style={{
          top: 72, // below fixed header
          zIndex: 30,
          paddingTop: 12,
          paddingBottom: 20,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }}
      >
        {/* Date */}
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{ background: "rgba(8,8,8,0.80)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.10)" }}
        >
          <Calendar size={13} style={{ color: "#00ffb8" }} />
          <input
            type="date"
            min={todayStr()}
            max={maxDateStr()}
            value={date}
            onChange={(e) => { setDate(e.target.value); setBookedIds(null); }}
            className="bg-transparent text-sm text-white outline-none"
            style={{ colorScheme: "dark", width: 128 }}
          />
        </div>

        {/* Time */}
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{ background: "rgba(8,8,8,0.80)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.10)" }}
        >
          <Clock size={13} style={{ color: "#00ffb8" }} />
          <select
            value={time}
            onChange={(e) => { setTime(e.target.value); setBookedIds(null); }}
            className="bg-transparent text-sm text-white outline-none"
            style={{ colorScheme: "dark" }}
          >
            <option value="" style={{ background: "#111" }}>Select time</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t} style={{ background: "#111" }}>{t}</option>
            ))}
          </select>
        </div>

        {/* CTA */}
        {bookedIds === null ? (
          <button
            onClick={handleCheck}
            disabled={!date || !time || loading}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-all hover:opacity-90 disabled:opacity-30"
            style={{ background: "#00ffb8", color: "#0a0a0a" }}
          >
            {loading ? "Checking…" : <><span>See Available Spots</span><ArrowRight size={13} /></>}
          </button>
        ) : (
          <button
            onClick={() => { setBookedIds(null); setDate(""); setTime(""); }}
            className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs text-white/60 hover:text-white uppercase tracking-widest transition-colors"
            style={{ background: "rgba(8,8,8,0.80)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            <RotateCcw size={11} />
            <span>Change</span>
          </button>
        )}

        {error && (
          <p className="w-full text-center text-red-400 text-xs mt-1">
            {error}
          </p>
        )}
      </div>

      {/* ── Hotspot map layer ── */}
      {bookedIds !== null && (
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          <VenueMap
            selectedDate={date}
            selectedTime={time}
            bookedTableIds={bookedIds}
            fullscreen
          />
        </div>
      )}

      {/* ── Center title (before selection) ── */}
      {bookedIds === null && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 5 }}>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] font-semibold mb-3" style={{ color: "#00ffb8" }}>
              Seacret Beach Club
            </p>
            <h1 className="text-white text-5xl font-light tracking-widest mb-3" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}>
              Reserve Your Spot
            </h1>
            <p className="text-white/50 text-sm tracking-wide">
              Select a date &amp; time above to see availability
            </p>
          </div>
        </div>
      )}

      {/* ── Bottom legend ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 py-5"
        style={{ zIndex: 20, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
      >
        <div className="flex flex-wrap gap-4">
          {[
            { label: "VIP",        color: "#c084fc" },
            { label: "Beach",      color: "#00ffb8" },
            { label: "Restaurant", color: "#f5c842" },
            { label: "Reserved",   color: "#ef4444" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-white/55 text-[10px] uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </div>
        {bookedIds !== null && (
          <div className="flex items-center gap-1.5 text-white/35 text-[10px]">
            <Info size={10} />
            <span>Hover a spot to see details · Click to book</span>
          </div>
        )}
      </div>
    </div>
  );
}
