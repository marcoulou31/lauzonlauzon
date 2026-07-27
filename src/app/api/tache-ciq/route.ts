import { NextResponse } from "next/server";
import { dryRunCiqEtl, runCiqEtl } from "@/lib/ciq/etl";
import { ftpSourceFromEnv } from "@/lib/ciq/ftp-source";
import { LocalDirZipSource } from "@/lib/ciq/source";

// Toujours exécuté à la demande (déclenché par Vercel Cron), jamais mis en cache.
export const dynamic = "force-dynamic";
// L'ETL peut être long (téléchargement + inserts de plusieurs tables).
export const maxDuration = 300;

/**
 * Endpoint appelé quotidiennement par Vercel Cron (voir vercel.json).
 *
 * Sources, par ordre de priorité :
 *  - Source FTP (vars CIQ_FTP_*) : ETL Node.js (portage de tacheCIQ.aspx.vb) qui
 *    tire les archives puis recharge les tables SQL Server.
 *  - Dossier local `CIQ_ZIP_DIR` : même ETL, source fichiers (tests/backfill).
 *
 * Protégé par CRON_SECRET : Vercel envoie automatiquement l'en-tête
 * `Authorization: Bearer ${CRON_SECRET}` si la variable est définie.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const ftpSource = ftpSourceFromEnv();
  const zipDir = process.env.CIQ_ZIP_DIR;
  const params = new URL(request.url).searchParams;
  const isDryRun = params.get("dryRun") === "1";
  const force = params.get("force") === "1";

  try {
    const source = ftpSource ?? (zipDir ? new LocalDirZipSource(zipDir) : null);

    // Test sans écriture en base : valide FTP + décompression uniquement.
    if (isDryRun) {
      if (!source) {
        return NextResponse.json(
          { ok: false, error: "Aucune source configurée (CIQ_FTP_* ou CIQ_ZIP_DIR)." },
          { status: 400 },
        );
      }
      const result = await dryRunCiqEtl(source);
      return NextResponse.json({ ok: true, mode: "dry-run", ...result });
    }

    if (source) {
      const result = await runCiqEtl(source, "LauzonConn", { force });
      return NextResponse.json({ ok: true, mode: "etl", ...result });
    }

    return NextResponse.json(
      { ok: false, error: "Aucune source configurée (CIQ_FTP_* ou CIQ_ZIP_DIR)." },
      { status: 500 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
