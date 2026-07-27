import sql from "mssql";
import { runSqlQuery } from "@/lib/sql";
import type { SqlConnectionName } from "@/lib/sql-config";

export type ColumnSchema = {
  name: string;
  dataType: string;
  maxLength: number | null;
  precision: number | null;
  scale: number | null;
};

type ColumnRow = {
  COLUMN_NAME: string;
  DATA_TYPE: string;
  CHARACTER_MAXIMUM_LENGTH: number | null;
  NUMERIC_PRECISION: number | null;
  NUMERIC_SCALE: number | null;
};

/**
 * Récupère le schéma (colonnes ordonnées) d'une table, comme le VB obtenait
 * les DataColumn via `SELECT * FROM {table}`.
 */
export async function getTableColumns(
  connectionName: SqlConnectionName,
  tableName: string,
): Promise<ColumnSchema[]> {
  const result = await runSqlQuery<ColumnRow>(
    connectionName,
    `SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_NAME = @tableName
     ORDER BY ORDINAL_POSITION`,
    { tableName },
  );

  return result.recordset.map((row) => ({
    name: row.COLUMN_NAME,
    dataType: row.DATA_TYPE.toLowerCase(),
    maxLength: row.CHARACTER_MAXIMUM_LENGTH,
    precision: row.NUMERIC_PRECISION,
    scale: row.NUMERIC_SCALE,
  }));
}

type ColumnCategory = "string" | "int" | "float" | "bit" | "date";

function categoryOf(dataType: string): ColumnCategory {
  switch (dataType) {
    case "int":
    case "bigint":
    case "smallint":
    case "tinyint":
      return "int";
    case "decimal":
    case "numeric":
    case "money":
    case "smallmoney":
    case "float":
    case "real":
      return "float";
    case "bit":
      return "bit";
    case "date":
    case "datetime":
    case "datetime2":
    case "smalldatetime":
      return "date";
    default:
      return "string";
  }
}

/**
 * Retourne le type mssql à utiliser pour une colonne lors du bulk insert.
 */
export function mssqlTypeFor(column: ColumnSchema): sql.ISqlType {
  const len =
    column.maxLength === -1 || column.maxLength === null
      ? sql.MAX
      : column.maxLength;
  const precision = column.precision ?? 18;
  const scale = column.scale ?? 0;

  switch (column.dataType) {
    case "int":
      return sql.Int();
    case "bigint":
      return sql.BigInt();
    case "smallint":
      return sql.SmallInt();
    case "tinyint":
      return sql.TinyInt();
    case "bit":
      return sql.Bit();
    case "decimal":
    case "numeric":
      return sql.Decimal(precision, scale);
    case "money":
      return sql.Money();
    case "smallmoney":
      return sql.SmallMoney();
    case "float":
      return sql.Float();
    case "real":
      return sql.Real();
    case "date":
      return sql.Date();
    case "datetime":
      return sql.DateTime();
    case "datetime2":
      return sql.DateTime2();
    case "smalldatetime":
      return sql.SmallDateTime();
    case "char":
      return sql.Char(typeof len === "number" ? len : undefined);
    case "nchar":
      return sql.NChar(typeof len === "number" ? len : undefined);
    case "nvarchar":
      return sql.NVarChar(len);
    case "text":
      return sql.Text();
    case "ntext":
      return sql.NText();
    case "uniqueidentifier":
      return sql.UniqueIdentifier();
    case "varchar":
    default:
      return sql.VarChar(len);
  }
}

// Formats de date CIQ : "yyyy/MM/dd" ou "yyyy/MM/dd HH:mm:ss".
const DATE_RE = /^(\d{4})\/(\d{2})\/(\d{2})(?:\s+(\d{2}):(\d{2}):(\d{2}))?$/;

function parseCiqDate(value: string): Date | null {
  const match = DATE_RE.exec(value.trim());
  if (!match) return null;
  const [, y, mo, d, h, mi, s] = match;
  return new Date(
    Number(y),
    Number(mo) - 1,
    Number(d),
    h ? Number(h) : 0,
    mi ? Number(mi) : 0,
    s ? Number(s) : 0,
  );
}

/**
 * Convertit un champ CSV (string ou null) vers la valeur JS attendue par la
 * colonne SQL cible. Reproduit la coercition implicite de l'ancien DataTable.
 */
export function coerceValue(
  raw: string | null,
  column: ColumnSchema,
): string | number | boolean | Date | null {
  if (raw === null || raw === "") return null;

  switch (categoryOf(column.dataType)) {
    case "int": {
      const n = Number.parseInt(raw, 10);
      return Number.isNaN(n) ? null : n;
    }
    case "float": {
      const n = Number.parseFloat(raw);
      return Number.isNaN(n) ? null : n;
    }
    case "bit": {
      const upper = raw.trim().toUpperCase();
      return upper === "1" || upper === "O" || upper === "OUI" || upper === "TRUE";
    }
    case "date":
      return parseCiqDate(raw);
    case "string":
    default:
      return raw;
  }
}
