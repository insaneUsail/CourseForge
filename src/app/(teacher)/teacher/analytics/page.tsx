import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTeacherAnalyticsOverview } from '@/lib/actions/analytics-actions';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default async function AnalyticsOverviewPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const data = await getTeacherAnalyticsOverview() || { totalStudents: 0, avgScore: 0, studentsWhoAttempted: 0, studentsNotStarted: 0, classes: [] };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-text-light">Analytics Overview</h1>
      
      {/* 4-Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-surface border-border flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-accent mb-2">{data.totalStudents}</span>
          <span className="text-sm text-text-default uppercase tracking-wider text-center">Total Students</span>
        </Card>
        <Card className="p-6 bg-surface border-border flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-accent mb-2">{Math.round(data.avgScore)}%</span>
          <span className="text-sm text-text-default uppercase tracking-wider text-center">Avg Score</span>
        </Card>
        <Card className="p-6 bg-surface border-border flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-accent mb-2">{data.studentsWhoAttempted}</span>
          <span className="text-sm text-text-default uppercase tracking-wider text-center">Students Attempted</span>
        </Card>
        <Card className="p-6 bg-surface border-border flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-accent mb-2">{data.studentsNotStarted}</span>
          <span className="text-sm text-text-default uppercase tracking-wider text-center">Not Started</span>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold text-text-light mb-6">Class Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.classes?.map((cls: any) => (
          <Link href={`/teacher/analytics/${cls.id}`} key={cls.id} className="block group">
            <Card className="p-6 h-full hover:border-accent transition-colors bg-surface-alt border-border flex flex-col">
              <h3 className="text-xl font-bold mb-4 text-text-light group-hover:text-accent transition-colors">{cls.name}</h3>
              <div className="mt-auto space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-default">Students</span>
                  <span className="font-semibold text-text-light">{cls.studentCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-default">Avg Score</span>
                  <span className="font-semibold text-text-light">{Math.round(cls.avgScore || 0)}%</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
        {(!data.classes || data.classes.length === 0) && (
          <div className="col-span-3 p-8 text-center text-text-default border border-dashed border-border rounded-xl">
            No classes to display.
          </div>
        )}
      </div>
    </div>
  );
}
