import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getChapterDetail } from '@/lib/actions/chapter-actions';
import ChapterEditorClient from './ChapterEditorClient';

export default async function ChapterEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const { id } = await params;
  const chapterData = await getChapterDetail(id);

  if (!chapterData) {
    return <div className="p-8 text-error">Chapter not found or error loading chapter.</div>;
  }

  
  if (chapterData.ownerTeacherId !== session.user.id) {
    // If not owner, maybe redirect or show a readonly view. Let's redirect to dashboard for now.
    redirect('/teacher/dashboard');
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <ChapterEditorClient chapter={chapterData} />
    </div>
  );
}
