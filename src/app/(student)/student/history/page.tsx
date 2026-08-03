import { getStudentAttemptHistory } from '@/lib/actions/attempt-actions';
import { Card } from '@/components/ui/Card';
import { ScorePill } from '@/components/ui/ScorePill';

export default async function AttemptHistoryPage() {
  const attempts = await getStudentAttemptHistory();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text-light mb-8">Attempt History</h1>

      {attempts.length === 0 ? (
        <p className="text-text-default">No attempts found.</p>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-alt border-b border-border">
                  <th className="p-4 text-sm font-medium text-text-light">Chapter / Quiz</th>
                  <th className="p-4 text-sm font-medium text-text-light">Class</th>
                  <th className="p-4 text-sm font-medium text-text-light">Date</th>
                  <th className="p-4 text-sm font-medium text-text-light">Time Taken</th>
                  <th className="p-4 text-sm font-medium text-text-light text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt: any) => (
                  <tr key={attempt.id} className="border-b border-border/50 hover:bg-surface-alt/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-text-light">
                        {attempt.quiz.chapter.title}
                      </div>
                      <div className="text-sm text-text-default">
                        {attempt.quiz.isEvaluation ? 'Final Quiz' : 'Practice Quiz'}
                      </div>
                    </td>
                    <td className="p-4 text-text-default">{attempt.class.name}</td>
                    <td className="p-4 text-text-default">
                      {new Date(attempt.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-text-default">{attempt.timeTakenSeconds}s</td>
                    <td className="p-4 text-right">
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
