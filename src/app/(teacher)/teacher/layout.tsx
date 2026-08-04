import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';

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
    <div className="min-h-screen bg-white flex">
      {/* Sidebar (fixed left) */}
      <DashboardSidebar user={user} />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen page-enter bg-[#C6FF3D]/5">
        {children}
      </main>
    </div>
  );
}
