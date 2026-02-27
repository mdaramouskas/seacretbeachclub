import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TABLES } from "@/lib/tables";
import { BookingForm } from "@/components/BookingForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tableId: string }>;
}) {
  const { tableId } = await params;
  const table = TABLES.find((t) => t.id === tableId);
  if (!table) return { title: "Not Found" };
  return {
    title: `Book ${table.type} | Seacret Beach Club`,
  };
}

export default async function TableBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ tableId: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}) {
  const { tableId } = await params;
  const { date, time } = await searchParams;
  const table = TABLES.find((t) => t.id === tableId);

  if (!table || table.status !== "available") notFound();

  return (
    <section className="min-h-screen pt-28 pb-20 px-4" style={{ background: "#0a0a0a" }}>
      <div className="max-w-xl mx-auto">
        <Link
          href="/booking"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs uppercase tracking-widest mb-10 transition-colors"
        >
          <ArrowLeft size={12} />
          Back to Map
        </Link>

        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: "#00ffb8" }}>
            Complete Your Booking
          </p>
          <h1 className="text-white text-3xl font-light tracking-wider">Reserve a Spot</h1>
        </div>

        <BookingForm table={table} defaultDate={date} defaultTime={time} />
      </div>
    </section>
  );
}
