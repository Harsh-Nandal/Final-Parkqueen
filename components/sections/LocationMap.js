import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CONTACT } from "@/lib/data/site";

export default function LocationMap({ addressLines = CONTACT.addressLines, mapEmbedUrl = CONTACT.mapEmbedUrl }) {
  return (
    <section className="bg-ivory py-27.5">
      <Container>
        <SectionHeading
          eyebrow="Find Us"
          title={
            <>
              Our
              <br />
              Location
            </>
          }
          description={`${addressLines.join(", ")} — easy to find, easy to reach.`}
        />
        <Reveal className="aspect-16/7 w-full overflow-hidden border border-line shadow-luxury">
          <iframe
            title="The ParkQueen Hotel location"
            src={mapEmbedUrl}
            className="h-full w-full grayscale-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </Container>
    </section>
  );
}
