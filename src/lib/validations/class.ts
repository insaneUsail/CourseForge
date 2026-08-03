import { z } from "zod";

export const createClassSchema = z.object({
  name: z.string().min(2, "Class name must be at least 2 characters").max(100),
});

export const joinClassSchema = z.object({
  key: z.string().min(1, "Class key is required").max(10),
  rollNo: z.string().min(1, "Roll number is required").max(50),
  school: z.string().min(1, "School name is required").max(200),
});

export type CreateClassInput = z.infer<typeof createClassSchema>;
export type JoinClassInput = z.infer<typeof joinClassSchema>;
