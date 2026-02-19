"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-[#181818] py-16 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-3">
          Stay Updated
        </p>
        <h2 className="text-white text-2xl md:text-3xl font-light tracking-widest uppercase mb-2">
          Get Our Newsletter
        </h2>
        <p className="text-white/50 text-sm mb-8 font-light">
          Subscribe to receive news and special offers from Seacret Beach Club.
        </p>

        {submitted ? (
          <p className="text-[#00ffb8] tracking-wider text-sm">
            Thank you for subscribing!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-none border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#00ffb8] flex-1"
            />
            <Button
              type="submit"
              className="rounded-none bg-[#00ffb8] text-black hover:bg-[#00e0a0] uppercase tracking-widest text-xs px-6 font-semibold"
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
