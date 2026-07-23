import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "mediaserver.centris.ca",
      },
    ],
  },
  async redirects() {
    return [
      // Ancien site statique : /index.html → accueil
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      // Domaine canonique sans www : www.lauzonlauzon.ca → lauzonlauzon.ca
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.lauzonlauzon.ca" }],
        destination: "https://lauzonlauzon.ca/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
