"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <p className="text-[#00ffb8] text-lg tracking-wider">
          Thank you! Your message has been sent.
        </p>
        <p className="text-white/50 text-sm mt-2">
          We will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-white/70 text-xs tracking-widest uppercase block mb-2">
            Your Name *
          </label>
          <Input
            required
            placeholder="John Doe"
            className="rounded-none border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00ffb8]"
          />
        </div>
        <div>
          <label className="text-white/70 text-xs tracking-widest uppercase block mb-2">
            Your Email *
          </label>
          <Input
            type="email"
            required
            placeholder="john@example.com"
            className="rounded-none border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00ffb8]"
          />
        </div>
      </div>

      <div>
        <label className="text-white/70 text-xs tracking-widest uppercase block mb-2">
          Subject *
        </label>
        <Input
          required
          placeholder="How can we help you?"
          className="rounded-none border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00ffb8]"
        />
      </div>

      <div>
        <label className="text-white/70 text-xs tracking-widest uppercase block mb-2">
          Your Message *
        </label>
        <Textarea
          required
          placeholder="Write your message here..."
          rows={5}
          className="rounded-none border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00ffb8] resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="privacy"
          checked={checked}
          onCheckedChange={(v) => setChecked(!!v)}
          required
          className="border-white/30 data-[state=checked]:bg-[#00ffb8] data-[state=checked]:border-[#00ffb8] mt-0.5"
        />
        <label
          htmlFor="privacy"
          className="text-white/50 text-xs leading-relaxed cursor-pointer"
        >
          I have read and understood the Privacy Policy
        </label>
      </div>

      <Button
        type="submit"
        disabled={!checked}
        className="rounded-none bg-[#00ffb8] text-black hover:bg-[#00e0a0] uppercase tracking-widest text-xs px-10 py-3 font-semibold disabled:opacity-40 w-full md:w-auto"
      >
        Send Message
      </Button>
    </form>
  );
}
