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
  { id: "residences", title: "Unifamiliales" },
  { id: "immeubles", title: "Condos & édifices commerciaux" },
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
    src: "/proprietes-vendues/saint-augustin-terrain-riverain.jpg",
    category: "bord-de-leau",
    alt: "Résidence à Saint-Augustin-de-Desmaures",
    caption: "Résidence — Saint-Augustin-de-Desmaures",
  },
  {
    src: "/proprietes-vendues/saint-augustin-residence-bois.jpg",
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
    src: "/proprietes-vendues/residence-pierre-terrain.jpg",
    category: "residences",
    alt: "Résidence en pierre avec grand terrain paysager",
    caption: "Résidence en pierre avec grand terrain",
  },
  {
    src: "/proprietes-vendues/cottage-garage-double.jpg",
    category: "residences",
    alt: "Cottage avec garage double et entrée pavée",
    caption: "Cottage avec garage double",
  },
  {
    src: "/proprietes-vendues/residence-brique-piscine.jpg",
    category: "residences",
    alt: "Résidence en briques avec piscine creusée",
    caption: "Résidence en briques avec piscine",
  },
  {
    src: "/proprietes-vendues/residence-familiale-piscine.jpg",
    category: "residences",
    alt: "Résidence familiale avec piscine et grand terrain",
    caption: "Résidence familiale avec piscine",
  },
  {
    src: "/proprietes-vendues/residence-exterieur-jardin.jpg",
    category: "residences",
    alt: "Extérieur d'une résidence avec aménagement paysager",
    caption: "Résidence avec aménagement paysager",
  },
  {
    src: "/proprietes-vendues/lac-saint-joseph-residence-briques.jpg",
    category: "bord-de-leau",
    alt: "Résidence riveraine en briques au lac Saint-Joseph",
    caption: "Résidence riveraine — Lac Saint-Joseph",
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
    category: "immeubles",
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
    src: "/proprietes-vendues/cite-verte-place-publique.jpg",
    category: "immeubles",
    alt: "Place publique et immeubles résidentiels de La Cité Verte",
    caption: "La Cité Verte — place publique",
  },
  {
    src: "/proprietes-vendues/cite-verte-panneau.jpg",
    category: "immeubles",
    alt: "Panneau présentant le projet de condos La Cité Verte",
    caption: "La Cité Verte — projet de condos",
  },
  {
    src: "/proprietes-vendues/cite-verte-facade.jpg",
    category: "immeubles",
    alt: "Façade contemporaine d'une habitation à La Cité Verte",
    caption: "La Cité Verte — habitation contemporaine",
  },
  {
    src: "/proprietes-vendues/cite-verte-piscine.jpg",
    category: "immeubles",
    alt: "Piscine intérieure de La Cité Verte",
    caption: "La Cité Verte — piscine intérieure",
  },
  {
    src: "/proprietes-vendues/cite-verte-condo-aire-de-vie.jpg",
    category: "immeubles",
    alt: "Aire de vie d'un condo à La Cité Verte",
    caption: "La Cité Verte — intérieur d'un condo",
  },
  {
    src: "/proprietes-vendues/cite-verte-condo-salon.jpg",
    category: "immeubles",
    alt: "Salon d'un condo à La Cité Verte",
    caption: "La Cité Verte — salon d'un condo",
  },
  {
    src: "/proprietes-vendues/domaine-sillery-vue-aerienne.jpg",
    category: "immeubles",
    alt: "Vue aérienne du Domaine de Sillery",
    caption: "Domaine de Sillery — vue aérienne",
  },
  {
    src: "/proprietes-vendues/domaine-sillery-terrain-jumele.jpg",
    category: "immeubles",
    alt: "Terrain jumelé au Domaine de Sillery",
    caption: "Domaine de Sillery — terrain jumelé",
  },
  {
    src: "/proprietes-vendues/domaine-sillery-piscine-patrimoniale.jpg",
    category: "immeubles",
    alt: "Vue sur le fleuve depuis le Domaine de Sillery",
    caption: "Domaine de Sillery — vue sur le fleuve",
  },
  {
    src: "/proprietes-vendues/domaine-sillery-chapelle-patrimoniale.jpg",
    category: "immeubles",
    alt: "Vue panoramique sur le fleuve depuis le Domaine de Sillery",
    caption: "Domaine de Sillery — vue panoramique",
  },
  {
    src: "/proprietes-vendues/domaine-sillery-batiment-patrimonial.jpg",
    category: "immeubles",
    alt: "Vue aérienne du bâtiment patrimonial du Domaine de Sillery",
    caption: "Domaine de Sillery — bâtiment patrimonial",
  },
  {
    src: "/proprietes-vendues/bennemore-vue-aerienne.jpg",
    category: "immeubles",
    alt: "Vue aérienne du complexe résidentiel Le Bennemore",
    caption: "Le Bennemore — vue aérienne",
  },
  {
    src: "/proprietes-vendues/boise-augustines-vue-aerienne.jpg",
    category: "immeubles",
    alt: "Vue aérienne du Boisé des Augustines",
    caption: "Boisé des Augustines — vue aérienne",
  },
  {
    src: "/proprietes-vendues/jardins-merici-residence.jpg",
    category: "immeubles",
    alt: "Vue aérienne des Jardins Mérici",
    caption: "Jardins Mérici — vue aérienne",
  },
  {
    src: "/proprietes-vendues/sous-les-bois-vue-aerienne.jpg",
    category: "immeubles",
    alt: "Vue aérienne du complexe résidentiel Sous les bois",
    caption: "Sous les bois — vue aérienne",
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
