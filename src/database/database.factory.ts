import { DrizzlePostgresConfig } from "@knaadh/nestjs-drizzle-postgres";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "./config.js";
import schema from "./schema/index.js";

export function useDatabaseFactory(config: ConfigService<DatabaseConfig>): DrizzlePostgresConfig {
  return {
    postgres: {
      url: config.getOrThrow("APP_DATABASE_URL"),
    },
    config: {
      schema,
    },
  };
}
