import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/ui/MotionProvider";
import { getSettings } from "@/lib/content/getSettings";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export async function generateMetadata() {
  const settings = await getSettings();
  const title = settings.seoTitle || `${settings.name} — Rohtak's Pride, Haryana's Finest`;

  return {
    metadataBase: new URL(settings.url),
    title: { default: title, template: `%s — ${settings.name}` },
    description: settings.seoDescription,
    openGraph: {
      title,
      description: settings.seoDescription,
      url: settings.url,
      siteName: settings.name,
      images: [{ url: settings.seoImage, width: 1600, height: 900 }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: settings.seoDescription,
      images: [settings.seoImage],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
