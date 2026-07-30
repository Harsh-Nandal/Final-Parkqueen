"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiStar } from "react-icons/fi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { TESTIMONIALS_HOME } from "@/lib/data/testimonials";
import { ensureMinSlides } from "@/lib/utils/ensureMinSlides";

export default function Testimonials({
  items = TESTIMONIALS_HOME,
  eyebrow = "Guest Voices",
  title = (
    <>
      What Our
      <br />
      Guests Say
    </>
  ),
}) {
  const slides = ensureMinSlides(items, 8);
  return (
    <section className="bg-navy-deep py-27.5 text-ivory">
      <Container>
        <SectionHeading dark eyebrow={eyebrow} title={title} />
        <Reveal delay={0.12}>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            className="testimonial-swiper pb-14"
          >
            {slides.map((t, i) => (
              <SwiperSlide key={`${t.author}-${i}`}>
                <div className="h-full border border-line-light px-9 py-10">
                  <div className="mb-5 flex gap-1 text-gold">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FiStar key={i} className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="font-serif text-lg italic leading-relaxed text-ivory/90">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-6 font-body text-[11px] uppercase tracking-[0.24em] text-gold-soft">
                    {t.author} — {t.location}
                    {t.note ? ` · ${t.note}` : ""}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </Container>
    </section>
  );
}
