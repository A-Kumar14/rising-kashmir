import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge rate-limit for state-changing API routes. In-memory map = single
 * instance only. Replace with Redis (Upstash, KV) before horizontal scaling
 * or moving to multi-region edge.
 */
type Bucket = { count: number; resetAt: number };
const WINDOW_MS = 60_000;
const MAX_REQ = 20;
const buckets = new Map<string, Bucket>();

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anon";
}

export function middleware(req: NextRequest) {
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
    return new NextResponse(
      JSON.stringify({ error: "rate_limited" }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": Math.ceil((bucket.resetAt - now) / 1000).toString(),
        },
      },
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
