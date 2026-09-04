import { Module } from "@nestjs/common";
import { AppService } from "./app.service.js";
import { AppController } from "./app.controller.js";
import { DatabaseModule } from "./database/database.module.js";
import { AuthModule } from "./auth/auth.module.js";
import { ClsModule } from "nestjs-cls";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { OrgContextInterceptor } from "./auth/org-context.interceptor.js";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,

    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: OrgContextInterceptor,
    },
  ],
})
export class AppModule {}
