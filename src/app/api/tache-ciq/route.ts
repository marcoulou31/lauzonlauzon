import { NextResponse } from "next/server";

// Toujours exécuté à la demande (déclenché par Vercel Cron), jamais mis en cache.
export const dynamic = "force-dynamic";

const TACHE_CIQ_URL = "http://xgestion-001-site2.gtempurl.com/tacheCIQ.aspx";

/**
 * Endpoint appelé quotidiennement par Vercel Cron (voir vercel.json).
 * Il déclenche la tâche CIQ hébergée sur le serveur externe.
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

  try {
    const response = await fetch(TACHE_CIQ_URL, {
      method: "GET",
      cache: "no-store",
    });

    return NextResponse.json(
      { ok: response.ok, upstreamStatus: response.status },
      { status: response.ok ? 200 : 502 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
