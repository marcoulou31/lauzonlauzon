import sql from "mssql";
import { getSqlConnectionString, type SqlConnectionName } from "@/lib/sql-config";

type SqlPoolCache = Partial<
  Record<SqlConnectionName, Promise<sql.ConnectionPool>>
>;

declare global {
  var __lauzonSqlPools: SqlPoolCache | undefined;
}

const sqlPools = globalThis.__lauzonSqlPools ?? {};

globalThis.__lauzonSqlPools = sqlPools;

export async function getSqlPool(
  connectionName: SqlConnectionName,
): Promise<sql.ConnectionPool> {
  const existingPool = sqlPools[connectionName];

  if (existingPool) {
    return existingPool;
  }

  const config = sql.ConnectionPool.parseConnectionString(
    getSqlConnectionString(connectionName),
  );

  config.options = {
    ...config.options,
    encrypt: true,
    trustServerCertificate: false,
  };

  const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .catch((error) => {
      delete sqlPools[connectionName];
      throw error;
    });

  sqlPools[connectionName] = poolPromise;

  return poolPromise;
}

export async function runSqlQuery<T extends Record<string, unknown>>(
  connectionName: SqlConnectionName,
  query: string,
  params?: Record<string, unknown>,
): Promise<sql.IResult<T>> {
  const pool = await getSqlPool(connectionName);
  const request = pool.request();

  if (params) {
    for (const [name, value] of Object.entries(params)) {
      request.input(name, value);
    }
  }

  return request.query<T>(query);
}
