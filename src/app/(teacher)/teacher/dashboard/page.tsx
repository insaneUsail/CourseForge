import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTeacherClasses } from '@/lib/actions/class-actions';
import TeacherDashboardClient from './TeacherDashboardClient';

export default async function TeacherDashboardPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const classes = await getTeacherClasses();
  
  if (!classes) {
    return <div className="p-8 text-error">Failed to load classes</div>;
  }

  // Calculate basic stats for the teacher
  const totalClasses = classes.length;
  const totalStudents = classes.reduce((acc: number, cls: any) => acc + (cls._count?.memberships || 0), 0);
  const totalChapters = classes.reduce((acc: number, cls: any) => acc + (cls._count?.chapterLinks || 0), 0);
  
  const currentMonth = new Date().getMonth();
  const classesThisMonth = classes.filter((cls: any) => new Date(cls.createdAt).getMonth() === currentMonth).length;

  const stats = {
    totalClasses,
    totalChapters,
    totalStudents,
    classesThisMonth
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Hero Banner */}
      <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-8 shadow-xl border border-[var(--color-border)]">
        <img src="/teacher_banner.jpg" alt="Teacher Dashboard" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 p-8 h-full flex flex-col justify-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Welcome, {session.user.name}</h1>
          <p className="text-lg text-white/80">Manage your classes, students, and course content.</p>
        </div>
      </div>
      <TeacherDashboardClient classes={classes} stats={stats} />
    </div>
  );
}
