import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { href, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { site, isMissing } from "@/content/site";
import { Container, Fact, H2, PageHeader } from "@/components/ui";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return pageMeta(lang, "/donate", t.nav.donate, t.donate.lead);
}

export default async function Donate({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const d = t.donate;
  const linkFor = { sponsors: "/sponsors", involved: "/get-involved", contact: "/contact" } as Record<string, string>;

  return (
    <>
      <PageHeader title={d.title} lead={d.lead} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[3fr_2fr]">
        {/* The form comes first on phones: it is why people are here */}
        <section aria-labelledby="give" className="order-1 rounded-lg border border-line bg-card p-6 sm:p-8">
          <h2 id="give" className="text-[26px] font-semibold leading-8">
            {d.formTitle}
          </h2>
          {isMissing(site.donateFormUrl) ? (
            <div className="mt-6 rounded-md border border-dashed border-line-strong bg-paper p-6 text-muted">
              <p>{d.formMissing}</p>
              <p className="mt-2 text-[14px]">
                <Fact value={site.donateFormUrl} />
              </p>
            </div>
          ) : (
            // Zeffy's embeddable form. Swap the URL in site.ts to change provider.
            <iframe
              title={d.formTitle}
              src={site.donateFormUrl}
              className="mt-6 h-[900px] w-full rounded-md border-0"
              allow="payment"
              loading="lazy"
            />
          )}
          <p className="mt-4 flex items-start gap-2 text-[14px] leading-5 text-muted">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {d.secure}
          </p>
          <p className="mt-2 text-[14px] leading-5 text-muted">
            {t.home.taxNote} EIN <Fact value={site.ein} />
          </p>
        </section>

        <div className="order-2 flex flex-col gap-8">
          <section>
            <h2 className="text-[20px] font-semibold leading-[26px]">{d.monthlyTitle}</h2>
            <p className="mt-2 text-muted">{d.monthlyBody}</p>
          </section>
          <section>
            <h2 className="text-[20px] font-semibold leading-[26px]">{d.impactTitle}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {d.impact.map((i) => (
                <li key={i} className="rounded-md bg-red-soft px-4 py-3">
                  <Fact value={i} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>

      <section className="border-t border-line bg-card">
        <Container className="py-16">
          <H2>{d.otherTitle}</H2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {d.other.map((o) => (
              <Link
                key={o.title}
                href={href(lang, linkFor[o.link])}
                className="flex flex-col gap-2 rounded-lg border border-line bg-paper p-6 text-ink no-underline hover:border-teal hover:text-ink"
              >
                <h3 className="text-[20px] font-semibold leading-[26px]">{o.title}</h3>
                <p className="text-muted">{o.body}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
