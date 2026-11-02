"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import LangSwitch from "./LangSwitch";

export default function MobileMenu({
  items,
  labels,
  lang,
}: {
  items: { href: string; label: string }[];
  labels: { menu: string; close: string; language: string };
  lang: Locale;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.menu}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line-strong text-ink"
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b border-line bg-card">
          <nav aria-label={labels.menu} className="mx-auto flex max-w-page flex-col px-4 py-2 sm:px-8">
            {items.map((i) => (
              <Link key={i.href} href={i.href} className="border-b border-line py-3.5 text-[17px] font-medium text-ink no-underline last:border-0">
                {i.label}
              </Link>
            ))}
          </nav>
          <div className="mx-auto max-w-page px-4 pb-4 sm:hidden">
            <LangSwitch lang={lang} label={labels.language} />
          </div>
        </div>
      )}
    </div>
  );
}
