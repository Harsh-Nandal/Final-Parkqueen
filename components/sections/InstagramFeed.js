import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { FiInstagram } from "react-icons/fi";
import { INSTAGRAM_POSTS } from "@/lib/data/instagram";

export default function InstagramFeed() {
  return (
    <section className="bg-ivory py-27.5">
      <Container>
        <Reveal className="mb-11 flex flex-col items-center gap-2.5 text-center">
          <span className="flex items-center gap-2.5 font-body text-[11px] font-medium uppercase tracking-[0.42em] text-gold">
            <FiInstagram className="h-4 w-4" /> Follow Along
          </span>
          <a
            href="https://www.instagram.com/parkqueenhotel_rohtak/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-[clamp(22px,2.6vw,32px)] font-medium uppercase tracking-[0.14em] text-black hover:text-gold"
          >
            @parkqueenhotel_rohtak
          </a>
        </Reveal>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {INSTAGRAM_POSTS.map((post, i) => (
            <Reveal key={post.imageUrl} delay={(i % 6) * 0.06}>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden"
              >
                <Image
                  src={post.imageUrl}
                  alt={post.caption}
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/0 p-3 text-center opacity-0 transition-all duration-400 group-hover:bg-navy-deep/55 group-hover:opacity-100">
                  <span className="font-body text-[11px] uppercase tracking-[0.12em] text-ivory">
                    {post.caption}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
