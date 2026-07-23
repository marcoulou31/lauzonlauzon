import { NextResponse } from "next/server";
import { collectSiteUrls, submitToIndexNow } from "@/lib/indexnow";

// Toujours exécuté à la demande (déclenché par Vercel Cron), jamais mis en cache.
export const dynamic = "force-dynamic";

/**
 * Endpoint appelé quotidiennement par Vercel Cron (voir vercel.json).
 * Il soumet l'ensemble des URLs du site à IndexNow pour que Bing/Yandex
 * indexent rapidement les nouvelles inscriptions et recrawlent celles retirées.
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
    const urls = await collectSiteUrls();
    const result = await submitToIndexNow(urls);

    return NextResponse.json(
      { ok: result.ok, submitted: result.submitted, indexNowStatus: result.status },
      { status: result.ok ? 200 : 502 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
