"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, BellRing, Loader2 } from "lucide-react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

type PermState = "default" | "granted" | "denied" | "unsupported";

export function PushSubscribeButton({ adminKey }: { adminKey: string }) {
  const [permState, setPermState] = useState<PermState>("default");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      setPermState("unsupported");
      return;
    }

    setPermState(Notification.permission as PermState);

    // Check if already subscribed
    navigator.serviceWorker.ready.then(async (reg) => {
      const sub = await reg.pushManager.getSubscription();
      setSubscribed(!!sub);
    });
  }, []);

  const subscribe = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const reg = await navigator.serviceWorker.ready;

      const permission = await Notification.requestPermission();
      setPermState(permission as PermState);
      if (permission !== "granted") {
        setStatus("Permission denied. Enable notifications in browser settings.");
        return;
      }

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        setStatus("VAPID public key not configured.");
        return;
      }

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub.toJSON(), key: adminKey }),
      });

      if (!res.ok) throw new Error("Failed to save subscription");

      setSubscribed(true);
      setStatus("Notifications enabled! You'll be notified on new bookings.");
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint, key: adminKey }),
        });
        await sub.unsubscribe();
      }
      setSubscribed(false);
      setStatus("Notifications disabled.");
    } catch {
      setStatus("Could not unsubscribe.");
    } finally {
      setLoading(false);
    }
  };

  if (permState === "unsupported") return null;

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={subscribed ? unsubscribe : subscribe}
        disabled={loading || permState === "denied"}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-40"
        style={{
          background: subscribed ? "#ffffff0f" : "#00ffb8",
          color: subscribed ? "#ffffff88" : "#0a0a0a",
          border: subscribed ? "1px solid #ffffff18" : "none",
        }}
      >
        {loading ? (
          <Loader2 size={13} className="animate-spin" />
        ) : subscribed ? (
          <BellRing size={13} />
        ) : (
          <Bell size={13} />
        )}
        {loading ? "Please wait…" : subscribed ? "Notifications On" : "Enable Notifications"}
      </button>

      {permState === "denied" && (
        <p className="text-red-400/70 text-[10px]">
          Notifications blocked. Allow them in your browser settings.
        </p>
      )}

      {status && !loading && (
        <p className="text-white/40 text-[10px] leading-relaxed">{status}</p>
      )}
    </div>
  );
}
