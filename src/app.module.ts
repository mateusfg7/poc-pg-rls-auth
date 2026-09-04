import { Module } from "@nestjs/common";
import { AppService } from "./app.service.js";
import { AppController } from "./app.controller.js";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseConfig, DatabaseConfigSchema } from "./database/config.js";
import { DrizzlePostgresModule } from "@knaadh/nestjs-drizzle-postgres";
import * as schema from "./database/schema.js";

@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      tag: "DB_PROD",
      inject: [ConfigService],
      imports: [
        ConfigModule.forRoot({
          validationSchema: DatabaseConfigSchema,
        }),
      ],
      useFactory: (config: ConfigService<DatabaseConfig>) => ({
        postgres: {
          url: config.getOrThrow("DATABASE_URL"),
        },
        config: {
          schema: { ...schema },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
