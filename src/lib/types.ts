export type PropertyType = "condo" | "maison" | "commercial" | "terrain";

export type PropertyStatus = "à vendre" | "à louer" | "vendu";

export type PropertyImage = {
  src: string;
  alt: string;
};

export type Property = {
  slug: string;
  title: string;
  address: string;
  city: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  areaSqft?: number;
  taxes?: number;
  description: string;
  longDescription: string;
  features: string[];
  images: PropertyImage[];
  featured: boolean;
};

export type NavLink = {
  href: string;
  label: string;
};
