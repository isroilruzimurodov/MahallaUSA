"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export default function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(en|uz)(?=\/|$)/, "");
  return (
    <div role="group" aria-label={label} className="inline-flex w-fit overflow-hidden rounded-full border border-line-strong text-[13px] font-semibold leading-4">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`px-3.5 py-3.5 no-underline ${l === lang ? "bg-ink text-white hover:text-white" : "text-ink hover:bg-quiet hover:text-ink"}`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
