import { Module } from "@nestjs/common";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { DATABASE } from "../database/database.constant.js";
import { useAuthFactory } from "./auth.factory.js";

@Module({
  imports: [
    BetterAuthModule.forRootAsync({
      inject: [DATABASE],
      useFactory: useAuthFactory,
    }),
  ],
  exports: [BetterAuthModule],
})
export class AuthModule {}
