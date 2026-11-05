import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { htmlLang, isLocale, locales } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrgSchema from "@/components/OrgSchema";
import AnnouncementBar from "@/components/AnnouncementBar";

export const revalidate = 60;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s · MahallaUSA` },
    description: t.meta.description,
    openGraph: { siteName: "MahallaUSA", type: "website", locale: lang === "uz" ? "uz_UZ" : "en_US", images: ["/logo.png"] },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={htmlLang[lang]}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-3 focus:font-semibold">
          {t.nav.skip}
        </a>
        <AnnouncementBar lang={lang} />
        <Header lang={lang} t={t} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
        <OrgSchema />
      </body>
    </html>
  );
}
