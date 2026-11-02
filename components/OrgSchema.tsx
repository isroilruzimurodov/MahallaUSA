import { site, isMissing } from "@/content/site";

/** schema.org NGO markup so search engines and AI assistants can describe MahallaUSA correctly. */
export default function OrgSchema() {
  const known = (v: string) => (isMissing(v) ? undefined : v);
  const data = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    alternateName: "MahallaUSA — Uzbek-American Association",
    url: site.url,
    logo: `${site.url}/logo.png`,
    slogan: "We Are Family · Biz Birgamiz",
    nonprofitStatus: "Nonprofit501c3",
    taxID: known(site.ein),
    foundingDate: known(site.foundedYear),
    email: known(site.email),
    telephone: known(site.phone),
    address: {
      "@type": "PostalAddress",
      streetAddress: known(site.address.street),
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: known(site.address.zip),
      addressCountry: "US",
    },
    sameAs: Object.values(site.social).filter((u) => u && !isMissing(u)),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
