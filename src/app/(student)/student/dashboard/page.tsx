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
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 py-4 md:py-8">
      {/* Neo-Brutalist Hero Banner */}
      <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 h-auto border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-[#834DFB]">
        {/* Abstract Geometric Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_2px,transparent_2px),linear-gradient(to_bottom,#18102B15_2px,transparent_2px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-4 md:top-10 right-4 md:right-10 w-12 md:w-24 h-12 md:h-24 md:w-32 md:h-32 bg-[#C6FF3D] border-2 md:border-4 border-black rounded-full mix-blend-screen opacity-90 shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_rgba(0,0,0,1)]"></div>
        <div className="absolute -bottom-10 left-10 md:left-20 w-16 md:w-32 h-16 md:h-32 md:w-48 md:h-48 bg-[#FF6B35] border-2 md:border-4 border-black rotate-12 mix-blend-screen opacity-90 shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]"></div>

        <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-5 text-white min-h-[120px]">
          <span className="w-fit mb-2 bg-[#C6FF3D] text-[#18102B] font-black text-[10px] md:text-xs uppercase tracking-widest px-2 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            STUDENT PORTAL
          </span>
          <h1 className="text-xl md:text-2xl sm:text-3xl font-black mb-2 uppercase tracking-tighter leading-none" style={{ WebkitTextStroke: '1px black' }}>
            Welcome back,<br className="md:hidden" /> {session.user.name}
          </h1>
          <p className="text-sm text-white font-bold bg-[#18102B] w-full sm:w-fit px-3 py-1.5 border-2 border-black rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] leading-snug">
            Here are your classes and dashboard.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Col: Classes & Stats */}
        <div className="flex-1">
          
          <div className="flex items-center justify-between mb-4 md:mb-6 pb-2 md:pb-4 border-b-2 md:border-b-4 border-black">
            <h2 className="text-lg md:text-xl md:text-3xl font-black text-[#18102B] uppercase tracking-tighter">Your Classes</h2>
            <span className="bg-[#18102B] text-white font-black px-4 py-1.5 rounded border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-sm">
              {classes.length} Total
            </span>
          </div>

          {classes.length === 0 ? (
            <div className="bg-white border-2 md:border-4 border-black rounded-[24px] md:rounded-[32px] p-4 md:p-8 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-10 md:w-16 h-10 md:h-16 bg-[#F0E100] rounded-bl-full border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-black shadow-[-3px_3px_0px_rgba(0,0,0,1)]"></div>
              <div className="w-10 md:w-16 h-10 md:h-16 bg-[#18102B] rounded-xl flex items-center justify-center mb-4 border-2 md:border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] -rotate-6">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-[#C6FF3D]" />
              </div>
              <h3 className="text-lg md:text-2xl font-black text-[#18102B] mb-2 uppercase tracking-tighter">No courses yet</h3>
              <p className="text-[#18102B] font-bold text-sm md:text-base bg-[#C6FF3D] px-3 md:px-4 py-1.5 border-2 border-black rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                Join a class using the form to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 md:p-2">
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
        <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-4 md:p-2">
          <div className="sticky top-6">
            <StudentDashboardClient />
          </div>
        </div>
      </div>
    </div>
  );
}
