import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/lib/content/getSettings";

export default async function SiteLayout({ children }) {
  const settings = await getSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
