import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BASE_IMG } from "@/lib/constants";

export const metadata = {
  title: "The Experience | Seacret Beach Club",
};

const GALLERY = [
  `${BASE_IMG}/experience-2.jpg`,
  `${BASE_IMG}/experience-3.jpg`,
  `${BASE_IMG}/experience-4.jpg`,
  `${BASE_IMG}/experience-5.jpg`,
];

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        image={`${BASE_IMG}/experience-3.jpg`}
        title="The Experience"
        subtitle="Discover environment, innovative cuisine & a unique beach"
      />

      {/* Main content */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-4">
            Seacret Beach Club
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-black mb-6">
            An Unforgettable Experience
          </h2>
          <div className="w-12 h-px bg-[#00ffb8] mx-auto mb-8" />
          <p className="text-gray-500 leading-relaxed text-sm md:text-base font-light">
            The absolute all-day beach bar & restaurant experience in Tsilivi.
            Seacret Club invites you to discover environment, innovative cuisine
            & a unique beach. From the moment you arrive, you will be immersed
            in an atmosphere of luxury, comfort and natural beauty.
          </p>
        </div>
      </section>

      {/* Image grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1 px-1">
        {GALLERY.map((src, i) => (
          <div key={i} className="relative aspect-square overflow-hidden group">
            <Image
              src={src}
              alt={`Experience ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-[#f8f8f8]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: "☀️",
              title: "Sun & Sea",
              text: "Bask in the Zakynthian sun on our premium sunbeds facing the crystal clear Ionian Sea.",
            },
            {
              icon: "🍽️",
              title: "Cuisine",
              text: "Innovative Mediterranean dishes crafted with the finest local ingredients.",
            },
            {
              icon: "🌿",
              title: "Atmosphere",
              text: "A unique blend of natural beauty, luxury and laid-back beach vibes.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              <span className="text-4xl">{item.icon}</span>
              <h3 className="text-lg font-light tracking-widest uppercase text-black">
                {item.title}
              </h3>
              <div className="w-8 h-px bg-[#00ffb8]" />
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
