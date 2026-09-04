import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { Observable } from "rxjs";
import { type UserSession } from "@thallesp/nestjs-better-auth";

@Injectable()
export class OrgContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const session: UserSession | undefined = req.session;

    const organizationId = session?.session?.activeOrganizationId;
    if (organizationId) {
      this.cls.set("organizationId", organizationId);
    }

    return next.handle();
  }
}
