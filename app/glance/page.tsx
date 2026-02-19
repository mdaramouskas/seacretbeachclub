import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BASE_IMG } from "@/lib/constants";

export const metadata = {
  title: "At a Glance | Seacret Beach Club",
};

const GALLERY_IMAGES = [
  `${BASE_IMG}/seacret-1.jpg`,
  `${BASE_IMG}/seacret-2.jpg`,
  `${BASE_IMG}/seacret-3.jpg`,
  `${BASE_IMG}/seacret-5.jpg`,
  `${BASE_IMG}/seacret-6.jpg`,
  `${BASE_IMG}/seacret-7.jpg`,
  `${BASE_IMG}/seacret-8.jpg`,
  `${BASE_IMG}/seacret-11.jpg`,
  `${BASE_IMG}/seacret-12.jpg`,
  `${BASE_IMG}/seacret-13.jpg`,
  `${BASE_IMG}/seacret-14.jpg`,
  `${BASE_IMG}/seacret-15.jpg`,
  `${BASE_IMG}/seacret-16.jpg`,
  `${BASE_IMG}/seacret-17.jpg`,
  `${BASE_IMG}/seacret-18.jpg`,
  `${BASE_IMG}/seacret-19-1024x1024.jpg`,
  `${BASE_IMG}/seacret-20-1024x1024.jpg`,
  `${BASE_IMG}/seacret-21-1024x1024.jpg`,
  `${BASE_IMG}/seacret-22-1024x1024.jpg`,
  `${BASE_IMG}/seacret-23-1024x1024.jpg`,
  `${BASE_IMG}/seacret-24-1024x1024.jpg`,
  `${BASE_IMG}/seacret-25-1024x1024.jpg`,
  `${BASE_IMG}/seacret-26-1024x1024.jpg`,
  `${BASE_IMG}/seacret-27-1024x1024.jpg`,
  `${BASE_IMG}/seacret-28-1024x1024.jpg`,
  `${BASE_IMG}/seacret-29-1024x1024.jpg`,
  `${BASE_IMG}/seacret-30.jpg`,
  `${BASE_IMG}/seacret-31-1024x1024.jpg`,
  `${BASE_IMG}/seacret-32-1024x1024.jpg`,
  `${BASE_IMG}/seacret-33-1024x1024.jpg`,
  `${BASE_IMG}/seacret-34-1024x1024.jpg`,
  `${BASE_IMG}/seacret-35-1024x1024.jpg`,
  `${BASE_IMG}/seacret-36-1024x1024.jpg`,
  `${BASE_IMG}/experience-2.jpg`,
  `${BASE_IMG}/experience-3.jpg`,
  `${BASE_IMG}/restaurant-4.jpg`,
  `${BASE_IMG}/weddings-4.jpg`,
  `${BASE_IMG}/boutique-3-1024x1024.jpg`,
];

export default function GlancePage() {
  return (
    <>
      <PageHero
        image={`${BASE_IMG}/seacret-1.jpg`}
        title="At a Glance"
        subtitle="Explore Seacret Beach Club through our gallery"
      />

      {/* Gallery header */}
      <section className="py-12 px-6 bg-white text-center">
        <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-3">
          Gallery
        </p>
        <h2 className="text-3xl font-light tracking-widest uppercase text-black mb-2">
          Our World
        </h2>
        <div className="w-12 h-px bg-[#00ffb8] mx-auto" />
      </section>

      {/* Masonry grid */}
      <section className="px-2 pb-2">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden group break-inside-avoid"
            >
              <Image
                src={src}
                alt={`Seacret ${i + 1}`}
                width={400}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
