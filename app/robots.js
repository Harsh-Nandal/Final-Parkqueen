import { getSettings } from "@/lib/content/getSettings";

export default async function robots() {
  const settings = await getSettings();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${settings.url}/sitemap.xml`,
  };
}
