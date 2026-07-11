import { NextResponse } from "next/server";
import { runSqlQuery } from "@/lib/sql";
import {
  normalizeSqlConnectionName,
  sqlConnectionNames,
} from "@/lib/sql-config";

type DatabaseStatusRow = {
  currentUtc: Date;
  databaseName: string;
  serverName: string;
};

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/db/[connection]">,
) {
  const { connection } = await context.params;
  const connectionName = normalizeSqlConnectionName(connection);

  if (!connectionName) {
    return NextResponse.json(
      {
        error: "Connexion SQL inconnue.",
        availableConnections: sqlConnectionNames,
      },
      { status: 400 },
    );
  }

  const result = await runSqlQuery<DatabaseStatusRow>(
    connectionName,
    `
      SELECT
        DB_NAME() AS databaseName,
        @@SERVERNAME AS serverName,
        GETUTCDATE() AS currentUtc
    `,
  );
  const database = result.recordset[0];

  return NextResponse.json({
    ok: true,
    connection: connectionName,
    database: database.databaseName,
    server: database.serverName,
    currentUtc: database.currentUtc,
  });
}
