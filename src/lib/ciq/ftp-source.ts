import { Client } from "basic-ftp";
import { Writable } from "node:stream";
import { parseZipDate, type ZipRef, type ZipSource } from "@/lib/ciq/source";

export type FtpConfig = {
  host: string;
  user: string;
  password: string;
  /** Répertoire distant contenant les archives (par défaut la racine). */
  directory?: string;
  /** FTPS explicite (AUTH TLS). Par défaut false. */
  secure?: boolean;
};

/**
 * Source qui télécharge (pull) les archives CIQ depuis un serveur FTP/FTPS.
 * Une connexion est ouverte puis fermée à chaque opération, ce qui convient
 * bien à un contexte serverless (Vercel).
 */
export class FtpZipSource implements ZipSource {
  constructor(private readonly config: FtpConfig) {}

  private async withClient<T>(fn: (client: Client) => Promise<T>): Promise<T> {
    const client = new Client();
    try {
      await client.access({
        host: this.config.host,
        user: this.config.user,
        password: this.config.password,
        secure: this.config.secure ?? false,
      });
      if (this.config.directory) {
        await client.cd(this.config.directory);
      }
      return await fn(client);
    } finally {
      client.close();
    }
  }

  async listNewZips(since: Date): Promise<ZipRef[]> {
    return this.withClient(async (client) => {
      const entries = await client.list();
      const refs: ZipRef[] = [];

      for (const entry of entries) {
        if (entry.isDirectory) continue;
        const date = parseZipDate(entry.name);
        if (date && date.getTime() > since.getTime()) {
          refs.push({ name: entry.name, date });
        }
      }

      return refs.sort((a, b) => a.date.getTime() - b.date.getTime());
    });
  }

  async fetchZip(ref: ZipRef): Promise<Buffer> {
    return this.withClient(async (client) => {
      const chunks: Buffer[] = [];
      const sink = new Writable({
        write(chunk, _encoding, callback) {
          chunks.push(Buffer.from(chunk));
          callback();
        },
      });

      await client.downloadTo(sink, ref.name);
      return Buffer.concat(chunks);
    });
  }
}

/**
 * Construit une FtpZipSource à partir des variables d'environnement, ou `null`
 * si la configuration FTP n'est pas présente.
 */
export function ftpSourceFromEnv(): FtpZipSource | null {
  const host = process.env.CIQ_FTP_HOST;
  const user = process.env.CIQ_FTP_USER;
  const password = process.env.CIQ_FTP_PASSWORD;

  if (!host || !user || !password) return null;

  return new FtpZipSource({
    host,
    user,
    password,
    directory: process.env.CIQ_FTP_DIR,
    secure: process.env.CIQ_FTP_SECURE === "true",
  });
}
