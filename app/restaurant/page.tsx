import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BASE_IMG, RESERVE_URL } from "@/lib/constants";

export const metadata = {
  title: "Restaurant | Seacret Beach Club",
};

const FOOD_IMAGES = [
  `${BASE_IMG}/restaurant-2.jpg`,
  `${BASE_IMG}/restaurant-4.jpg`,
  `${BASE_IMG}/restaurant-7.jpg`,
  `${BASE_IMG}/restaurant-8.jpg`,
];

const DRINK_IMAGES = [
  `${BASE_IMG}/drink-2.jpg`,
  `${BASE_IMG}/drink-3.jpg`,
  `${BASE_IMG}/drink-4.jpg`,
  `${BASE_IMG}/drink-5.jpg`,
  `${BASE_IMG}/drink-11.jpg`,
];

export default function RestaurantPage() {
  return (
    <>
      <PageHero
        image={`${BASE_IMG}/restaurant-3.jpg`}
        title="Restaurant"
        subtitle="Stunning dishes, creative cocktails and a charming atmosphere"
      />

      {/* Intro */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-4">
            Eat & Drink
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-black mb-6">
            Beachfront Dining
          </h2>
          <div className="w-12 h-px bg-[#00ffb8] mx-auto mb-8" />
          <p className="text-gray-500 leading-relaxed text-sm md:text-base font-light max-w-2xl mx-auto">
            Stunning dishes, creative cocktails and a charming atmosphere from
            this glorious beachfront location as you dine family-style.
          </p>
          <a
            href={RESERVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 border border-black text-black text-xs tracking-widest uppercase px-8 py-3 hover:bg-black hover:text-white transition-colors duration-300"
          >
            Reserve a Table
          </a>
        </div>
      </section>

      {/* Food section */}
      <section className="py-16 px-6 bg-[#f8f8f8]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-3">
              Mediterranean Cuisine
            </p>
            <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-black">
              The Food
            </h2>
            <div className="w-10 h-px bg-[#00ffb8] mx-auto mt-4 mb-6" />
            <p className="text-gray-500 text-sm font-light max-w-xl mx-auto">
              Exceptional Mediterranean cuisine from the fresh fish to the prime
              meat. Our culinary experience will definitely be one you desire to
              repeat.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {FOOD_IMAGES.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`Food ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drinks section */}
      <section className="py-16 px-6 bg-[#181818]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-3">
              Bar
            </p>
            <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-white">
              Cocktails & Wine
            </h2>
            <div className="w-10 h-px bg-[#00ffb8] mx-auto mt-4 mb-6" />
            <p className="text-white/60 text-sm font-light max-w-xl mx-auto">
              Life is a crazy mixture of intoxicated cocktails. Select your
              favorites from our menu and enjoy a fine collection of spirits and
              wines.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {DRINK_IMAGES.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`Drink ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
