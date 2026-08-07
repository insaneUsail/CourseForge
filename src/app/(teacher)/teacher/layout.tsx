import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { DashboardLayoutWrapper } from '@/components/layout/DashboardLayoutWrapper';

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  if (session.user.role !== 'TEACHER') {
    redirect('/student/dashboard');
  }

  const user = {
    id: session.user.id,
    name: session.user.name || 'Teacher',
    role: 'teacher' as const,
  };

  return (
    <DashboardLayoutWrapper user={user}>
      <div className="relative page-enter">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B0a_1px,transparent_1px),linear-gradient(to_bottom,#18102B0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
