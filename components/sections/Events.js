import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { BANQUET_TEASERS } from "@/lib/data/events";

export default function Events({ items = BANQUET_TEASERS }) {
  return (
    <section id="events" className="bg-ivory py-27.5">
      <Container>
        <SectionHeading
          eyebrow="Celebrations"
          title={
            <>
              Banquets and
              <br />
              Events
            </>
          }
          description="ParkQueen elevates every occasion into an awe-inspiring, immersive experience to cherish forever — the ideal place amid the bustling entertainment hub of Rohtak."
        />
        <div className="grid grid-cols-1 gap-8.5 md:grid-cols-2">
          {items.map((event, i) => (
            <Reveal key={event.slug} delay={i * 0.12} as="article">
              <Link href={event.href} className="block">
                <div className="relative aspect-[16/10] overflow-hidden shadow-luxury">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out hover:scale-[1.06]"
                  />
                </div>
                <div className="relative -mt-10 w-[calc(100%-40px)] bg-white px-6.5 py-5.5 shadow-[0_18px_44px_-20px_rgba(7,20,38,0.25)]">
                  <h3 className="font-display text-sm font-medium uppercase tracking-[0.2em] text-black">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-grey">{event.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
