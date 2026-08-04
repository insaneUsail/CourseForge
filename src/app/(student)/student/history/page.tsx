import { getStudentAttemptHistory } from '@/lib/actions/attempt-actions';
import { Card } from '@/components/ui/Card';
import { ScorePill } from '@/components/ui/ScorePill';
import { History, BookOpen } from 'lucide-react';

export default async function AttemptHistoryPage() {
  const attempts = await getStudentAttemptHistory();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <History className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Attempt History</h1>
          <p className="text-gray-500 mt-1">Review your past quiz and exam attempts.</p>
        </div>
      </div>

      {attempts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No attempts found</h3>
          <p className="text-gray-500">You haven't attempted any quizzes yet.</p>
        </div>
      ) : (
        <Card className="overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 text-sm font-semibold text-gray-900">Chapter / Quiz</th>
                  <th className="p-4 text-sm font-semibold text-gray-900">Class</th>
                  <th className="p-4 text-sm font-semibold text-gray-900">Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-900">Time Taken</th>
                  <th className="p-4 text-sm font-semibold text-gray-900 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt: any) => (
                  <tr key={attempt.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">
                        {attempt.quiz.chapter.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {attempt.quiz.isEvaluation ? 'Final Quiz' : 'Practice Quiz'}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">{attempt.class.name}</td>
                    <td className="p-4 text-gray-600 font-medium">
                      {new Date(attempt.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-gray-600 font-medium">{attempt.timeTakenSeconds}s</td>
                    <td className="p-4 flex justify-end">
                      <ScorePill score={attempt.score} total={attempt.totalQuestions} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
