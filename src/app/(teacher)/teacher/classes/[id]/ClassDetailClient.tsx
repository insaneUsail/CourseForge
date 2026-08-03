'use client';

import { useActionState, useState, useEffect } from 'react';
import { createChapter, type ActionResult } from '@/lib/actions/chapter-actions';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { PillButton } from '@/components/ui/PillButton';
import { TicketCard, TicketColor } from '@/components/ui/TicketCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { Plus, BarChart, Settings, Play, Edit3 } from 'lucide-react';

const ticketColors: TicketColor[] = ['blue', 'green', 'yellow', 'pink', 'purple'];

export default function ClassDetailClient({ classData, teacherId }: { classData: any, teacherId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chapters = classData.chapterLinks || [];
  
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(createChapter as any, null);

  useEffect(() => {
    if (state?.success) {
      setIsModalOpen(false);
    }
  }, [state]);

  const sidebarItems = chapters.map((link: any, idx: number) => ({
    id: link.chapterId,
    label: link.chapter.title,
    href: `/teacher/chapters/${link.chapterId}/edit`
  }));

  return (
    <div className="flex w-full h-full bg-slate-50">
      {/* Left Sidebar (W3Schools style) */}
      <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto hidden md:block">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-800 tracking-wide uppercase text-sm">
          Class Content
        </div>
        <div className="flex flex-col py-2">
          {sidebarItems.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">No chapters yet.</div>
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
              <span>Join Key: <strong className="text-slate-700">{classData.key}</strong></span>
              <span>•</span>
              <span>{classData.memberships?.length || 0} Students</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <PillButton 
                color="purple" 
                icon={<Plus />} 
                label="Add Chapter" 
                onClick={() => setIsModalOpen(true)} 
              />
              <Link href={`/teacher/analytics/${classData.id}`}>
                <PillButton color="yellow" icon={<BarChart />} label="Analytics" />
              </Link>
              <PillButton color="light" icon={<Settings />} label="Settings" />
            </div>
          </div>

          {/* Chapters Grid (Tickets) */}
          <div className="mb-6 font-bold text-slate-800 text-xl border-b border-slate-200 pb-2">
            Chapters Overview
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {chapters.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500">
                <p>You haven't added any chapters to this class yet.</p>
                <Button className="mt-4" onClick={() => setIsModalOpen(true)}>Create First Chapter</Button>
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
                    statusBadge={
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${chapter.isPublic ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}>
                        {chapter.isPublic ? 'Public' : 'Private'}
                      </span>
                    }
                    priceText="Free"
                    className={isRemoved ? 'opacity-50 grayscale' : ''}
                  >
                    {!isRemoved && isAuthor && (
                      <Link href={`/teacher/chapters/${chapter.id}/edit`}>
                        <PillButton color="dark" label="Edit" className="px-4 py-2 text-xs" icon={<Edit3 className="w-3 h-3" />} />
                      </Link>
                    )}
                    {!isRemoved && !isAuthor && (
                      <Link href={`/teacher/chapters/${chapter.id}/view`}>
                        <PillButton color="dark" label="View" className="px-4 py-2 text-xs" />
                      </Link>
                    )}
                  </TicketCard>
                );
              })
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Chapter">
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="classId" value={classData.id} />
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Chapter Title</label>
            <Input id="title" name="title" required placeholder="e.g. Introduction to Kinematics" />
          </div>
          {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
