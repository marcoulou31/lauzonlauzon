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
        "/accueil/residentiel/residence-bois-lac-saint-joseph.jpg",
        "/accueil/residentiel/copropriete-contemporaine.jpg",
        "/accueil/residentiel/bennemore-vue-aerienne.jpg",
        "/accueil/residentiel/coproprietes-vue-fleuve.jpg",
        "/accueil/residentiel/boise-augustines-vue-aerienne.jpg",
        "/accueil/residentiel/residence-riveraine-vue-aerienne.jpg",
        "/accueil/residentiel/jardins-merici-vue-aerienne.jpg",
        "/accueil/residentiel/chalet-bois-terrain-paysager.jpg",
        "/accueil/residentiel/sous-les-bois-vue-aerienne.jpg",
        "/accueil/residentiel/residence-riveraine-terrasse.jpg",
      ],
    },
    {
      title: "Immeubles à revenus",
      emphasizedTitle: true,
      wideMosaicLead: true,
      subtitle: "Résidentiel et commercial",
      description:
        "Connaissance du marché, élaboration des états financiers et pro-formats. Excellente capacité d'analyse de la valeur des revenus et du potentiel de l'immeuble. Maîtrise des baux commerciaux et des conditions locatives. Habileté à négocier. À l'écoute des besoins du client.",
      images: [
        "/accueil/revenus/immeuble-revenus-vue-aerienne.jpg",
        "/accueil/revenus/hotel-brossard.jpg",
        "/accueil/revenus/immeuble-commercial-restaurants.jpg",
        "/accueil/revenus/immeuble-commercial-avenue-cartier.jpg",
        "/accueil/revenus/centre-medical-laperriere.jpg",
        "/accueil/revenus/immeuble-commercial-quebec.jpg",
        "/accueil/revenus/immeuble-locatif-2908.jpg",
      ],
    },
    {
      title: "Bâtiments industriels",
      emphasizedTitle: true,
      subtitle: "Vente et location",
      description:
        "Connaissance du marché local, des techniques de construction et des règlements de zonage. Douée pour trouver les produits recherchés. Formée pour l'analyse financière. Offre un service personnalisé.",
      images: ["/accueil/industriel/parc-industriel-vue-aerienne.jpg"],
    },
    {
      title: "Courtier exclusif pour la vente de projets neufs (condominium)",
      emphasizedTitle: true,
      fullWidthText: true,
      description:
        "Étudier le marché de la concurrence, déterminer le type de clientèle visée, évaluer le nombre et le type de condo, établir le prix de vente, collaborer avec les architectes et l'ensemble des professionnels, impliquer les institutions financières au projet, déterminer les caractéristiques recherchées par les acheteurs, préparer un plan de mise en marché, monter une équipe et un bureau des ventes, sélection des matériaux à offrir, élaboration d'une convention de copropriété, faire signer les contrats préliminaires, vérifier la solvabilité des acquéreurs et assurer le suivi des transactions chez le notaire.",
      projects: [
        {
          title: "La Cité Verte",
          promoter: "Promoteur : la SSQ",
          images: [
            "/accueil/cite-verte/cite-verte-place-publique-rendu.jpg",
            "/accueil/cite-verte/cite-verte-panneau-publicitaire.jpg",
            "/accueil/cite-verte/cite-verte-maison-de-ville.jpg",
            "/accueil/cite-verte/cite-verte-piscine-interieure.jpg",
            "/accueil/cite-verte/cite-verte-condo-aire-de-vie.jpg",
            "/accueil/cite-verte/cite-verte-condo-salon.jpg",
          ],
        },
        {
          title: "Le Domaine de Sillery",
          promoter: "Promoteur : NORPLEX",
          images: [
            "/accueil/domaine-sillery/domaine-sillery-vue-aerienne.jpg",
            "/accueil/domaine-sillery/domaine-sillery-parc-vue-fleuve.jpg",
            "/accueil/domaine-sillery/domaine-sillery-piscine-patrimoniale.jpg",
            "/accueil/domaine-sillery/domaine-sillery-chapelle-patrimoniale.jpg",
          ],
        },
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
