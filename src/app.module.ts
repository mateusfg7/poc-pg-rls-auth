import { Module } from "@nestjs/common";
import { AppService } from "./app.service.js";
import { AppController } from "./app.controller.js";
import { DatabaseModule } from "./database/database.module.js";
import { AuthModule } from "./auth/auth.module.js";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
