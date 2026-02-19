"use client";

import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/constants";

export function HeroSlider() {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {HERO_SLIDES.map((slide, index) => (
            <div key={index} className="embla__slide relative h-full">
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/45" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
                  Seacret Beach Club — Tsilivi, Zakynthos
                </p>
                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-wider uppercase mb-6">
                  {slide.title}
                </h1>
                <p className="text-white/80 text-sm md:text-base max-w-xl mb-10 font-light tracking-wide">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="border border-white text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Discover
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow controls */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/60 text-white p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/60 text-white p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/50 text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/30 animate-pulse" />
      </div>
    </div>
  );
}
