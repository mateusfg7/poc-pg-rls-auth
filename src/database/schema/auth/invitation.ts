import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./user.js";
import { organization } from "./organization.js";

export const invitation = pgTable("invitation", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  inviterId: text("inviter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  role: text("role"),
  status: text("status").notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
  expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
});

export const invitationRelations = relations(invitation, ({ one }) => ({
  inviter: one(user, {
    fields: [invitation.inviterId],
    references: [user.id],
  }),
  organization: one(organization, {
    fields: [invitation.organizationId],
    references: [organization.id],
  }),
}));
