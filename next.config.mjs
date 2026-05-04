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
  "img-src 'self' data: https://risingkashmir.com https://www.risingkashmir.com",
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
    // `domains` still enforced by some Next 14 code paths; keep in sync with CSP / remotePatterns.
    domains: ["risingkashmir.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "risingkashmir.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.risingkashmir.com",
        pathname: "/**",
      },
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
      {
        source: "/en/e-paper",
        destination: "https://epaper.risingkashmir.com",
        permanent: false,
      },
      {
        source: "/ur/e-paper",
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
