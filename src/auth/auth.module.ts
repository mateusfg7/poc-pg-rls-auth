import { Module } from "@nestjs/common";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { DB_APP } from "../database/database.constant.js";
import { useAuthFactory } from "./auth.factory.js";

@Module({
  imports: [
    BetterAuthModule.forRootAsync({
      inject: [DB_APP],
      useFactory: useAuthFactory,
    }),
  ],
  exports: [BetterAuthModule],
})
export class AuthModule {}
