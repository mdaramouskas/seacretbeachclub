import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BASE_IMG } from "@/lib/constants";

export const metadata = {
  title: "Services & Hospitality | Seacret Beach Club",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image={`${BASE_IMG}/seacret-7.jpg`}
        title="Services & Hospitality"
        subtitle="VIP transfers, custom excursions and exclusive experiences"
      />

      {/* VIP Transfer */}
      <section className="flex flex-col md:flex-row min-h-[420px]">
        <div className="relative w-full md:w-1/2 min-h-[300px]">
          <Image
            src={`${BASE_IMG}/seacret-6.jpg`}
            alt="VIP Transfer"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-16 bg-white">
          <div className="max-w-md">
            <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-3">
              Transportation
            </p>
            <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-black mb-4">
              VIP Transfer
            </h2>
            <div className="w-10 h-px bg-[#00ffb8] mb-6" />
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              Airport and port transfers have never been so easy. Seacret
              transportation services take its guests everywhere they desire in
              maximal comfort and style. Our professional chauffeurs will meet
              you at your hotel and will ensure a seamless journey to the beach
              or any other island destination.
            </p>
          </div>
        </div>
      </section>

      {/* Seacret Holidays */}
      <section className="flex flex-col md:flex-row-reverse min-h-[420px]">
        <div className="relative w-full md:w-1/2 min-h-[300px]">
          <Image
            src={`${BASE_IMG}/seacret-8.jpg`}
            alt="Seacret Holidays"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-16 bg-[#f8f8f8]">
          <div className="max-w-md">
            <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-3">
              Excursions
            </p>
            <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-black mb-4">
              Seacret Holidays
            </h2>
            <div className="w-10 h-px bg-[#00ffb8] mb-6" />
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              Welcome to the endless blue of Zakynthos Island. Seacret Holidays
              team are here to offer you exclusive services. Explore paradisiac
              beaches and archeological gems with custom made excursions,
              guaranteed to satisfy even the most demanding customers. Let us be
              a part of your most special moments.
            </p>
          </div>
        </div>
      </section>

      {/* Additional services strip */}
      <section className="bg-[#181818] py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🚗", label: "Airport Transfer" },
            { icon: "🚢", label: "Port Transfer" },
            { icon: "🏖️", label: "Beach Excursions" },
            { icon: "💒", label: "Event Planning" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-white/60 text-xs tracking-widest uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
