import { getQuizForAttempt, canAttemptQuiz } from '@/lib/actions/attempt-actions';
import { notFound } from 'next/navigation';
import { QuizTakingClient } from '@/components/student/QuizTakingClient';

export default async function QuizTakingPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ quizId: string }>,
  searchParams: Promise<{ classId?: string }>
}) {
  const { quizId } = await params;
  const { classId } = await searchParams;

  if (!classId) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 text-center">
        <h1 className="text-2xl font-bold text-text-light mb-4">Join a class to track your score</h1>
      </div>
    );
  }

  const attemptInfo = await canAttemptQuiz(quizId, classId);
  if (!attemptInfo.canAttempt) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 text-center">
        <h1 className="text-2xl font-bold text-text-light mb-4">You have exceeded the maximum attempts for this quiz.</h1>
      </div>
    );
  }

  const quiz = await getQuizForAttempt(quizId);
  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col">
      <QuizTakingClient quiz={quiz} classId={classId} />
    </div>
  );
}
