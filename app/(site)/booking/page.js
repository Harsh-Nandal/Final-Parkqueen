import PageHero from "@/components/sections/PageHero";
import BookingForm from "@/components/sections/BookingForm";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getSettings } from "@/lib/content/getSettings";
import { getRooms } from "@/lib/content/getRooms";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "Book Your Stay",
    description: `Send a booking enquiry to ${settings.name}, Rohtak — check-in, check-out, guests and room type.`,
    alternates: { canonical: "/booking" },
  };
}

export default async function BookingPage() {
  const [settings, rooms] = await Promise.all([getSettings(), getRooms()]);

  return (
    <>
      <BreadcrumbJsonLd siteUrl={settings.url} items={[{ name: "Home", path: "/" }, { name: "Book Your Stay", path: "/booking" }]} />
      <PageHero title="Book Your Stay" subtitle={settings.tagline} />

      <section className="py-24">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <BookingForm rooms={rooms} />
          </Reveal>
          <Reveal delay={0.1} className="border border-line bg-ivory px-7 py-9">
            <h3 className="mb-4 font-display text-[13px] font-medium uppercase tracking-[0.2em] text-black">
              Prefer to Call?
            </h3>
            <p className="mb-5 text-[14px] text-grey">
              Our reservations team is available to help you plan your stay directly.
            </p>
            <ul className="space-y-2">
              {settings.roomPhones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="font-serif text-lg text-black hover:text-gold">
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] text-grey">
              Check-in: {settings.checkIn} · Check-out: {settings.checkOut}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
