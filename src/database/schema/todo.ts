import { boolean, pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { organization, user } from "./auth.js";
import { relations, sql } from "drizzle-orm";

export const todo = pgTable(
  "todo",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    description: text(),
    checked: boolean().default(false),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    pgPolicy("todo_org_isolation", {
      as: "permissive",
      for: "all",
      to: "app",
      using: sql`${t.organizationId} = (select current_setting('app.org_id', true))`,
      withCheck: sql`${t.organizationId} = (select current_setting('app.org_id', true))`,
    }),
  ],
);

export const todoRelations = relations(todo, ({ one }) => ({
  user: one(user, {
    fields: [todo.userId],
    references: [user.id],
  }),
  organization: one(organization, {
    fields: [todo.organizationId],
    references: [organization.id],
  }),
}));
