"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS, SOCIAL_LINKS, RESERVE_URL } from "@/lib/constants";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

export function SideMenu({ open, onClose }: SideMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-72 p-0 border-0 overflow-hidden"
        style={{
          backgroundImage: `url(https://www.seacretbeachclub.com/wp-content/uploads/icon-menu-3.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex flex-col h-full p-8">
          <SheetHeader className="mb-8">
            <SheetTitle className="text-white text-lg tracking-widest uppercase text-left">
              Menu
            </SheetTitle>
          </SheetHeader>

          {/* Navigation links */}
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-white/80 hover:text-[#00ffb8] transition-colors duration-200 text-sm tracking-widest uppercase py-2 border-b border-white/10"
              >
                {link.label}
              </Link>
            ))}

            <a
              href={RESERVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="mt-4 text-center text-xs tracking-widest uppercase py-3 border border-[#00ffb8] text-[#00ffb8] hover:bg-[#00ffb8] hover:text-black transition-colors duration-200"
            >
              Reserve Now
            </a>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#00ffb8] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#00ffb8] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            {/* TripAdvisor custom SVG */}
            <a
              href={SOCIAL_LINKS.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#00ffb8] transition-colors"
              aria-label="TripAdvisor"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-4.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm9 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM7.5 10a1 1 0 110 2 1 1 0 010-2zm9 0a1 1 0 110 2 1 1 0 010-2zm-4.5 4c-1.5 0-3-.5-4-1.5.5 2 2 3.5 4 3.5s3.5-1.5 4-3.5c-1 1-2.5 1.5-4 1.5z" />
              </svg>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
