import Reveal from "@/components/ui/Reveal";

export default function SectionHeading({ eyebrow, title, description, dark = false }) {
  return (
    <div className="mb-16 grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-12">
      <Reveal>
        {eyebrow ? (
          <span className="mb-3 block font-body text-[11px] font-medium uppercase tracking-[0.42em] text-gold">
            {eyebrow}
          </span>
        ) : null}
        <h2
          className={`flex gap-5 font-display text-[clamp(26px,3vw,40px)] font-medium uppercase leading-[1.35] tracking-[0.14em] before:mt-[0.72em] before:h-px before:w-11 before:flex-none before:bg-gold ${
            dark ? "text-ivory" : "text-black"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p
            className={`max-w-[46ch] pt-2.5 text-[15.5px] ${
              dark ? "text-ivory/70" : "text-grey"
            }`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
