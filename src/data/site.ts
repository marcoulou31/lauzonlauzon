import type { NavLink } from "@/lib/types";

export const siteConfig = {
  name: "Lauzon & Lauzon",
  tagline: "Agence immobilière",
  slogan: "L'efficacité a un nom",
  description:
    "Courtier immobilier résidentiel et commercial à Québec. Plus de 25 ans d'expérience au service de votre projet immobilier.",
  broker: {
    name: "Chantal Lauzon",
    title: "Présidente et fondatrice",
    credentials: "B.A.A.",
    experience: "25 années d'expérience en immobilier",
  },
  contact: {
    phone: "418-952-2359",
    phoneHref: "tel:+14189522359",
    email: "lauzonlauzoncourtier@videotron.ca",
    emailHref: "mailto:lauzonlauzoncourtier@videotron.ca",
    legalName: "Lauzon & Lauzon",
    address: "1043 Avenue Holland",
    city: "Québec (Sillery)",
    postalCode: "G1S 3T4",
    fullAddress: "1043 Avenue Holland, Québec, G1S 3T4",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=1043+Avenue+Holland+Qu%C3%A9bec+QC+G1S+3T4",
  },
  territories: [
    "Lac St-Joseph",
    "Sillery",
    "Montcalm",
    "Ste-Foy",
    "St-Sacrement",
  ],
  values: [
    {
      title: "Exclusivité de ses produits",
      description:
        "Des inscriptions sélectionnées et une mise en marché adaptées",
    },
    {
      title: "Ampleur de son réseautage",
      description:
        "Facilité de l'identification de l'acheteur potentiel",
    },
    {
      title: "Professionnalisme",
      description:
        "Une approche rigoureuse et transparente tout au long du processus",
    },
    {
      title: "Service personnalisé",
      description:
        "Adapté spécifiquement aux besoins et à la situation",
    },
  ],
  expertise: [
    {
      title: "Résidentiel",
      subtitle: "Lac St-Joseph, Sillery, Montcalm, Ste-Foy et St-Sacrement",
      description:
        "Résidences principales et secondaires, copropriétés divises et indivises, immeubles à revenus résidentiels",
      images: [
        "/accueil/residentiel/residentiel-1.jpg",
        "/accueil/residentiel/residentiel-2.jpg",
        "/accueil/residentiel/residentiel-3.jpg",
        "/accueil/residentiel/secondaire-1.jpg",
        "/accueil/residentiel/secondaire-2.jpg",
        "/accueil/residentiel/secondaire-3.jpg",
        "/accueil/residentiel/Bennemore.jpg",
        "/accueil/residentiel/Boisé des Augustines.jpg",
        "/accueil/residentiel/Ensemble immobilier Jardins Mérici.jpg",
        "/accueil/residentiel/Sous les bois.jpg",
      ],
    },
    {
      title: "Immeubles à revenus",
      subtitle: "Résidentiel et commercial",
      description:
        "Connaissance du marché, élaboration des états financiers et pro-formats. Excellente capacité d'analyse de la valeur, des revenus et du potentiel de l'immeuble. Maîtrise des baux commerciaux et des conditions locatives. Habileté en négociation. Écoute des besoins des clients.",
      images: [
        "/accueil/revenus/commercial-1.jpg",
        "/accueil/revenus/medicale-1.jpg",
        "/accueil/revenus/hotel-1.jpg",
        "/accueil/revenus/DJI_0845.jpg",
        "/accueil/revenus/immeuble-commercial-quebec.jpg",
      ],
    },
    {
      title: "Bâtiments industriels",
      subtitle: "Vente et location",
      description:
        "Connaissance du marché local, connaissance technique des bâtiments (superficie, hauteur libre, quais, entreposage, électricité, zonage), douée pour trouver un produit de qualité, vision stratégique, sens de l'analyse et de l'évaluation, réseau d'acheteurs et d'investisseurs. Service personnalisé.",
      images: ["/accueil/industriel/industriel-1.jpg"],
    },
  ],
  guides: [
    {
      title: "Guide de l'acheteur",
      description:
        "Un aide-mémoire complet qui vous accompagne à chaque étape de l'achat d'une propriété résidentielle : la promesse d'achat, la mise de fonds, les avantages de faire affaire avec un courtier et bien plus.",
      pdfHref: "https://www.oaciq.com/fr/guide-acheteur",
    },
    {
      title: "Guide du vendeur",
      description:
        "Toutes les informations pratiques pour vendre en toute confiance : le contrat de courtage – vente, le formulaire Déclarations du vendeur sur l'immeuble, les spécificités de la copropriété et les étapes clés de la transaction.",
      pdfHref: "https://www.oaciq.com/fr/guide-vendeur",
    },
  ],
} as const;

export const navLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/proprietes", label: "Propriétés" },
  { href: "/guides", label: "Guides" },
  { href: "/calculette", label: "Calculette" },
  { href: "/contact", label: "Contact" },
];
