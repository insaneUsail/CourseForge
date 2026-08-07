import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
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
    return <div className="p-4 md:p-8 text-red-500 font-black uppercase">Failed to load class analytics.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 md:gap-6 mb-6 md:mb-12 pb-6 border-b-2 md:border-b-4 border-black">
        <div className="w-16 h-16 bg-[#C6FF3D] rounded-xl flex items-center justify-center border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-3">
          <span className="text-xl md:text-3xl text-[#18102B]">📊</span>
        </div>
        <div>
          <div className="flex flex-col items-start gap-4 mb-2">
            <Link 
              href={`/teacher/classes/${classId}`} 
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#18102B] bg-white px-3 py-1.5 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-transform"
            >
              ← Back to Class
            </Link>
            <span className="inline-block bg-[#18102B] text-white font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              Class Analytics
            </span>
          </div>
          <h1 className="text-lg md:text-2xl md:text-4xl md:text-5xl font-black text-[#18102B] tracking-tighter uppercase">{data.className}</h1>
        </div>
      </div>
      
      {/* 4-Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:p-8 mb-16">
        <div className="p-4 md:p-6 bg-[#B4F481] flex flex-col justify-center h-40 relative overflow-hidden border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] transform transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-[#18102B] uppercase tracking-widest">Students</span>
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-6">
              👥
            </div>
          </div>
          <span className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B] relative z-10">{data.totalStudents}</span>
        </div>
        <div className="p-4 md:p-6 bg-[#A78BFA] flex flex-col justify-center h-40 relative overflow-hidden border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] transform transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-[#18102B] uppercase tracking-widest">Avg Score</span>
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-3">
              📈
            </div>
          </div>
          <span className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B] relative z-10">{Math.round(data.avgScore)}%</span>
        </div>
        <div className="p-4 md:p-6 bg-[#60A5FA] flex flex-col justify-center h-40 relative overflow-hidden border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] transform transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-[#18102B] uppercase tracking-widest">Completion</span>
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-3">
              ✅
            </div>
          </div>
          <span className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B] relative z-10">{data.totalStudents > 0 ? Math.round((data.studentsWhoAttempted / data.totalStudents) * 100) : 0}%</span>
        </div>
        <div className="p-4 md:p-6 bg-[#FF6B35] flex flex-col justify-center h-40 relative overflow-hidden border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] transform transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-white uppercase tracking-widest">Total Attempts</span>
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-6">
              🎯
            </div>
          </div>
          <span className="text-xl md:text-3xl md:text-5xl font-black text-white relative z-10">{data.totalAttempts}</span>
        </div>
      </div>

      <h2 className="text-lg md:text-2xl md:text-4xl font-black text-[#18102B] mb-4 md:mb-8 uppercase tracking-tighter">Student Performance</h2>
      
      <div className="bg-white border-2 md:border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Mobile View: Cards */}
        <div className="md:hidden flex flex-col divide-y-2 divide-black">
          {data.studentStats?.map((studentStat: any, index: number) => {
            const score = Math.round(studentStat.avgScore || 0);
            return (
              <div key={studentStat.student.id} className={`p-4 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-black text-[#18102B] uppercase tracking-wide text-lg">{studentStat.student.name}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase">{studentStat.rollNo || 'N/A'}</div>
                  </div>
                  <ScorePill score={score} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                  <div>
                    <div className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">School</div>
                    <div className="text-[#18102B] font-bold uppercase truncate">{studentStat.school || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Attempts</div>
                    <div className="text-[#18102B] font-black">{studentStat.attemptCount || 0}</div>
                  </div>
                  <div className="col-span-2 mt-2">
                    <div className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-1">Progress</div>
                    <div className="w-full bg-gray-200 border-2 border-black h-6 relative rounded-full overflow-hidden">
                      <div className="bg-[#C6FF3D] h-full border-r-2 border-black" style={{ width: `${Math.round(studentStat.progress || 0)}%` }}></div>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">{Math.round(studentStat.progress || 0)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {(!data.studentStats || data.studentStats.length === 0) && (
            <div className="p-4 md:p-8 text-center bg-[#F5F3FF]">
              <p className="text-xl font-black text-[#18102B] uppercase tracking-tighter">No student data available.</p>
            </div>
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#18102B] text-white border-b-2 md:border-b-4 border-black text-xs uppercase tracking-widest">
                <th className="p-5 font-black border-r-2 md:border-r-4 border-black">Name / Roll No</th>
                <th className="p-5 font-black border-r-2 md:border-r-4 border-black">School</th>
                <th className="p-5 font-black border-r-2 md:border-r-4 border-black">Attempts</th>
                <th className="p-5 font-black border-r-2 md:border-r-4 border-black">Avg Score</th>
                <th className="p-5 font-black">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y-4 divide-black">
              {data.studentStats?.map((studentStat: any, index: number) => {
                const score = Math.round(studentStat.avgScore || 0);
                
                return (
                  <tr key={studentStat.student.id} className={`hover:bg-[#F5F3FF] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-5 border-r-2 md:border-r-4 border-black">
                      <div className="font-black text-[#18102B] uppercase tracking-wide">{studentStat.student.name}</div>
                      <div className="text-sm font-bold text-gray-500 uppercase">{studentStat.rollNo || 'N/A'}</div>
                    </td>
                    <td className="p-5 text-[#18102B] font-bold border-r-2 md:border-r-4 border-black uppercase">{studentStat.school || 'N/A'}</td>
                    <td className="p-5 text-[#18102B] font-black border-r-2 md:border-r-4 border-black text-xl">{studentStat.attemptCount || 0}</td>
                    <td className="p-5 border-r-2 md:border-r-4 border-black">
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
                  <td colSpan={5} className="p-4 md:p-6 md:p-16 text-center bg-[#F5F3FF] relative overflow-hidden">
                    <p className="text-lg md:text-2xl font-black text-[#18102B] uppercase tracking-tighter">No student data available.</p>
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
