'use client';

import { useActionState, useState, useEffect } from 'react';
import { createClass, type ActionResult } from '@/lib/actions/class-actions';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { TicketCard, TicketColor } from '@/components/ui/TicketCard';
import { PillButton } from '@/components/ui/PillButton';
import { Users, BookOpen, Plus, Key } from 'lucide-react';

const ticketColors: TicketColor[] = ['blue', 'green', 'yellow', 'pink', 'purple'];

export default function TeacherDashboardClient({ classes, stats }: { classes: any[], stats: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(createClass as any, null);

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-col items-center justify-center shadow-sm">
          <span className="text-5xl font-extrabold text-indigo-600 mb-2">{stats.totalClasses}</span>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Classes</span>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-col items-center justify-center shadow-sm">
          <span className="text-5xl font-extrabold text-blue-500 mb-2">{stats.totalChapters}</span>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Chapters</span>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-col items-center justify-center shadow-sm">
          <span className="text-5xl font-extrabold text-teal-500 mb-2">{stats.totalStudents}</span>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Students</span>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-col items-center justify-center shadow-sm">
          <span className="text-5xl font-extrabold text-pink-500 mb-2">{stats.classesThisMonth}</span>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Created This Month</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900">Your Classes</h2>
        <Link href="/teacher/browse">
          <PillButton color="light" label="Browse Public Chapters" />
        </Link>
      </div>

      {classes.length === 0 ? (
        <div className="w-full bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <img src="/empty_classes.jpg" alt="No classes" className="w-48 h-48 mb-6 opacity-80" />
          <p className="text-2xl font-bold text-slate-800 mb-2">No classes yet</p>
          <p className="text-slate-500 mb-8 font-medium">Create your first class to get started!</p>
          <PillButton color="purple" label="Create New Class" icon={<Plus />} onClick={() => setIsModalOpen(true)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/50 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 p-8 flex flex-col items-center justify-center min-h-[220px]"
          >
            <div className="w-16 h-16 rounded-full bg-slate-200 group-hover:bg-indigo-200 flex items-center justify-center mb-4 transition-colors">
              <Plus className="w-8 h-8 text-slate-500 group-hover:text-indigo-600" />
            </div>
            <span className="text-xl font-bold text-slate-600 group-hover:text-indigo-700 transition-colors">Create New Class</span>
          </button>

          {classes.map((cls, index) => {
            const color = ticketColors[index % ticketColors.length];
            return (
              <div key={cls.id} className="relative group block">
                <TicketCard
                  color={color}
                  topLeftText="CLASS"
                  topRightText={`${cls._count?.chapterLinks || 0} Chapters`}
                  title={
                    <Link href={`/teacher/classes/${cls.id}`} className="hover:text-indigo-600 hover:underline block">
                      {cls.name}
                    </Link>
                  }
                  subtitle={
                    <div 
                      className="flex items-center gap-2 cursor-pointer hover:text-slate-800 transition-colors"
                      onClick={(e) => { e.preventDefault(); copyToClipboard(cls.key); }}
                    >
                      <Key className="w-3 h-3" />
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs select-all">Key: {cls.key}</span>
                    </div>
                  }
                  statusBadge={
                    <span className="px-2 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 flex items-center gap-1">
                      <Users className="w-3 h-3" /> {cls._count?.memberships || 0} Students
                    </span>
                  }
                  priceText=""
                >
                  <Link href={`/teacher/classes/${cls.id}`}>
                    <PillButton color="dark" label="Manage Class" className="px-4 py-2 text-xs" />
                  </Link>
                </TicketCard>
              </div>
            );
          })}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Class">
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Class Name</label>
            <Input id="name" name="name" required placeholder="e.g. Physics 101" />
          </div>
          {state?.error && <p className="text-red-500 text-sm font-medium">{state.error}</p>}
          <div className="flex justify-end gap-3 mt-8">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-6">
              {isPending ? 'Creating...' : 'Create Class'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
