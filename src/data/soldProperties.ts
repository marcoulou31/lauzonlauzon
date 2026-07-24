export type SoldCategory = "bord-de-leau" | "residences" | "immeubles";

export type SoldPhoto = {
  /** Chemin de l'image (ex. /proprietes-vendues/xxx.jpg) ou URL. */
  src: string;
  /** Catégorie de regroupement dans la mosaïque. */
  category: SoldCategory;
  /** Texte alternatif pour l'accessibilité. */
  alt: string;
  /** Courte description sommaire affichée sous la photo et dans la visionneuse. */
  caption: string;
};

/** Catégories affichées, dans l'ordre, sur la page des propriétés vendues. */
export const soldCategories: { id: SoldCategory; title: string }[] = [
  { id: "bord-de-leau", title: "Propriétés au bord de l'eau" },
  { id: "residences", title: "Résidences & maisons" },
  { id: "immeubles", title: "Condos, tours & immeubles" },
];

/**
 * Photos des propriétés vendues (fichiers dans public/proprietes-vendues/).
 */
export const soldPhotos: SoldPhoto[] = [
  {
    src: "/proprietes-vendues/lac-saint-joseph-residence-hiver.jpg",
    category: "bord-de-leau",
    alt: "Résidence au bord du lac Saint-Joseph en hiver",
    caption: "Résidence au bord du lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/lac-saint-joseph-riveraine.jpg",
    category: "bord-de-leau",
    alt: "Propriété riveraine au lac Saint-Joseph",
    caption: "Propriété riveraine — Lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/lac-saint-joseph-vue-aerienne.jpg",
    category: "bord-de-leau",
    alt: "Vue aérienne d'une propriété sur le lac Saint-Joseph",
    caption: "Vue aérienne — Lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/saint-augustin-residence-01.jpg",
    category: "bord-de-leau",
    alt: "Résidence à Saint-Augustin-de-Desmaures",
    caption: "Résidence — Saint-Augustin-de-Desmaures",
  },
  {
    src: "/proprietes-vendues/saint-augustin-residence-02.jpg",
    category: "residences",
    alt: "Extérieur d'une propriété à Saint-Augustin-de-Desmaures",
    caption: "Propriété — Saint-Augustin-de-Desmaures",
  },
  {
    src: "/proprietes-vendues/grande-residence-familiale.jpg",
    category: "residences",
    alt: "Grande résidence familiale",
    caption: "Grande résidence familiale",
  },
  {
    src: "/proprietes-vendues/acces-lac-quai.jpg",
    category: "bord-de-leau",
    alt: "Accès au lac et quai privé",
    caption: "Accès au lac et quai privé",
  },
  {
    src: "/proprietes-vendues/residence-contemporaine.jpg",
    category: "residences",
    alt: "Résidence contemporaine de prestige",
    caption: "Résidence contemporaine de prestige",
  },
  {
    src: "/proprietes-vendues/lac-saint-joseph-coucher-soleil.jpg",
    category: "bord-de-leau",
    alt: "Coucher de soleil sur le lac Saint-Joseph",
    caption: "Coucher de soleil sur le lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/chalet-bord-eau.jpg",
    category: "bord-de-leau",
    alt: "Chalet en bois au bord de l'eau",
    caption: "Chalet chaleureux au bord de l'eau",
  },
  {
    src: "/proprietes-vendues/propriete-nature.jpg",
    category: "residences",
    alt: "Propriété nichée dans la nature",
    caption: "Propriété nichée dans la nature",
  },
  {
    src: "/proprietes-vendues/maison-campagne.jpg",
    category: "bord-de-leau",
    alt: "Maison de campagne rénovée",
    caption: "Maison de campagne rénovée",
  },
  {
    src: "/proprietes-vendues/terrain-paysager.jpg",
    category: "bord-de-leau",
    alt: "Terrain paysager au bord de l'eau",
    caption: "Terrain paysager au bord de l'eau",
  },
  {
    src: "/proprietes-vendues/plage-privee-quai.jpg",
    category: "bord-de-leau",
    alt: "Plage privée et quai",
    caption: "Plage privée et quai",
  },
  {
    src: "/proprietes-vendues/residence-vue-montagnes.jpg",
    category: "residences",
    alt: "Résidence avec vue sur les montagnes",
    caption: "Résidence avec vue sur les montagnes",
  },
  {
    src: "/proprietes-vendues/amenagement-foyer.jpg",
    category: "bord-de-leau",
    alt: "Aménagement extérieur avec foyer",
    caption: "Aménagement extérieur avec foyer",
  },
  {
    src: "/proprietes-vendues/cottage-champetre.jpg",
    category: "residences",
    alt: "Cottage au charme champêtre",
    caption: "Cottage au charme champêtre",
  },
  {
    src: "/proprietes-vendues/propriete-riveraine-quai.jpg",
    category: "bord-de-leau",
    alt: "Propriété riveraine avec quai",
    caption: "Propriété riveraine avec quai",
  },
  {
    src: "/proprietes-vendues/thomas-maher-lac-saint-joseph-residence.jpg",
    category: "bord-de-leau",
    alt: "Résidence riveraine sur Thomas-Maher au lac Saint-Joseph",
    caption: "Résidence riveraine — Thomas-Maher, lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/thomas-maher-lac-saint-joseph-aerien.jpg",
    category: "bord-de-leau",
    alt: "Vue aérienne d'une propriété sur Thomas-Maher au lac Saint-Joseph",
    caption: "Vue aérienne — Thomas-Maher, lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/condo-saint-jean-quebec.jpg",
    category: "immeubles",
    alt: "Immeuble à condos contemporain rue Saint-Jean à Québec",
    caption: "Condo contemporain — rue Saint-Jean, Québec",
  },
  {
    src: "/proprietes-vendues/tour-residentielle.jpg",
    category: "immeubles",
    alt: "Tour résidentielle entourée d'arbres matures",
    caption: "Tour résidentielle",
  },
  {
    src: "/proprietes-vendues/residence-pierre-terrain.jpg",
    category: "residences",
    alt: "Résidence en pierre avec grand terrain paysager",
    caption: "Résidence en pierre avec grand terrain",
  },
  {
    src: "/proprietes-vendues/lac-saint-joseph-residence-briques.jpg",
    category: "bord-de-leau",
    alt: "Résidence riveraine en briques au lac Saint-Joseph",
    caption: "Résidence riveraine — Lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/cite-verte-place-publique.jpg",
    category: "immeubles",
    alt: "Place publique du projet Cité Verte à Québec",
    caption: "Cité Verte — place publique, Québec",
  },
  {
    src: "/proprietes-vendues/immeuble-commercial-quebec.jpg",
    category: "immeubles",
    alt: "Immeuble commercial à Québec",
    caption: "Immeuble commercial — Québec",
  },
  {
    src: "/proprietes-vendues/immeuble-multifamilial-quebec.jpg",
    category: "immeubles",
    alt: "Immeuble multifamilial à Québec",
    caption: "Immeuble multifamilial — Québec",
  },
  {
    src: "/proprietes-vendues/residence-sillery.jpg",
    category: "residences",
    alt: "Résidence à Sillery",
    caption: "Résidence — Sillery",
  },
  {
    src: "/proprietes-vendues/vieux-quebec-residence.jpg",
    category: "residences",
    alt: "Résidence dans le Vieux-Québec",
    caption: "Résidence — Vieux-Québec",
  },
  {
    src: "/proprietes-vendues/condo-prestige-quebec.jpg",
    category: "immeubles",
    alt: "Condo de prestige à Québec",
    caption: "Condo de prestige — Québec",
  },
  {
    src: "/proprietes-vendues/jardins-merici-bloc-20.jpg",
    category: "immeubles",
    alt: "Bloc 20 des Jardins Mérici à Québec",
    caption: "Jardins Mérici — Bloc 20, Québec",
  },
  {
    src: "/proprietes-vendues/vieux-quebec-granit.jpg",
    category: "immeubles",
    alt: "Immeuble en granit dans le Vieux-Québec",
    caption: "Immeuble en granit — Vieux-Québec",
  },
  {
    src: "/proprietes-vendues/tour-residentielle-01.jpg",
    category: "immeubles",
    alt: "Tour résidentielle avec entrée couverte à Québec",
    caption: "Tour résidentielle — Québec",
  },
  {
    src: "/proprietes-vendues/tour-residentielle-02.jpg",
    category: "immeubles",
    alt: "Entrée couverte d'une tour résidentielle à Québec",
    caption: "Tour résidentielle — entrée",
  },
  {
    src: "/proprietes-vendues/chalet-foret-bouleaux.jpg",
    category: "residences",
    alt: "Chalet en bois dans une forêt de bouleaux",
    caption: "Chalet en forêt",
  },
];

export function getSoldPhotos(): SoldPhoto[] {
  return soldPhotos;
}

export type SoldPhotoGroup = { id: SoldCategory; title: string; photos: SoldPhoto[] };

/** Regroupe les photos par catégorie, dans l'ordre défini par soldCategories. */
export function getSoldPhotosByCategory(): SoldPhotoGroup[] {
  return soldCategories
    .map((c) => ({ ...c, photos: soldPhotos.filter((p) => p.category === c.id) }))
    .filter((g) => g.photos.length > 0);
}
