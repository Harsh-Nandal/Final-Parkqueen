import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { getIcon } from "@/lib/iconMap";
import { getEventSpaces } from "@/lib/content/getEventSpaces";
import { getSettings } from "@/lib/content/getSettings";
import { BANQUETS_INTRO } from "@/lib/data/banquets";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "Banquets & Conference",
    description: `Banquet halls, conference facilities and event spaces at ${settings.name}, Rohtak.`,
    alternates: { canonical: "/banquets" },
  };
}

export default async function BanquetsPage() {
  const [eventSpaces, settings] = await Promise.all([getEventSpaces(), getSettings()]);

  return (
    <>
      <BreadcrumbJsonLd siteUrl={settings.url} items={[{ name: "Home", path: "/" }, { name: "Banquets", path: "/banquets" }]} />
      <PageHero title="Banquets & Conference" subtitle="Est. Rohtak, Haryana" image="https://res.cloudinary.com/dvanvxd7t/image/upload/v1783583230/parkqueen/dining/conferencehall.png" />

      <section className="py-24">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative aspect-16/11 overflow-hidden shadow-luxury">
            <Image src={BANQUETS_INTRO.image} alt={BANQUETS_INTRO.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
          <div>
            <Reveal>
              <h2 className="mb-4.5 font-serif text-[clamp(24px,2.6vw,34px)] font-medium leading-[1.3] text-black">
                {BANQUETS_INTRO.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mb-6 text-[15px] text-grey">{BANQUETS_INTRO.description}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                {BANQUETS_INTRO.categories.map((cat) => (
                  <span key={cat} className="border border-gold/50 px-4 py-2 font-body text-[10.5px] uppercase tracking-[0.18em] text-black">
                    {cat}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-24">
        <Container>
          <SectionHeading
            eyebrow="Event Spaces"
            title={
              <>
                Spaces For Every
                <br />
                Occasion
              </>
            }
          />
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
            {eventSpaces.map((space, i) => {
              const Icon = getIcon(space.icon);
              return (
                <Reveal key={space.slug} delay={i * 0.12} className="border border-line bg-white px-7 py-9">
                  <Icon className="h-9 w-9 text-gold" />
                  <h3 className="mt-5 mb-1.5 font-display text-base font-medium uppercase tracking-[0.16em] text-black">
                    {space.name}
                  </h3>
                  <p className="mb-4 font-body text-[11px] uppercase tracking-[0.2em] text-gold">
                    Capacity: {space.capacity}
                  </p>
                  <p className="mb-5 text-[13.5px] text-grey">{space.description}</p>
                  <ul className="space-y-2">
                    {space.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-[13px] text-black">
                        <span className="h-1 w-1 flex-none rounded-full bg-gold" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative isolate py-24 text-center text-ivory">
        <div className="absolute inset-0 -z-20">
          <Image src="https://res.cloudinary.com/dvanvxd7t/image/upload/v1783583237/parkqueen/events/nds-5266.jpg" alt="Banquet hall at The ParkQueen Hotel" fill sizes="100vw" className="object-cover brightness-50" />
        </div>
        <div className="absolute inset-0 -z-10 bg-navy-deep/55" />
        <Container>
          <Reveal>
            <h2 className="mb-8 font-display text-[clamp(24px,3.2vw,40px)] font-medium uppercase tracking-[0.14em]">
              Let Us Make Your Event Extraordinary
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-wrap justify-center gap-4.5">
              <Button href="/contact" variant="solid">
                Get In Touch
              </Button>
              <Button href={`tel:${settings.phones[0].replace(/\s+/g, "")}`} variant="ghostLight">
                {settings.phones[0]}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
