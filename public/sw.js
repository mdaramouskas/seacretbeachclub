// Seacret Beach Club — Service Worker
// Handles push notifications and offline caching

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// ── Push notification received ────────────────────────────────────────────────
self.addEventListener("push", function (event) {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: data.bookingId ?? "booking",
    renotify: true,
    requireInteraction: true,
    data: {
      url: data.url ?? "/admin",
      bookingId: data.bookingId,
      adminKey: data.adminKey,
    },
    actions: [
      { action: "confirm", title: "✅ Confirm" },
      { action: "cancel", title: "❌ Cancel" },
    ],
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// ── Notification click / action ───────────────────────────────────────────────
self.addEventListener("notificationclick", function (event) {
  const notification = event.notification;
  notification.close();

  const { bookingId, adminKey, url } = notification.data ?? {};

  // Inline approve / cancel without opening browser
  if ((event.action === "confirm" || event.action === "cancel") && bookingId && adminKey) {
    const status = event.action === "confirm" ? "confirmed" : "cancelled";
    event.waitUntil(
      fetch(`/api/bookings/${bookingId}?key=${encodeURIComponent(adminKey)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
    );
    return;
  }

  // Default click — open admin panel
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes("/admin") && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(url ?? "/admin");
        }
      })
  );
});
