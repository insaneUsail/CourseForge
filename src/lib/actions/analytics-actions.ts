"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

/**
 * Get analytics for a specific class (teacher only)
 */
export async function getClassAnalytics(classId: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") return null;

  // Verify teacher owns the class
  const classRecord = await db.class.findUnique({
    where: { id: classId },
    include: {
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
              quizzes: {
                include: {
                  _count: { select: { questions: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!classRecord || classRecord.teacherId !== session.user.id) return null;

  // Get all attempts for this class
  const attempts = await db.attempt.findMany({
    where: { classId },
    include: {
      quiz: {
        include: {
          chapter: { select: { title: true } },
        },
      },
      student: { select: { id: true, name: true } },
    },
  });

  // Calculate stats
  const totalStudents = classRecord.memberships.length;
  const studentsWhoAttempted = new Set(attempts.map((a) => a.studentId)).size;
  const avgScore =
    attempts.length > 0
      ? Math.round(
          (attempts.reduce(
            (sum, a) => sum + (a.score / a.totalQuestions) * 100,
            0
          ) /
            attempts.length)
        )
      : 0;

  // Per-student breakdown
  const studentStats = classRecord.memberships.map((membership) => {
    const studentAttempts = attempts.filter(
      (a) => a.studentId === membership.studentId
    );
    const studentAvg =
      studentAttempts.length > 0
        ? Math.round(
            studentAttempts.reduce(
              (sum, a) => sum + (a.score / a.totalQuestions) * 100,
              0
            ) / studentAttempts.length
          )
        : null;

    return {
      student: membership.student,
      rollNo: membership.rollNo,
      school: membership.school,
      attemptCount: studentAttempts.length,
      avgScore: studentAvg,
      attempts: studentAttempts.map((a) => ({
        quizId: a.quizId,
        chapterTitle: a.quiz.chapter.title,
        score: a.score,
        totalQuestions: a.totalQuestions,
        timeTakenSeconds: a.timeTakenSeconds,
        submittedAt: a.submittedAt,
      })),
    };
  });

  return {
    className: classRecord.name,
    classKey: classRecord.key,
    totalStudents,
    studentsWhoAttempted,
    studentsNotStarted: totalStudents - studentsWhoAttempted,
    avgScore,
    totalAttempts: attempts.length,
    studentStats,
    chapterCount: classRecord.chapterLinks.length,
  };
}

/**
 * Get overview analytics across all teacher's classes
 */
export async function getTeacherAnalyticsOverview() {
  const session = await auth();
  if (!session?.user || session.user.role !== "TEACHER") return null;

  const classes = await db.class.findMany({
    where: { teacherId: session.user.id },
    include: {
      _count: {
        select: { memberships: true, chapterLinks: true },
      },
    },
  });

  const classIds = classes.map((c) => c.id);

  const totalStudents = await db.classMembership.count({
    where: { classId: { in: classIds } },
  });

  const attempts = await db.attempt.findMany({
    where: { classId: { in: classIds } },
  });

  const avgScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce(
            (sum, a) => sum + (a.score / a.totalQuestions) * 100,
            0
          ) / attempts.length
        )
      : 0;

  const studentsWhoAttempted = new Set(attempts.map((a) => a.studentId)).size;

  return {
    totalClasses: classes.length,
    totalStudents,
    avgScore,
    studentsWhoAttempted,
    studentsNotStarted: totalStudents - studentsWhoAttempted,
    classes: classes.map((c) => ({
      id: c.id,
      name: c.name,
      key: c.key,
      studentCount: c._count.memberships,
      chapterCount: c._count.chapterLinks,
    })),
  };
}
