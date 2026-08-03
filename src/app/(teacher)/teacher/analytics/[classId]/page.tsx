import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getClassAnalytics } from '@/lib/actions/analytics-actions';
import { Card } from '@/components/ui/Card';
import { ScorePill } from '@/components/ui/ScorePill';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default async function ClassAnalyticsPage({ params }: { params: Promise<{ classId: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const { classId } = await params;
  const data = await getClassAnalytics(classId);

  if (!data) {
    return <div className="p-8 text-error">Failed to load class analytics.</div>;
  }


  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-light mb-2">{data.className} Analytics</h1>
      </div>
      
      {/* 4-Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-surface border-border flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-accent mb-2">{data.totalStudents}</span>
          <span className="text-sm text-text-default uppercase tracking-wider text-center">Students</span>
        </Card>
        <Card className="p-6 bg-surface border-border flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-accent mb-2">{Math.round(data.avgScore)}%</span>
          <span className="text-sm text-text-default uppercase tracking-wider text-center">Avg Score</span>
        </Card>
        <Card className="p-6 bg-surface border-border flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-accent mb-2">{data.totalStudents > 0 ? Math.round((data.studentsWhoAttempted / data.totalStudents) * 100) : 0}%</span>
          <span className="text-sm text-text-default uppercase tracking-wider text-center">Completion Rate</span>
        </Card>
        <Card className="p-6 bg-surface border-border flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-accent mb-2">{data.totalAttempts}</span>
          <span className="text-sm text-text-default uppercase tracking-wider text-center">Total Attempts</span>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold text-text-light mb-6">Student Performance</h2>
      
      <Card className="bg-surface overflow-hidden border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-alt text-text-default border-b border-border text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Name / Roll No</th>
                <th className="p-4 font-medium">School</th>
                <th className="p-4 font-medium">Attempts</th>
                <th className="p-4 font-medium">Avg Score</th>
                <th className="p-4 font-medium">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.studentStats?.map((studentStat: any) => {
                const score = Math.round(studentStat.avgScore || 0);
                const progressColor = score >= 80 ? 'bg-success' : score >= 50 ? 'bg-warning' : 'bg-error';
                
                return (
                  <tr key={studentStat.student.id} className="hover:bg-surface-alt/50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-text-light">{studentStat.student.name}</div>
                      <div className="text-xs text-text-default">{studentStat.rollNo || 'N/A'}</div>
                    </td>
                    <td className="p-4 text-text-default">{studentStat.school || 'N/A'}</td>
                    <td className="p-4 text-text-default">{studentStat.attemptCount || 0}</td>
                    <td className="p-4">
                      <ScorePill score={score} />
                    </td>
                    <td className="p-4 w-48">
                      <div className="flex items-center gap-2">
                        {/* <ProgressBar value={studentStat.progress || 0} colorClass={progressColor} className="flex-1" /> */}
                        <span className="text-xs text-text-default">{Math.round(studentStat.progress || 0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {(!data.studentStats || data.studentStats.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-default">
                    No student data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
