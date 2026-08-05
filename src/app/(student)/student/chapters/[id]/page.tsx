import { getChapterDetail } from '@/lib/actions/chapter-actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
    <div className="h-full flex flex-col md:flex-row overflow-hidden relative">
      {/* Mobile Back Button */}
      <div className="md:hidden p-4 border-b-2 border-black bg-white flex items-center shadow-[0_2px_0px_rgba(0,0,0,1)] z-20">
        <Link 
          href={classId ? `/student/classes/${classId}` : '/student/dashboard'} 
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#18102B] bg-[#C6FF3D] px-4 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
        >
          ← Back
        </Link>
      </div>
      <ChapterReaderClient chapter={chapter} classId={classId} />
    </div>
  );
}
