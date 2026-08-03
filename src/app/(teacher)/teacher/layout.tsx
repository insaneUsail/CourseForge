import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-bg-dark text-text-default">
      <Navbar user={{...session.user, name: session.user.name || "", role: session.user.role.toLowerCase() as any}} />
      <main className="page-enter">
        {children}
      </main>
    </div>
  );
}
