import { getQuizForAttempt, canAttemptQuiz } from '@/lib/actions/attempt-actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
      <div className="container mx-auto px-4 py-4 md:py-8 mt-20 text-center">
        <h1 className="text-lg md:text-2xl font-bold text-text-light mb-4">Join a class to track your score</h1>
      </div>
    );
  }

  const attemptInfo = await canAttemptQuiz(quizId, classId);
  if (!attemptInfo.canAttempt) {
    return (
      <div className="container mx-auto px-4 py-4 md:py-8 mt-20 text-center">
        <h1 className="text-lg md:text-2xl font-bold text-text-light mb-4">You have exceeded the maximum attempts for this quiz.</h1>
      </div>
    );
  }

  const quiz = await getQuizForAttempt(quizId);
  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link 
          href={classId ? `/student/chapters/${quiz.chapterId}?classId=${classId}` : '/student/dashboard'} 
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#18102B] bg-[#C6FF3D] px-4 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
        >
          ← Back
        </Link>
      </div>
      <QuizTakingClient quiz={quiz} classId={classId} />
    </div>
  );
}
