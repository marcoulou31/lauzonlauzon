import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // mssql/tedious ne doivent pas être bundlés : le driver s'appuie sur l'égalité
  // référentielle des types (===). Bundler créerait deux copies du module et
  // casserait le bulk insert (« c.type.generateTypeInfo is not a function »).
  serverExternalPackages: ["mssql", "tedious"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 60, 70, 75],
    remotePatterns: [
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
