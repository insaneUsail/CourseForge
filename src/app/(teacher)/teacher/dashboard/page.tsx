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
    return <div className="p-4 md:p-8 font-black text-[#18102B] uppercase">Failed to load classes</div>;
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
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6">
      <TeacherDashboardClient classes={classes} stats={stats} user={session.user} />
    </div>
  );
}
