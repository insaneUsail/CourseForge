"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { submitAttemptSchema } from "@/lib/validations/attempt";
import { revalidatePath } from "next/cache";

export type ActionResult = {
  error?: string;
  success?: boolean;
  data?: Record<string, unknown>;
};

/**
 * Submit a quiz attempt (student only).
 * Enforces: class membership, max attempts for evaluation quizzes, timer validation.
 */
export async function submitAttempt(
  input: {
    quizId: string;
    classId: string;
    answers: Record<string, number>;
    startedAt: string;
  }
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user || session.user.role !== "STUDENT") {
    return { error: "Unauthorized" };
  }

  const parsed = submitAttemptSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // Verify class membership
  const membership = await db.classMembership.findUnique({
    where: {
      studentId_classId: {
        studentId: session.user.id,
        classId: parsed.data.classId,
      },
    },
  });

  if (!membership) {
    return { error: "Join a class to track your score." };
  }

  // Get quiz with questions
  const quiz = await db.quiz.findUnique({
    where: { id: parsed.data.quizId },
    include: {
      questions: true,
      chapter: true,
    },
  });

  if (!quiz) {
    return { error: "Quiz not found" };
  }

  // Final quiz: check chapter is completed
  if (quiz.stage === "FINAL" && quiz.chapter.status !== "COMPLETED") {
    return { error: "Chapter must be completed before taking the final quiz" };
  }

  // Evaluation quiz: check max attempts
  if (quiz.isEvaluation && quiz.maxAttempts) {
    const existingAttempts = await db.attempt.count({
      where: {
        studentId: session.user.id,
        quizId: quiz.id,
        classId: parsed.data.classId,
      },
    });

    if (existingAttempts >= quiz.maxAttempts) {
      // Get their last score
      const lastAttempt = await db.attempt.findFirst({
        where: {
          studentId: session.user.id,
          quizId: quiz.id,
          classId: parsed.data.classId,
        },
        orderBy: { submittedAt: "desc" },
      });

      return {
        error: `You've already completed this evaluation. Your score: ${lastAttempt?.score}/${lastAttempt?.totalQuestions}`,
      };
    }
  }

  // Calculate score
  const submittedAt = new Date();
  const startedAt = new Date(parsed.data.startedAt);
  const timeTakenSeconds = Math.floor(
    (submittedAt.getTime() - startedAt.getTime()) / 1000
  );

  // Validate timer (allow 5s grace period)
  if (timeTakenSeconds > quiz.timerSeconds + 5) {
    return { error: "Time expired. Your submission was too late." };
  }

  let score = 0;
  for (const question of quiz.questions) {
    const selectedIndex = parsed.data.answers[question.id];
    if (selectedIndex === question.correctOptionIndex) {
      score++;
    }
  }

  const attempt = await db.attempt.create({
    data: {
      studentId: session.user.id,
      quizId: quiz.id,
      classId: parsed.data.classId,
      score,
      totalQuestions: quiz.questions.length,
      answers: parsed.data.answers,
      startedAt,
      submittedAt,
      timeTakenSeconds,
    },
  });

  revalidatePath(`/student/history`);
  return {
    success: true,
    data: {
      attemptId: attempt.id,
      score,
      totalQuestions: quiz.questions.length,
    },
  };
}

/**
 * Get a quiz for taking (student view)
 */
export async function getQuizForAttempt(quizId: string) {
  const session = await auth();
  if (!session?.user) return null;

  const quiz = await db.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        select: {
          id: true,
          questionText: true,
          options: true,
          // Don't send correctOptionIndex to the client
        },
        orderBy: { createdAt: "asc" },
      },
      chapter: {
        select: { id: true, title: true, status: true },
      },
    },
  });

  return quiz;
}

/**
 * Check if student can attempt a quiz
 */
export async function canAttemptQuiz(
  quizId: string,
  classId: string
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "STUDENT") {
    return { canAttempt: false, reason: "Unauthorized" };
  }

  // Check membership
  const membership = await db.classMembership.findUnique({
    where: {
      studentId_classId: {
        studentId: session.user.id,
        classId,
      },
    },
  });

  if (!membership) {
    return { canAttempt: false, reason: "Join a class to track your score." };
  }

  const quiz = await db.quiz.findUnique({
    where: { id: quizId },
    include: { chapter: true },
  });

  if (!quiz) {
    return { canAttempt: false, reason: "Quiz not found" };
  }

  if (quiz.stage === "FINAL" && quiz.chapter.status !== "COMPLETED") {
    return {
      canAttempt: false,
      reason: "Chapter must be completed first",
    };
  }

  if (quiz.isEvaluation && quiz.maxAttempts) {
    const attemptCount = await db.attempt.count({
      where: {
        studentId: session.user.id,
        quizId,
        classId,
      },
    });

    if (attemptCount >= quiz.maxAttempts) {
      const lastAttempt = await db.attempt.findFirst({
        where: { studentId: session.user.id, quizId, classId },
        orderBy: { submittedAt: "desc" },
      });

      return {
        canAttempt: false,
        reason: `You've already completed this evaluation. Your score: ${lastAttempt?.score}/${lastAttempt?.totalQuestions}`,
        lastScore: lastAttempt?.score,
        totalQuestions: lastAttempt?.totalQuestions,
      };
    }
  }

  return { canAttempt: true };
}

/**
 * Get student's attempt history
 */
export async function getStudentAttemptHistory() {
  const session = await auth();
  if (!session?.user || session.user.role !== "STUDENT") return [];

  const attempts = await db.attempt.findMany({
    where: { studentId: session.user.id },
    include: {
      quiz: {
        include: {
          chapter: { select: { title: true } },
        },
      },
      class: { select: { name: true } },
    },
    orderBy: { submittedAt: "desc" },
  });

  return attempts;
}
