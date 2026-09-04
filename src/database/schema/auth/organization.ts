import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { todo } from "../todo.js";
import { member } from "./member.js";

export const organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  logo: text("logo"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
});

export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(member),
  todos: many(todo),
}));
