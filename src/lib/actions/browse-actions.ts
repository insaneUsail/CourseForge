"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type ActionResult = {
  error?: string;
  success?: boolean;
};

/**
 * Browse public chapters (available to all teachers)
 */
export async function browsePublicChapters(search?: string) {
  const chapters = await db.chapter.findMany({
    where: {
      isPublic: true,
      status: "COMPLETED",
      ...(search && {
        title: { contains: search, mode: "insensitive" as const },
      }),
    },
    include: {
      owner: { select: { id: true, name: true } },
      _count: { select: { contents: true, quizzes: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return chapters;
}

/**
 * Link a public chapter to a teacher's class (reuse flow)
 */
export async function linkChapterToClass(
  chapterId: string,
  classId: string
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  // Verify teacher owns the class
  const classRecord = await db.class.findUnique({
    where: { id: classId },
  });

  if (!classRecord || classRecord.teacherId !== session.user.id) {
    return { error: "You don't own this class" };
  }

  // Verify chapter exists and is public
  const chapter = await db.chapter.findUnique({
    where: { id: chapterId },
  });

  if (!chapter) {
    return { error: "Chapter not found" };
  }

  if (!chapter.isPublic) {
    return { error: "This chapter is private and cannot be reused" };
  }

  // Check if already linked
  const existingLink = await db.classChapterLink.findUnique({
    where: {
      classId_chapterId: {
        classId,
        chapterId,
      },
    },
  });

  if (existingLink) {
    if (existingLink.removedAt) {
      // Re-link a previously removed chapter
      await db.classChapterLink.update({
        where: { id: existingLink.id },
        data: { removedAt: null },
      });
      revalidatePath(`/teacher/classes/${classId}`);
      return { success: true };
    }
    return { error: "This chapter is already in your class" };
  }

  await db.classChapterLink.create({
    data: {
      classId,
      chapterId,
    },
  });

  revalidatePath(`/teacher/classes/${classId}`);
  revalidatePath("/teacher/browse");
  return { success: true };
}
