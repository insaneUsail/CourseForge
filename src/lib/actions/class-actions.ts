"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { createClassSchema, joinClassSchema } from "@/lib/validations/class";
import { generateKey } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export type ActionResult = {
  error?: string;
  success?: boolean;
  data?: Record<string, unknown>;
};

/**
 * Create a new class (teacher only)
 */
export async function createClass(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const parsed = createClassSchema.safeParse({
    name: formData.get("name"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // Generate unique key
  let key = generateKey();
  let exists = await db.class.findUnique({ where: { key } });
  while (exists) {
    key = generateKey();
    exists = await db.class.findUnique({ where: { key } });
  }

  await db.class.create({
    data: {
      teacherId: session.user.id,
      name: parsed.data.name,
      key,
    },
  });

  revalidatePath("/teacher/dashboard");
  return { success: true };
}

/**
 * Join a class (student only)
 */
export async function joinClass(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "STUDENT") {
    return { error: "Unauthorized" };
  }

  const parsed = joinClassSchema.safeParse({
    key: formData.get("key"),
    rollNo: formData.get("rollNo"),
    school: formData.get("school"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // Find class by key
  const classRecord = await db.class.findUnique({
    where: { key: parsed.data.key },
  });

  if (!classRecord) {
    return { error: "Invalid class key. Please check and try again." };
  }

  // Check if already joined
  const existingMembership = await db.classMembership.findUnique({
    where: {
      studentId_classId: {
        studentId: session.user.id,
        classId: classRecord.id,
      },
    },
  });

  if (existingMembership) {
    return { error: "You have already joined this class." };
  }

  await db.classMembership.create({
    data: {
      studentId: session.user.id,
      classId: classRecord.id,
      rollNo: parsed.data.rollNo,
      school: parsed.data.school,
    },
  });

  revalidatePath("/student/dashboard");
  return { success: true };
}

/**
 * Get teacher's classes with stats
 */
export async function getTeacherClasses() {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") return [];

  const classes = await db.class.findMany({
    where: { teacherId: session.user.id },
    include: {
      _count: {
        select: {
          memberships: true,
          chapterLinks: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return classes;
}

/**
 * Get student's joined classes
 */
export async function getStudentClasses() {
  const session = await auth();
  if (!session?.user || session.user.role !== "STUDENT") return [];

  const memberships = await db.classMembership.findMany({
    where: { studentId: session.user.id },
    include: {
      class: {
        include: {
          teacher: { select: { name: true } },
          _count: {
            select: {
              chapterLinks: true,
              memberships: true,
            },
          },
        },
      },
    },
    orderBy: { joinedAt: "desc" },
  });

  return memberships;
}

/**
 * Get a single class with chapters
 */
export async function getClassDetail(classId: string) {
  const session = await auth();
  if (!session?.user) return null;

  const classRecord = await db.class.findUnique({
    where: { id: classId },
    include: {
      teacher: { select: { id: true, name: true } },
      memberships: {
        include: {
          student: { select: { id: true, name: true, email: true } },
        },
      },
      chapterLinks: {
        where: { removedAt: null },
        include: {
          chapter: {
            include: {
              owner: { select: { id: true, name: true } },
              _count: {
                select: { contents: true, quizzes: true },
              },
            },
          },
        },
        orderBy: { addedAt: "asc" },
      },
    },
  });

  if (!classRecord) return null;

  // Authorization: teacher owns it or student is a member
  if (session.user.role === "TEACHER" && classRecord.teacherId !== session.user.id) {
    return null;
  }
  if (session.user.role === "STUDENT") {
    const isMember = classRecord.memberships.some(
      (m) => m.studentId === session.user.id
    );
    if (!isMember) return null;
  }

  return classRecord;
}
