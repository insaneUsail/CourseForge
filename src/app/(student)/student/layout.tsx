import { auth } from '@/lib/auth';
import { Navbar } from '@/components/layout/Navbar';
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
    <div className="min-h-screen bg-bg-dark flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 overflow-auto page-enter">
        {children}
      </main>
    </div>
  );
}
