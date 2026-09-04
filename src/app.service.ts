import { Inject, Injectable, Logger } from "@nestjs/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import schema from "./database/schema/index.js";

@Injectable()
export class AppService {
  private readonly logger = new Logger();

  public constructor(@Inject("DB_PROD") private db: PostgresJsDatabase) {}

  async getHello(): Promise<string> {
    const users = await this.db.select().from(schema.users);

    this.logger.log(users);

    return "Hello World!";
  }
}
