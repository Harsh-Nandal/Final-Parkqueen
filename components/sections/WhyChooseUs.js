import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { WHY_CHOOSE_US } from "@/lib/data/homepage";
import { getIcon } from "@/lib/iconMap";

export default function WhyChooseUs({ items = WHY_CHOOSE_US }) {
  return (
    <section className="bg-navy-deep py-27.5 text-ivory">
      <Container>
        <SectionHeading
          dark
          eyebrow="The Difference"
          title={
            <>
              Why Choose
              <br />
              The ParkQueen
            </>
          }
          description="Refinement and creativity intertwine with dreamlike comfort — heartfelt services round the clock, ensuring all your needs are met in an instant."
        />
        <div className="grid grid-cols-1 gap-px border border-line-light bg-line-light sm:grid-cols-2 lg:grid-cols-4">
          {items.map((reason, i) => {
            const Icon = getIcon(reason.icon);
            return (
              <Reveal
                key={reason.title}
                delay={i * 0.12}
                className="bg-navy-deep px-8.5 py-12 transition-colors duration-500 hover:bg-[#0D2344]"
              >
                <Icon className="h-8 w-8 text-gold" />
                <h3 className="mt-5 mb-3 font-display text-sm font-medium uppercase tracking-[0.22em] text-gold-soft">
                  {reason.title}
                </h3>
                <p className="mb-4 text-[13.5px] text-ivory/66">{reason.text}</p>
                <Link
                  href={reason.href}
                  className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ivory/80 hover:text-gold-soft"
                >
                  Learn More →
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
