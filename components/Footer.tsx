import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#181818] text-white/70 text-xs">
      {/* Nav links row */}
      <div className="border-b border-white/10 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-1 gap-y-2">
          {NAV_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className="hover:text-[#00ffb8] transition-colors uppercase tracking-widest text-[10px]"
              >
                {link.label}
              </Link>
              {i < NAV_LINKS.length - 1 && (
                <span className="mx-2 text-white/30">—</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] tracking-wider">
            © {new Date().getFullYear()} Seacret Beach Club. All Rights
            Reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00ffb8] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00ffb8] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00ffb8] transition-colors"
              aria-label="TripAdvisor"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-4.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm9 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM7.5 10a1 1 0 110 2 1 1 0 010-2zm9 0a1 1 0 110 2 1 1 0 010-2zm-4.5 4c-1.5 0-3-.5-4-1.5.5 2 2 3.5 4 3.5s3.5-1.5 4-3.5c-1 1-2.5 1.5-4 1.5z" />
              </svg>
            </a>
          </div>

          <p className="text-[10px] text-white/40">
            Built with Next.js 15
          </p>
        </div>
      </div>
    </footer>
  );
}
