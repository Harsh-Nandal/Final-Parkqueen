import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import PageHero from "@/components/sections/PageHero";
import Testimonials from "@/components/sections/Testimonials";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { getAboutContent } from "@/lib/content/getAboutContent";
import { getTestimonials } from "@/lib/content/getTestimonials";
import { getSettings } from "@/lib/content/getSettings";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const TAG_LINKS = {
  "Premium Accommodation": "/rooms",
  "Fine Dining": "/dining",
  "Luxury Banquet": "/banquets",
  "Family Friendly": "/facilities",
};

const EXPERIENCE_LINKS = {
  "Luxury Rooms": "/rooms",
  "Fine Dining": "/dining",
  "Banquet Hall": "/banquets",
  "Conference Hall": "/facilities",
  Celebrations: "/banquets",
};

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "About Us",
    description: `Learn the story behind ${settings.name} — Rohtak's premier luxury hotel.`,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const [content, testimonials, settings] = await Promise.all([
    getAboutContent(),
    getTestimonials("about"),
    getSettings(),
  ]);
  const { intro, ourStory, signatureExperiences, whyChoose, stats, amenitiesGrid, hospitalityFeatures, cta } = content;

  return (
    <>
      <BreadcrumbJsonLd siteUrl={settings.url} items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <PageHero title={
    <>
      About <br />
      Park Queen Hotel & Resort
    </>
  }subtitle="Est. Rohtak, Haryana" />

      <section className="py-27.5">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="relative aspect-4/5 overflow-hidden shadow-luxury">
            <Link href="/rooms" className="absolute inset-0 z-10" aria-label="Explore our rooms" />
            <Image
              src={intro.image}
              alt={intro.title}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <Reveal>
              <h2 className="mb-5 font-serif text-[clamp(26px,2.8vw,38px)] font-medium leading-[1.3] text-black">
                {intro.title}
              </h2>
            </Reveal>
            {intro.paragraphs.map((p, i) => (
              <Reveal key={p} delay={0.12 + i * 0.06}>
                <p className="mb-4 text-[15px] text-grey">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.36}>
              <div className="mt-4 flex flex-wrap gap-3">
                {intro.tags.map((tag) =>
                  TAG_LINKS[tag] ? (
                    <Link
                      key={tag}
                      href={TAG_LINKS[tag]}
                      className="border border-gold/50 px-4 py-2 font-body text-[10.5px] uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:border-gold hover:bg-gold/10"
                    >
                      {tag}
                    </Link>
                  ) : (
                    <span
                      key={tag}
                      className="border border-gold/50 px-4 py-2 font-body text-[10.5px] uppercase tracking-[0.2em] text-black"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-27.5">
        <Container>
          <SectionHeading
            eyebrow="Our Story"
            title={
              <>
                What Drives
                <br />
                The ParkQueen
              </>
            }
          />
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {ourStory.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="border border-line bg-navy-deep px-6.5 py-8">
                <h3 className="mb-3 font-display text-sm font-medium uppercase tracking-[0.2em] text-white">
                  {item.title}
                </h3>
                <p className="text-[13.5px] text-white">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-27.5">
        <Container>
          <SectionHeading
            eyebrow="Signature Experiences"
            title={
              <>
                Made For
                <br />
                Memorable Stays
              </>
            }
          />
          <div className="grid grid-cols-2 gap-4.5 lg:grid-cols-5">
            {signatureExperiences.map((exp, i) => (
              <Reveal
                key={exp.title}
                delay={(i % 5) * 0.08}
                className="group relative aspect-3/4 overflow-hidden shadow-luxury"
              >
                <Link href={EXPERIENCE_LINKS[exp.title] || "/rooms"} className="relative block h-full w-full">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-transparent to-transparent" />
                  <span className="absolute inset-x-0 bottom-4 text-center font-display text-[11px] uppercase tracking-[0.2em] text-ivory">
                    {exp.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-deep py-27.5 text-ivory">
        <div className="absolute inset-0 -z-10">
          <Image src={whyChoose.image} alt="Why choose The ParkQueen Hotel" fill sizes="100vw" className="object-cover opacity-20" />
        </div>
        <Container>
          <SectionHeading
            dark
            eyebrow="Why Choose Us"
            title={
              <>
                Why Choose
                <br />
                Park Queen
              </>
            }
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.items.map((item, i) => (
              <Reveal key={item} delay={(i % 4) * 0.08} className="flex items-center gap-3">
                <FiCheck className="h-4.5 w-4.5 flex-none text-gold" />
                <span className="font-body text-[14px] text-ivory/85">{item}</span>
              </Reveal>
            ))}
          </div>
          <div className="mt-11 text-center">
            <Button href="/facilities" variant="ghostLight">
              View All Facilities
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 border-y border-line py-11 sm:grid-cols-5">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="text-center">
                <b className="block font-display text-[28px] font-medium text-black">{stat.value}</b>
                <span className="mt-1 block font-body text-[11px] uppercase tracking-[0.2em] text-grey">
                  {stat.label}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-27.5">
        <Container>
          <SectionHeading
            eyebrow="Everything You Need"
            title={
              <>
                Hotel
                <br />
                Amenities
              </>
            }
          />
          <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
            {amenitiesGrid.map((item, i) => (
              <Reveal
                key={item}
                delay={(i % 6) * 0.06}
                className="bg-white px-5 py-7 text-center transition-colors duration-400 hover:bg-ivory"
              >
                <span className="font-body text-[11.5px] uppercase tracking-[0.16em] text-black">{item}</span>
              </Reveal>
            ))}
          </div>
          <div className="mt-11 text-center">
            <Button href="/facilities">View All Facilities</Button>
          </div>
        </Container>
      </section>

      <section className="py-27.5">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            {hospitalityFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.1}>
                <h3 className="mb-2 font-display text-sm font-medium uppercase tracking-[0.18em] text-black">
                  {feature.title}
                </h3>
                <p className="text-[13.5px] text-grey">{feature.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12} className="relative aspect-16/11 overflow-hidden shadow-luxury">
            <Link href="/contact" className="absolute inset-0 z-10" aria-label="Get in touch with our team" />
            <Image
              src="https://res.cloudinary.com/dvanvxd7t/image/upload/v1785143764/parkqueen/dining/queen-restaurant-03.jpg"
              alt="Meet our hospitality team"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </Container>
      </section>

      <Testimonials
        items={testimonials}
        eyebrow="Guest Voices"
        title={
          <>
            What Our
            <br />
            Guests Say
          </>
        }
      />

      <section className="relative isolate py-27.5 text-center text-ivory">
        <div className="absolute inset-0 -z-20">
          <Image src={cta.image} alt={cta.title} fill sizes="100vw" className="object-cover brightness-50" />
        </div>
        <div className="absolute inset-0 -z-10 bg-navy-deep/50" />
        <Container>
          <Reveal>
            <h2 className="mb-8 font-display text-[clamp(24px,3.2vw,40px)] font-medium uppercase tracking-[0.14em]">
              {cta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-wrap justify-center gap-4.5">
              <Button href="/booking" variant="solid">
                Book Now
              </Button>
              <Button href="/contact" variant="ghostLight">
                Contact Us
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
