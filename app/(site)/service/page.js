import PageHero from "@/components/sections/PageHero";
import Amenities from "@/components/sections/Amenities";
import Offers from "@/components/sections/Offers";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getAmenities } from "@/lib/content/getAmenities";
import { getOffers } from "@/lib/content/getOffers";
import { getIcon } from "@/lib/iconMap";
import { getSettings } from "@/lib/content/getSettings";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const STATS = [
  { value: "4k+", label: "Rooms Served" },
  { value: "200+", label: "Facilities" },
  { value: "2k", label: "Clients" },
  { value: "150+", label: "Staff" },
];

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "Services",
    description: `Guest services and hotel amenities at ${settings.name}, Rohtak.`,
    alternates: { canonical: "/service" },
  };
}

export default async function ServicePage() {
  const [amenities, offers, settings] = await Promise.all([getAmenities(), getOffers(), getSettings()]);
  const highlights = amenities.slice(0, 6);

  return (
    <>
      <BreadcrumbJsonLd siteUrl={settings.url} items={[{ name: "Home", path: "/" }, { name: "Services", path: "/service" }]} />
      <PageHero title="Services" subtitle="Est. Rohtak, Haryana" image="https://res.cloudinary.com/dvanvxd7t/image/upload/v1783583259/parkqueen/home/nds-5001.jpg" />

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-2 gap-7 sm:grid-cols-3 lg:grid-cols-6">
            {highlights.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <Reveal
                  key={item.label}
                  delay={(i % 6) * 0.08}
                  className="flex flex-col items-center gap-3 border border-line px-4 py-8 text-center"
                >
                  <Icon className="h-7 w-7 text-gold" />
                  <span className="font-body text-[11px] uppercase tracking-[0.16em] text-black">{item.label}</span>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <Amenities items={amenities} />

      <section className="relative isolate overflow-hidden py-20 text-ivory">
        <div className="absolute inset-0 -z-10 bg-navy-deep" />
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="text-center">
                <b className="block font-display text-[30px] font-medium text-gold-soft">{stat.value}</b>
                <span className="mt-1 block font-body text-[11px] uppercase tracking-[0.2em] text-ivory/70">
                  {stat.label}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Offers items={offers} />
    </>
  );
}
