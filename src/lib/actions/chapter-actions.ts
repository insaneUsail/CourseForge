"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import {
  createChapterSchema,
  updateChapterSchema,
  markCompletedSchema,
} from "@/lib/validations/chapter";
import { revalidatePath } from "next/cache";

export type ActionResult = {
  error?: string;
  success?: boolean;
  data?: Record<string, unknown>;
};

/**
 * Create a new chapter (teacher only).
 * Auto-links to the specified class via ClassChapterLink.
 */
export async function createChapter(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const parsed = createChapterSchema.safeParse({
    title: formData.get("title"),
    isPublic: formData.get("isPublic") === "true",
    classId: formData.get("classId"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // Verify teacher owns the class
  const classRecord = await db.class.findUnique({
    where: { id: parsed.data.classId },
  });

  if (!classRecord || classRecord.teacherId !== session.user.id) {
    return { error: "You don't own this class" };
  }

  // Create chapter + auto-link to class in a transaction
  const chapter = await db.$transaction(async (tx) => {
    const ch = await tx.chapter.create({
      data: {
        ownerTeacherId: session.user.id,
        title: parsed.data.title,
        isPublic: parsed.data.isPublic,
      },
    });

    await tx.classChapterLink.create({
      data: {
        classId: parsed.data.classId,
        chapterId: ch.id,
      },
    });

    return ch;
  });

  revalidatePath(`/teacher/classes/${parsed.data.classId}`);
  return { success: true, data: { chapterId: chapter.id } };
}

/**
 * Update chapter title / visibility (owner only)
 */
export async function updateChapter(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const parsed = updateChapterSchema.safeParse({
    chapterId: formData.get("chapterId"),
    title: formData.get("title") || undefined,
    isPublic: formData.has("isPublic")
      ? formData.get("isPublic") === "true"
      : undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const chapter = await db.chapter.findUnique({
    where: { id: parsed.data.chapterId },
  });

  if (!chapter || chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can edit it" };
  }

  await db.chapter.update({
    where: { id: parsed.data.chapterId },
    data: {
      ...(parsed.data.title && { title: parsed.data.title }),
      ...(parsed.data.isPublic !== undefined && {
        isPublic: parsed.data.isPublic,
      }),
    },
  });

  revalidatePath(`/teacher/chapters/${parsed.data.chapterId}/edit`);
  return { success: true };
}

/**
 * Mark chapter as completed (owner only).
 * Blocks if zero questions in any quiz.
 */
export async function markChapterCompleted(
  chapterId: string
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const chapter = await db.chapter.findUnique({
    where: { id: chapterId },
    include: {
      quizzes: {
        include: { _count: { select: { questions: true } } },
      },
    },
  });

  if (!chapter || chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can mark it completed" };
  }

  if (chapter.status === "COMPLETED") {
    return { error: "Chapter is already completed" };
  }

  // Check all quizzes have at least one question
  const emptyQuiz = chapter.quizzes.find((q) => q._count.questions === 0);
  if (emptyQuiz) {
    return {
      error: "All quizzes must have at least one question before completing",
    };
  }

  await db.chapter.update({
    where: { id: chapterId },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });

  revalidatePath(`/teacher/chapters/${chapterId}/edit`);
  return { success: true };
}

/**
 * Delete a chapter (owner only).
 * Soft-marks ClassChapterLinks with removedAt.
 */
export async function deleteChapter(
  chapterId: string
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const chapter = await db.chapter.findUnique({
    where: { id: chapterId },
  });

  if (!chapter || chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can delete it" };
  }

  await db.$transaction(async (tx) => {
    // Soft-mark all links as removed
    await tx.classChapterLink.updateMany({
      where: { chapterId },
      data: { removedAt: new Date() },
    });

    // Delete the chapter (cascades to content, quizzes, questions)
    await tx.chapter.delete({ where: { id: chapterId } });
  });

  revalidatePath("/teacher/dashboard");
  return { success: true };
}

/**
 * Get a chapter with all its content and quizzes
 */
export async function getChapterDetail(chapterId: string) {
  const chapter = await db.chapter.findUnique({
    where: { id: chapterId },
    include: {
      owner: { select: { id: true, name: true } },
      contents: { orderBy: { orderIndex: "asc" } },
      quizzes: {
        include: {
          questions: { orderBy: { createdAt: "asc" } },
          _count: { select: { questions: true, attempts: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return chapter;
}

/**
 * Get chapters for a class (via ClassChapterLink)
 */
export async function getClassChapters(classId: string) {
  const links = await db.classChapterLink.findMany({
    where: { classId },
    include: {
      chapter: {
        include: {
          owner: { select: { id: true, name: true } },
          _count: { select: { contents: true, quizzes: true } },
        },
      },
    },
    orderBy: { addedAt: "asc" },
  });

  return links;
}

/**
 * Get all public chapters for the explore page
 */
export async function getPublicChapters() {
  const chapters = await db.chapter.findMany({
    where: { isPublic: true },
    include: {
      owner: { select: { id: true, name: true } },
      _count: { select: { contents: true, quizzes: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return chapters;
}
