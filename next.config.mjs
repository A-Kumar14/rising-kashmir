/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/e-paper",
        destination: "https://epaper.risingkashmir.com",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
