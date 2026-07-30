import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ROOMS } from "@/lib/data/rooms";

export default function Rooms({ items = ROOMS }) {
  return (
    <section id="rooms" className="bg-ivory py-27.5">
      <Container>
        <SectionHeading
          eyebrow="Accommodation"
          title={
            <>
              Explore
              <br />
              Our Rooms
            </>
          }
          description="Forty-plus rooms across four thoughtfully designed categories — appointed with modern furnishings, elegant decorations and rich fabrics that make every stay perfect."
        />

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((room, i) => (
            <Reveal key={room.slug} delay={i * 0.1} as="article" className="relative">
              <Link href={`/rooms/${room.slug}`} className="block">
                <div className="relative aspect-[4/4.6] overflow-hidden shadow-luxury">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out hover:scale-[1.06]"
                  />
                </div>
                <div className="relative -mt-14.5 w-[calc(100%-32px)] bg-white px-5.5 pb-5.5 pt-6 shadow-[0_18px_44px_-20px_rgba(7,20,38,0.28)]">
                  <h3 className="font-display text-[15px] font-medium uppercase tracking-[0.18em] text-black">
                    {room.name}
                  </h3>
                  <p className="mt-2 mb-3.5 text-[13px] text-grey">{room.shortDescription}</p>
                  <div className="font-serif text-lg text-black">
                    ₹ {room.priceSingle.toLocaleString("en-IN")}{" "}
                    <em className="font-body text-[10.5px] font-normal not-italic uppercase tracking-[0.2em] text-grey">
                      onwards
                    </em>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-2.5 font-body text-[11px] font-medium uppercase tracking-[0.34em] text-black after:text-gold after:transition-transform after:duration-300 after:content-['→'] hover:after:translate-x-1.5">
                    View Details
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
