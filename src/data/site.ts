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
        "Des inscriptions sélectionnées et une mise en marché adaptées.",
    },
    {
      title: "Ampleur de son réseautage",
      description:
        "Facilité de l'identification de l'acheteur potentiel.",
    },
    {
      title: "Professionnalisme",
      description:
        "Une approche rigoureuse et transparente tout au long du processus.",
    },
    {
      title: "Service personnalisé",
      description:
        "Adapté spécifiquement aux besoins et à la situation.",
    },
  ],
  expertise: [
    {
      title: "Résidentiel",
      emphasizedTitle: true,
      subtitle: "Lac St-Joseph, Sillery, Montcalm, Ste-Foy et St-Sacrement",
      description:
        "Résidences principales et secondaires, copropriétés divises et indivises, immeubles à revenus résidentiels.",
      images: [
        "/accueil/residentiel/residentiel-1.jpg",
        "/accueil/residentiel/residentiel-2.jpg",
        "/accueil/residentiel/Bennemore.jpg",
        "/accueil/residentiel/residentiel-3.jpg",
        "/accueil/residentiel/Boisé des Augustines.jpg",
        "/accueil/residentiel/secondaire-1.jpg",
        "/accueil/residentiel/Ensemble immobilier Jardins Mérici.jpg",
        "/accueil/residentiel/secondaire-2.jpg",
        "/accueil/residentiel/Sous les bois.jpg",
        "/accueil/residentiel/secondaire-3.jpg",
      ],
    },
    {
      title: "Immeubles à revenus",
      emphasizedTitle: true,
      wideMosaicLead: true,
      subtitle: "Résidentiel et commercial",
      description:
        "Connaissance du marché, élaboration des états financiers et pro-formats. Excellente capacité d'analyse de la valeur, des revenus et du potentiel de l'immeuble. Maîtrise des baux commerciaux et des conditions locatives. Habileté en négociation. Écoute des besoins des clients.",
      images: [
        "/accueil/revenus/hotel-1.jpg",
        "/accueil/revenus/commercial-1.jpg",
        "/accueil/revenus/commercial-2.jpg",
        "/accueil/revenus/medicale-1.jpg",
        "/accueil/revenus/DJI_0845.jpg",
        "/accueil/revenus/immeuble-commercial-quebec.jpg",
          "/accueil/revenus/revenus-1.jpg",
      ],
    },
    {
      title: "Bâtiments industriels",
      emphasizedTitle: true,
      subtitle: "Vente et location",
      description:
        "Connaissance du marché local, connaissance technique des bâtiments (superficie, hauteur libre, quais, entreposage, électricité, zonage), douée pour trouver un produit de qualité, vision stratégique, sens de l'analyse et de l'évaluation, réseau d'acheteurs et d'investisseurs. Services personnalisés.",
      images: ["/accueil/industriel/industriel-1.jpg"],
    },
    {
      title: "Courtier exclusif pour la vente de projets neufs (condominium)",
      emphasizedTitle: true,
      wideText: true,
      subtitle:
        "La Cité Verte (promoteur la SSQ)\nLe Domaine de Sillery (promoteur NORPLEX)",
      description:
        "Étudier le marché de la concurrence, déterminer le type de clientèle visée, évaluer le nombre et le type de condo, établir le prix de vente, collaborer avec les architectes et l'ensemble des professionnels, impliquer les institutions financières au projet, déterminer les caractéristiques recherchées par les acheteurs, préparer un plan de mise en marché, monter une équipe et un bureau des ventes, sélection des matériaux à offrir, élaboration d'une convention de copropriété, faire signer les contrats préliminaires, vérifier la solvabilité des acquéreurs et assurer le suivi des transactions chez le notaire.",
      images: [
        "/accueil/cite-verte/cite verte_place publique.jpg",
        "/accueil/cite-verte/IMG_0608.JPG",
        "/accueil/cite-verte/SSQ_Facade avant_04.jpg",
        "/accueil/cite-verte/Piscine.jpg",
        "/accueil/cite-verte/052.JPG",
        "/accueil/cite-verte/061.JPG",
        "/accueil/domaine-sillery/DJI_0822.jpg",
        "/accueil/domaine-sillery/terrain jumelé à Domaine de Sillery.jpg",
        "/accueil/domaine-sillery/1497_roger_lemelin-32.jpg",
        "/accueil/domaine-sillery/1497_roger_lemelin-33.jpg",
      ],
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
