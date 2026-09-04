import z from "zod";

export const createTodoDtoSchema = z.object({
  title: z.string(),
  descriptions: z.string().optional(),
});

export type CreateTodoDto = z.infer<typeof createTodoDtoSchema>;
