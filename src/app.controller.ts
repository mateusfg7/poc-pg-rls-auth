import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service.js";
import { createTodoDtoSchema, type CreateTodoDto } from "./dtos/todo.dto.js";
import { RequireActiveOrg, Session, type UserSession } from "@thallesp/nestjs-better-auth";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @RequireActiveOrg()
  @Post("todo")
  async createTodo(
    @Session() session: UserSession,
    @Body({ schema: createTodoDtoSchema }) dto: CreateTodoDto,
  ) {
    return await this.appService.createTodo(
      dto,
      session.user.id,
      session.session.activeOrganizationId!,
    );
  }

  // @RequireActiveOrg()
  @Get("todo")
  async listTodo() {
    return await this.appService.listOrgTodo();
  }
}
