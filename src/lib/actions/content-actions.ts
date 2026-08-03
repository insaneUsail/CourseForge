"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import {
  createContentSchema,
  updateContentSchema,
  deleteContentSchema,
} from "@/lib/validations/content";
import { revalidatePath } from "next/cache";

export type ActionResult = {
  error?: string;
  success?: boolean;
  data?: any;
};

/**
 * Add content to a chapter (owner only)
 */
export async function addContent(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const parsed = createContentSchema.safeParse({
    chapterId: formData.get("chapterId"),
    title: formData.get("title") || undefined,
    text: formData.get("text"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // Verify ownership
  const chapter = await db.chapter.findUnique({
    where: { id: parsed.data.chapterId },
  });

  if (!chapter || chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can add content" };
  }

  // Get next order index
  const lastContent = await db.content.findFirst({
    where: { chapterId: parsed.data.chapterId },
    orderBy: { orderIndex: "desc" },
  });

  const nextIndex = (lastContent?.orderIndex ?? -1) + 1;

  const content = await db.content.create({
    data: {
      chapterId: parsed.data.chapterId,
      title: parsed.data.title,
      text: parsed.data.text,
      orderIndex: nextIndex,
    },
  });

  revalidatePath(`/teacher/chapters/${parsed.data.chapterId}/edit`);
  return { success: true, data: content as any };
}

/**
 * Update content text (owner only)
 */
export async function updateContent(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const parsed = updateContentSchema.safeParse({
    contentId: formData.get("contentId"),
    title: formData.get("title") || undefined,
    text: formData.get("text"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const content = await db.content.findUnique({
    where: { id: parsed.data.contentId },
    include: { chapter: true },
  });

  if (!content || content.chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can edit content" };
  }

  await db.content.update({
    where: { id: parsed.data.contentId },
    data: { 
      title: parsed.data.title,
      text: parsed.data.text 
    },
  });

  revalidatePath(`/teacher/chapters/${content.chapterId}/edit`);
  return { success: true };
}

/**
 * Delete content (owner only)
 */
export async function deleteContent(contentId: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const content = await db.content.findUnique({
    where: { id: contentId },
    include: { chapter: true },
  });

  if (!content || content.chapter.ownerTeacherId !== session.user.id) {
    return { error: "Only the chapter owner can delete content" };
  }

  await db.content.delete({ where: { id: contentId } });

  revalidatePath(`/teacher/chapters/${content.chapterId}/edit`);
  return { success: true };
}
