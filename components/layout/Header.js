import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/data/site";
import MobileNav from "@/components/layout/MobileNav";

export default function Header({ settings }) {
  return (
    <header className="sticky top-0 z-100 border-b border-line-light bg-navy-deep/90 backdrop-blur-md">
      <div className="hidden bg-navy-deep text-[12px] tracking-[0.08em] text-ivory/78 md:block">
        <div className="mx-auto flex h-[38px] w-[92%] max-w-[1240px] items-center justify-between">
          <div className="flex gap-6.5">
            {settings.phones.map((phone) => (
              <a key={phone} href={`tel:${phone}`} className="hover:text-gold-soft">
                ✆ {phone}
              </a>
            ))}
          </div>
          <div className="flex gap-4.5">
            <a href={`mailto:${settings.email}`} className="hover:text-gold-soft">
              ✉ {settings.email}
            </a>
            <span>{settings.city}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[78px] w-[92%] max-w-[1240px] items-center justify-between">
        <Link href="/" className="relative block h-18 w-82">
          <Image
            src="https://res.cloudinary.com/dvanvxd7t/image/upload/v1783583266/parkqueen/logo.png"
            alt={settings.name}
            fill
            sizes="208px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden gap-8.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1.5 font-body text-[11.5px] uppercase tracking-[0.26em] text-ivory/82 hover:text-ivory"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px w-0 bg-gold transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5.5">
          <Link
            href="/booking"
            className="hidden bg-gold px-6.5 py-3.25 font-body text-[10.5px] font-medium uppercase tracking-[0.3em] text-black transition-colors duration-300 hover:bg-gold-soft lg:inline-block"
          >
            Book a Stay
          </Link>
          <MobileNav navLinks={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
