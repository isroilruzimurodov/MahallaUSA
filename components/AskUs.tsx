import type { Dict } from "@/content/en";
import { site, isMissing } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";
import { Button, Fact } from "./ui";

export default function AskUs({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <aside className="rounded-lg border border-line bg-teal-soft p-6 sm:p-8">
      <h2 className="text-[20px] font-semibold leading-[26px]">{t.common.askUs}</h2>
      <p className="mt-2 text-muted">{t.common.askUsBody}</p>
      <p className="mt-3 text-[15px]">
        {isMissing(site.email) ? <Fact value={site.email} /> : <a href={`mailto:${site.email}`}>{site.email}</a>} · <Fact value={site.phone} />
      </p>
      <div className="mt-5">
        <Button href={href(lang, "/contact")}>{t.nav.contact}</Button>
      </div>
    </aside>
  );
}
