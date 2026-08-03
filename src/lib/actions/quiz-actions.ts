"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import {
  createQuizSchema,
  createQuestionSchema,
  updateQuestionSchema,
} from "@/lib/validations/quiz";
import { revalidatePath } from "next/cache";

export type ActionResult = {
  error?: string;
  success?: boolean;
  data?: Record<string, unknown>;
};

/**
 * Create a quiz in a chapter (owner only)
 */
export async function createQuiz(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const parsed = createQuizSchema.safeParse({
    chapterId: formData.get("chapterId"),
    stage: formData.get("stage"),
    isEvaluation: formData.get("isEvaluation") === "true",
    timerSeconds: Number(formData.get("timerSeconds")),
    maxAttempts: formData.get("maxAttempts")
      ? Number(formData.get("maxAttempts"))
      : null,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const chapter = await db.chapter.findUnique({
    where: { id: parsed.data.chapterId },
  });

  if (!chapter || chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can create quizzes" };
  }

  // Final quiz: check chapter isn't already completed if we're adding new quizzes
  if (parsed.data.stage === "FINAL") {
    const existingFinal = await db.quiz.findFirst({
      where: { chapterId: parsed.data.chapterId, stage: "FINAL" },
    });
    if (existingFinal) {
      return { error: "A final quiz already exists for this chapter" };
    }
  }

  const quiz = await db.quiz.create({
    data: {
      chapterId: parsed.data.chapterId,
      stage: parsed.data.stage,
      isEvaluation: parsed.data.stage === "FINAL" ? parsed.data.isEvaluation : false,
      timerSeconds: parsed.data.timerSeconds,
      maxAttempts:
        parsed.data.stage === "FINAL" && parsed.data.isEvaluation
          ? parsed.data.maxAttempts
          : null,
    },
  });

  revalidatePath(`/teacher/chapters/${parsed.data.chapterId}/edit`);
  return { success: true, data: { quizId: quiz.id } };
}

/**
 * Add a question to a quiz (chapter owner only)
 */
export async function addQuestion(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const optionsRaw = formData.get("options");
  let options: string[];
  try {
    options = JSON.parse(optionsRaw as string);
  } catch {
    return { error: "Invalid options format" };
  }

  const parsed = createQuestionSchema.safeParse({
    quizId: formData.get("quizId"),
    questionText: formData.get("questionText"),
    options,
    correctOptionIndex: Number(formData.get("correctOptionIndex")),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  if (parsed.data.correctOptionIndex >= parsed.data.options.length) {
    return { error: "Correct option index is out of range" };
  }

  // Verify ownership through quiz -> chapter
  const quiz = await db.quiz.findUnique({
    where: { id: parsed.data.quizId },
    include: { chapter: true },
  });

  if (!quiz || quiz.chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can add questions" };
  }

  await db.question.create({
    data: {
      quizId: parsed.data.quizId,
      questionText: parsed.data.questionText,
      options: parsed.data.options,
      correctOptionIndex: parsed.data.correctOptionIndex,
    },
  });

  revalidatePath(`/teacher/chapters/${quiz.chapterId}/edit`);
  return { success: true };
}

/**
 * Update a question (chapter owner only)
 */
export async function updateQuestion(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const optionsRaw = formData.get("options");
  let options: string[] | undefined;
  if (optionsRaw) {
    try {
      options = JSON.parse(optionsRaw as string);
    } catch {
      return { error: "Invalid options format" };
    }
  }

  const parsed = updateQuestionSchema.safeParse({
    questionId: formData.get("questionId"),
    questionText: formData.get("questionText") || undefined,
    options,
    correctOptionIndex: formData.has("correctOptionIndex")
      ? Number(formData.get("correctOptionIndex"))
      : undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const question = await db.question.findUnique({
    where: { id: parsed.data.questionId },
    include: { quiz: { include: { chapter: true } } },
  });

  if (!question || question.quiz.chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can edit questions" };
  }

  await db.question.update({
    where: { id: parsed.data.questionId },
    data: {
      ...(parsed.data.questionText && {
        questionText: parsed.data.questionText,
      }),
      ...(parsed.data.options && { options: parsed.data.options }),
      ...(parsed.data.correctOptionIndex !== undefined && {
        correctOptionIndex: parsed.data.correctOptionIndex,
      }),
    },
  });

  revalidatePath(
    `/teacher/chapters/${question.quiz.chapterId}/edit`
  );
  return { success: true };
}

/**
 * Delete a question (chapter owner only)
 */
export async function deleteQuestion(
  questionId: string
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const question = await db.question.findUnique({
    where: { id: questionId },
    include: { quiz: { include: { chapter: true } } },
  });

  if (!question || question.quiz.chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can delete questions" };
  }

  await db.question.delete({ where: { id: questionId } });

  revalidatePath(
    `/teacher/chapters/${question.quiz.chapterId}/edit`
  );
  return { success: true };
}

/**
 * Delete a quiz (chapter owner only)
 */
export async function deleteQuiz(quizId: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const quiz = await db.quiz.findUnique({
    where: { id: quizId },
    include: { chapter: true },
  });

  if (!quiz || quiz.chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can delete quizzes" };
  }

  await db.quiz.delete({ where: { id: quizId } });

  revalidatePath(`/teacher/chapters/${quiz.chapterId}/edit`);
  return { success: true };
}
