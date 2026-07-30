import Hero from "@/components/sections/Hero";
import InfoBar from "@/components/sections/InfoBar";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import About from "@/components/sections/About";
import Rooms from "@/components/sections/Rooms";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Dining from "@/components/sections/Dining";
import Events from "@/components/sections/Events";
import Amenities from "@/components/sections/Amenities";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import LocationMap from "@/components/sections/LocationMap";
import { getSettings } from "@/lib/content/getSettings";
import { getHeroSlides } from "@/lib/content/getHeroSlides";
import { getHomepageContent } from "@/lib/content/getHomepageContent";
import { getRooms } from "@/lib/content/getRooms";
import { getBanquetTeasers } from "@/lib/content/getBanquetTeasers";
import { getAmenities } from "@/lib/content/getAmenities";
import { getTestimonials } from "@/lib/content/getTestimonials";
import { getOffers } from "@/lib/content/getOffers";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "Home",
    description: settings.seoDescription,
    alternates: { canonical: "/" },
  };
}

export default async function Home() {
  const [settings, heroSlides, homepageContent, rooms, banquetTeasers, amenities, testimonials, offers] =
    await Promise.all([
      getSettings(),
      getHeroSlides(),
      getHomepageContent(),
      getRooms(),
      getBanquetTeasers(),
      getAmenities(),
      getTestimonials("home"),
      getOffers(),
    ]);

  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: settings.name,
    description: settings.description,
    url: settings.url,
    image: "https://res.cloudinary.com/dvanvxd7t/image/upload/v1783583257/parkqueen/hero.png",
    telephone: settings.phones[0],
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.addressLines[0],
      addressLocality: "Rohtak",
      addressRegion: "Haryana",
      postalCode: "124001",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
      />
      <Hero slides={heroSlides} content={homepageContent.hero} />
      <InfoBar addressLines={settings.addressLines} phone={settings.phones[0]} email={settings.email} />
      <MarqueeStrip />
      <About content={homepageContent.about} />
      <WhyChooseUs items={homepageContent.whyChooseUs} />
      <Rooms items={rooms} />
      <Dining content={homepageContent.dining} />
      <Events items={banquetTeasers} />
      <Amenities items={amenities} />
      <Testimonials items={testimonials} />
      <InstagramFeed />
      <LocationMap addressLines={settings.addressLines} mapEmbedUrl={settings.mapEmbedUrl} />
    </>
  );
}
