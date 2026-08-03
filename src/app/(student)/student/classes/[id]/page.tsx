import { getClassChapters } from '@/lib/actions/chapter-actions';
import { db } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TicketCard, TicketColor } from '@/components/ui/TicketCard';
import { PillButton } from '@/components/ui/PillButton';
import { Play, BookOpen } from 'lucide-react';

const ticketColors: TicketColor[] = ['blue', 'green', 'yellow', 'pink', 'purple'];

export default async function ClassChaptersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const classData = await db.class.findUnique({
    where: { id },
    include: { teacher: true }
  });

  if (!classData) {
    notFound();
  }

  const chapters = await getClassChapters(id);

  const sidebarItems = chapters.map((link: any) => ({
    id: link.chapterId,
    label: link.chapter.title,
    href: `/student/chapters/${link.chapterId}?classId=${id}`
  }));

  return (
    <div className="flex w-full h-[calc(100vh-64px)] bg-slate-50">
      {/* Left Sidebar (W3Schools style) */}
      <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto hidden md:block">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-800 tracking-wide uppercase text-sm">
          Class Content
        </div>
        <div className="flex flex-col py-2">
          {sidebarItems.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">No chapters available.</div>
          ) : (
            sidebarItems.map((item: any) => (
              <Link 
                key={item.id} 
                href={item.href}
                className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header & Pill Buttons */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{classData.name}</h1>
            <div className="text-slate-500 mb-8 flex gap-4">
              <span>Teacher: <strong className="text-slate-700">{classData.teacher?.name}</strong></span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link href={`/student/history`}>
                <PillButton color="purple" icon={<BookOpen />} label="My Progress" />
              </Link>
            </div>
          </div>

          {/* Chapters Grid (Tickets) */}
          <div className="mb-6 font-bold text-slate-800 text-xl border-b border-slate-200 pb-2">
            Class Chapters
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {chapters.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500">
                <p>Your teacher hasn't added any chapters to this class yet.</p>
              </div>
            ) : (
              chapters.map((link: any, index: number) => {
                const chapter = link.chapter;
                const isRemoved = !!link.removedAt;
                const color = ticketColors[index % ticketColors.length];
                const dateAdded = new Date(link.addedAt).toLocaleDateString('en-GB');

                return (
                  <TicketCard
                    key={link.id}
                    color={color}
                    topLeftText={chapter.id.substring(0, 8).toUpperCase()}
                    topRightText={dateAdded}
                    title={chapter.title}
                    subtitle={chapter.owner?.name || 'Unknown Author'}
                    statusBadge={
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${chapter.isPublic ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}>
                        {chapter.isPublic ? 'Public' : 'Private'}
                      </span>
                    }
                    priceText="Free"
                    className={isRemoved ? 'opacity-50 grayscale' : ''}
                  >
                    {isRemoved ? (
                      <span className="text-sm font-medium text-red-500">Removed</span>
                    ) : (
                      <Link href={`/student/chapters/${chapter.id}?classId=${id}`}>
                        <PillButton color="dark" label="View Detail" className="px-4 py-2 text-xs" icon={<Play className="w-3 h-3" />} />
                      </Link>
                    )}
                  </TicketCard>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
