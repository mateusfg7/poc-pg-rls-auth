import { invitation, invitationRelations } from "./auth/invitation.js";
import { todo, todoRelations } from "./todo.js";
import { user, userRelations } from "./auth/user.js";
import { session, sessionRelations } from "./auth/session.js";
import { account, accountRelations } from "./auth/account.js";
import { organization } from "better-auth/plugins";
import { member, memberRelations } from "./auth/member.js";
import { organizationRelations } from "./auth/organization.js";
import { verification } from "./auth/verification.js";

export default {
  account,
  accountRelations,
  session,
  sessionRelations,
  user,
  userRelations,
  verification,
  invitation,
  invitationRelations,
  member,
  memberRelations,
  organization,
  organizationRelations,
  todo,
  todoRelations,
};
