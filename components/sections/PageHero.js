import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function PageHero({ title, subtitle, image = "https://res.cloudinary.com/dvanvxd7t/image/upload/v1783583270/parkqueen/home/subhero.png" }) {
  return (
    <section className="relative isolate grid min-h-85 place-items-center text-center text-ivory">
      <div className="absolute inset-0 -z-20">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.55]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-navy-deep/45" />
      <div className="w-[92%] max-w-[1240px]">
        <Reveal>
          <h1 className="font-display text-[clamp(28px,4vw,48px)] font-medium uppercase tracking-[0.14em]">
            {title}
          </h1>
        </Reveal>
        {subtitle ? (
          <Reveal delay={0.12}>
            <p className="mt-4 font-body text-[13px] uppercase tracking-[0.34em] text-gold">
              {subtitle}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
