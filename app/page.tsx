import { HeroSlider } from "@/components/HeroSlider";
import { NewsletterForm } from "@/components/NewsletterForm";
import Image from "next/image";
import Link from "next/link";
import { BASE_IMG } from "@/lib/constants";

const FEATURES = [
  {
    image: `${BASE_IMG}/beach-2.jpg`,
    title: "Beach",
    description: "An oasis in the heart of Tsilivi bay.",
    href: "/beach",
  },
  {
    image: `${BASE_IMG}/restaurant-3.jpg`,
    title: "Restaurant",
    description: "Exceptional Mediterranean cuisine.",
    href: "/restaurant",
  },
  {
    image: `${BASE_IMG}/weddings-2.jpg`,
    title: "Weddings & Events",
    description: "Making your special day unforgettable.",
    href: "/weddings-events",
  },
  {
    image: `${BASE_IMG}/experience-3.jpg`,
    title: "The Experience",
    description: "Innovative cuisine & a unique beach.",
    href: "/experience",
  },
];

export default function Home() {
  return (
    <>
      {/* Full-screen hero slider */}
      <HeroSlider />

      {/* Welcome section */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-4">
            Welcome
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-widest uppercase text-black mb-6">
            Seacret Beach Club
          </h2>
          <div className="w-12 h-px bg-[#00ffb8] mx-auto mb-6" />
          <p className="text-gray-500 leading-relaxed text-sm md:text-base font-light max-w-2xl mx-auto">
            The absolute all-day beach bar & restaurant experience in Tsilivi,
            Zakynthos. Seacret Club invites you to discover environment,
            innovative cuisine & a unique beach.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group relative overflow-hidden h-80"
          >
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-white text-xl font-light tracking-widest uppercase mb-2">
                {feature.title}
              </h3>
              <div className="w-8 h-px bg-[#00ffb8] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-white/70 text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {feature.description}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* About strip */}
      <section className="bg-[#181818] py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-3">
              Tsilivi, Zakynthos
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-light tracking-wider uppercase mb-4">
              More Than a Beach
            </h2>
            <p className="text-white/60 text-sm leading-relaxed font-light">
              From boutique shopping to VIP transfers, weddings to shisha
              evenings — Seacret is your complete destination on the beautiful
              shores of Zakynthos.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={`${BASE_IMG}/seacret-logo-shell.png`}
              alt="Seacret Logo"
              width={120}
              height={120}
              className="opacity-60"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterForm />
    </>
  );
}
