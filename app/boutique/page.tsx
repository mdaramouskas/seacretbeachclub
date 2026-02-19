import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BASE_IMG } from "@/lib/constants";

export const metadata = {
  title: "Boutique | Seacret Beach Club",
};

export default function BoutiquePage() {
  return (
    <>
      <PageHero
        image={`${BASE_IMG}/boutique-3-1024x1024.jpg`}
        title="Boutique"
        subtitle="Beach chic — eclectic collection from Greek & International designers"
      />

      {/* Content */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-4">
              Boutique
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-black mb-4">
              Beach Chic
            </h2>
            <div className="w-10 h-px bg-[#00ffb8] mb-6" />
            <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">
              Get beach chic at our Seacret boutique. Find an eclectic
              collection of boho chic summer basics, swimsuits, accessories and
              jewelry from Greek and International designers.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              Whether you are looking for the perfect beach cover-up, a
              statement piece of jewelry, or the ideal summer accessory, our
              curated boutique has everything you need to complete your beach
              look.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-80 aspect-square relative overflow-hidden">
            <Image
              src={`${BASE_IMG}/boutique-3-1024x1024.jpg`}
              alt="Boutique"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-[#f8f8f8]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-light tracking-widest uppercase text-black mb-10">
            Our Collection
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Swimwear", "Accessories", "Jewelry", "Summer Basics"].map(
              (cat) => (
                <div
                  key={cat}
                  className="border border-gray-200 py-8 px-4 hover:border-[#00ffb8] transition-colors duration-300"
                >
                  <p className="text-xs tracking-widest uppercase text-gray-600">
                    {cat}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
