import iconv from "iconv-lite";

/**
 * Décode un buffer de fichier CIQ (.TXT) encodé en Windows-1252 (ANSI),
 * comme le faisait l'ancien code VB.NET (Encoding.Default sur un serveur fr-CA).
 */
export function decodeAnsi(buffer: Buffer): string {
  return iconv.decode(buffer, "win1252");
}

// Sépare une ligne CSV sur les virgules situées hors des guillemets.
// Reproduit exactement la regex de l'ancien code VB.NET.
const CSV_SPLIT = /,(?=(?:[^"]*"[^"]*")*(?![^"]*"))/;

/**
 * Découpe une ligne CSV en champs. Les guillemets sont retirés de chaque champ
 * (comportement identique au VB : `token.Replace("""", "")`).
 * Un champ vide devient `null`.
 */
export function parseCsvLine(line: string): (string | null)[] {
  return line.split(CSV_SPLIT).map((token) => {
    const value = token.replace(/"/g, "");
    return value === "" ? null : value;
  });
}

/**
 * Découpe le contenu texte d'un fichier .TXT en lignes non vides.
 * Le format CIQ n'a pas de ligne d'en-tête : chaque ligne est une donnée.
 */
export function splitLines(content: string): string[] {
  return content.split(/\r\n|\n|\r/).filter((line) => line.length > 0);
}
