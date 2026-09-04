import { DrizzlePostgresModule } from "@knaadh/nestjs-drizzle-postgres";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseConfigSchema } from "./config.js";
import { useDatabaseFactory } from "./database.factory.js";
import { DB_APP } from "./database.constant.js";
import { DatabaseService } from "./database.service.js";

@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      tag: DB_APP,
      inject: [ConfigService],
      imports: [
        ConfigModule.forRoot({
          validationSchema: DatabaseConfigSchema,
        }),
      ],
      useFactory: useDatabaseFactory,
    }),
  ],
  exports: [DrizzlePostgresModule, DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule {}
