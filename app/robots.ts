import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Search engines and AI assistants are welcome: the newcomer guides should be findable.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }], sitemap: `${site.url}/sitemap.xml` };
}
