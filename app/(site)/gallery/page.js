import PageHero from "@/components/sections/PageHero";
import GalleryGrid from "@/components/sections/GalleryGrid";
import Container from "@/components/ui/Container";
import { getGalleryImages } from "@/lib/content/getGallery";
import { getSettings } from "@/lib/content/getSettings";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "Gallery",
    description: `Photo gallery of rooms, dining, banquets and the exterior of ${settings.name}, Rohtak.`,
    alternates: { canonical: "/gallery" },
  };
}

export default async function GalleryPage() {
  const [{ images }, settings] = await Promise.all([getGalleryImages(), getSettings()]);

  return (
    <>
      <BreadcrumbJsonLd siteUrl={settings.url} items={[{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]} />
      <PageHero title="Gallery" subtitle="Est. Rohtak, Haryana" />
      <section className="py-24">
        <Container>
          <GalleryGrid images={images} />
        </Container>
      </section>
    </>
  );
}
