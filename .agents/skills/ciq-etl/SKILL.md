---
name: ciq-etl
description: >
  Work on the Centris/CIQ ETL that imports courtier data into SQL Server.
  Use when editing src/lib/ciq/*, the /api/tache-ciq cron route, the CIQ
  zip/FTP ingestion, the CSV/schema parsing, or when debugging bulk-insert,
  encoding, or Turbopack-bundling issues around mssql/tedious. Ports the
  legacy tacheCIQ.aspx.vb job to Node.js.
---

# CIQ ETL

Node.js port of the legacy `tacheCIQ.aspx.vb` job. The old ASP.NET server
unzipped Centris archives `LAUZON{yyyyMMdd}[-n].zip` and reloaded SQL Server
tables (TRUNCATE + SqlBulkCopy), triggered by `CIQ.vbs` POSTing to
`tacheCIQ.aspx`. This project pulls the zips itself and reloads the same DB.

## Modules

- `src/lib/ciq/csv.ts` — CSV parser (VB regex) + `decodeAnsi`.
- `src/lib/ciq/schema.ts` — `INFORMATION_SCHEMA` lookup, mssql type mapping, `coerceValue`.
- `src/lib/ciq/source.ts` — `ZipSource` interface + `LocalDirZipSource`.
- `src/lib/ciq/ftp-source.ts` — `FtpZipSource` (basic-ftp) + `ftpSourceFromEnv()`.
- `src/lib/ciq/etl.ts` — `runCiqEtl`: unzip in memory (adm-zip), TRUNCATE + batched inserts.
- `src/app/api/tache-ciq/route.ts` — cron entry point.

## Verified facts about CIQ data

- `.TXT` files are **Windows-1252 (ANSI)**, not UTF-8 → decode with iconv-lite `win1252`.
- CSV: separator `,`, text fields quoted with `"`, bare numbers, empty = null. **No header row.**
- Mapping is **positional**: CSV column *i* → SQL column *i* (via the table schema).
- Dates: `yyyy/MM/dd` and `yyyy/MM/dd HH:mm:ss`.
- Tables **excluded** from loading: `Oper`, `pagesweb`, `usager`, `QUARTIERS`.
- `Oper.Unzip` = last processed date (single row). It is advanced **before** the tables load.
- Target DB = the same SQL Server as the app (`LauzonConn` / `SQL5047.site4now.net`).

## Pitfalls (important)

- **mssql bundled by Turbopack** breaks the bulk (`c.type.generateTypeInfo is not a
  function`): referential type equality (`===`) fails across two module copies.
  Fix: `serverExternalPackages: ["mssql","tedious"]` in `next.config.ts` (already set).
- **tedious bulk BCP** requires a collation on every char column; this connection has no
  `databaseCollation` → `Invalid column type from bcp client for colid 1` on nvarchar.
  Fix: dropped the bulk, use **parameterized INSERT batches** (max 2100 params/req,
  `rowsPerBatch = floor(2000 / columnCount)`). Parameterized queries work without collation.

## Ingestion source

`route.ts` priority: `ftpSourceFromEnv()` → else `CIQ_ZIP_DIR` (local) → else legacy ping.

Env vars:

- `CIQ_FTP_HOST` (e.g. `win8067.site4now.net`), `CIQ_FTP_USER`, `CIQ_FTP_PASSWORD` (secret),
  `CIQ_FTP_DIR` (optional), `CIQ_FTP_SECURE` (`"true"` for explicit FTPS).
- `CIQ_ZIP_DIR` — local directory of zips (fallback / dev).

Cron in `vercel.json`: `/api/tache-ciq` at `0 10 * * *` (06:00 EDT).

## Testing

- `?dryRun=1` — list + unzip, no DB writes.
- `?force=1` — replay the last zip, ignoring `Oper.Unzip`.
- Local: `node --env-file=.env.local ...` or `pnpm dev` + `curl`.
- Known-good small-courtier run: DEPENSES:6, PHOTOS:48, CARACTERISTIQUES:51, INSCRIPTIONS:2.

## Security

Never commit SQL credentials. The legacy `web.config` held them in clear text; keep all
secrets in Vercel environment variables.
