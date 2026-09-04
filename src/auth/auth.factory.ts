import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, organization } from "better-auth/plugins";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export function useAuthFactory(database: PostgresJsDatabase) {
  const auth = betterAuth({
    database: drizzleAdapter(database, {
      provider: "pg",
    }),

    emailAndPassword: {
      enabled: true,
    },

    plugins: [organization(), openAPI()],
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
