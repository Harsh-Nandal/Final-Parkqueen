import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { FOOTER_QUICK_LINKS } from "@/lib/data/site";

const SOCIAL_ICONS = {
  Facebook: FaFacebook,
  Twitter: FaXTwitter,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
};

export default function Footer({ settings }) {
  return (
    <footer className="bg-navy-deep pt-22.5 text-ivory/72">
      <div className="mx-auto w-[92%] max-w-[1240px]">
        <div className="grid grid-cols-1 gap-13.5 border-b border-line-light pb-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="relative block h-16.5 w-50">
              <Image
                src="https://res.cloudinary.com/dvanvxd7t/image/upload/v1783583266/parkqueen/logo.png"
                alt={settings.name}
                fill
                sizes="200px"
                className="object-contain object-left"
              />
            </Link>
            <p className="mt-5 max-w-[34ch] text-[13.5px]">
              Subscribe for the latest offers, celebrations and seasonal escapes from{" "}
              {settings.name}, {settings.city.split(",")[0]}.
            </p>
            <form className="mt-6.5 flex border border-gold/50">
              <input
                type="email"
                suppressHydrationWarning
                placeholder="Enter your email address"
                aria-label="Email address"
                className="flex-1 bg-transparent px-4.5 py-3.5 font-body text-[13px] tracking-[0.06em] text-ivory placeholder:text-ivory/40 outline-none"
              />
              <button
                type="submit"
                suppressHydrationWarning
                className="bg-gold px-6 font-body text-[10px] font-medium uppercase tracking-[0.3em] text-black"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-6.5 flex gap-4">
              {settings.socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center border border-gold/40 text-ivory/80 transition-colors duration-300 hover:border-gold hover:text-gold-soft"
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : social.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-display text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Quick Links
            </h4>
            <ul className="space-y-3.25">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13.5px] hover:text-gold-soft">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-display text-xs font-medium uppercase tracking-[0.3em] text-gold">
              For Bookings
            </h4>
            <ul className="space-y-3.25">
              {settings.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone}`} className="text-[13.5px] hover:text-gold-soft">
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${settings.email}`} className="text-[13.5px] hover:text-gold-soft">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-display text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Visit Us
            </h4>
            <ul className="space-y-3.25 text-[13.5px]">
              {settings.addressLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-6.5 text-xs tracking-[0.06em] text-ivory/45">
          <span>© {new Date().getFullYear()} {settings.name}. All rights reserved.</span>
          <div className="flex gap-5">
            {settings.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-soft"
              >
                {social.label}
              </a>
            ))}
            <Link href="/privacy-policy" className="hover:text-gold-soft">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-soft">
              Terms
            </Link>
            <Link href="/cancellation-policy" className="hover:text-gold-soft">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
