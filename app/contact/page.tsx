import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { MapPin, Phone, Mail } from "lucide-react";
import { BASE_IMG, CONTACT_INFO } from "@/lib/constants";

export const metadata = {
  title: "Contact | Seacret Beach Club",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={`${BASE_IMG}/seacret-12.jpg`}
        title="Contact Us"
        subtitle="Feel free to contact us — we would love to hear from you"
      />

      <section className="py-20 px-6 bg-[#181818]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <div>
                <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-4">
                  Get in Touch
                </p>
                <h2 className="text-2xl font-light tracking-widest uppercase text-white mb-2">
                  Contact Info
                </h2>
                <div className="w-10 h-px bg-[#00ffb8] mt-3" />
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00ffb8] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/80 text-sm font-light">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#00ffb8] flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-white/80 text-sm font-light hover:text-[#00ffb8] transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#00ffb8] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  {CONTACT_INFO.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-white/80 text-sm font-light hover:text-[#00ffb8] transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <p className="text-[#00ffb8] text-xs tracking-[0.3em] uppercase mb-4">
                Message
              </p>
              <h2 className="text-2xl font-light tracking-widest uppercase text-white mb-2">
                Drop Us a Line
              </h2>
              <div className="w-10 h-px bg-[#00ffb8] mt-3 mb-8" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps embed */}
      <div className="w-full h-80 bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.8!2d27.8617!3d37.8028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x149d14e2e1d11ad1%3A0x3b2f9c02f9c03a35!2sTsilivi%2C%20Zakynthos!5e0!3m2!1sen!2sgr!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Seacret Beach Club Location"
        />
      </div>

      <NewsletterForm />
    </>
  );
}
