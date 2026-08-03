import { getChapterDetail } from '@/lib/actions/chapter-actions';
import { notFound } from 'next/navigation';
import { ChapterReaderClient } from '@/components/student/ChapterReaderClient';

export default async function ChapterReaderPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ classId?: string }>
}) {
  const { id } = await params;
  const { classId } = await searchParams;

  const chapter = await getChapterDetail(id);

  if (!chapter) {
    notFound();
  }

  return (
    <div className="h-full flex overflow-hidden">
      <ChapterReaderClient chapter={chapter} classId={classId} />
    </div>
  );
}
