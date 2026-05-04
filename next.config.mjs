/** @type {import('next').NextConfig} */

// Content-Security-Policy. Tighten / extend per environment via env vars when
// real ad/analytics scripts are added. `unsafe-inline` on style is required
// today by Next's runtime style injection; revisit when migrating to nonce-based
// CSP. Image hosts must be kept in sync with `images.remotePatterns` below.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: https://images.unsplash.com https://picsum.photos",
  "font-src 'self' data: https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      // TODO: add real CDN domain once provisioned (per MIGRATION.md).
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/e-paper",
        destination: "https://epaper.risingkashmir.com",
        permanent: false,
      },
      // TODO: legacy slug → new path redirects from MIGRATION.md.
      // Append entries here once the redirect map ships, or move to Edge
      // middleware if the table grows beyond a few hundred rules.
    ];
  },
};

export default nextConfig;
