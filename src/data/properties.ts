import type { Property } from "@/lib/types";

export const properties: Property[] = [];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getAllPropertySlugs(): string[] {
  return properties.map((p) => p.slug);
}
