const SQL_CONNECTIONS = {
  LauzonConn: "LAUZON_CONNECTION_STRING",
} as const;

export type SqlConnectionName = keyof typeof SQL_CONNECTIONS;

export const sqlConnectionNames = Object.keys(
  SQL_CONNECTIONS,
) as SqlConnectionName[];

export function normalizeSqlConnectionName(
  value: string,
): SqlConnectionName | null {
  const normalizedValue = value.toLowerCase();

  return (
    sqlConnectionNames.find(
      (connectionName) => connectionName.toLowerCase() === normalizedValue,
    ) ?? null
  );
}

export function getSqlConnectionString(name: SqlConnectionName): string {
  const envName = SQL_CONNECTIONS[name];
  const connectionString = process.env[envName];

  if (!connectionString) {
    throw new Error(
      `La variable d'environnement ${envName} est requise pour la connexion ${name}.`,
    );
  }

  return connectionString;
}
