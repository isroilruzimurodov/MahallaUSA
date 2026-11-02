import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/content/en";
import { site, isMissing } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";
import { Fact, TwinRule } from "./ui";

export default function Footer({ lang, t }: { lang: Locale; t: Dict }) {
  const social = Object.entries(site.social).filter(([, url]) => url);
  const orgLinks = [
    { href: "/about", label: t.nav.about },
    { href: "/programs", label: t.nav.programs },
    { href: "/events", label: t.nav.events },
    { href: "/news", label: t.nav.news },
    { href: "/sponsors", label: t.nav.sponsors },
    { href: "/contact", label: t.nav.contact },
  ];
  const legalLinks = (["privacy", "donor-privacy", "accessibility", "terms"] as const).map((k) => ({
    href: `/legal/${k}`,
    label: t.legal.pages[k].title,
  }));

  return (
    <footer className="border-t border-line bg-card">
      <TwinRule />
      <div className="mx-auto grid max-w-page gap-10 px-4 py-12 sm:px-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Image src="/logo.png" alt="MahallaUSA — We Are Family, Biz Birgamiz" width={1069} height={225} className="h-12 w-auto self-start" />
          <address className="not-italic text-[14px] leading-5 text-muted">
            <Fact value={site.address.street} />, {site.address.city}, {site.address.region} <Fact value={site.address.zip} />
            <br />
            {isMissing(site.email) ? <Fact value={site.email} /> : <a href={`mailto:${site.email}`}>{site.email}</a>} · <Fact value={site.phone} />
          </address>
          <p className="text-[14px] leading-5 text-muted">
            {t.footer.nonprofit} · EIN <Fact value={site.ein} />
          </p>
        </div>
        <nav aria-label={t.footer.org} className="flex flex-col gap-2 text-[15px]">
          <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">{t.footer.org}</h2>
          {orgLinks.map((l) => (
            <Link key={l.href} href={href(lang, l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <nav aria-label={t.footer.legal} className="flex flex-col gap-2 text-[15px]">
          <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">{t.footer.legal}</h2>
          {legalLinks.map((l) => (
            <Link key={l.href} href={href(lang, l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-[15px]">
          <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">{t.footer.follow}</h2>
          {social.map(([name, url]) =>
            isMissing(url) ? (
              <span key={name} className="capitalize">
                <Fact value={url} />
              </span>
            ) : (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="capitalize">
                {name}
              </a>
            ),
          )}
        </div>
      </div>
      <p className="border-t border-line px-4 py-4 text-center text-[14px] text-muted">
        © {new Date().getFullYear()} {site.legalName}. {t.footer.rights} · {t.footer.tagline}
      </p>
    </footer>
  );
}
