import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BASE_IMG, RESERVE_URL } from "@/lib/constants";

export const metadata = {
  title: "Weddings & Events | Seacret Beach Club",
};

const SECTIONS = [
  {
    title: "Weddings",
    subtitle: "Your Dream Day",
    text: "Making your special wedding day unforgettable. Seacret's luxurious ambience, careful dining menu and attentive staff will make all your dreams a reality.",
    image: `${BASE_IMG}/weddings-2.jpg`,
  },
  {
    title: "Birthdays",
    subtitle: "Celebrate With Us",
    text: "Is it your birthday? We are here to make your day special and fabulous. Let your imagination fly and we will make it a reality.",
    image: `${BASE_IMG}/birthday.jpg`,
  },
  {
    title: "Special Occasions",
    subtitle: "Every Celebration",
    text: "Seacret caters to all your special occasions. Let us know what you are looking to celebrate and we will do the perfect for you, from bachelors parties, weddings, birthdays to corporate events.",
    image: `${BASE_IMG}/weddings-4.jpg`,
  },
  {
    title: "Baptisms",
    subtitle: "A Sacred Day",
    text: "Baptism day is one of the most special days in the life of every Orthodox Christian and Seacret team is ready to make your ceremony a real fairy-tale.",
    image: `${BASE_IMG}/weddings-5.jpg`,
  },
];

export default function WeddingsEventsPage() {
  return (
    <>
      <PageHero
        image={`${BASE_IMG}/weddings-2.jpg`}
        title="Weddings & Events"
        subtitle="Celebrate with us — making every moment unforgettable"
      />

      {/* Intro */}
      <section className="py-16 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-4">
            Celebrate With Us
          </p>
          <h2 className="text-3xl font-light tracking-widest uppercase text-black mb-4">
            Your Perfect Event
          </h2>
          <div className="w-12 h-px bg-[#00ffb8] mx-auto mb-6" />
          <p className="text-gray-500 text-sm leading-relaxed font-light">
            From intimate weddings to grand celebrations, Seacret Beach Club
            provides the perfect backdrop for your most cherished moments.
            Contact us to discuss your dream event.
          </p>
          <a
            href={RESERVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 border border-black text-black text-xs tracking-widest uppercase px-8 py-3 hover:bg-black hover:text-white transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Event sections grid */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {SECTIONS.map((section) => (
          <div key={section.title} className="group relative overflow-hidden">
            <div className="relative h-80">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-2">
                  {section.subtitle}
                </p>
                <h3 className="text-white text-2xl font-light tracking-widest uppercase">
                  {section.title}
                </h3>
              </div>
            </div>
            <div className="p-8 bg-white">
              <p className="text-gray-500 text-sm leading-relaxed font-light text-center max-w-sm mx-auto">
                {section.text}
              </p>
            </div>
          </div>
        ))}
      </section>

      <NewsletterForm />
    </>
  );
}
