import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

type Bucket = { count: number; resetAt: number };
const WINDOW_MS = 60_000;
const MAX_REQ = 20;
const buckets = new Map<string, Bucket>();

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anon";
}

function bareSegmentSkip(segment: string): boolean {
  return (
    segment === "api" ||
    segment === "_next" ||
    segment === "favicon.ico" ||
    segment === "robots.txt" ||
    segment === "sitemap.xml" ||
    segment === "feed.xml"
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/")) {
    if (req.method === "GET" || req.method === "HEAD") {
      return NextResponse.next();
    }
    const key = clientKey(req);
    const now = Date.now();
    const bucket = buckets.get(key);
    if (!bucket || now > bucket.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
      return NextResponse.next();
    }
    bucket.count += 1;
    if (bucket.count > MAX_REQ) {
      return new NextResponse(JSON.stringify({ error: "rate_limited" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": Math.ceil((bucket.resetAt - now) / 1000).toString(),
        },
      });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && bareSegmentSkip(first)) {
    return NextResponse.next();
  }

  if (first && isLocale(first)) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-locale", first);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const url = req.nextUrl.clone();
  const rest = pathname === "/" ? "" : pathname;
  url.pathname = `/${defaultLocale as Locale}${rest}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
