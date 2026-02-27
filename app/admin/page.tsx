import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata = { title: "Admin | Seacret Beach Club" };

// This page is NOT wrapped in the main layout (no Header/Footer)
// Access: /admin?key=YOUR_ADMIN_KEY

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0a0a0a" }}
      >
        <div className="text-center">
          <p className="text-white/20 text-xs uppercase tracking-[0.3em] mb-2">403</p>
          <p className="text-white/50 text-sm">Access denied.</p>
        </div>
      </div>
    );
  }

  return <AdminDashboard adminKey={key} />;
}
