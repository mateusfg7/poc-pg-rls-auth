import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { DB_APP } from "./database.constant.js";
import { PostgresJsDatabase, PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import { ClsService } from "nestjs-cls";
import { PgTransaction } from "drizzle-orm/pg-core";
import { ExtractTablesWithRelations, sql } from "drizzle-orm";

type DrizzleTx = PgTransaction<
  PostgresJsQueryResultHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>;

class MissingTransactionContext extends UnauthorizedException {}

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(DB_APP) private db: PostgresJsDatabase,
    private readonly cls: ClsService,
  ) {}

  run<T>(fn: (tx: DrizzleTx) => Promise<T>): Promise<T> {
    const orgId = this.cls.get("organizationId");
    if (!orgId) throw new MissingTransactionContext();

    return this.db.transaction(async (tx) => {
      await tx.execute(sql`select set_config('app.org_id', ${orgId}, true)`);
      return fn(tx);
    });
  }
}
