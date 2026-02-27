export type TableStatus = "available" | "reserved" | "unavailable";
export type TableZone = "beach" | "restaurant" | "vip" | "pool";

export interface TableSpot {
  id: string;
  label: string;
  zone: TableZone;
  type: string;
  capacity: number;
  minConsumption: number;
  deposit: number;
  description: string;
  x: number; // % of container width
  y: number; // % of container height
  shape: "circle" | "rect";
  width?: number;
  height?: number;
  status: TableStatus;
}

export const TABLE_ZONES: Record<TableZone, { label: string; color: string }> = {
  beach:      { label: "Beach",      color: "#00ffb8" },
  restaurant: { label: "Restaurant", color: "#f5c842" },
  vip:        { label: "VIP",        color: "#c084fc" },
  pool:       { label: "Pool",       color: "#38bdf8" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function beachSet(
  id: string,
  label: string,
  x: number,
  y: number,
  zone: TableZone = "beach",
  status: TableStatus = "available"
): TableSpot {
  return {
    id,
    label,
    zone,
    type: zone === "vip" ? "VIP Sunbed" : "Sunbed Set",
    capacity: 2,
    minConsumption: zone === "vip" ? 150 : 80,
    deposit: zone === "vip" ? 60 : 40,
    description:
      zone === "vip"
        ? "Premium front-row sunbed with parasol, dedicated service and priority access."
        : "Double sunbed set with parasol. Full service from our beach team.",
    x,
    y,
    shape: "circle",
    status,
  };
}

function restTable(
  id: string,
  label: string,
  x: number,
  y: number,
  capacity = 4,
  status: TableStatus = "available"
): TableSpot {
  return {
    id,
    label,
    zone: "restaurant",
    type: capacity <= 2 ? "Table for 2" : `Table for ${capacity}`,
    capacity,
    minConsumption: capacity <= 2 ? 60 : 100,
    deposit: 0,
    description: "Restaurant table. Reserve for lunch or dinner and enjoy our full Mediterranean menu.",
    x,
    y,
    shape: "circle",
    status,
  };
}

// ─── Upper Beach — 5 rows × 8 cols (above the walkway, y: 6%–41%) ────────────
// x cols: 4, 10, 16, 22, 28, 34, 40, 46  (sandy area, left side of image)
// y rows: 7, 15, 23, 31, 39

const UPPER_COLS = [4, 10, 16, 22, 28, 34, 40, 46];
const UPPER_ROWS = [7, 15, 23, 31, 39];

const upperBeach: TableSpot[] = UPPER_ROWS.flatMap((y, ri) =>
  UPPER_COLS.map((x, ci) => {
    const num = ri * UPPER_COLS.length + ci + 1;
    const isVip = ri === 0; // Front row = VIP
    return beachSet(
      `ub-${num}`,
      `A${num}`,
      x, y,
      isVip ? "vip" : "beach"
    );
  })
);

// ─── Lower Beach — 5 rows × 8 cols (below the walkway, y: 52%–83%) ──────────
// Same x cols, y rows: 53, 61, 69, 77, 84

const LOWER_ROWS = [53, 61, 69, 77, 84];

const lowerBeach: TableSpot[] = LOWER_ROWS.flatMap((y, ri) =>
  UPPER_COLS.map((x, ci) => {
    const num = ri * UPPER_COLS.length + ci + 1;
    const isVip = ri === 0; // First row after walkway = VIP
    return beachSet(
      `lb-${num}`,
      `B${num}`,
      x, y,
      isVip ? "vip" : "beach"
    );
  })
);

// ─── Restaurant / Terrace — top-right building area ──────────────────────────
// x: 66–90%, y: 9–27%

const restaurantTables: TableSpot[] = [
  restTable("r-1",  "R1",  68, 10, 4),
  restTable("r-2",  "R2",  75, 10, 4),
  restTable("r-3",  "R3",  82, 10, 2),
  restTable("r-4",  "R4",  89, 10, 2),
  restTable("r-5",  "R5",  68, 19, 4),
  restTable("r-6",  "R6",  75, 19, 4),
  restTable("r-7",  "R7",  82, 19, 4),
  restTable("r-8",  "R8",  89, 19, 2),
  restTable("r-9",  "R9",  68, 28, 6),
  restTable("r-10", "R10", 75, 28, 4),
  restTable("r-11", "R11", 82, 28, 4),
  restTable("r-12", "R12", 89, 28, 2),
];

// ─── Export ───────────────────────────────────────────────────────────────────
export const TABLES: TableSpot[] = [
  ...upperBeach,
  ...lowerBeach,
  ...restaurantTables,
];
