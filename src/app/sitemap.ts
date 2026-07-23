import type { MetadataRoute } from "next";
import { getAllPropertySlugs } from "@/data/properties";
import { getAllInscriptionsForPage } from "@/lib/inscriptions";

const BASE_URL = "https://lauzonlauzon.ca";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/proprietes`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/proprietes-vendues`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/calculette`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Propriétés statiques (data/properties.ts)
  const staticProperties: MetadataRoute.Sitemap = getAllPropertySlugs().map((slug) => ({
    url: `${BASE_URL}/proprietes/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Inscriptions Centris (base de données) — dégrade gracieusement si la BD est indisponible.
  const inscriptions = await getAllInscriptionsForPage();
  const inscriptionProperties: MetadataRoute.Sitemap = inscriptions.map((property) => ({
    url: `${BASE_URL}/proprietes/${property.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...staticProperties, ...inscriptionProperties];
}
