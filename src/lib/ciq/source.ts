import fs from "node:fs/promises";
import path from "node:path";

export type ZipRef = {
  /** Nom du fichier, ex. "LAUZON20260724.zip" ou "LAUZON20260724-0.zip". */
  name: string;
  /** Date (à minuit, heure locale) encodée dans le nom du fichier. */
  date: Date;
};

/**
 * Source des archives quotidiennes de la CIQ. L'implémentation concrète dépend
 * de l'endroit où Centris dépose les zip (FTP/SFTP, stockage objet, etc.).
 */
export interface ZipSource {
  /** Liste les zip disponibles dont la date est strictement postérieure à `since`. */
  listNewZips(since: Date): Promise<ZipRef[]>;
  /** Télécharge le contenu binaire d'un zip. */
  fetchZip(ref: ZipRef): Promise<Buffer>;
}

// Nom attendu : LAUZONyyyyMMdd.zip ou LAUZONyyyyMMdd-<n>.zip
const ZIP_NAME_RE = /^LAUZON(\d{4})(\d{2})(\d{2})(?:-\d+)?\.zip$/i;

/**
 * Extrait la date d'un nom de fichier CIQ, ou `null` si le nom ne correspond pas.
 */
export function parseZipDate(fileName: string): Date | null {
  const match = ZIP_NAME_RE.exec(fileName);
  if (!match) return null;
  const [, y, mo, d] = match;
  return new Date(Number(y), Number(mo) - 1, Number(d));
}

/**
 * Source basée sur un dossier local (utile pour les tests et un rechargement
 * initial). Sur Vercel, ce dossier ne peut être que `/tmp`.
 */
export class LocalDirZipSource implements ZipSource {
  constructor(private readonly directory: string) {}

  async listNewZips(since: Date): Promise<ZipRef[]> {
    const entries = await fs.readdir(this.directory);
    const refs: ZipRef[] = [];

    for (const name of entries) {
      const date = parseZipDate(name);
      if (date && date.getTime() > since.getTime()) {
        refs.push({ name, date });
      }
    }

    return refs.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async fetchZip(ref: ZipRef): Promise<Buffer> {
    return fs.readFile(path.join(this.directory, ref.name));
  }
}
