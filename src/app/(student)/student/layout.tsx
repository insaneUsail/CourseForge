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
    <div className="min-h-screen bg-white flex">
      {/* Sidebar (fixed left) */}
      <DashboardSidebar user={user} />
      
      {/* Main Content Area (padded left to account for fixed sidebar) */}
      <main className="flex-1 ml-64 min-h-screen page-enter bg-[#F0E100]/5">
        {children}
      </main>
    </div>
  );
}
