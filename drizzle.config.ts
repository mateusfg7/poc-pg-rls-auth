import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema/**",
  dialect: "postgresql",
  entities: {
    roles: true,
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
