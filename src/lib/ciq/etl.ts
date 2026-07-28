import AdmZip from "adm-zip";
import sql from "mssql";
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
type CiqEtlLogLevel = "INFO" | "ERROR";

type CiqEtlLogEntry = {
  level: CiqEtlLogLevel;
  message: string;
  details?: unknown;
  sourceType?: string;
  connectionName?: SqlConnectionName;
  durationMs?: number;
  processedZips?: string[];
  loadedTables?: { table: string; rows: number }[];
  skippedTables?: string[];
  lastUnzipDate?: string | null;
  errorMessage?: string | null;
};

async function ensureCiqEtlLogsTable(connectionName: SqlConnectionName): Promise<void> {
  await runSqlQuery(
    connectionName,
    `IF OBJECT_ID(N'dbo.CIQ_ETL_LOGS', N'U') IS NULL
     BEGIN
       CREATE TABLE dbo.CIQ_ETL_LOGS (
         Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
         LoggedAt DATETIME2 NOT NULL,
         Level NVARCHAR(20) NOT NULL,
         Message NVARCHAR(500) NOT NULL,
         Details NVARCHAR(MAX) NULL,
         SourceType NVARCHAR(50) NULL,
         ConnectionName NVARCHAR(100) NULL,
         DurationMs INT NULL,
         ProcessedZips NVARCHAR(MAX) NULL,
         LoadedTables NVARCHAR(MAX) NULL,
         SkippedTables NVARCHAR(MAX) NULL,
         LastUnzipDate NVARCHAR(50) NULL,
         ErrorMessage NVARCHAR(500) NULL
       );
     END`,
  );
}

async function logCiqEtlEvent(
  connectionName: SqlConnectionName,
  entry: CiqEtlLogEntry,
): Promise<void> {
  try {
    await ensureCiqEtlLogsTable(connectionName);

    const pool = await getSqlPool(connectionName);
    const request = pool.request();

    request.input("loggedAt", sql.DateTime2(), new Date());
    request.input("level", sql.NVarChar(20), entry.level);
    request.input("message", sql.NVarChar(500), entry.message);
    request.input("details", sql.NVarChar(sql.MAX), entry.details ? JSON.stringify(entry.details) : null);
    request.input("sourceType", sql.NVarChar(50), entry.sourceType ?? null);
    request.input("connectionName", sql.NVarChar(100), entry.connectionName ?? null);
    request.input("durationMs", sql.Int(), entry.durationMs ?? null);
    request.input("processedZips", sql.NVarChar(sql.MAX), entry.processedZips ? JSON.stringify(entry.processedZips) : null);
    request.input("loadedTables", sql.NVarChar(sql.MAX), entry.loadedTables ? JSON.stringify(entry.loadedTables) : null);
    request.input("skippedTables", sql.NVarChar(sql.MAX), entry.skippedTables ? JSON.stringify(entry.skippedTables) : null);
    request.input("lastUnzipDate", sql.NVarChar(50), entry.lastUnzipDate ?? null);
    request.input("errorMessage", sql.NVarChar(500), entry.errorMessage ?? null);

    await request.query(`
      INSERT INTO dbo.CIQ_ETL_LOGS (
        LoggedAt, Level, Message, Details, SourceType, ConnectionName, DurationMs,
        ProcessedZips, LoadedTables, SkippedTables, LastUnzipDate, ErrorMessage
      ) VALUES (
        @loggedAt, @level, @message, @details, @sourceType, @connectionName, @durationMs,
        @processedZips, @loadedTables, @skippedTables, @lastUnzipDate, @errorMessage
      )
    `);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[ciq][etl-log-failed]", { message });
  }
}

export async function dryRunCiqEtl(source: ZipSource): Promise<DryRunResult> {
  const startedAt = Date.now();
  const zips = await source.listNewZips(new Date(0));

  if (zips.length === 0) {
    console.info("[ciq][etl][dry-run]", { availableZips: 0, durationMs: Date.now() - startedAt });
    await logCiqEtlEvent("LauzonConn", {
      level: "INFO",
      message: "CIQ dry-run completed with no available zips",
      sourceType: "dry-run",
      connectionName: "LauzonConn",
      durationMs: Date.now() - startedAt,
      details: { availableZips: 0 },
    });
    return { availableZips: [], newestZip: null, entries: [] };
  }

  const newest = zips[zips.length - 1];
  const archive = new AdmZip(await source.fetchZip(newest));
  const entries = archive
    .getEntries()
    .filter((entry) => !entry.isDirectory)
    .map((entry) => entry.entryName);

  console.info("[ciq][etl][dry-run]", {
    availableZips: zips.length,
    newestZip: newest.name,
    entryCount: entries.length,
    durationMs: Date.now() - startedAt,
  });
  await logCiqEtlEvent("LauzonConn", {
    level: "INFO",
    message: "CIQ dry-run completed",
    sourceType: "dry-run",
    connectionName: "LauzonConn",
    durationMs: Date.now() - startedAt,
    details: {
      availableZips: zips.length,
      newestZip: newest.name,
      entryCount: entries.length,
    },
  });

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
  const startedAt = Date.now();
  const lastUnzip = await getLastUnzipDate(connectionName);
  // En mode force, on ignore la dernière date traitée pour rejouer le dernier zip.
  const since = options.force ? new Date(0) : lastUnzip;
  const allZips = await source.listNewZips(since);

  if (allZips.length === 0) {
    console.info("[ciq][etl][noop]", {
      connectionName,
      since: since.toISOString(),
      lastUnzipDate: lastUnzip.toISOString(),
      durationMs: Date.now() - startedAt,
    });
    await logCiqEtlEvent(connectionName, {
      level: "INFO",
      message: "CIQ ETL skipped because no newer zip was found",
      sourceType: "etl",
      connectionName,
      durationMs: Date.now() - startedAt,
      details: {
        since: since.toISOString(),
        lastUnzipDate: lastUnzip.toISOString(),
      },
      lastUnzipDate: lastUnzip.toISOString(),
    });
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

  console.info("[ciq][etl][start]", {
    connectionName,
    since: since.toISOString(),
    lastUnzipDate: lastUnzip.toISOString(),
    candidateZips: allZips.map((zip) => zip.name),
    selectedZips: zips.map((zip) => zip.name),
  });

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

  console.info("[ciq][etl][success]", {
    connectionName,
    processedZips: zips.map((zip) => zip.name),
    loadedTables,
    skippedTables,
    lastUnzipDate: maxDate.toISOString(),
    durationMs: Date.now() - startedAt,
  });
  await logCiqEtlEvent(connectionName, {
    level: "INFO",
    message: "CIQ ETL completed successfully",
    sourceType: "etl",
    connectionName,
    durationMs: Date.now() - startedAt,
    processedZips: zips.map((zip) => zip.name),
    loadedTables,
    skippedTables,
    lastUnzipDate: maxDate.toISOString(),
  });

  return {
    processedZips: zips.map((z) => z.name),
    loadedTables,
    skippedTables,
    lastUnzipDate: maxDate.toISOString(),
  };
}

export async function logCiqRequestEvent(
  connectionName: SqlConnectionName,
  entry: CiqEtlLogEntry,
): Promise<void> {
  await logCiqEtlEvent(connectionName, entry);
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

  if (rows.length === 0) {
    console.info("[ciq][etl][table]", { tableName, rows: 0, columns: columns.length });
    return 0;
  }

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

  console.info("[ciq][etl][table]", {
    tableName,
    rows: rows.length,
    columns: columns.length,
    batches: Math.ceil(rows.length / Math.max(1, Math.floor(2000 / columns.length))),
  });

  return rows.length;
}
