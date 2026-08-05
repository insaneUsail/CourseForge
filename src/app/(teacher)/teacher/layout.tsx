import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const user = {
    ...session.user,
    name: session.user.name || "",
    role: session.user.role.toLowerCase() as 'teacher' | 'student'
  };

  return (
    <div className="min-h-screen bg-[#F5F3FF] flex">
      {/* Sidebar (fixed left on desktop) */}
      <DashboardSidebar user={user} />
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen relative page-enter bg-[#F5F3FF] pb-20 md:pb-0">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B0a_1px,transparent_1px),linear-gradient(to_bottom,#18102B0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
        <div className="relative z-10 h-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav user={user} />
    </div>
  );
}
