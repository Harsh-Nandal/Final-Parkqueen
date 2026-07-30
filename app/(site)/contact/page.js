import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import FaqAccordion from "@/components/sections/FaqAccordion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { getSettings } from "@/lib/content/getSettings";
import { getFaqs } from "@/lib/content/getFaqs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "Contact Us",
    description: `Get in touch with ${settings.name}, Rohtak — phone, email, address and enquiry form.`,
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  const [settings, faqs] = await Promise.all([getSettings(), getFaqs()]);
  const addressOneLine = `${settings.addressLines.join(", ")}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd siteUrl={settings.url} items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHero title="Contact Us" subtitle="Est. Rohtak, Haryana" />

      <section className="py-24">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <Reveal className="flex gap-4">
              <FiMapPin className="mt-1 h-5 w-5 flex-none text-gold" />
              <div>
                <h3 className="mb-1.5 font-display text-[13px] font-medium uppercase tracking-[0.2em] text-black">
                  Location
                </h3>
                <p className="text-[14px] text-grey">{addressOneLine}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="flex gap-4">
              <FiMail className="mt-1 h-5 w-5 flex-none text-gold" />
              <div>
                <h3 className="mb-1.5 font-display text-[13px] font-medium uppercase tracking-[0.2em] text-black">
                  Email
                </h3>
                <a href={`mailto:${settings.email}`} className="text-[14px] text-grey hover:text-black">
                  {settings.email}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.16} className="flex gap-4">
              <FiPhone className="mt-1 h-5 w-5 flex-none text-gold" />
              <div>
                <h3 className="mb-1.5 font-display text-[13px] font-medium uppercase tracking-[0.2em] text-black">
                  Rooms &amp; Calling
                </h3>
                <ul className="space-y-1">
                  {settings.roomPhones.map((phone) => (
                    <li key={phone}>
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-[14px] text-grey hover:text-black">
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.24} className="flex gap-4">
              <FiPhone className="mt-1 h-5 w-5 flex-none text-gold" />
              <div>
                <h3 className="mb-1.5 font-display text-[13px] font-medium uppercase tracking-[0.2em] text-black">
                  Restaurants &amp; Bar
                </h3>
                <ul className="space-y-1">
                  {settings.diningPhones.map((phone) => (
                    <li key={phone}>
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-[14px] text-grey hover:text-black">
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-24">
        <Container>
          <Reveal className="aspect-16/7 w-full overflow-hidden border border-line shadow-luxury">
            <iframe
              title="The ParkQueen Hotel location"
              src={settings.mapEmbedUrl}
              className="h-full w-full grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-24">
        <Container className="mx-auto max-w-[820px]">
          <SectionHeading
            eyebrow="Good to Know"
            title={
              <>
                Frequently Asked
                <br />
                Questions
              </>
            }
          />
          <FaqAccordion items={faqs} />
        </Container>
      </section>
    </>
  );
}
