import { z } from "zod";

export const createChapterSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  isPublic: z.boolean().default(false),
  classId: z.string().min(1, "Class ID is required"),
});

export const updateChapterSchema = z.object({
  chapterId: z.string().min(1),
  title: z.string().min(2).max(200).optional(),
  isPublic: z.boolean().optional(),
});

export const markCompletedSchema = z.object({
  chapterId: z.string().min(1),
});

export type CreateChapterInput = z.infer<typeof createChapterSchema>;
export type UpdateChapterInput = z.infer<typeof updateChapterSchema>;
