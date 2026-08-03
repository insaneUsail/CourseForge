import { z } from "zod";

export const submitAttemptSchema = z.object({
  quizId: z.string().min(1),
  classId: z.string().min(1),
  answers: z.record(z.string(), z.number().int().min(0)), // questionId -> selectedOptionIndex
  startedAt: z.string().datetime(),
});

export type SubmitAttemptInput = z.infer<typeof submitAttemptSchema>;
