import { auth } from '@/lib/auth';
import { getStudentClasses } from '@/lib/actions/class-actions';
import { StudentDashboardClient } from '@/components/student/StudentDashboardClient';
import Link from 'next/link';
import { TicketCard } from '@/components/ui/TicketCard';
import { Badge } from '@/components/ui/Badge';
import { BookOpen } from 'lucide-react';

export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  const classes = await getStudentClasses();
  const ticketColors = ['blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'teal'];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Neo-Brutalist Hero Banner */}
      <div className="relative w-full rounded-[32px] overflow-hidden mb-10 h-[180px] border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] bg-[#834DFB]">
        {/* Abstract Geometric Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_2px,transparent_2px),linear-gradient(to_bottom,#18102B15_2px,transparent_2px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#C6FF3D] border-4 border-black rounded-full mix-blend-screen opacity-90 shadow-[6px_6px_0px_rgba(0,0,0,1)]"></div>
        <div className="absolute -bottom-10 left-20 w-48 h-48 bg-[#FF6B35] border-4 border-black rotate-12 mix-blend-screen opacity-90 shadow-[8px_8px_0px_rgba(0,0,0,1)]"></div>

        <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 text-white">
          <span className="w-fit mb-4 bg-[#C6FF3D] text-[#18102B] font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            STUDENT PORTAL
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-2 uppercase tracking-tighter" style={{ WebkitTextStroke: '1px black' }}>
            Welcome back, {session.user.name}
          </h1>
          <p className="text-lg md:text-xl text-white font-bold bg-[#18102B] w-fit px-4 py-2 border-2 border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            Here are your classes and dashboard.
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-10">
        {/* Left Col: Classes & Stats */}
        <div className="flex-1">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b-4 border-black">
            <h2 className="text-4xl font-black text-[#18102B] uppercase tracking-tighter">Your Classes</h2>
            <span className="bg-[#18102B] text-white font-black px-4 py-1.5 rounded border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-sm">
              {classes.length} Total
            </span>
          </div>

          {classes.length === 0 ? (
            <div className="bg-white border-4 border-black rounded-[32px] p-12 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F0E100] rounded-bl-full border-b-4 border-l-4 border-black shadow-[-4px_4px_0px_rgba(0,0,0,1)]"></div>
              <div className="w-24 h-24 bg-[#18102B] rounded-2xl flex items-center justify-center mb-6 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-6">
                <BookOpen className="w-12 h-12 text-[#C6FF3D]" />
              </div>
              <h3 className="text-3xl font-black text-[#18102B] mb-4 uppercase tracking-tighter">No courses yet</h3>
              <p className="text-[#18102B] font-bold text-lg bg-[#C6FF3D] px-6 py-2 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                Join a class using the form to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {classes.map((membership: any, idx: number) => {
                const color = ticketColors[idx % ticketColors.length] as any;
                return (
                  <Link key={membership.class.id} href={`/student/classes/${membership.class.id}`} className="block">
                    <TicketCard
                      color={color}
                      title={membership.class.name}
                      subtitle={`Teacher: ${membership.class.teacher?.name}`}
                      topLeftText="Class Ticket"
                      topRightText="Active"
                      priceText={`${membership.class._count?.chapterLinks || 0} Chapters`}
                      className="h-full"
                    >
                      <span className="text-xs font-bold text-gray-500">Joined: {new Date(membership.joinedAt).toLocaleDateString()}</span>
                    </TicketCard>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Col: Actions & Notices */}
        <div className="w-full xl:w-[360px] flex-shrink-0 flex flex-col gap-8">
          <div className="sticky top-6">
            <StudentDashboardClient />
          </div>
        </div>
      </div>
    </div>
  );
}
