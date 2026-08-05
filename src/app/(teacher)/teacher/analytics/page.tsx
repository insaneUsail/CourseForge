import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTeacherAnalyticsOverview } from '@/lib/actions/analytics-actions';
import { Card } from '@/components/ui/Card';
import { TicketCard } from '@/components/ui/TicketCard';
import Link from 'next/link';
import { BarChart3, Users, CheckCircle2, AlertCircle } from 'lucide-react';

export default async function AnalyticsOverviewPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const data = await getTeacherAnalyticsOverview() || { totalStudents: 0, avgScore: 0, studentsWhoAttempted: 0, studentsNotStarted: 0, classes: [] };
  const ticketColors = ['blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'teal'];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 md:gap-6 mb-6 md:mb-12 pb-6 border-b-2 md:border-b-4 border-black">
        <div className="w-16 h-16 bg-[#F0E100] rounded-xl flex items-center justify-center border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-3">
          <BarChart3 className="w-8 h-8 text-[#18102B]" />
        </div>
        <div>
          <span className="inline-block mb-2 bg-[#18102B] text-white font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Overview
          </span>
          <h1 className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B] tracking-tighter uppercase">Analytics</h1>
        </div>
      </div>
      
      {/* 4-Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:p-8 mb-16">
        <Card className="p-4 md:p-6 bg-[#B4F481] hoverable={true} flex flex-col justify-center h-40 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-12 md:w-24 h-12 md:h-24 bg-white/30 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-[#18102B] uppercase tracking-widest">Total Students</span>
            <div className="w-10 h-10 bg-white border-2 border-black rounded flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-6">
              <Users className="w-5 h-5 text-[#18102B]" />
            </div>
          </div>
          <span className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B] relative z-10">{data.totalStudents}</span>
        </Card>
        
        <Card className="p-4 md:p-6 bg-[#A78BFA] hoverable={true} flex flex-col justify-center h-40 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-12 md:w-24 h-12 md:h-24 bg-white/30 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-[#18102B] uppercase tracking-widest">Avg Score</span>
            <div className="w-10 h-10 bg-white border-2 border-black rounded flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-3">
              <BarChart3 className="w-5 h-5 text-[#18102B]" />
            </div>
          </div>
          <span className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B] relative z-10">{Math.round(data.avgScore)}%</span>
        </Card>
        
        <Card className="p-4 md:p-6 bg-[#60A5FA] hoverable={true} flex flex-col justify-center h-40 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-12 md:w-24 h-12 md:h-24 bg-white/30 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-[#18102B] uppercase tracking-widest">Attempted</span>
            <div className="w-10 h-10 bg-white border-2 border-black rounded flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-3">
              <CheckCircle2 className="w-5 h-5 text-[#18102B]" />
            </div>
          </div>
          <span className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B] relative z-10">{data.studentsWhoAttempted}</span>
        </Card>
        
        <Card className="p-4 md:p-6 bg-[#FF6B35] hoverable={true} flex flex-col justify-center h-40 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-12 md:w-24 h-12 md:h-24 bg-white/30 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-black text-white uppercase tracking-widest">Not Started</span>
            <div className="w-10 h-10 bg-white border-2 border-black rounded flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-6">
              <AlertCircle className="w-5 h-5 text-[#18102B]" />
            </div>
          </div>
          <span className="text-xl md:text-3xl md:text-5xl font-black text-white relative z-10">{data.studentsNotStarted}</span>
        </Card>
      </div>

      <h2 className="text-lg md:text-2xl md:text-4xl font-black text-[#18102B] mb-4 md:mb-8 uppercase tracking-tighter">Class Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-8">
        {data.classes?.map((cls: any, idx: number) => {
          const color = ticketColors[idx % ticketColors.length] as any;
          return (
            <Link href={`/teacher/analytics/${cls.id}`} key={cls.id} className="block group">
              <TicketCard
                color={color}
                title={cls.name}
                subtitle="Class Overview"
                topLeftText="Report"
                topRightText="Detailed"
                priceText={`${Math.round(cls.avgScore || 0)}% Avg`}
                className="h-full min-h-[260px]"
              >
                <div className="mt-4 pt-4 border-t-2 border-dashed border-black/30 flex justify-between items-center bg-white/50 rounded-lg p-3 border-2 border-black">
                  <span className="text-xs font-black uppercase text-[#18102B]">
                    Students Enrolled
                  </span>
                  <span className="font-black text-xl text-[#18102B] bg-white px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    {cls.studentCount}
                  </span>
                </div>
              </TicketCard>
            </Link>
          );
        })}
        {(!data.classes || data.classes.length === 0) && (
          <div className="col-span-full p-4 md:p-6 md:p-16 text-center bg-[#F5F3FF] border-2 md:border-4 border-black border-dashed rounded-[32px] shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-12 md:w-24 h-12 md:h-24 bg-[#FF6B35] rounded-full opacity-50 blur-xl"></div>
            <BarChart3 className="w-16 h-16 text-[#18102B] mx-auto mb-6 opacity-30" />
            <p className="text-lg md:text-2xl font-black text-[#18102B] uppercase tracking-tighter">No classes to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}
