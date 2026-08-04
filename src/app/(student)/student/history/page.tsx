import { getStudentAttemptHistory } from '@/lib/actions/attempt-actions';
import { ScorePill } from '@/components/ui/ScorePill';
import { History, BookOpen } from 'lucide-react';

export default async function AttemptHistoryPage() {
  const attempts = await getStudentAttemptHistory();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12 pb-6 border-b-4 border-black">
        <div className="w-16 h-16 bg-[#F0E100] border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-2xl flex items-center justify-center flex-shrink-0 rotate-3">
          <History className="w-8 h-8 text-[#18102B]" />
        </div>
        <div>
          <span className="inline-block mb-2 bg-[#18102B] text-white font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Student Data
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#18102B] tracking-tighter uppercase">Attempt History</h1>
          <p className="text-lg text-white font-bold bg-[#18102B] px-4 py-1.5 mt-2 rounded border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] w-fit">
            Review your past quiz and exam attempts.
          </p>
        </div>
      </div>

      {attempts.length === 0 ? (
        <div className="bg-[#F5F3FF] border-4 border-black border-dashed rounded-[32px] p-16 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="absolute top-10 left-10 w-24 h-24 bg-[#FF6B35] rounded-full blur-2xl opacity-40"></div>
          <div className="w-24 h-24 bg-[#18102B] rounded-2xl flex items-center justify-center mb-6 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-6 relative z-10">
            <BookOpen className="w-12 h-12 text-[#C6FF3D]" />
          </div>
          <h3 className="text-3xl font-black text-[#18102B] mb-4 uppercase tracking-tighter relative z-10">No attempts found</h3>
          <p className="text-[#18102B] font-bold text-lg bg-[#C6FF3D] px-6 py-2 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] relative z-10">
            You haven't attempted any quizzes yet.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white border-4 border-black rounded-[32px] shadow-[12px_12px_0px_rgba(0,0,0,1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#18102B] border-b-4 border-black">
                  <th className="p-6 text-sm font-black text-white uppercase tracking-widest whitespace-nowrap">Chapter / Quiz</th>
                  <th className="p-6 text-sm font-black text-white uppercase tracking-widest whitespace-nowrap">Class</th>
                  <th className="p-6 text-sm font-black text-white uppercase tracking-widest whitespace-nowrap">Date</th>
                  <th className="p-6 text-sm font-black text-white uppercase tracking-widest whitespace-nowrap">Time Taken</th>
                  <th className="p-6 text-sm font-black text-white uppercase tracking-widest text-right whitespace-nowrap">Score</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt: any, idx: number) => (
                  <tr key={attempt.id} className={`border-b-2 border-black transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F3FF]'}`}>
                    <td className="p-6">
                      <div className="font-black text-[#18102B] text-lg uppercase tracking-tight">
                        {attempt.quiz.chapter.title}
                      </div>
                      <div className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-widest">
                        {attempt.quiz.isEvaluation ? 'Final Quiz' : 'Practice Quiz'}
                      </div>
                    </td>
                    <td className="p-6 text-[#18102B] font-bold text-lg">{attempt.class.name}</td>
                    <td className="p-6 text-[#18102B] font-bold">
                      {new Date(attempt.submittedAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="p-6 text-[#18102B] font-bold">{attempt.timeTakenSeconds}s</td>
                    <td className="p-6 flex justify-end">
                      <div className="inline-block p-1 border-2 border-black rounded bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        <ScorePill score={attempt.score} total={attempt.totalQuestions} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
