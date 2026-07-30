"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { DINING_TEASER } from "@/lib/data/dining";
import { ensureMinSlides } from "@/lib/utils/ensureMinSlides";

export default function Dining({ content = DINING_TEASER }) {
  const images = ensureMinSlides(content.images);
  return (
    <section id="dining" className="py-27.5">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="relative aspect-16/11 overflow-hidden shadow-luxury">
          <Link href="/dining" className="absolute inset-0 z-10" aria-label="Discover dining at The ParkQueen Hotel" />
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            speed={1000}
            className="h-full w-full"
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative h-full w-full">
                  <Image src={src} alt="Signature dining at The ParkQueen Hotel" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <span className="pointer-events-none absolute bottom-5.5 left-5.5 z-10 bg-white px-5.5 py-3.5 font-display text-xs tracking-[0.26em] text-black">
            QUEEN RESTAURANT
          </span>
        </Reveal>
        <div>
          <Reveal>
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.42em] text-gold">
              A World of Flavours Awaits You
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h3 className="mt-4 mb-4.5 font-serif text-[clamp(26px,2.6vw,36px)] font-medium leading-[1.3] text-black">
              {content.title}
            </h3>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mb-4 text-[15px] text-grey">{content.description}</p>
          </Reveal>
          <Reveal delay={0.36}>
            <Button href="/dining" className="mt-3.5">
              Discover Dining
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
