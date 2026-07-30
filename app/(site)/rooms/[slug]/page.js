import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import RoomDetailGallery from "@/components/sections/RoomDetailGallery";
import { getRooms, getRoomBySlug } from "@/lib/content/getRooms";
import { getSettings } from "@/lib/content/getSettings";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export async function generateStaticParams() {
  const rooms = await getRooms();
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) return {};

  const settings = await getSettings();
  return {
    title: room.name,
    description: room.longDescription,
    alternates: { canonical: `/rooms/${room.slug}` },
    openGraph: {
      title: `${room.name} — ${settings.name}`,
      description: room.longDescription,
      images: [{ url: room.images[0] }],
    },
  };
}

export default async function RoomDetailPage({ params }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) notFound();

  const settings = await getSettings();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: room.name,
    description: room.longDescription,
    image: room.images.map((src) => (/^https?:\/\//.test(src) ? src : `${settings.url}${src}`)),
    brand: { "@type": "Brand", name: settings.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: room.priceSingle,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <BreadcrumbJsonLd
        siteUrl={settings.url}
        items={[
          { name: "Home", path: "/" },
          { name: "Rooms", path: "/rooms" },
          { name: room.name, path: `/rooms/${room.slug}` },
        ]}
      />
      <PageHero title={room.name} subtitle="Rooms & Tariff" image={room.images[0]} />

      <section className="py-27.5">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <RoomDetailGallery images={room.images} alt={room.name} />
          </Reveal>
          <div>
            <Reveal>
              <span className="font-body text-[11px] font-medium uppercase tracking-[0.42em] text-gold">
                {room.count === 1 ? "Only One Available" : `${room.count} Rooms Available`}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 mb-4.5 font-serif text-[clamp(24px,2.6vw,34px)] font-medium leading-[1.3] text-black">
                {room.name}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mb-5 text-[15px] text-grey">{room.longDescription}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mb-6 flex flex-wrap gap-x-8 gap-y-2 font-serif text-lg text-black">
                <span>
                  ₹{room.priceSingle.toLocaleString("en-IN")}{" "}
                  <em className="font-body text-[10.5px] not-italic uppercase tracking-[0.2em] text-grey">single</em>
                </span>
                <span>
                  ₹{room.priceDouble.toLocaleString("en-IN")}{" "}
                  <em className="font-body text-[10.5px] not-italic uppercase tracking-[0.2em] text-grey">double</em>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-2.5">
                {room.amenities.map((amenity) => (
                  <span key={amenity} className="flex items-center gap-2 text-[13px] text-black">
                    <span className="h-1 w-1 flex-none rounded-full bg-gold" aria-hidden="true" />
                    {amenity}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.36}>
              <Button href="/booking" variant="solid">
                Book This Room
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
