import { z } from "zod";

export const createQuizSchema = z.object({
  chapterId: z.string().min(1),
  stage: z.enum(["MID_CHAPTER", "FINAL"]),
  isEvaluation: z.boolean().default(false),
  timerSeconds: z.number().int().min(30, "Timer must be at least 30 seconds").max(7200),
  maxAttempts: z.number().int().min(1).nullable().default(null),
});

export const createQuestionSchema = z.object({
  quizId: z.string().min(1),
  questionText: z.string().min(1, "Question text is required"),
  options: z.array(z.string().min(1)).min(2, "At least 2 options required").max(6),
  correctOptionIndex: z.number().int().min(0),
});

export const updateQuestionSchema = z.object({
  questionId: z.string().min(1),
  questionText: z.string().min(1).optional(),
  options: z.array(z.string().min(1)).min(2).max(6).optional(),
  correctOptionIndex: z.number().int().min(0).optional(),
});

export const deleteQuestionSchema = z.object({
  questionId: z.string().min(1),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
