import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { DashboardLayoutWrapper } from '@/components/layout/DashboardLayoutWrapper';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  if (session.user.role !== 'STUDENT') {
    redirect('/teacher/dashboard');
  }

  const user = {
    id: session.user.id,
    name: session.user.name || 'Student',
    role: 'student' as const,
  };

  return (
    <DashboardLayoutWrapper user={user}>
      <div className="relative page-enter">
        <div className="absolute inset-0 bg-[radial-gradient(#18102B_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none z-0"></div>
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
