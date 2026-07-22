export type SoldPhoto = {
  /** Chemin de l'image (ex. /proprietes-vendues/xxx.jpg) ou URL. */
  src: string;
  /** Texte alternatif pour l'accessibilité. */
  alt: string;
  /** Courte description sommaire affichée sous la photo et dans la visionneuse. */
  caption: string;
};

/**
 * Photos des propriétés vendues (fichiers dans public/proprietes-vendues/).
 */
export const soldPhotos: SoldPhoto[] = [
  {
    src: "/proprietes-vendues/lac-saint-joseph-residence-hiver.jpg",
    alt: "Résidence au bord du lac Saint-Joseph en hiver",
    caption: "Résidence au bord du lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/lac-saint-joseph-riveraine.jpg",
    alt: "Propriété riveraine au lac Saint-Joseph",
    caption: "Propriété riveraine — Lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/lac-saint-joseph-vue-aerienne.jpg",
    alt: "Vue aérienne d'une propriété sur le lac Saint-Joseph",
    caption: "Vue aérienne — Lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/lac-saint-joseph-domaine.jpg",
    alt: "Domaine riverain au lac Saint-Joseph",
    caption: "Domaine riverain — Lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/saint-augustin-residence-01.jpg",
    alt: "Résidence à Saint-Augustin-de-Desmaures",
    caption: "Résidence — Saint-Augustin-de-Desmaures",
  },
  {
    src: "/proprietes-vendues/saint-augustin-residence-02.jpg",
    alt: "Extérieur d'une propriété à Saint-Augustin-de-Desmaures",
    caption: "Propriété — Saint-Augustin-de-Desmaures",
  },
  {
    src: "/proprietes-vendues/vue-aerienne-plan-eau.jpg",
    alt: "Vue aérienne d'une propriété au bord de l'eau",
    caption: "Vue aérienne sur le plan d'eau",
  },
  {
    src: "/proprietes-vendues/grande-residence-familiale.jpg",
    alt: "Grande résidence familiale",
    caption: "Grande résidence familiale",
  },
  {
    src: "/proprietes-vendues/acces-lac-quai.jpg",
    alt: "Accès au lac et quai privé",
    caption: "Accès au lac et quai privé",
  },
  {
    src: "/proprietes-vendues/residence-contemporaine.jpg",
    alt: "Résidence contemporaine de prestige",
    caption: "Résidence contemporaine de prestige",
  },
  {
    src: "/proprietes-vendues/lac-saint-joseph-coucher-soleil.jpg",
    alt: "Coucher de soleil sur le lac Saint-Joseph",
    caption: "Coucher de soleil sur le lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/chalet-bord-eau.jpg",
    alt: "Chalet en bois au bord de l'eau",
    caption: "Chalet chaleureux au bord de l'eau",
  },
  {
    src: "/proprietes-vendues/propriete-nature.jpg",
    alt: "Propriété nichée dans la nature",
    caption: "Propriété nichée dans la nature",
  },
  {
    src: "/proprietes-vendues/maison-campagne.jpg",
    alt: "Maison de campagne rénovée",
    caption: "Maison de campagne rénovée",
  },
  {
    src: "/proprietes-vendues/terrain-paysager.jpg",
    alt: "Terrain paysager au bord de l'eau",
    caption: "Terrain paysager au bord de l'eau",
  },
  {
    src: "/proprietes-vendues/plage-privee-quai.jpg",
    alt: "Plage privée et quai",
    caption: "Plage privée et quai",
  },
  {
    src: "/proprietes-vendues/residence-vue-montagnes.jpg",
    alt: "Résidence avec vue sur les montagnes",
    caption: "Résidence avec vue sur les montagnes",
  },
  {
    src: "/proprietes-vendues/amenagement-foyer.jpg",
    alt: "Aménagement extérieur avec foyer",
    caption: "Aménagement extérieur avec foyer",
  },
  {
    src: "/proprietes-vendues/cottage-champetre.jpg",
    alt: "Cottage au charme champêtre",
    caption: "Cottage au charme champêtre",
  },
  {
    src: "/proprietes-vendues/propriete-riveraine-quai.jpg",
    alt: "Propriété riveraine avec quai",
    caption: "Propriété riveraine avec quai",
  },
  {
    src: "/proprietes-vendues/thomas-maher-lac-saint-joseph-residence.jpg",
    alt: "Résidence riveraine sur Thomas-Maher au lac Saint-Joseph",
    caption: "Résidence riveraine — Thomas-Maher, lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/thomas-maher-lac-saint-joseph-aerien.jpg",
    alt: "Vue aérienne d'une propriété sur Thomas-Maher au lac Saint-Joseph",
    caption: "Vue aérienne — Thomas-Maher, lac Saint-Joseph",
  },
  {
    src: "/proprietes-vendues/condo-saint-jean-quebec.jpg",
    alt: "Immeuble à condos contemporain rue Saint-Jean à Québec",
    caption: "Condo contemporain — rue Saint-Jean, Québec",
  },
  {
    src: "/proprietes-vendues/tour-residentielle.jpg",
    alt: "Tour résidentielle entourée d'arbres matures",
    caption: "Tour résidentielle",
  },
  {
    src: "/proprietes-vendues/residence-pierre-terrain.jpg",
    alt: "Résidence en pierre avec grand terrain paysager",
    caption: "Résidence en pierre avec grand terrain",
  },
];

export function getSoldPhotos(): SoldPhoto[] {
  return soldPhotos;
}
