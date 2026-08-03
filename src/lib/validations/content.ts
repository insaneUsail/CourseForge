import { z } from "zod";

export const createContentSchema = z.object({
  chapterId: z.string().min(1),
  title: z.string().optional(),
  text: z.string().min(1, "Content cannot be empty"),
});

export const updateContentSchema = z.object({
  contentId: z.string().min(1),
  title: z.string().optional(),
  text: z.string().min(1, "Content cannot be empty"),
});

export const deleteContentSchema = z.object({
  contentId: z.string().min(1),
});

export type CreateContentInput = z.infer<typeof createContentSchema>;
export type UpdateContentInput = z.infer<typeof updateContentSchema>;
