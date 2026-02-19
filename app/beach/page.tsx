import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BASE_IMG } from "@/lib/constants";

export const metadata = {
  title: "Beach | Seacret Beach Club",
};

const SECTIONS = [
  {
    title: "Perfect Oasis",
    text: "An oasis in the heart of Tsilivi bay at Zakynthos. There's nothing like that feeling of the sun on your skin and the sand under your feet. Spoil yourself with the ultimate luxurious experience of Seacret beach club.",
    image: `${BASE_IMG}/beach-2.jpg`,
    reverse: false,
  },
  {
    title: "Sun Therapy",
    text: "Sometimes the most productive thing to do is relax. Reinvigorate yourself by indulging in our extra-large sunbeds.",
    image: `${BASE_IMG}/beach-3.jpg`,
    reverse: true,
  },
  {
    title: "Massage",
    text: "Treat yourself in our beachfront massage-bed. Imagine a massage-bed on the tree lined beach under the shade of a gazebo with the sea breeze blowing to keep you cool.",
    image: `${BASE_IMG}/beach-4.jpg`,
    reverse: false,
  },
  {
    title: "Shisha",
    text: "Enjoy the shisha experience with us at the Seacret beach bar restaurant. Our shisha expert is here to recommend you the best blends from our complete Seacret Shisha menu.",
    image: `${BASE_IMG}/shisha.jpg`,
    reverse: true,
  },
];

export default function BeachPage() {
  return (
    <>
      <PageHero
        image={`${BASE_IMG}/beach-2.jpg`}
        title="Beach"
        subtitle="An oasis in the heart of Tsilivi bay at Zakynthos"
      />

      {/* Sections */}
      {SECTIONS.map((section, i) => (
        <section
          key={section.title}
          className={`flex flex-col ${
            section.reverse ? "md:flex-row-reverse" : "md:flex-row"
          } min-h-[400px]`}
        >
          <div className="relative w-full md:w-1/2 min-h-[300px]">
            <Image
              src={section.image}
              alt={section.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div
            className={`w-full md:w-1/2 flex items-center justify-center p-10 md:p-16 ${
              i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"
            }`}
          >
            <div className="max-w-md">
              <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-3">
                Beach
              </p>
              <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-black mb-4">
                {section.title}
              </h2>
              <div className="w-10 h-px bg-[#00ffb8] mb-6" />
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {section.text}
              </p>
            </div>
          </div>
        </section>
      ))}

      <NewsletterForm />
    </>
  );
}
