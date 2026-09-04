import z from "zod";

export const DatabaseConfigSchema = z.object({
  DATABASE_URL: z.url(),
  APP_DATABASE_URL: z.url(),
});

export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;
