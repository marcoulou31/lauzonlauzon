import { NextRequest, NextResponse } from "next/server";
import { runSqlQuery } from "@/lib/sql";

export const dynamic = "force-dynamic";

// Champs essentiels affichés par défaut (les 138 colonnes seraient trop lourdes)
const DEFAULT_FIELDS = `
  NO_INSCRIPTION,
  CODE_STATUT,
  PRIX_DEMANDE,
  PRIX_LOCATION_DEMANDE,
  CATEGORIE_PROPRIETE,
  GENRE_PROPRIETE,
  TYPE_BATIMENT,
  NB_CHAMBRES,
  NB_SALLES_BAINS,
  AIRE_HABITABLE,
  UM_AIRE_HABITABLE,
  SUPERFICIE_TERRAIN,
  UM_SUPERFICIE_TERRAIN,
  NO_CIVIQUE_DEBUT,
  NO_CIVIQUE_FIN,
  NOM_RUE_COMPLET,
  APPARTEMENT,
  CODE_POSTAL,
  MUN_CODE,
  QUARTR_CODE,
  ANNEE_CONTRUCTION,
  DATE_INSCRIPTION,
  DATE_EXPIRATION,
  DATE_MODIF,
  AGENT_INSCRIPTEUR_1,
  BUREAU_INSCRIPTEUR_1,
  NOM_FICHIER_PHOTO,
  INCLUS_FRANCAIS,
  EXCLUS_FRANCAIS,
  URL_VISITE_VIRTUELLE_FRANCAIS
`.trim();

type InscriptionRow = Record<string, unknown>;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const limite = Math.min(
    parseInt(searchParams.get("limite") ?? "20", 10),
    200,
  );
  const offset = Math.max(parseInt(searchParams.get("offset") ?? "0", 10), 0);
  const noInscription = searchParams.get("no");
  const statut = searchParams.get("statut");
  const tous = searchParams.get("tous") === "1";

  let whereClause = "WHERE 1=1";
  if (noInscription) {
    whereClause += ` AND NO_INSCRIPTION = '${noInscription.replace(/'/g, "''")}'`;
  }
  if (statut) {
    whereClause += ` AND CODE_STATUT = '${statut.replace(/'/g, "''")}'`;
  }

  const selectFields = tous ? "*" : DEFAULT_FIELDS;

  const query = `
    SELECT ${selectFields}
    FROM dbo.INSCRIPTIONS
    ${whereClause}
    ORDER BY DATE_INSCRIPTION DESC
    OFFSET ${offset} ROWS
    FETCH NEXT ${limite} ROWS ONLY;
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM dbo.INSCRIPTIONS
    ${whereClause};
  `;

  const [result, countResult] = await Promise.all([
    runSqlQuery<InscriptionRow>("LauzonConn", query),
    runSqlQuery<{ total: number }>("LauzonConn", countQuery),
  ]);

  return NextResponse.json({
    total: countResult.recordset[0]?.total ?? 0,
    limite,
    offset,
    inscriptions: result.recordset,
  });
}
