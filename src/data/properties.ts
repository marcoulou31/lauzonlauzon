import type { Property } from "@/lib/types";

export const properties: Property[] = [
  {
    slug: "condo-avenue-moncton",
    title: "Condo lumineux avec vue sur le fleuve",
    address: "1180, avenue Moncton, app. 404",
    city: "Québec (La Cité-Limoilou)",
    price: 425000,
    type: "condo",
    status: "à vendre",
    bedrooms: 2,
    bathrooms: 1,
    areaSqft: 980,
    taxes: 3200,
    description:
      "Superbe condo au cœur du Vieux-Québec, offrant une luminosité exceptionnelle et une vue imprenable sur le fleuve Saint-Laurent.",
    longDescription:
      "Ce condo de charme allie confort moderne et emplacement privilégié. Planchers de bois franc, cuisine rénovée avec comptoirs en quartz, et balcon privé orienté sud. À proximité des commerces, restaurants et du Vieux-Port. Stationnement intérieur et rangement inclus. Idéal pour professionnel ou couple recherchant le style de vie urbain québécois.",
    features: [
      "Vue sur le fleuve",
      "Planchers de bois franc",
      "Cuisine rénovée",
      "Stationnement intérieur",
      "Balcon privé",
      "Ascenseur",
      "Interphone",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        alt: "Salon lumineux du condo avenue Moncton",
      },
      {
        src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
        alt: "Cuisine moderne du condo",
      },
      {
        src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
        alt: "Chambre principale du condo",
      },
    ],
    featured: true,
  },
  {
    slug: "terrain-lac-saint-joseph",
    title: "Terrain boisé avec accès au lac",
    address: "Chemin du Lac",
    city: "Lac Saint-Joseph",
    price: 189000,
    type: "terrain",
    status: "à vendre",
    areaSqft: 43560,
    taxes: 1850,
    description:
      "Magnifique terrain boisé de plus d'un acre avec accès direct au lac Saint-Joseph. Cadre naturel exceptionnel pour votre projet de résidence secondaire.",
    longDescription:
      "Profitez de la tranquillité des Laurentides québécoises avec ce terrain boisé offrant intimité et accès au lac. Possibilité de construire la maison de vos rêves dans un environnement préservé. Services municipaux à proximité. Un havre de paix à seulement 30 minutes de Québec.",
    features: [
      "Accès au lac",
      "Terrain boisé",
      "Plus d'un acre",
      "Intimité garantie",
      "Cadre naturel",
      "Possibilité de chalet",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
        alt: "Forêt entourant le terrain au Lac Saint-Joseph",
      },
      {
        src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=80",
        alt: "Vue lac et nature",
      },
      {
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
        alt: "Paysage naturel du secteur",
      },
    ],
    featured: true,
  },
  {
    slug: "immeuble-commercial-sainte-foy",
    title: "Immeuble commercial à revenus",
    address: "2850, boulevard Laurier, local 120",
    city: "Québec (Sainte-Foy)",
    price: 875000,
    type: "commercial",
    status: "à vendre",
    areaSqft: 4200,
    taxes: 12400,
    description:
      "Immeuble commercial stratégiquement situé sur le boulevard Laurier, avec locataires établis et revenus stables. Excellent potentiel d'investissement.",
    longDescription:
      "Cet immeuble commercial de 4 200 pi² bénéficie d'un emplacement de choix sur l'un des axes commerciaux les plus achalandés de Sainte-Foy. Trois locaux commerciaux actuellement loués, stationnement abondant et visibilité exceptionnelle. Idéal pour investisseur recherchant des revenus passifs ou propriétaire-occupant.",
    features: [
      "3 locaux commerciaux",
      "Revenus stables",
      "Stationnement abondant",
      "Visibilité sur boulevard Laurier",
      "Toiture récente",
      "Systèmes mécaniques rénovés",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
        alt: "Façade de l'immeuble commercial",
      },
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
        alt: "Espace commercial intérieur",
      },
      {
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
        alt: "Bureaux et locaux commerciaux",
      },
    ],
    featured: true,
  },
];

export function getAllProperties(): Property[] {
  return properties;
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getAllPropertySlugs(): string[] {
  return properties.map((p) => p.slug);
}
