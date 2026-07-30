import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_TEASER } from "@/lib/data/homepage";

export default function About({ content = ABOUT_TEASER }) {
  return (
    <section className="py-27.5">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative aspect-4/5 overflow-hidden shadow-luxury">
          <Link href="/about" className="absolute inset-0 z-10" aria-label="Read more about The ParkQueen Hotel" />
          <Image
            src={content.image}
            alt="The ParkQueen Hotel facade"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div>
          <Reveal>
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.42em] text-gold">
              Welcome
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="mt-4 mb-5 font-serif text-[clamp(26px,2.8vw,38px)] font-medium leading-[1.3] text-black">
              {content.title}
            </h2>
          </Reveal>
          {content.paragraphs.map((p, i) => (
            <Reveal key={p} delay={0.24 + i * 0.06}>
              <p className="mb-4 text-[15px] text-grey">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.36}>
            <div className="mt-2 flex items-center gap-6">
              <span className="h-px w-14 bg-gold" aria-hidden="true" />
              <Button href="/about">Read More</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
