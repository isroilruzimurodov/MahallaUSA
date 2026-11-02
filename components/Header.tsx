import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/content/en";
import { href, type Locale } from "@/lib/i18n";
import LangSwitch from "./LangSwitch";
import MobileMenu from "./MobileMenu";

export function navItems(lang: Locale, t: Dict) {
  return [
    { href: href(lang, "/about"), label: t.nav.about },
    { href: href(lang, "/programs"), label: t.nav.programs },
    { href: href(lang, "/events"), label: t.nav.events },
    { href: href(lang, "/resources"), label: t.nav.resources },
    { href: href(lang, "/get-involved"), label: t.nav.involved },
    { href: href(lang, "/sponsors"), label: t.nav.sponsors },
  ];
}

export default function Header({ lang, t }: { lang: Locale; t: Dict }) {
  const items = navItems(lang, t);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card">
      <div className="mx-auto flex max-w-page items-center gap-4 px-4 py-2 sm:px-8 lg:gap-8">
        <Link href={href(lang)} className="block shrink-0" aria-label="MahallaUSA — home">
          <Image src="/logo.png" alt="MahallaUSA — We Are Family, Biz Birgamiz" width={1069} height={225} priority className="h-10 w-auto sm:h-[52px]" />
        </Link>
        <nav aria-label={t.nav.menu} className="hidden flex-1 flex-wrap gap-x-6 text-[15px] font-medium lg:flex">
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="py-3 text-ink no-underline hover:text-teal">
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:block">
            <LangSwitch lang={lang} label={t.nav.language} />
          </div>
          <Link
            href={href(lang, "/donate")}
            className="inline-flex min-h-[44px] items-center rounded-md bg-red px-5 text-[15px] font-semibold text-white no-underline hover:bg-red-strong hover:text-white"
          >
            {t.nav.donate}
          </Link>
          <MobileMenu items={items} labels={{ menu: t.nav.menu, close: t.nav.close, language: t.nav.language }} lang={lang} />
        </div>
      </div>
    </header>
  );
}
