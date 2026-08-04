import { auth } from '@/lib/auth';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { redirect } from 'next/navigation';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  if (session.user.role !== 'STUDENT') {
    redirect('/dashboard'); // or teacher dashboard
  }

  const user = {
    ...session.user,
    role: session.user.role.toLowerCase() as 'teacher' | 'student',
    name: session.user.name || '',
  };

  return (
    <div className="min-h-screen bg-[#F5F3FF] flex">
      {/* Sidebar (fixed left) */}
      <DashboardSidebar user={user} />
      
      {/* Main Content Area (padded left to account for fixed sidebar) */}
      <main className="flex-1 ml-64 min-h-screen relative page-enter bg-[#F5F3FF]">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B0a_1px,transparent_1px),linear-gradient(to_bottom,#18102B0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
        <div className="relative z-10 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
