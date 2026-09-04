import { Injectable, Logger } from "@nestjs/common";
import schema from "./database/schema/index.js";
import { CreateTodoDto } from "./dtos/todo.dto.js";
import { DatabaseService } from "./database/database.service.js";

@Injectable()
export class AppService {
  private readonly logger = new Logger();

  public constructor(private db: DatabaseService) {}

  async getHello(): Promise<string> {
    const users = await this.db.run((tx) => tx.select().from(schema.user));
    const orgs = await this.db.run((tx) => tx.select().from(schema.organization));
    const todos = await this.db.run((tx) => tx.select().from(schema.todo));

    this.logger.log({ users, orgs, todos });

    return "Hello World!";
  }

  async createTodo(dto: CreateTodoDto, userId: string, organizationId: string) {
    const todo = await this.db.run((tx) =>
      tx
        .insert(schema.todo)
        .values({
          title: dto.title,
          description: dto.descriptions,
          userId,
          organizationId,
        })
        .returning(),
    );

    return todo;
  }

  async listOrgTodo() {
    return await this.db.run((tx) => tx.select().from(schema.todo));
  }
}
