"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, RefreshCw, Calendar, Users, Euro } from "lucide-react";
import type { Booking } from "@/lib/supabase";
import { PushSubscribeButton } from "@/components/PushSubscribeButton";

const STATUS_CONFIG = {
  pending:   { label: "Pending",   bg: "#f5c84222", color: "#f5c842", icon: Clock },
  confirmed: { label: "Confirmed", bg: "#00ffb822", color: "#00ffb8", icon: CheckCircle },
  cancelled: { label: "Cancelled", bg: "#ffffff11", color: "#ffffff55", icon: XCircle },
};

const ZONE_COLORS: Record<string, string> = {
  vip: "#c084fc", beach: "#00ffb8", pool: "#38bdf8", restaurant: "#f5c842",
};

export function AdminDashboard({ adminKey }: { adminKey: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [dateFilter, setDateFilter] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch(`/api/bookings?key=${adminKey}`);
    const data = await res.json();
    setBookings(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    await fetch(`/api/bookings/${id}?key=${adminKey}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchBookings();
    setUpdatingId(null);
  };

  const filtered = bookings
    .filter((b) => filter === "all" || b.status === filter)
    .filter((b) => !dateFilter || b.date === dateFilter);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    today: bookings.filter((b) => b.date === new Date().toISOString().split("T")[0]).length,
  };

  return (
    <div className="min-h-screen p-6" style={{ background: "#0a0a0a", color: "#fff" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-1" style={{ color: "#00ffb8" }}>
              Admin Panel
            </p>
            <h1 className="text-white text-2xl font-light tracking-wide">Bookings</h1>
          </div>
          <div className="flex items-center gap-3">
            <PushSubscribeButton adminKey={adminKey} />
            <button
              onClick={fetchBookings}
              className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs uppercase tracking-widest transition-colors"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "#ffffff" },
            { label: "Today", value: stats.today, color: "#38bdf8" },
            { label: "Pending", value: stats.pending, color: "#f5c842" },
            { label: "Confirmed", value: stats.confirmed, color: "#00ffb8" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: "#111", border: "1px solid #ffffff0f" }}>
              <div className="text-2xl font-bold mb-1" style={{ color }}>{value}</div>
              <div className="text-white/40 text-xs uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex gap-2">
            {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="px-3 py-1.5 rounded-lg text-xs uppercase tracking-wide transition-all"
                style={{
                  background: filter === s ? "#00ffb8" : "#111",
                  color: filter === s ? "#0a0a0a" : "#ffffff66",
                  border: "1px solid " + (filter === s ? "#00ffb8" : "#ffffff11"),
                  fontWeight: filter === s ? 700 : 400,
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-lg px-3 py-1.5 text-sm text-white outline-none"
            style={{ background: "#111", border: "1px solid #ffffff22", colorScheme: "dark" }}
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter("")}
              className="text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              Clear date
            </button>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-white/40 text-sm text-center py-20">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="text-white/30 text-sm text-center py-20">No bookings found</div>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #ffffff0f" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#111", borderBottom: "1px solid #ffffff0a" }}>
                  {["Ref", "Spot", "Date · Time", "Guest", "People", "Min €", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-white/40 text-[10px] uppercase tracking-[0.15em] font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => {
                  const sc = STATUS_CONFIG[b.status];
                  const Icon = sc.icon;
                  const zoneColor = ZONE_COLORS[b.zone] ?? "#ffffff";
                  return (
                    <tr
                      key={b.id}
                      style={{
                        background: i % 2 === 0 ? "#0d0d0d" : "#0a0a0a",
                        borderBottom: "1px solid #ffffff05",
                        opacity: b.status === "cancelled" ? 0.5 : 1,
                      }}
                    >
                      <td className="px-4 py-3 font-mono text-white/50 text-xs">
                        #{b.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold" style={{ color: zoneColor }}>{b.table_label}</span>
                        <span className="text-white/50 text-xs ml-1.5">{b.table_type}</span>
                      </td>
                      <td className="px-4 py-3 text-white/70 text-xs">
                        <Calendar size={10} className="inline mr-1 opacity-50" />
                        {b.date} <span className="text-white/30 mx-1">·</span>
                        <Clock size={10} className="inline mr-1 opacity-50" />
                        {b.time}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-white text-xs font-medium">{b.name}</div>
                        <div className="text-white/40 text-[10px]">{b.email}</div>
                        <div className="text-white/40 text-[10px]">{b.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-white/70 text-xs text-center">
                        <Users size={10} className="inline mr-1 opacity-50" />
                        {b.guests}
                      </td>
                      <td className="px-4 py-3 text-white/70 text-xs text-center">
                        €{b.min_consumption}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          <Icon size={9} />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {b.status !== "confirmed" && (
                            <button
                              onClick={() => updateStatus(b.id, "confirmed")}
                              disabled={updatingId === b.id}
                              className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide transition-all hover:opacity-80 disabled:opacity-40"
                              style={{ background: "#00ffb822", color: "#00ffb8", border: "1px solid #00ffb844" }}
                            >
                              Confirm
                            </button>
                          )}
                          {b.status !== "cancelled" && (
                            <button
                              onClick={() => updateStatus(b.id, "cancelled")}
                              disabled={updatingId === b.id}
                              className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide transition-all hover:opacity-80 disabled:opacity-40"
                              style={{ background: "#ef444422", color: "#ef4444", border: "1px solid #ef444433" }}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                        {b.notes && (
                          <p className="text-white/30 text-[10px] mt-1 max-w-[120px] truncate" title={b.notes}>
                            💬 {b.notes}
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
