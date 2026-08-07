import { getClassChapters } from '@/lib/actions/chapter-actions';
import { db } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TicketCard, TicketColor } from '@/components/ui/TicketCard';
import { Button } from '@/components/ui/Button';
import { Play, BookOpen, Layers, ChevronRight, User } from 'lucide-react';

const ticketColors: TicketColor[] = ['blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'teal'];

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
    <div className="flex w-full h-[calc(100vh-64px)] bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_1px,transparent_1px),linear-gradient(to_bottom,#18102B15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      


      {/* Main Content Area */}
      <div className="flex-1 w-full p-4 md:p-6 lg:p-8 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-12 bg-[#834DFB] p-4 md:p-6 lg:p-8 rounded-[32px] border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 md:w-32 h-16 md:h-32 bg-[#C6FF3D] rounded-bl-full opacity-50 mix-blend-screen"></div>
            
            <div className="relative z-10">
              <span className="inline-block mb-4 bg-white text-[#18102B] font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                Class Overview
              </span>
              <h1 className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-4 uppercase tracking-tighter w-full max-w-3xl truncate" style={{ WebkitTextStroke: '1px black' }}>
                {classData.name}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-4 md:mb-8">
                <div className="bg-white px-4 py-2 rounded-lg border-2 border-black flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <User className="w-5 h-5 text-[#18102B]" />
                  <span className="text-[#18102B] font-black uppercase text-sm">Teacher: {classData.teacher?.name}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href={`/student/history`}>
                  <Button className="bg-[#C6FF3D] text-[#18102B] hover:bg-white gap-2 font-black uppercase tracking-widest text-sm py-3 md:py-6 border-black">
                    <BookOpen className="w-5 h-5" /> My Progress
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Chapters Grid */}
          <div className="mb-4 md:mb-8 font-black text-[#18102B] text-xl md:text-3xl border-b-2 md:border-b-4 border-black pb-4 uppercase tracking-tighter">
            Class Chapters
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-8">
            {chapters.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-[#F5F3FF] rounded-[32px] border-2 md:border-4 border-dashed border-[#18102B] shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <p className="text-lg md:text-2xl font-black text-[#18102B] uppercase mb-4 tracking-tighter">Your teacher hasn't added any chapters yet.</p>
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
                    priceText="Free"
                    className={`min-h-[260px] ${isRemoved ? 'opacity-50 grayscale' : ''}`}
                  >
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] ${chapter.isPublic ? 'bg-[#C6FF3D] text-[#18102B]' : 'bg-white text-[#18102B]'}`}>
                        {chapter.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>

                    <div className="mt-auto pt-4 border-t-2 border-black/30 border-dashed flex justify-between items-center">
                      {isRemoved ? (
                        <span className="text-sm font-black uppercase text-red-500 bg-red-50 px-3 py-1 rounded border-2 border-red-500">Removed</span>
                      ) : (
                        <Link href={`/student/chapters/${chapter.id}?classId=${id}`} className="w-full">
                          <Button className="w-full gap-2 bg-[#18102B] text-white font-black hover:bg-[#FF6B35]">
                            <Play className="w-4 h-4" /> Start Chapter
                          </Button>
                        </Link>
                      )}
                    </div>
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
