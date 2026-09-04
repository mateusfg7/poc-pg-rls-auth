import { Inject, Injectable, Logger } from "@nestjs/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { usersTable } from "./database/schema.js";

@Injectable()
export class AppService {
  private readonly logger = new Logger();

  public constructor(@Inject("DB_PROD") private db: PostgresJsDatabase) {}

  async getHello(): Promise<string> {
    const users = await this.db.select().from(usersTable);

    this.logger.log(users);

    return "Hello World!";
  }
}
