import { notFound } from "next/navigation";
import { getDict } from "@/lib/dict";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { site, isMissing } from "@/content/site";
import { Container, Fact, PageHeader } from "@/components/ui";
import { ContactForm } from "@/components/Forms";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return pageMeta(lang, "/contact", t.contact.title, t.contact.lead);
}

export default async function Contact({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const c = t.contact;
  const rows = [
    {
      label: c.visit,
      value: (
        <>
          <Fact value={site.address.street} />
          <br />
          {site.address.city}, {site.address.region} <Fact value={site.address.zip} />
        </>
      ),
    },
    { label: c.write, value: isMissing(site.email) ? <Fact value={site.email} /> : <a href={`mailto:${site.email}`}>{site.email}</a> },
    { label: c.call, value: isMissing(site.phone) ? <Fact value={site.phone} /> : <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a> },
    { label: c.hours, value: <Fact value={site.officeHours} /> },
  ];

  return (
    <>
      <PageHeader title={c.title} lead={c.lead} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[2fr_3fr]">
        <dl className="flex flex-col gap-6">
          {rows.map((r) => (
            <div key={r.label}>
              <dt className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">{r.label}</dt>
              <dd className="mt-1 text-[17px] leading-[28px]">{r.value}</dd>
            </div>
          ))}
        </dl>
        <div className="rounded-lg border border-line bg-card p-6 sm:p-8">
          <ContactForm f={t.forms} />
        </div>
      </Container>
    </>
  );
}
