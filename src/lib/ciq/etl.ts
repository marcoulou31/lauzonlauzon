import AdmZip from "adm-zip";
import { getSqlPool, runSqlQuery } from "@/lib/sql";
import type { SqlConnectionName } from "@/lib/sql-config";
import { decodeAnsi, parseCsvLine, splitLines } from "@/lib/ciq/csv";
import { coerceValue, getTableColumns, mssqlTypeFor } from "@/lib/ciq/schema";
import type { ZipSource } from "@/lib/ciq/source";

// Tables ignorées par le chargement (identique à l'ancien code VB.NET).
const EXCLUDED_TABLES = new Set(["oper", "pagesweb", "usager", "quartiers"]);

export type EtlResult = {
  processedZips: string[];
  loadedTables: { table: string; rows: number }[];
  skippedTables: string[];
  lastUnzipDate: string | null;
};

export type DryRunResult = {
  availableZips: { name: string; date: string }[];
  newestZip: string | null;
  entries: string[];
};

/**
 * Test sans écriture en base : liste les archives disponibles sur la source et
 * décompresse la plus récente en mémoire pour valider connexion + unzip.
 */
export async function dryRunCiqEtl(source: ZipSource): Promise<DryRunResult> {
  const zips = await source.listNewZips(new Date(0));

  if (zips.length === 0) {
    return { availableZips: [], newestZip: null, entries: [] };
  }

  const newest = zips[zips.length - 1];
  const archive = new AdmZip(await source.fetchZip(newest));
  const entries = archive
    .getEntries()
    .filter((entry) => !entry.isDirectory)
    .map((entry) => entry.entryName);

  return {
    availableZips: zips.map((z) => ({
      name: z.name,
      date: z.date.toISOString().slice(0, 10),
    })),
    newestZip: newest.name,
    entries,
  };
}

/**
 * Reproduit `tacheCIQ.aspx.vb` : décompresse les archives quotidiennes de la
 * CIQ, puis recharge (TRUNCATE + bulk insert) chaque table SQL à partir du
 * fichier .TXT correspondant.
 */
export async function runCiqEtl(
  source: ZipSource,
  connectionName: SqlConnectionName = "LauzonConn",
  options: { force?: boolean } = {},
): Promise<EtlResult> {
  const lastUnzip = await getLastUnzipDate(connectionName);
  // En mode force, on ignore la dernière date traitée pour rejouer le dernier zip.
  const since = options.force ? new Date(0) : lastUnzip;
  const allZips = await source.listNewZips(since);

  if (allZips.length === 0) {
    return {
      processedZips: [],
      loadedTables: [],
      skippedTables: [],
      lastUnzipDate: lastUnzip.toISOString(),
    };
  }

  // Chaque archive quotidienne est un snapshot complet : on ne charge que le
  // jour le plus récent (ainsi que ses éventuelles variantes « -0..-n » du même
  // jour), ce qui suffit et évite de rejouer les jours intermédiaires.
  const maxDate = allZips[allZips.length - 1].date;
  const zips = allZips.filter((z) => z.date.getTime() === maxDate.getTime());

  // Décompression en mémoire des zip du jour retenu (les variantes se complètent).
  const files = new Map<string, Buffer>();

  for (const ref of zips) {
    const archive = new AdmZip(await source.fetchZip(ref));
    for (const entry of archive.getEntries()) {
      if (entry.isDirectory) continue;
      const entryName = entry.entryName.split("/").pop() ?? entry.entryName;
      files.set(entryName.toUpperCase(), entry.getData());
    }
  }

  await setLastUnzipDate(connectionName, maxDate);

  const tables = await getUserTables(connectionName);
  const loadedTables: { table: string; rows: number }[] = [];
  const skippedTables: string[] = [];

  for (const table of tables) {
    const content = files.get(`${table.toUpperCase()}.TXT`);
    if (!content) {
      skippedTables.push(table);
      continue;
    }
    const rows = await loadTable(connectionName, table, content);
    loadedTables.push({ table, rows });
  }

  return {
    processedZips: zips.map((z) => z.name),
    loadedTables,
    skippedTables,
    lastUnzipDate: maxDate.toISOString(),
  };
}

async function getLastUnzipDate(
  connectionName: SqlConnectionName,
): Promise<Date> {
  const result = await runSqlQuery<{ Unzip: Date | null }>(
    connectionName,
    "SELECT Unzip FROM Oper",
  );
  const value = result.recordset[0]?.Unzip;
  return value ? new Date(value) : new Date(0);
}

async function setLastUnzipDate(
  connectionName: SqlConnectionName,
  date: Date,
): Promise<void> {
  await runSqlQuery(connectionName, "UPDATE Oper SET Unzip = @unzip", {
    unzip: date,
  });
}

async function getUserTables(
  connectionName: SqlConnectionName,
): Promise<string[]> {
  const result = await runSqlQuery<{ name: string }>(
    connectionName,
    "SELECT name FROM sysobjects WHERE xtype = 'U'",
  );
  return result.recordset
    .map((row) => row.name)
    .filter((name) => !EXCLUDED_TABLES.has(name.toLowerCase()));
}

/**
 * TRUNCATE puis rechargement d'une table à partir du contenu de son .TXT, via
 * des INSERT paramétrés par lots (robuste et indépendant de la collation, au
 * contraire du bulk BCP qui exige la collation sur chaque colonne char).
 */
async function loadTable(
  connectionName: SqlConnectionName,
  tableName: string,
  content: Buffer,
): Promise<number> {
  const columns = await getTableColumns(connectionName, tableName);
  if (columns.length === 0) return 0;

  const rows = splitLines(decodeAnsi(content)).map((line) => {
    const tokens = parseCsvLine(line);
    return columns.map((column, index) =>
      index < tokens.length ? coerceValue(tokens[index], column) : null,
    );
  });

  const pool = await getSqlPool(connectionName);
  await pool.request().query(`TRUNCATE TABLE [${tableName}]`);

  if (rows.length === 0) return 0;

  const columnList = columns.map((c) => `[${c.name}]`).join(", ");
  // Limite SQL Server : 2100 paramètres par requête. On garde une marge.
  const rowsPerBatch = Math.max(1, Math.floor(2000 / columns.length));

  for (let start = 0; start < rows.length; start += rowsPerBatch) {
    const batch = rows.slice(start, start + rowsPerBatch);
    const request = pool.request();
    const valueClauses = batch.map((row, r) => {
      const placeholders = columns.map((column, i) => {
        const param = `p${r}_${i}`;
        request.input(param, mssqlTypeFor(column), row[i]);
        return `@${param}`;
      });
      return `(${placeholders.join(", ")})`;
    });

    const query = `INSERT INTO [${tableName}] (${columnList}) VALUES ${valueClauses.join(", ")}`;
    try {
      await request.query(query);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Insert ${tableName} échoué (lignes ${start}-${start + batch.length - 1}): ${message}`);
    }
  }

  return rows.length;
}
