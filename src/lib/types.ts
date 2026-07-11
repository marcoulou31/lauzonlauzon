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

export type InscriptionPhoto = {
  src: string;
  srcLarge: string;
  piece: string | null;
  rang: number;
};

export type InscriptionPiece = {
  description: string;
  dimensions: string | null;
  etage: string | null;
  plancher: string | null;
};

export type InscriptionCaracteristique = {
  typeCode: string;
  typeDesc: string;
  sousTypeDesc: string;
  nombre: number | null;
};

export type InscriptionCourtier = {
  prenom: string;
  nom: string;
  titre: string;
  telephone: string;
  courriel: string;
  photoUrl: string | null;
};

export type InscriptionDetail = {
  noInscription: string;
  adresse: string;
  adresseMaps: string;
  prix: number | null;
  prixLocation: number | null;
  genreProprieteDescr: string;
  nbChambres: number | null;
  nbSallesBains: number | null;
  nbSallesEau: number | null;
  nbEtages: number | null;
  nbPieces: number | null;
  anneeConstruction: number | null;
  anneeCertLocalisation: number | null;
  cadastre: string | null;

  // Évaluation
  anneeEvaluation: number | null;
  evalBatiment: number | null;
  evalTerrain: number | null;
  evalTotal: number | null;

  // Taxes & dépenses annuelles
  taxesMunicipale: number | null;
  taxesScolaire: number | null;
  taxesTotal: number | null;
  energie: number | null;
  fraisCommuns: number | null;
  fraisCopropriete: number | null;
  depensesAutres: number | null;
  depensesTotal: number | null;

  // Dimensions bâtiment
  facadeBatiment: number | null;
  profondeurBatiment: number | null;
  irregulierBatiment: string | null;
  umDimensionBatiment: string | null;
  aireSol: number | null;
  umAireSol: string | null;
  aireHabitable: number | null;
  umAireHabitable: string | null;

  // Dimensions terrain
  facadeTerrain: number | null;
  profondeurTerrain: number | null;
  irregulierTerrain: string | null;
  umDimensionTerrain: string | null;
  superficieTerrain: number | null;
  umSuperficieTerrain: string | null;

  // Textes
  descriptionGenerale: string | null;
  declarationVendeur: string | null;
  inclusFrancais: string | null;
  exclusFrancais: string | null;
  addenda: string | null;

  // Caractéristiques spéciales
  garage: string | null;
  abri: string | null;

  // Courtier
  courtier: InscriptionCourtier | null;
  photoUrl: string | null;

  // Relations
  photos: InscriptionPhoto[];
  pieces: InscriptionPiece[];
  caracteristiques: InscriptionCaracteristique[];
};
