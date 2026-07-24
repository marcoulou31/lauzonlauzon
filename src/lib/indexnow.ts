import { getAllInscriptionsForPage } from "@/lib/inscriptions";

/**
 * Clé IndexNow. Elle n'est pas secrète : elle est exposée publiquement à
 * `${SITE_URL}/${INDEXNOW_KEY}.txt` pour prouver la propriété du domaine.
 * Le fichier public/093af38048a029e394f787a4417c11d8.txt doit contenir cette
 * même valeur.
 */
export const INDEXNOW_KEY = "093af38048a029e394f787a4417c11d8";

export const SITE_URL = "https://lauzonlauzon.ca";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * Construit la liste complète des URLs à soumettre : pages statiques + fiches
 * de propriétés (statiques et inscriptions Centris actives).
 */
export async function collectSiteUrls(): Promise<string[]> {
  const staticRoutes = [
    "",
    "/proprietes",
    "/proprietes-vendues",
    "/a-propos",
    "/contact",
    "/calculette",
    "/guides",
  ];

  const inscriptions = await getAllInscriptionsForPage();
  const propertySlugs = new Set<string>(
    inscriptions.map((property) => property.slug),
  );

  const urls = [
    ...staticRoutes.map((route) => `${SITE_URL}${route}`),
    ...[...propertySlugs].map((slug) => `${SITE_URL}/proprietes/${slug}`),
  ];

  return urls;
}

/**
 * Notifie IndexNow (Bing, Yandex…) qu'un ensemble d'URLs a changé.
 * IndexNow accepte jusqu'à 10 000 URLs par requête.
 */
export async function submitToIndexNow(urls: string[]): Promise<{
  ok: boolean;
  status: number;
  submitted: number;
}> {
  if (urls.length === 0) {
    return { ok: true, status: 200, submitted: 0 };
  }

  const host = new URL(SITE_URL).host;

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  return { ok: response.ok, status: response.status, submitted: urls.length };
}
