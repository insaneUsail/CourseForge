import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getClassDetail } from '@/lib/actions/class-actions';
import ClassDetailClient from './ClassDetailClient';

export default async function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const { id } = await params;
  const classData = await getClassDetail(id);

  if (!classData) {
    return <div className="p-4 md:p-8 text-error">Class not found or error loading class.</div>;
  }

  const isOwner = classData.teacherId === session.user.id;

  if (!isOwner) {
    redirect('/teacher/dashboard');
  }

  return (
    <div className="flex w-full h-[calc(100vh-64px)]">
      <ClassDetailClient classData={classData} teacherId={session.user.id} />
    </div>
  );
}
