import { DrizzlePostgresModule } from "@knaadh/nestjs-drizzle-postgres";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseConfigSchema } from "./config.js";
import { useDatabaseFactory } from "./database.factory.js";
import { DATABASE } from "./database.constant.js";

@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      tag: DATABASE,
      inject: [ConfigService],
      imports: [
        ConfigModule.forRoot({
          validationSchema: DatabaseConfigSchema,
        }),
      ],
      useFactory: useDatabaseFactory,
    }),
  ],
  exports: [DrizzlePostgresModule],
})
export class DatabaseModule {}
