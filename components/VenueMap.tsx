"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Users, ShoppingBag, Euro, Info, X } from "lucide-react";
import { TABLES, TABLE_ZONES, type TableSpot } from "@/lib/tables";

const STATUS_STYLES: Record<TableSpot["status"], string> = {
  available: "cursor-pointer hover:scale-110 transition-transform",
  reserved: "cursor-not-allowed opacity-60",
  unavailable: "cursor-not-allowed opacity-40",
};

const ZONE_COLORS: Record<TableSpot["zone"], string> = {
  vip: "#c084fc",
  beach: "#00ffb8",
  pool: "#38bdf8",
  restaurant: "#f5c842",
};

function TableHotspot({
  table,
  onHover,
  onLeave,
  onClick,
  isActive,
}: {
  table: TableSpot;
  onHover: (table: TableSpot, el: HTMLElement) => void;
  onLeave: () => void;
  onClick: (table: TableSpot) => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const color = ZONE_COLORS[table.zone];

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    left: `${table.x}%`,
    top: `${table.y}%`,
    transform: "translate(-50%, -50%)",
    zIndex: isActive ? 20 : 10,
  };

  if (table.shape === "rect") {
    baseStyle.width = `${table.width ?? 8}%`;
    baseStyle.height = `${table.height ?? 5}%`;
  }

  return (
    <div
      ref={ref}
      style={baseStyle}
      className={STATUS_STYLES[table.status]}
      onMouseEnter={() => {
        if (ref.current && table.status === "available") onHover(table, ref.current);
      }}
      onMouseLeave={onLeave}
      onClick={() => { if (table.status === "available") onClick(table); }}
    >
      {table.shape === "circle" ? (
        <div
          className="relative flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: isActive ? color : `${color}33`,
            border: `2px solid ${table.status === "available" ? color : "#ffffff44"}`,
            boxShadow: isActive ? `0 0 16px ${color}99` : undefined,
            transition: "all 0.2s ease",
          }}
        >
          <span className="text-[10px] font-bold tracking-wide" style={{ color: isActive ? "#000" : color }}>
            {table.label}
          </span>
          {table.status === "reserved" && (
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
          )}
        </div>
      ) : (
        <div
          className="relative flex items-center justify-center w-full h-full rounded"
          style={{
            background: isActive ? `${color}55` : `${color}22`,
            border: `1.5px solid ${table.status === "available" ? color : "#ffffff33"}`,
            boxShadow: isActive ? `0 0 20px ${color}66` : undefined,
            transition: "all 0.2s ease",
          }}
        >
          <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: isActive ? "#fff" : color }}>
            {table.label}
          </span>
          {table.status === "reserved" && (
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          )}
        </div>
      )}
    </div>
  );
}

function TableTooltip({
  table,
  position,
  onClose,
  onMouseEnter,
  onMouseLeave,
  selectedDate,
  selectedTime,
}: {
  table: TableSpot;
  position: { x: number; y: number };
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  selectedDate: string;
  selectedTime: string;
}) {
  const color = ZONE_COLORS[table.zone];
  const router = useRouter();

  // If y < 280px from top of container → show tooltip BELOW the element
  const flipDown = position.y < 280;

  return (
    <div
      className="absolute z-50 pointer-events-auto"
      style={{
        left: position.x,
        top: position.y,
        transform: flipDown
          ? "translate(-50%, 24px)"
          : "translate(-50%, calc(-100% - 16px))",
        minWidth: 260,
        maxWidth: 300,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Arrow — flips direction based on tooltip position */}
      <div
        className="absolute left-1/2 w-3 h-3"
        style={{
          background: "#1a1a1a",
          ...(flipDown
            ? { top: -5, borderTop: `1px solid ${color}44`, borderRight: `1px solid ${color}44` }
            : { bottom: -5, borderBottom: `1px solid ${color}44`, borderRight: `1px solid ${color}44` }),
          transform: "translateX(-50%) rotate(45deg)",
        }}
      />

      <div
        className="rounded-lg overflow-hidden shadow-2xl"
        style={{
          background: "#1a1a1aee",
          backdropFilter: "blur(12px)",
          border: `1px solid ${color}44`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${color}22` }}>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color }}>
              {TABLE_ZONES[table.zone].label}
            </span>
            <h3 className="text-white font-bold text-sm mt-0.5">{table.type} · {table.label}</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white/80 transition-colors ml-2">
            <X size={14} />
          </button>
        </div>

        {/* Description */}
        <p className="text-white/55 text-xs px-4 pt-3 pb-2 leading-relaxed">{table.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1 px-4 pb-3">
          {[
            { icon: <Users size={13} />, value: `${table.capacity}`, label: "Guests" },
            { icon: <ShoppingBag size={13} />, value: `€${table.minConsumption}`, label: "Min. Order" },
            { icon: <Euro size={13} />, value: table.deposit > 0 ? `€${table.deposit}` : "—", label: "Deposit" },
          ].map(({ icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-2 rounded" style={{ background: "#ffffff08" }}>
              <span style={{ color }}>{icon}</span>
              <span className="text-white font-semibold text-xs">{value}</span>
              <span className="text-white/40 text-[9px] uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-4 pb-4">
          {table.deposit > 0 && (
            <p className="text-white/35 text-[9px] mb-2 text-center">Deposit credited towards your bill</p>
          )}
          <button
            onClick={() => {
              const params = selectedDate && selectedTime
                ? `?date=${selectedDate}&time=${selectedTime}`
                : "";
              router.push(`/booking/${table.id}${params}`);
            }}
            className="block w-full text-center py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded transition-all hover:opacity-90"
            style={{ background: color, color: "#0a0a0a" }}
          >
            Book This Spot
          </button>
        </div>
      </div>
    </div>
  );
}

export function VenueMap({
  selectedDate,
  selectedTime,
  bookedTableIds,
  fullscreen = false,
}: {
  selectedDate?: string;
  selectedTime?: string;
  bookedTableIds?: string[];
  fullscreen?: boolean;
}) {
  const date = selectedDate ?? "";
  const time = selectedTime ?? "";
  const bookedIds = bookedTableIds ?? [];
  const [activeTable, setActiveTable] = useState<TableSpot | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  const startHideTimer = useCallback((delay = 250) => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => setActiveTable(null), delay);
  }, []);

  const handleHover = useCallback((table: TableSpot, el: HTMLElement) => {
    clearHideTimer();
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setTooltipPos({
      x: elRect.left - containerRect.left + elRect.width / 2,
      y: elRect.top - containerRect.top,
    });
    setActiveTable(table);
  }, []);

  const handleHotspotLeave = useCallback(() => startHideTimer(250), [startHideTimer]);
  const handleTooltipEnter = useCallback(() => clearHideTimer(), []);
  const handleTooltipLeave = useCallback(() => startHideTimer(200), [startHideTimer]);
  const handleClick = useCallback((table: TableSpot) => {
    clearHideTimer();
    setActiveTable(table);
  }, []);

  // Effective status: static config + real-time booked IDs
  const effectiveStatus = (t: TableSpot): TableSpot["status"] => {
    if (t.status !== "available") return t.status;
    if (bookedIds.includes(t.id)) return "reserved";
    return "available";
  };

  const availableCount = TABLES.filter((t) => effectiveStatus(t) === "available").length;

  return (
    <div className={fullscreen ? "w-full h-full" : "w-full"}>
      {/* Legend — hidden in fullscreen mode (booking page has its own) */}
      {!fullscreen && (
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          {Object.entries(TABLE_ZONES).map(([zone, info]) => (
            <div key={zone} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: info.color }} />
              <span className="text-white/50 text-xs uppercase tracking-wide">{info.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-white/50 text-xs uppercase tracking-wide">Reserved</span>
          </div>
        </div>
      )}

      {/* Map Container — NO overflow-hidden so tooltip is never clipped */}
      <div
        ref={containerRef}
        className="relative w-full select-none"
        style={fullscreen ? { width: "100%", height: "100%" } : { aspectRatio: "16/9" }}
      >
        {/* Placeholder background layer — only in non-fullscreen mode */}
        {!fullscreen && (
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #0a2a1f 0%, #0d1f2d 40%, #0a1520 100%)",
              border: "1px solid #00ffb822",
            }}
          >
            {/* Decorative gradients */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                radial-gradient(ellipse at 20% 60%, #00ffb820 0%, transparent 50%),
                radial-gradient(ellipse at 70% 40%, #38bdf820 0%, transparent 40%),
                radial-gradient(ellipse at 50% 80%, #00ffb810 0%, transparent 60%)
              `,
            }} />

            {/* Zone labels */}
            <div className="absolute top-[14%] left-[14%] text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: "#c084fc44" }}>VIP Area</div>
            <div className="absolute top-[48%] left-[10%] text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: "#00ffb844" }}>Beach Zone</div>
            <div className="absolute top-[22%] left-[52%] text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: "#38bdf844" }}>Pool Area</div>
            <div className="absolute top-[40%] left-[72%] text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: "#f5c84244" }}>Restaurant</div>

            {/* Zone regions */}
            {[
              { style: { left: "9%", top: "14%", width: "42%", height: "16%", background: "#c084fc08", border: "1px dashed #c084fc22" } },
              { style: { left: "8%", top: "45%", width: "66%", height: "22%", background: "#00ffb808", border: "1px dashed #00ffb822" } },
              { style: { left: "50%", top: "18%", width: "33%", height: "22%", background: "#38bdf808", border: "1px dashed #38bdf822" } },
              { style: { left: "70%", top: "38%", width: "20%", height: "30%", background: "#f5c84208", border: "1px dashed #f5c84222" } },
            ].map((z, i) => (
              <div key={i} className="absolute rounded-lg" style={z.style} />
            ))}

            {/* Compass */}
            <div className="absolute bottom-4 right-4 text-white/20 text-[10px] uppercase tracking-widest">↑ Sea</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/15 text-[9px] uppercase tracking-[0.3em]">
              Map placeholder · Replace with venue visuals
            </div>
          </div>
        )}

        {/* Hotspots */}
        {TABLES.map((table) => (
          <TableHotspot
            key={table.id}
            table={{ ...table, status: effectiveStatus(table) }}
            onHover={handleHover}
            onLeave={handleHotspotLeave}
            onClick={handleClick}
            isActive={activeTable?.id === table.id}
          />
        ))}

        {/* Tooltip */}
        {activeTable && (
          <TableTooltip
            table={activeTable}
            position={tooltipPos}
            onClose={() => { clearHideTimer(); setActiveTable(null); }}
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
            selectedDate={date}
            selectedTime={time}
          />
        )}
      </div>

      {/* Stats — hidden in fullscreen mode */}
      {!fullscreen && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-white/40 text-xs">
            <span className="text-[#00ffb8] font-semibold">{availableCount}</span> spots available today
          </p>
          <div className="flex items-center gap-1 text-white/30 text-[10px]">
            <Info size={10} />
            <span>Hover a spot to see details · Click to book</span>
          </div>
        </div>
      )}
    </div>
  );
}
