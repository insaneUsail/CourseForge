'use client';

import { useActionState, useState, useEffect } from 'react';
import { createChapter, type ActionResult } from '@/lib/actions/chapter-actions';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { PillButton } from '@/components/ui/PillButton';
import { TicketCard, TicketColor } from '@/components/ui/TicketCard';
import { Plus, BarChart, Settings, Edit3, Key, Layers, ChevronRight, Play } from 'lucide-react';

const ticketColors: TicketColor[] = ['blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'teal'];

export default function ClassDetailClient({ classData, teacherId }: { classData: any, teacherId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chapters = classData.chapterLinks || [];
  
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(createChapter as any, null);

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const sidebarItems = chapters.map((link: any) => ({
    id: link.chapterId,
    label: link.chapter.title,
    href: `/teacher/chapters/${link.chapterId}/edit`
  }));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex w-full h-full bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_1px,transparent_1px),linear-gradient(to_bottom,#18102B15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      
      {/* Left Sidebar */}
      <div className="w-72 bg-[#F5F3FF] border-r-2 md:border-r-4 border-black overflow-y-auto hidden md:block z-10 relative shadow-[4px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-4 md:p-6 border-b-2 md:border-b-4 border-black bg-[#C6FF3D] flex items-center gap-3">
          <Layers className="w-6 h-6 text-[#18102B]" />
          <span className="font-black text-[#18102B] tracking-widest uppercase text-sm">Class Content</span>
        </div>
        <div className="flex flex-col p-4 gap-2">
          {sidebarItems.length === 0 ? (
            <div className="p-4 bg-white border-2 border-black border-dashed rounded-lg text-sm text-[#18102B] font-bold text-center">No chapters yet.</div>
          ) : (
            sidebarItems.map((item: any) => (
              <Link 
                key={item.id} 
                href={item.href}
                className="group p-3 bg-white border-2 border-black rounded-xl text-sm font-bold text-[#18102B] hover:bg-[#18102B] hover:text-white transition-transform shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-between"
              >
                <span className="truncate pr-2">{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-12 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-12 bg-[#FF6B35] p-4 md:p-8 rounded-[32px] border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 md:w-32 h-16 md:h-32 bg-[#F0E100] rounded-bl-full opacity-50 mix-blend-screen"></div>
            
            <div className="relative z-10 flex flex-col items-start gap-4 mb-4">
              <Link 
                href="/teacher/dashboard" 
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#18102B] bg-white px-3 py-1.5 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-transform"
              >
                ← Back to Dashboard
              </Link>
              <span className="inline-block bg-white text-[#18102B] font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                Class Overview
              </span>
            </div>
              <h1 className="text-lg md:text-2xl md:text-4xl md:text-5xl font-black text-[#18102B] mb-4 uppercase tracking-tighter w-full max-w-3xl truncate">
                {classData.name}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-4 md:mb-8">
                <div 
                  className="bg-white px-4 py-2 rounded-lg border-2 border-black flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform"
                  onClick={() => copyToClipboard(classData.key)}
                  title="Copy Key"
                >
                  <Key className="w-5 h-5 text-[#18102B]" />
                  <span className="text-[#18102B] font-black uppercase text-sm">Key: {classData.key}</span>
                </div>
                
                <div className="bg-[#18102B] text-white px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-2 font-black uppercase text-sm">
                  {classData.memberships?.length || 0} Students
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-[#C6FF3D] text-[#18102B] hover:bg-white gap-2 font-black uppercase tracking-widest text-sm py-3 md:py-6"
                  onClick={() => setIsModalOpen(true)} 
                >
                  <Plus className="w-5 h-5" /> Add Chapter
                </Button>
                <Link href={`/teacher/analytics/${classData.id}`}>
                  <Button variant="secondary" className="bg-white gap-2 font-black uppercase tracking-widest text-sm py-3 md:py-6 border-black hover:bg-gray-100">
                    <BarChart className="w-5 h-5" /> Analytics
                  </Button>
                </Link>
                <Button variant="secondary" className="bg-[#18102B] text-white hover:bg-gray-800 gap-2 font-black uppercase tracking-widest text-sm py-3 md:py-6 border-black">
                  <Settings className="w-5 h-5" /> Settings
                </Button>
              </div>
            </div>

          {/* Chapters Grid */}
          <div className="mb-4 md:mb-8 font-black text-[#18102B] text-xl md:text-3xl border-b-2 md:border-b-4 border-black pb-4 uppercase tracking-tighter">
            Chapters Overview
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-8">
            {chapters.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-[#F5F3FF] rounded-[32px] border-2 md:border-4 border-dashed border-[#18102B] shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <p className="text-lg md:text-2xl font-black text-[#18102B] uppercase mb-4 tracking-tighter">No chapters added yet.</p>
                <Button className="bg-[#18102B] text-white font-black" onClick={() => setIsModalOpen(true)}>Create First Chapter</Button>
              </div>
            ) : (
              chapters.map((link: any, index: number) => {
                const chapter = link.chapter;
                const isRemoved = !!link.removedAt;
                const isAuthor = chapter.ownerTeacherId === teacherId;
                const color = ticketColors[index % ticketColors.length];
                const dateAdded = new Date(link.addedAt).toLocaleDateString('en-GB');

                return (
                  <TicketCard
                    key={link.id}
                    color={color}
                    topLeftText={chapter.id.substring(0, 8).toUpperCase()}
                    topRightText={dateAdded}
                    title={chapter.title}
                    subtitle={isAuthor ? 'You (Author)' : chapter.owner?.name || 'Unknown Author'}
                    priceText="Free"
                    className={`min-h-[260px] ${isRemoved ? 'opacity-50 grayscale' : ''}`}
                  >
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] ${chapter.isPublic ? 'bg-[#C6FF3D] text-[#18102B]' : 'bg-white text-[#18102B]'}`}>
                        {chapter.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>

                    <div className="mt-auto pt-4 border-t-2 border-black/30 border-dashed">
                      {!isRemoved && isAuthor && (
                        <Link href={`/teacher/chapters/${chapter.id}/edit`}>
                          <Button className="w-full gap-2 bg-[#18102B] text-white font-black hover:bg-gray-800">
                            <Edit3 className="w-4 h-4" /> Edit Content
                          </Button>
                        </Link>
                      )}
                      {!isRemoved && !isAuthor && (
                        <Link href={`/teacher/chapters/${chapter.id}/view`}>
                          <Button className="w-full gap-2 bg-white text-[#18102B] font-black border-2 border-black hover:bg-gray-100">
                            <Play className="w-4 h-4" /> View Content
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="CREATE NEW CHAPTER">
        <form action={formAction} className="space-y-6">
          <input type="hidden" name="classId" value={classData.id} />
          <div>
            <label htmlFor="title" className="block text-xs font-black uppercase text-[#18102B] mb-2 tracking-widest">Chapter Title</label>
            <Input id="title" name="title" required placeholder="e.g. Introduction to Kinematics" className="border-2 border-black font-bold" />
          </div>
          {state?.error && (
            <p className="bg-[#FF6B35] text-white p-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] font-black text-xs uppercase">
              {state.error}
            </p>
          )}
          <div className="flex justify-end gap-4 mt-4 md:mt-8">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="border-2 border-transparent hover:border-black font-bold">Cancel</Button>
            <Button type="submit" disabled={isPending} className="bg-[#18102B] text-white font-black uppercase tracking-widest px-4 md:px-8">
              {isPending ? 'CREATING...' : 'CREATE'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
