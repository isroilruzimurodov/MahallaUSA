import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "./lib/i18n";

// Send "/" and any un-prefixed path to a language. Uzbek speakers get /uz.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const locale = accept.startsWith("uz") || accept.includes(",uz") ? "uz" : defaultLocale;
  const url = request.nextUrl.clone();
  // The home page is served in place (no redirect) so search engines can read and verify it.
  if (pathname === "/") {
    url.pathname = `/${locale}`;
    return NextResponse.rewrite(url);
  }
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|admin|_next|favicon|logo|icon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
