import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import RoomGallery from "@/components/sections/RoomGallery";
import { getRooms, ROOM_POLICY } from "@/lib/content/getRooms";
import { getSettings } from "@/lib/content/getSettings";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "Rooms & Tariff",
    description: `Explore rooms and suites at ${settings.name}, Rohtak — tariff, amenities and photos for every room category.`,
    alternates: { canonical: "/rooms" },
  };
}

export default async function RoomsPage() {
  const [rooms, settings] = await Promise.all([getRooms(), getSettings()]);

  return (
    <>
      <BreadcrumbJsonLd siteUrl={settings.url} items={[{ name: "Home", path: "/" }, { name: "Rooms", path: "/rooms" }]} />
      <PageHero title="Rooms & Tariff" subtitle="Est. Rohtak, Haryana" />

      <section className="py-27.5">
        <Container>
          <SectionHeading
            eyebrow="Tariff"
            title={
              <>
                Room Tariff
                <br />
                &amp; Policies
              </>
            }
          />
          <Reveal className="overflow-x-auto border border-line">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="bg-navy text-ivory">
                  <th className="px-6 py-4 font-display text-[11px] font-medium uppercase tracking-[0.2em]">Room</th>
                  <th className="px-6 py-4 font-display text-[11px] font-medium uppercase tracking-[0.2em]">Count</th>
                  <th className="px-6 py-4 font-display text-[11px] font-medium uppercase tracking-[0.2em]">Single</th>
                  <th className="px-6 py-4 font-display text-[11px] font-medium uppercase tracking-[0.2em]">Double</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, i) => (
                  <tr key={room.slug} className={i % 2 === 0 ? "bg-white" : "bg-ivory"}>
                    <td className="px-6 py-4 font-serif text-[16px] text-black">
                      <Link href={`#${room.slug}`} className="hover:text-gold">
                        {room.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-grey">{room.count}</td>
                    <td className="px-6 py-4 text-[14px] text-black">₹{room.priceSingle.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-[14px] text-black">₹{room.priceDouble.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal delay={0.12} className="mt-6 max-w-[70ch] text-[13px] text-grey">
            <p className="mb-3">{ROOM_POLICY.validity}</p>
            <ul className="list-disc space-y-1.5 pl-5">
              {ROOM_POLICY.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {rooms.map((room, i) => (
        <section key={room.slug} id={room.slug} className={`scroll-mt-24 py-24 ${i % 2 === 1 ? "bg-ivory" : ""}`}>
          <Container>
            <SectionHeading
              eyebrow={room.count === 1 ? "Only One Available" : `${room.count} Rooms Available`}
              title={room.name}
              description={room.shortDescription}
            />

            {/* 1. Gallery */}
            <Reveal className="mb-16">
              <h3 className="mb-5 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-gold">Gallery</h3>
              <RoomGallery images={room.images} alt={room.name} />
            </Reveal>

            {/* 2. Overview */}
            <Reveal delay={0.1} className="mb-16 max-w-[70ch]">
              <h3 className="mb-3 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-gold">Overview</h3>
              <p className="text-[15px] text-grey">{room.longDescription}</p>
            </Reveal>

            {/* 3. Amenities */}
            <Reveal delay={0.18} className="mb-16">
              <h3 className="mb-5 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-gold">Amenities</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-4">
                {room.amenities.map((amenity) => (
                  <span key={amenity} className="flex items-center gap-2 text-[13px] text-black">
                    <span className="h-1 w-1 flex-none rounded-full bg-gold" aria-hidden="true" />
                    {amenity}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* 4. Book This Room */}
            <Reveal delay={0.26} className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
              <div>
                <h3 className="mb-3 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                  Pricing
                </h3>
                <div className="flex flex-wrap gap-x-8 gap-y-2 font-serif text-lg text-black">
                  <span>
                    ₹{room.priceSingle.toLocaleString("en-IN")}{" "}
                    <em className="font-body text-[10.5px] not-italic uppercase tracking-[0.2em] text-grey">single</em>
                  </span>
                  <span>
                    ₹{room.priceDouble.toLocaleString("en-IN")}{" "}
                    <em className="font-body text-[10.5px] not-italic uppercase tracking-[0.2em] text-grey">double</em>
                  </span>
                </div>
              </div>
              <Button href="/booking" variant="solid">
                Book This Room
              </Button>
            </Reveal>
          </Container>
        </section>
      ))}
    </>
  );
}
