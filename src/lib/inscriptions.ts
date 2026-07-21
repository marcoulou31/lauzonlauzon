import type {
  Property,
  PropertyType,
  PropertyStatus,
  InscriptionDetail,
  InscriptionPhoto,
  InscriptionPiece,
  InscriptionCaracteristique,
} from "@/lib/types";
import { runSqlQuery } from "@/lib/sql";

export function isInscriptionNo(slug: string): boolean {
  return /^\d+$/.test(slug);
}

// ─── Raw DB row types ────────────────────────────────────────────────────────

type InscriptionRow = {
  NO_INSCRIPTION: string;
  PRIX_DEMANDE: number | null;
  PRIX_LOCATION_DEMANDE: number | null;
  CATEGORIE_PROPRIETE: string | null;
  GENRE_PROPRIETE: string | null;
  GENRE_PROPRIETE_DESC: string | null;
  CODE_STATUT: string | null;
  NB_CHAMBRES: number | null;
  NB_SALLES_BAINS: number | null;
  NB_SALLES_EAU: number | null;
  NB_ETAGES: number | null;
  NB_PIECES: number | null;
  ANNEE_CONTRUCTION: number | null;
  ANNEE_CERTIFICAT_LOCALISATION: number | null;
  CADASTRE: string | null;
  ANNEE_EVALUATION: number | null;
  EVALUATION_MUNICIPALE_BATIMENT: string | null;
  EVALUATION_MUNICIPALE_TERRAIN: string | null;
  FACADE_BATIMENT: number | null;
  PROFONDEUR_BATIMENT: number | null;
  IND_IRREGULIER_BATIMENT: string | null;
  UM_DIMENSION_BATIMENT: string | null;
  AIRE_AU_SOL: number | null;
  UM_AIRE_AU_SOL: string | null;
  AIRE_HABITABLE: number | null;
  UM_AIRE_HABITABLE: string | null;
  FACADE_TERRAIN: number | null;
  PROFONDEUR_TERRAIN: number | null;
  IND_IRREGULIER_TERRAIN: string | null;
  UM_DIMENSION_TERRAIN: string | null;
  SUPERFICIE_TERRAIN: number | null;
  UM_SUPERFICIE_TERRAIN: string | null;
  INCLUS_FRANCAIS: string | null;
  EXCLUS_FRANCAIS: string | null;
  CODE_DECLARATION_VENDEUR: string | null;
  DECL_VENDEUR_DESC: string | null;
  NO_CIVIQUE_DEBUT: string | null;
  NOM_RUE_COMPLET: string | null;
  APPARTEMENT: string | null;
  MUNICIPALITE_DESC: string | null;
  CODE_POSTAL: string | null;
  REMARQUE_TEXTE: string | null;
  NOM_FICHIER_PHOTO: string | null;
};

type PhotoRow = {
  NOM_FICHIER_PHOTO: string;
  piece: string | null;
  rang: number;
};

type DepenseRow = {
  TDEP_CODE: string;
  MONTANT_DEPENSE: number;
  FREQUENCE: string;
};

type PieceRow = {
  DESCRIPTION_PIECE: string;
  DIMENSIONS: string | null;
  DESCRIPTION_ETAGE: string | null;
  DESCRIPTION_PLANCHER: string | null;
};

type CaractRow = {
  TCAR_CODE: string;
  TCAR_DESCR: string;
  SCARAC_DESCR: string;
  NOMBRE: number | null;
};

type MembreRow = {
  PRENOM: string;
  NOM: string;
  TELEPHONE_1: string;
  COURRIEL: string;
  URL_PHOTO: string | null;
  TYPE_CERT_DESC: string | null;
};

type AddendaRow = {
  TEXTE: string | null;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mapPropertyType(
  categorie: string | null,
  genre: string | null,
): PropertyType {
  if (categorie === "T") return "terrain";
  if (categorie === "C" || categorie === "I") return "commercial";
  if (genre === "AP") return "condo";
  return "maison";
}

function mapPropertyStatus(code: string | null): PropertyStatus {
  if (code === "VE") return "vendu";
  if (code === "LO") return "à louer";
  return "à vendre";
}

function buildAddress(row: InscriptionRow): string {
  const parts: string[] = [];
  if (row.NO_CIVIQUE_DEBUT) parts.push(row.NO_CIVIQUE_DEBUT);
  if (row.NOM_RUE_COMPLET) parts.push(row.NOM_RUE_COMPLET);
  if (row.APPARTEMENT) parts.push(`app. ${row.APPARTEMENT}`);
  return parts.join(", ");
}

function toLargePhotoUrl(url: string): string {
  // Le mediaserver Centris ne sert que la taille stockee (typiquement 640x480).
  // Demander une taille superieure renvoie un corps vide (Content-Length: 0),
  // ce qui fait echouer l'optimiseur d'images. On conserve donc l'URL d'origine.
  return url;
}

function annualToRef(annual: number | null): number | null {
  return annual;
}

function aggregateDepenses(rows: DepenseRow[]) {
  const pick = (code: string) =>
    rows.find((r) => r.TDEP_CODE === code)?.MONTANT_DEPENSE ?? null;

  const taxMun = pick("TAXMUN");
  const taxSco = pick("TAXSCO");
  const energie = pick("ENER");
  const fraisComm = pick("FRAISCOMM");
  const fcop = pick("FCOP");

  const knownCodes = new Set(["TAXMUN", "TAXSCO", "ENER", "FRAISCOMM", "FCOP"]);
  const autres = rows
    .filter((r) => !knownCodes.has(r.TDEP_CODE))
    .reduce((s, r) => s + r.MONTANT_DEPENSE, 0) || null;

  const taxesTotal = (taxMun ?? 0) + (taxSco ?? 0) || null;
  const depTotal =
    (taxMun ?? 0) +
    (taxSco ?? 0) +
    (energie ?? 0) +
    (fraisComm ?? 0) +
    (fcop ?? 0) +
    (autres ?? 0) || null;

  return { taxMun, taxSco, taxesTotal, energie, fraisComm, fcop, autres, depTotal };
}

// ─── Main export ─────────────────────────────────────────────────────────────

export async function getInscriptionByNo(no: string): Promise<{
  property: Property;
  detail: InscriptionDetail;
} | null> {
  const noInt = parseInt(no, 10);

  const [inscResult, photosResult, depResult, piecesResult, caractResult, addendaResult] =
    await Promise.all([
      runSqlQuery<InscriptionRow>(
        "LauzonConn",
        `
        SELECT TOP 1
          i.NO_INSCRIPTION,
          i.PRIX_DEMANDE, i.PRIX_LOCATION_DEMANDE,
          i.CATEGORIE_PROPRIETE, i.GENRE_PROPRIETE,
          gp.DESCRIPTION_FRANCAISE AS GENRE_PROPRIETE_DESC,
          i.CODE_STATUT,
          i.NB_CHAMBRES, i.NB_SALLES_BAINS, i.NB_SALLES_EAU,
          i.NB_ETAGES, i.NB_PIECES,
          i.ANNEE_CONTRUCTION, i.ANNEE_CERTIFICAT_LOCALISATION, i.CADASTRE,
          i.ANNEE_EVALUATION,
          CAST(i.EVALUATION_MUNICIPALE_BATIMENT AS nvarchar(30)) AS EVALUATION_MUNICIPALE_BATIMENT,
          CAST(i.EVALUATION_MUNICIPALE_TERRAIN AS nvarchar(30)) AS EVALUATION_MUNICIPALE_TERRAIN,
          i.FACADE_BATIMENT, i.PROFONDEUR_BATIMENT,
          i.IND_IRREGULIER_BATIMENT, i.UM_DIMENSION_BATIMENT,
          i.AIRE_AU_SOL, i.UM_AIRE_AU_SOL,
          i.AIRE_HABITABLE, i.UM_AIRE_HABITABLE,
          i.FACADE_TERRAIN, i.PROFONDEUR_TERRAIN,
          i.IND_IRREGULIER_TERRAIN, i.UM_DIMENSION_TERRAIN,
          i.SUPERFICIE_TERRAIN, i.UM_SUPERFICIE_TERRAIN,
          i.INCLUS_FRANCAIS, i.EXCLUS_FRANCAIS,
          i.CODE_DECLARATION_VENDEUR,
          vf.DESCRIPTION_FRANCAISE AS DECL_VENDEUR_DESC,
          i.NO_CIVIQUE_DEBUT, i.NOM_RUE_COMPLET, i.APPARTEMENT,
          m.DESCRIPTION AS MUNICIPALITE_DESC,
          i.CODE_POSTAL,
          r.TEXTE AS REMARQUE_TEXTE,
          p.NOM_FICHIER_PHOTO
        FROM dbo.INSCRIPTIONS i
        LEFT JOIN dbo.GENRES_PROPRIETES gp
          ON gp.CATEGORIE_PROPRIETE = i.CATEGORIE_PROPRIETE
         AND gp.GENRE_PROPRIETE = i.GENRE_PROPRIETE
        LEFT JOIN dbo.MUNICIPALITES m ON m.CODE = i.MUN_CODE
        LEFT JOIN dbo.REMARQUES r
          ON r.NO_INSCRIPTION = i.NO_INSCRIPTION
         AND r.CODE_LANGUE = 'F'
         AND r.ORDRE_AFFICHAGE = 1
        LEFT JOIN dbo.VALEURS_FIXES vf
          ON vf.DOMAINE = 'CODE_DECLARATION_VENDEUR'
         AND vf.VALEUR = i.CODE_DECLARATION_VENDEUR
        OUTER APPLY (
          SELECT TOP 1 NOM_FICHIER_PHOTO
          FROM dbo.PHOTOS
          WHERE noSIA = @noInt
            AND NOM_FICHIER_PHOTO IS NOT NULL
          ORDER BY rang
        ) p
        WHERE i.NO_INSCRIPTION = @no
        `,
        { no, noInt },
      ),
      runSqlQuery<PhotoRow>(
        "LauzonConn",
        `
        SELECT NOM_FICHIER_PHOTO, piece, rang
        FROM dbo.PHOTOS
        WHERE noSIA = @noInt
          AND NOM_FICHIER_PHOTO IS NOT NULL
        ORDER BY rang
        `,
        { noInt },
      ).catch(() => ({ recordset: [] as PhotoRow[] })),
      runSqlQuery<DepenseRow>(
        "LauzonConn",
        `SELECT TDEP_CODE, MONTANT_DEPENSE, FREQUENCE
         FROM dbo.DEPENSES WHERE NO_INSCRIPTION = @no`,
        { no },
      ).catch(() => ({ recordset: [] as DepenseRow[] })),
      runSqlQuery<PieceRow>(
        "LauzonConn",
        `
        SELECT
          vp.DESCRIPTION_FRANCAISE AS DESCRIPTION_PIECE,
          pc.DIMENSIONS,
          ve.DESCRIPTION_FRANCAISE AS DESCRIPTION_ETAGE,
          vpc.DESCRIPTION_FRANCAISE AS DESCRIPTION_PLANCHER
        FROM dbo.PIECES pc
        LEFT JOIN dbo.VALEURS_FIXES vp ON vp.DOMAINE='PIECE_CODE' AND vp.VALEUR=pc.PIECE_CODE
        LEFT JOIN dbo.VALEURS_FIXES ve ON ve.DOMAINE='ETAGE' AND ve.VALEUR=pc.ETAGE
        LEFT JOIN dbo.VALEURS_FIXES vpc ON vpc.DOMAINE='COUVRE_PLANCHER_CODE' AND vpc.VALEUR=pc.COUVRE_PLANCHER_CODE
        WHERE pc.NO_INSCRIPTION = @no
        ORDER BY pc.NO_ORDRE
        `,
        { no },
      ).catch(() => ({ recordset: [] as PieceRow[] })),
      runSqlQuery<CaractRow>(
        "LauzonConn",
        `
        SELECT c.TCAR_CODE, tc.DESCRIPTION_FRANCAISE AS TCAR_DESCR,
               stc.DESCRIPTION_FRANCAISE AS SCARAC_DESCR, c.NOMBRE
        FROM dbo.CARACTERISTIQUES c
        LEFT JOIN dbo.TYPE_CARACTERISTIQUES tc ON tc.CODE = c.TYPE_CARACTERISTIQUE
        LEFT JOIN dbo.SOUS_TYPE_CARACTERISTIQUES stc
          ON stc.TCAR_CODE = c.TYPE_CARACTERISTIQUE
         AND stc.CODE = c.SOUS_TYPE_CARACTERISTIQUE
        WHERE c.NO_INSCRIPTION = @no
        ORDER BY c.TYPE_CARACTERISTIQUE, c.SOUS_TYPE_CARACTERISTIQUE
        `,
        { no },
      ).catch(() => ({ recordset: [] as CaractRow[] })),
      runSqlQuery<AddendaRow>(
        "LauzonConn",
        `SELECT TOP 1 TEXTE FROM dbo.ADDENDA
         WHERE NO_INSCRIPTION = @no AND CODE_LANGUE='F'`,
        { no },
      ).catch(() => ({ recordset: [] as AddendaRow[] })),
    ]);

  const row = inscResult.recordset[0];
  if (!row) return null;

  // Fetch courtier separately (needs agent code from row)
  const agentCode = "2930"; // TODO: from row.AGENT_INSCRIPTEUR_1 — but we'd need to add it to the query
  const membreResult = await runSqlQuery<MembreRow>(
    "LauzonConn",
    `
    SELECT TOP 1
      mb.PRENOM, mb.NOM, mb.TELEPHONE_1, mb.COURRIEL, mb.URL_PHOTO,
      vf.DESCRIPTION_FRANCAISE AS TYPE_CERT_DESC
    FROM dbo.MEMBRES mb
    LEFT JOIN dbo.VALEURS_FIXES vf
      ON vf.DOMAINE = 'TYPE_CERTIFICAT_MEMBRE'
     AND vf.VALEUR = mb.TYPE_CERTIFICAT
    JOIN dbo.INSCRIPTIONS i ON i.AGENT_INSCRIPTEUR_1 = mb.CODE
    WHERE i.NO_INSCRIPTION = @no
    `,
    { no },
  ).catch(() => ({ recordset: [] as MembreRow[] }));

  void agentCode; // unused after the join approach

  const dep = aggregateDepenses(depResult.recordset);
  const address = buildAddress(row);
  const evalBat = Number(row.EVALUATION_MUNICIPALE_BATIMENT) || null;
  const evalTer = Number(row.EVALUATION_MUNICIPALE_TERRAIN) || null;
  const evalTotal = evalBat !== null || evalTer !== null ? (evalBat ?? 0) + (evalTer ?? 0) : null;
  const remarque = row.REMARQUE_TEXTE ?? "";

  const photos: InscriptionPhoto[] = photosResult.recordset.map((p) => ({
    src: p.NOM_FICHIER_PHOTO,
    srcLarge: toLargePhotoUrl(p.NOM_FICHIER_PHOTO),
    piece: p.piece,
    rang: p.rang,
  }));

  const pieces: InscriptionPiece[] = piecesResult.recordset.map((p) => ({
    description: p.DESCRIPTION_PIECE,
    dimensions: p.DIMENSIONS,
    etage: p.DESCRIPTION_ETAGE,
    plancher: p.DESCRIPTION_PLANCHER,
  }));

  const caracteristiques: InscriptionCaracteristique[] = caractResult.recordset.map((c) => ({
    typeCode: c.TCAR_CODE,
    typeDesc: c.TCAR_DESCR ?? c.TCAR_CODE,
    sousTypeDesc: c.SCARAC_DESCR ?? "",
    nombre: c.NOMBRE,
  }));

  const garaCaract = caractResult.recordset.filter((c) => c.TCAR_CODE === "GARA");
  const abriCaract = caractResult.recordset.filter((c) => c.TCAR_CODE === "ABRI");
  const garage = garaCaract.length > 0 ? "Oui" : null;
  const abri = abriCaract.length > 0 ? "Oui" : "Non";

  const membreRow = membreResult.recordset[0] ?? null;
  const courtier = membreRow
    ? {
        prenom: membreRow.PRENOM,
        nom: membreRow.NOM,
        titre: membreRow.TYPE_CERT_DESC ?? "",
        telephone: membreRow.TELEPHONE_1,
        courriel: membreRow.COURRIEL,
        photoUrl: membreRow.URL_PHOTO ?? null,
      }
    : null;

  const detail: InscriptionDetail = {
    noInscription: row.NO_INSCRIPTION,
    adresse: `${address}\n${row.MUNICIPALITE_DESC ?? ""}, ${row.CODE_POSTAL ?? ""}`,
    adresseMaps: `${address}, ${row.MUNICIPALITE_DESC ?? ""}`,
    prix: row.PRIX_DEMANDE,
    prixLocation: row.PRIX_LOCATION_DEMANDE,
    genreProprieteDescr: row.GENRE_PROPRIETE_DESC ?? row.GENRE_PROPRIETE ?? "",
    nbChambres: row.NB_CHAMBRES,
    nbSallesBains: row.NB_SALLES_BAINS,
    nbSallesEau: row.NB_SALLES_EAU,
    nbEtages: row.NB_ETAGES,
    nbPieces: row.NB_PIECES,
    anneeConstruction: row.ANNEE_CONTRUCTION,
    anneeCertLocalisation: row.ANNEE_CERTIFICAT_LOCALISATION,
    cadastre: row.CADASTRE,
    anneeEvaluation: row.ANNEE_EVALUATION,
    evalBatiment: evalBat,
    evalTerrain: evalTer,
    evalTotal,
    taxesMunicipale: annualToRef(dep.taxMun),
    taxesScolaire: annualToRef(dep.taxSco),
    taxesTotal: annualToRef(dep.taxesTotal),
    energie: annualToRef(dep.energie),
    fraisCommuns: annualToRef(dep.fraisComm),
    fraisCopropriete: annualToRef(dep.fcop),
    depensesAutres: annualToRef(dep.autres),
    depensesTotal: annualToRef(dep.depTotal),
    facadeBatiment: row.FACADE_BATIMENT,
    profondeurBatiment: row.PROFONDEUR_BATIMENT,
    irregulierBatiment: row.IND_IRREGULIER_BATIMENT,
    umDimensionBatiment: row.UM_DIMENSION_BATIMENT,
    aireSol: row.AIRE_AU_SOL,
    umAireSol: row.UM_AIRE_AU_SOL,
    aireHabitable: row.AIRE_HABITABLE,
    umAireHabitable: row.UM_AIRE_HABITABLE === "MC" ? "m²" : (row.UM_AIRE_HABITABLE ?? null),
    facadeTerrain: row.FACADE_TERRAIN,
    profondeurTerrain: row.PROFONDEUR_TERRAIN,
    irregulierTerrain: row.IND_IRREGULIER_TERRAIN,
    umDimensionTerrain: row.UM_DIMENSION_TERRAIN,
    superficieTerrain: row.SUPERFICIE_TERRAIN,
    umSuperficieTerrain: row.UM_SUPERFICIE_TERRAIN,
    descriptionGenerale: remarque || null,
    declarationVendeur: row.DECL_VENDEUR_DESC ?? row.CODE_DECLARATION_VENDEUR ?? null,
    inclusFrancais: row.INCLUS_FRANCAIS,
    exclusFrancais: row.EXCLUS_FRANCAIS,
    addenda: addendaResult.recordset[0]?.TEXTE ?? null,
    garage,
    abri,
    courtier,
    photoUrl: row.NOM_FICHIER_PHOTO ?? null,
    photos,
    pieces,
    caracteristiques,
  };

  // Build a Property for compatibility (metadata, og, etc.)
  const property: Property = {
    slug: row.NO_INSCRIPTION,
    title: `${detail.genreProprieteDescr} – ${address}`,
    address,
    city: row.MUNICIPALITE_DESC ?? "",
    price: row.PRIX_DEMANDE ?? row.PRIX_LOCATION_DEMANDE ?? 0,
    type: mapPropertyType(row.CATEGORIE_PROPRIETE, row.GENRE_PROPRIETE),
    status: mapPropertyStatus(row.CODE_STATUT),
    bedrooms: row.NB_CHAMBRES ?? undefined,
    bathrooms: row.NB_SALLES_BAINS ?? undefined,
    areaSqft: row.AIRE_HABITABLE ?? undefined,
    taxes: dep.taxesTotal ?? undefined,
    description: remarque.slice(0, 250),
    longDescription: remarque,
    features: [],
    images: photos.map((p) => ({ src: p.src, alt: p.piece ?? address })),
    featured: false,
  };

  return { property, detail };
}

// ─── Liste complète pour la page /proprietes ─────────────────────────────────

const FALLBACK_IMAGE = "/images/placeholder-property.jpg";

export async function getAllInscriptionsForPage(): Promise<Property[]> {
  type Row = {
    NO_INSCRIPTION: string;
    PRIX_DEMANDE: number | null;
    PRIX_LOCATION_DEMANDE: number | null;
    CATEGORIE_PROPRIETE: string | null;
    GENRE_PROPRIETE: string | null;
    GENRE_PROPRIETE_DESC: string | null;
    CODE_STATUT: string | null;
    NB_CHAMBRES: number | null;
    NB_SALLES_BAINS: number | null;
    AIRE_HABITABLE: number | null;
    NO_CIVIQUE_DEBUT: string | null;
    NOM_RUE_COMPLET: string | null;
    APPARTEMENT: string | null;
    MUNICIPALITE_DESC: string | null;
    REMARQUE_TEXTE: string | null;
    NOM_FICHIER_PHOTO: string | null;
  };

  const result = await runSqlQuery<Row>(
    "LauzonConn",
    `
    SELECT
      i.NO_INSCRIPTION,
      i.PRIX_DEMANDE, i.PRIX_LOCATION_DEMANDE,
      i.CATEGORIE_PROPRIETE, i.GENRE_PROPRIETE,
      gp.DESCRIPTION_FRANCAISE AS GENRE_PROPRIETE_DESC,
      i.CODE_STATUT,
      i.NB_CHAMBRES, i.NB_SALLES_BAINS,
      i.AIRE_HABITABLE,
      i.NO_CIVIQUE_DEBUT, i.NOM_RUE_COMPLET, i.APPARTEMENT,
      m.DESCRIPTION AS MUNICIPALITE_DESC,
      r.TEXTE AS REMARQUE_TEXTE,
      p.NOM_FICHIER_PHOTO
    FROM dbo.INSCRIPTIONS i
    LEFT JOIN dbo.GENRES_PROPRIETES gp
      ON gp.CATEGORIE_PROPRIETE = i.CATEGORIE_PROPRIETE
     AND gp.GENRE_PROPRIETE = i.GENRE_PROPRIETE
    LEFT JOIN dbo.MUNICIPALITES m ON m.CODE = i.MUN_CODE
    LEFT JOIN dbo.REMARQUES r
      ON r.NO_INSCRIPTION = i.NO_INSCRIPTION
     AND r.CODE_LANGUE = 'F'
     AND r.ORDRE_AFFICHAGE = 1
    OUTER APPLY (
      SELECT TOP 1 NOM_FICHIER_PHOTO
      FROM dbo.PHOTOS
      WHERE noSIA = CAST(i.NO_INSCRIPTION AS int)
        AND NOM_FICHIER_PHOTO IS NOT NULL
      ORDER BY rang
    ) p
    ORDER BY i.DATE_INSCRIPTION DESC
    `,
  ).catch(() => ({ recordset: [] as Row[] }));

  return result.recordset.map((row) => {
    const parts: string[] = [];
    if (row.NO_CIVIQUE_DEBUT) parts.push(row.NO_CIVIQUE_DEBUT);
    if (row.NOM_RUE_COMPLET) parts.push(row.NOM_RUE_COMPLET);
    if (row.APPARTEMENT) parts.push(`app. ${row.APPARTEMENT}`);
    const address = parts.join(", ");

    const remarque = row.REMARQUE_TEXTE ?? "";
    const photoSrc = row.NOM_FICHIER_PHOTO ?? FALLBACK_IMAGE;
    const type = mapPropertyType(row.CATEGORIE_PROPRIETE, row.GENRE_PROPRIETE);
    const genreDesc = row.GENRE_PROPRIETE_DESC ?? row.GENRE_PROPRIETE ?? "Propriété";

    return {
      slug: row.NO_INSCRIPTION,
      title: genreDesc,
      address,
      city: row.MUNICIPALITE_DESC ?? "",
      price: row.PRIX_DEMANDE ?? row.PRIX_LOCATION_DEMANDE ?? 0,
      type,
      status: mapPropertyStatus(row.CODE_STATUT),
      bedrooms: row.NB_CHAMBRES ?? undefined,
      bathrooms: row.NB_SALLES_BAINS ?? undefined,
      areaSqft: row.AIRE_HABITABLE ?? undefined,
      description: remarque.slice(0, 250),
      longDescription: remarque,
      features: [],
      images: [{ src: photoSrc, alt: address || row.NO_INSCRIPTION }],
      featured: false,
    } satisfies Property;
  });
}

// ─── Liste allégée pour les dropdowns ────────────────────────────────────────

export type InscriptionOption = {
  value: string;   // NO_INSCRIPTION
  label: string;   // adresse + prix
};

export async function getInscriptionsList(): Promise<InscriptionOption[]> {
  type Row = {
    NO_INSCRIPTION: string;
    NO_CIVIQUE_DEBUT: string | null;
    NOM_RUE_COMPLET: string | null;
    APPARTEMENT: string | null;
    MUNICIPALITE_DESC: string | null;
    PRIX_DEMANDE: number | null;
    GENRE_PROPRIETE_DESC: string | null;
  };

  const result = await runSqlQuery<Row>(
    "LauzonConn",
    `
    SELECT
      i.NO_INSCRIPTION,
      i.NO_CIVIQUE_DEBUT,
      i.NOM_RUE_COMPLET,
      i.APPARTEMENT,
      m.DESCRIPTION AS MUNICIPALITE_DESC,
      i.PRIX_DEMANDE,
      gp.DESCRIPTION_FRANCAISE AS GENRE_PROPRIETE_DESC
    FROM dbo.INSCRIPTIONS i
    LEFT JOIN dbo.MUNICIPALITES m ON m.CODE = i.MUN_CODE
    LEFT JOIN dbo.GENRES_PROPRIETES gp
      ON gp.CATEGORIE_PROPRIETE = i.CATEGORIE_PROPRIETE
     AND gp.GENRE_PROPRIETE = i.GENRE_PROPRIETE
    ORDER BY i.DATE_INSCRIPTION DESC
    `,
  ).catch(() => ({ recordset: [] as Row[] }));

  return result.recordset.map((row) => {
    const parts: string[] = [];
    if (row.NO_CIVIQUE_DEBUT) parts.push(row.NO_CIVIQUE_DEBUT);
    if (row.NOM_RUE_COMPLET) parts.push(row.NOM_RUE_COMPLET);
    if (row.APPARTEMENT) parts.push(`app. ${row.APPARTEMENT}`);
    if (row.MUNICIPALITE_DESC) parts.push(row.MUNICIPALITE_DESC);
    const addr = parts.join(", ") || row.NO_INSCRIPTION;
    const type = row.GENRE_PROPRIETE_DESC ? `${row.GENRE_PROPRIETE_DESC} – ` : "";
    const prix = row.PRIX_DEMANDE
      ? ` (${new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(row.PRIX_DEMANDE)})`
      : "";
    return {
      value: row.NO_INSCRIPTION,
      label: `${type}${addr}${prix}`,
    };
  });
}
