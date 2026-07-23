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
      // Ancien site statique : /index.html → accueil (récupère les liens Bing).
      // La canonicalisation www ↔ non-www est gérée au niveau de Vercel/Netlify,
      // PAS ici, sinon boucle de redirection (ERR_TOO_MANY_REDIRECTS).
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
