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
    localPatterns: [
      {
        pathname: "/**",
        search: "",
      },
      {
        pathname: "/accueil/revenus/immeuble-commercial-avenue-cartier.jpg",
        search: "?v=3",
      },
    ],
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
      // Ancien site : fiches de propriétés via passerelle Centris
      // (passerelle.centris.ca/redirect.aspx?NoMLS=…) qui pointait vers
      // /fiche-proprietes.html?noMLS=9956039. On récupère ces liens vers la
      // nouvelle route /proprietes/<noMLS>. On couvre les deux casses de clé.
      {
        source: "/fiche-proprietes.html",
        has: [{ type: "query", key: "noMLS", value: "(?<noMLS>\\d+)" }],
        destination: "/proprietes/:noMLS",
        permanent: true,
      },
      {
        source: "/fiche-proprietes.html",
        has: [{ type: "query", key: "NoMLS", value: "(?<noMLS>\\d+)" }],
        destination: "/proprietes/:noMLS",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
