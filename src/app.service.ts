import { Inject, Injectable, Logger } from "@nestjs/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import schema from "./database/schema/index.js";
import { DATABASE } from "./database/database.constant.js";

@Injectable()
export class AppService {
  private readonly logger = new Logger();

  public constructor(@Inject(DATABASE) private db: PostgresJsDatabase) {}

  async getHello(): Promise<string> {
    const users = await this.db.select().from(schema.user);
    const organizations = await this.db.select().from(schema.organization);

    this.logger.log(users);
    this.logger.log(organizations);

    return "Hello World!";
  }
}
