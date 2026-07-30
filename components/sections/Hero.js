"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { HERO_SLIDES, HERO_CONTENT } from "@/lib/data/homepage";
import { ensureMinSlides } from "@/lib/utils/ensureMinSlides";

export default function Hero({ slides = HERO_SLIDES, content = HERO_CONTENT }) {
  const SLIDES = ensureMinSlides(slides);
  return (
    <section className="relative isolate grid min-h-[600px] place-items-end text-ivory">
      <div className="absolute inset-0 -z-20">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          loop
          speed={1200}
          className="h-full w-full"
        >
          {SLIDES.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full min-h-[600px] w-full">
                <Image
                  src={src}
                  alt="The ParkQueen Hotel facade"
                  fill
                  priority={src === SLIDES[0]}
                  sizes="100vw"
                  className="object-cover brightness-[0.62] saturate-[0.92]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/55 via-navy-deep/10 via-40% to-navy-deep/78" />

      <div className="w-[92%] max-w-[1240px] pb-16.5 text-center mx-auto">
        <Reveal>
          <p className="mb-5 font-body text-[13px] uppercase tracking-[0.44em] text-gold">
            Welcome To
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="font-display text-[clamp(34px,5.4vw,68px)] font-medium uppercase leading-[1.18] tracking-[0.12em] text-gold-soft">
            {content.heroTitle}
          </h1>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mx-auto mt-6.5 max-w-[52ch] font-serif text-[clamp(19px,2.2vw,26px)] italic text-ivory/90">
            {content.heroSubtitle}
          </p>
          <p className="mt-3 font-body text-[13px] uppercase tracking-[0.34em] text-ivory/70">
            {content.heroTagline}
          </p>
        </Reveal>
        <Reveal delay={0.36}>
          <div className="mt-11 flex flex-wrap justify-center gap-4.5">
            <Button href="/booking" variant="solid">
              Book Your Stay
            </Button>
            <Button href="/rooms" variant="ghostLight">
              Explore Our Rooms
            </Button>
          </div>
        </Reveal>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 h-13.5 w-px -translate-x-1/2 animate-pulse bg-gradient-to-b from-gold to-transparent"
      />
    </section>
  );
}
