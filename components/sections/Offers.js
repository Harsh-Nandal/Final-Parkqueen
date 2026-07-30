import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { OFFERS } from "@/lib/data/offers";

export default function Offers({ items = OFFERS }) {
  return (
    <section className="bg-ivory py-27.5">
      <Container>
        <SectionHeading
          eyebrow="Special Packages"
          title={
            <>
              Offers &amp;
              <br />
              Experiences
            </>
          }
          description="Seasonal packages and curated experiences designed to make your stay at The ParkQueen Hotel even more memorable."
        />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((offer, i) => (
            <Reveal key={offer.title} delay={(i % 5) * 0.08} as="article" className="group relative overflow-hidden shadow-luxury">
              <Link href="/booking" className="block">
                <div className="relative aspect-3/4">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-[13px] font-medium uppercase tracking-[0.2em] text-ivory">
                    {offer.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] text-ivory/75">{offer.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
