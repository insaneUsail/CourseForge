import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getClassAnalytics } from '@/lib/actions/analytics-actions';
import { ScorePill } from '@/components/ui/ScorePill';

export default async function ClassAnalyticsPage({ params }: { params: Promise<{ classId: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const { classId } = await params;
  const data = await getClassAnalytics(classId);

  if (!data) {
    return <div className="p-8 text-red-500 font-black uppercase">Failed to load class analytics.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8">
      <div className="flex items-center gap-6 mb-12 pb-6 border-b-4 border-black">
        <div className="w-16 h-16 bg-[#C6FF3D] rounded-xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-3">
          <span className="text-3xl text-[#18102B]">📊</span>
        </div>
        <div>
          <span className="inline-block mb-2 bg-[#18102B] text-white font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Class Analytics
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#18102B] tracking-tighter uppercase">{data.className}</h1>
        </div>
      </div>
      
      {/* 4-Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="p-6 bg-[#B4F481] flex flex-col justify-center h-40 relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] transform transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-[#18102B] uppercase tracking-widest">Students</span>
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-6">
              👥
            </div>
          </div>
          <span className="text-5xl font-black text-[#18102B] relative z-10">{data.totalStudents}</span>
        </div>
        <div className="p-6 bg-[#A78BFA] flex flex-col justify-center h-40 relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] transform transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-[#18102B] uppercase tracking-widest">Avg Score</span>
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-3">
              📈
            </div>
          </div>
          <span className="text-5xl font-black text-[#18102B] relative z-10">{Math.round(data.avgScore)}%</span>
        </div>
        <div className="p-6 bg-[#60A5FA] flex flex-col justify-center h-40 relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] transform transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-[#18102B] uppercase tracking-widest">Completion</span>
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-3">
              ✅
            </div>
          </div>
          <span className="text-5xl font-black text-[#18102B] relative z-10">{data.totalStudents > 0 ? Math.round((data.studentsWhoAttempted / data.totalStudents) * 100) : 0}%</span>
        </div>
        <div className="p-6 bg-[#FF6B35] flex flex-col justify-center h-40 relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] transform transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-white uppercase tracking-widest">Total Attempts</span>
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-6">
              🎯
            </div>
          </div>
          <span className="text-5xl font-black text-white relative z-10">{data.totalAttempts}</span>
        </div>
      </div>

      <h2 className="text-4xl font-black text-[#18102B] mb-8 uppercase tracking-tighter">Student Performance</h2>
      
      <div className="bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#18102B] text-white border-b-4 border-black text-xs uppercase tracking-widest">
                <th className="p-5 font-black border-r-4 border-black">Name / Roll No</th>
                <th className="p-5 font-black border-r-4 border-black">School</th>
                <th className="p-5 font-black border-r-4 border-black">Attempts</th>
                <th className="p-5 font-black border-r-4 border-black">Avg Score</th>
                <th className="p-5 font-black">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y-4 divide-black">
              {data.studentStats?.map((studentStat: any, index: number) => {
                const score = Math.round(studentStat.avgScore || 0);
                
                return (
                  <tr key={studentStat.student.id} className={`hover:bg-[#F5F3FF] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-5 border-r-4 border-black">
                      <div className="font-black text-[#18102B] uppercase tracking-wide">{studentStat.student.name}</div>
                      <div className="text-sm font-bold text-gray-500 uppercase">{studentStat.rollNo || 'N/A'}</div>
                    </td>
                    <td className="p-5 text-[#18102B] font-bold border-r-4 border-black uppercase">{studentStat.school || 'N/A'}</td>
                    <td className="p-5 text-[#18102B] font-black border-r-4 border-black text-xl">{studentStat.attemptCount || 0}</td>
                    <td className="p-5 border-r-4 border-black">
                      <ScorePill score={score} />
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-[#18102B] text-xl bg-[#C6FF3D] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                          {Math.round(studentStat.progress || 0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {(!data.studentStats || data.studentStats.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-16 text-center bg-[#F5F3FF] relative overflow-hidden">
                    <p className="text-2xl font-black text-[#18102B] uppercase tracking-tighter">No student data available.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
