export type SoldPhoto = {
  /** Chemin de l'image (ex. /proprietes-vendues/xxx.jpg) ou URL. */
  src: string;
  /** Texte alternatif pour l'accessibilité. */
  alt: string;
  /** Courte description sommaire affichée sous la photo et dans la visionneuse. */
  caption: string;
};

/**
 * Photos des propriétés vendues.
 * Les images ci-dessous sont des exemples (placeholders) en attendant les
 * vraies photos de la cliente. Déposer les fichiers dans
 * `public/proprietes-vendues/` puis remplacer `src` par `/proprietes-vendues/...`.
 */
export const soldPhotos: SoldPhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    alt: "Maison familiale vendue à Québec",
    caption: "Maison familiale — Québec, vendue en 2025",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    alt: "Résidence contemporaine vendue",
    caption: "Résidence contemporaine — Sainte-Foy",
  },
  {
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
    alt: "Cottage rénové vendu",
    caption: "Cottage rénové — Sillery",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    alt: "Condo lumineux vendu",
    caption: "Condo lumineux — Vieux-Québec",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    alt: "Bungalow chaleureux vendu",
    caption: "Bungalow chaleureux — Charlesbourg",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    alt: "Propriété avec grand terrain vendue",
    caption: "Propriété avec grand terrain — Lac-Beauport",
  },
];

export function getSoldPhotos(): SoldPhoto[] {
  return soldPhotos;
}
