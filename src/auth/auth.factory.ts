import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, organization } from "better-auth/plugins";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import schema from "../database/schema/index.js";
import { asc, eq } from "drizzle-orm";

export function useAuthFactory(db: PostgresJsDatabase) {
  const getInitialOrganizationId = async (userId: string) => {
    const memberships = await db
      .select()
      .from(schema.member)
      .where(eq(schema.member.userId, userId))
      .orderBy(asc(schema.member.createdAt));

    if (memberships.length > 0) {
      return memberships[0].organizationId;
    }
  };

  const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
    }),

    emailAndPassword: {
      enabled: true,
    },

    plugins: [organization(), openAPI()],

    databaseHooks: {
      session: {
        create: {
          before: async (session) => {
            const organizationId = await getInitialOrganizationId(session.userId);
            return { data: { ...session, activeOrganizationId: organizationId } };
          },
        },
      },
    },
  });

  return {
    auth,
    bodyParser: {
      json: { limit: "2mb" },
      urlencoded: { limit: "2mb", extended: true },
      rawBody: true,
    },
  };
}
