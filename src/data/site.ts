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
    address: "1043, avenue Holland",
    city: "Québec (Sillery)",
    postalCode: "G1S 3T4",
    fullAddress: "1043, avenue Holland, Québec (Sillery) G1S 3T4",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=1043+Avenue+Holland+Qu%C3%A9bec+QC+G1S+3T4",
  },
  territories: [
    "Montcalm",
    "Saint-Sacrement",
    "Sillery",
    "Sainte-Foy",
    "Lac Saint-Joseph",
    "La Cité-Limoilou",
    "Cap-Rouge",
  ],
  values: [
    {
      title: "Exclusivité de ses produits",
      description:
        "Des inscriptions sélectionnées avec soin pour offrir des opportunités uniques sur le marché.",
    },
    {
      title: "Force de son réseautage",
      description:
        "Un réseau solide de professionnels et d'acheteurs potentiels pour maximiser vos chances de succès.",
    },
    {
      title: "Professionnalisme",
      description:
        "Une approche rigoureuse et transparente à chaque étape de votre transaction immobilière.",
    },
    {
      title: "Service personnalisé",
      description:
        "Une stratégie sur mesure pour chaque dossier, qu'il soit résidentiel, commercial ou spécialisé.",
    },
  ],
  expertise: [
    {
      title: "Résidentiel",
      subtitle: "Montcalm, Saint-Sacrement, Sillery, Sainte-Foy, Lac Saint-Joseph",
      description:
        "Condominiums, maisons unifamiliales et propriétés de prestige dans les secteurs les plus recherchés de Québec.",
      images: [
        "/residentiel-1.jpg",
        "/residentiel-2.jpg",
        "/residentiel-3.jpg",
      ],
    },
    {
      title: "Terrains et propriétés secondaires",
      subtitle: "Excellente connaissance du marché",
      description:
        "Expertise approfondie dans l'identification et la commercialisation de terrains et propriétés résidentielles secondaires.",
      images: [
        "/secondaire-1.jpg",
        "/secondaire-2.jpg",
        "/secondaire-3.jpg",
      ],
    },
    {
      title: "Immeubles à revenus",
      subtitle: "Résidentiel et commercial",
      description:
        "Liste importante de vendeurs et d'acheteurs potentiels pour vos projets d'investissement immobilier.",
    },
    {
      title: "Cliniques médicales",
      subtitle: "Recherche de sites convoités",
      description:
        "Expertise en recherche de produits et de sites stratégiques pour les professionnels de la santé.",
    },
    {
      title: "Hôtels",
      subtitle: "Évaluation financière",
      description:
        "Expérience reconnue dans le secteur hôtelier et compétence en évaluation financière.",
    },
  ],
} as const;

export const navLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/proprietes", label: "Propriétés" },
  { href: "/calculette", label: "Calculette" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];
