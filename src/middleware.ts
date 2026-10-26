import { NextResponse, type NextRequest } from "next/server";

const DEFAULT = "es";
const PREFIXED = ["ca"];

/**
 * Español sin prefijo (/casas), catalán con prefijo (/ca/casas).
 * Internamente todas las rutas viven bajo /[lang].
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === DEFAULT) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT.length + 1) || "/";
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  const headers = new Headers(request.headers);

  if (PREFIXED.includes(first)) {
    headers.set("x-locale", first);
    return NextResponse.next({ request: { headers } });
  }

  headers.set("x-locale", DEFAULT);
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next|.*opengraph-image|.*\\..*).*)"],
};
