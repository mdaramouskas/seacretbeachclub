"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SideMenu } from "@/components/SideMenu";
import { BASE_IMG, RESERVE_URL } from "@/lib/constants";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={`${BASE_IMG}/logo-black-2.png`}
              alt="Seacret Beach Club"
              width={160}
              height={42}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href={RESERVE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="uppercase tracking-widest text-xs font-semibold border-black hover:bg-black hover:text-white transition-colors rounded-none px-6 py-2"
              >
                Reserve
              </Button>
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </header>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
