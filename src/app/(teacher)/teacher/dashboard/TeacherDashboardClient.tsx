'use client';

import { useActionState, useState, useEffect } from 'react';
import { createClass, type ActionResult } from '@/lib/actions/class-actions';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TicketCard } from '@/components/ui/TicketCard';
import { Users, BookOpen, Plus, Key, BarChart3, Presentation, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeacherDashboardClient({ classes, stats, user }: { classes: any[], stats: any, user: any }) {
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
    // Ideally add a toast here
  };

  const ticketColors = ['blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'teal'];

  return (
    <div>
      {/* Neo-Brutalist Hero Banner */}
      <div className="relative w-full rounded-2xl md:rounded-[32px] overflow-hidden mb-6 md:mb-12 h-auto border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] bg-[#FF6B35]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_2px,transparent_2px),linear-gradient(to_bottom,#18102B15_2px,transparent_2px)] bg-[size:32px_32px]"></div>
        
        <motion.div 
          animate={{ rotate: [0, 15, 0], scale: [1, 1.05, 1] }} 
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-4 md:top-10 right-4 md:right-20 w-16 md:w-32 h-16 md:h-32 md:w-40 md:h-40 bg-[#C6FF3D] border-2 md:border-4 border-black mix-blend-screen opacity-90 shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_rgba(0,0,0,1)]"
        ></motion.div>
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -bottom-10 left-10 md:left-1/3 w-12 md:w-24 h-12 md:h-24 md:w-32 md:h-32 bg-[#834DFB] border-2 md:border-4 border-black rounded-full mix-blend-screen opacity-90 shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
        ></motion.div>

        <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-6 md:p-12 text-[#18102B] min-h-[200px]">
          <span className="w-fit mb-3 bg-white text-[#18102B] font-black text-[10px] md:text-xs uppercase tracking-widest px-2 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            TEACHER PORTAL
          </span>
          <h1 className="text-xl md:text-3xl sm:text-4xl md:text-6xl font-black mb-3 md:mb-4 uppercase tracking-tighter text-white leading-none" style={{ WebkitTextStroke: '1px black' }}>
            Welcome back,<br className="md:hidden" /> {user?.name}
          </h1>
          <p className="text-sm md:text-lg text-[#18102B] font-bold bg-[#C6FF3D] w-full sm:w-fit px-4 py-3 border-2 border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] leading-snug">
            Manage your classes, students, and course content.
          </p>
        </div>
      </div>

      {/* Finance / Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:p-8 mb-6 md:mb-12">
        <Card className="bg-[#B4F481] hoverable={true} p-4 md:p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-3">
              <Presentation className="w-6 h-6 text-[#18102B]" />
            </div>
            <span className="text-xs font-black text-white bg-[#18102B] px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">Active</span>
          </div>
          <div>
            <span className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B]">{stats.totalClasses}</span>
            <p className="text-sm font-bold text-[#18102B] uppercase tracking-wider mt-1">Total Classes</p>
          </div>
        </Card>

        <Card className="bg-[#A78BFA] hoverable={true} p-4 md:p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-3">
              <BookOpen className="w-6 h-6 text-[#18102B]" />
            </div>
          </div>
          <div>
            <span className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B]">{stats.totalChapters}</span>
            <p className="text-sm font-bold text-[#18102B] uppercase tracking-wider mt-1">Total Chapters</p>
          </div>
        </Card>

        <Card className="bg-[#60A5FA] hoverable={true} p-4 md:p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-6">
              <Users className="w-6 h-6 text-[#18102B]" />
            </div>
          </div>
          <div>
            <span className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B]">{stats.totalStudents}</span>
            <p className="text-sm font-bold text-[#18102B] uppercase tracking-wider mt-1">Total Students</p>
          </div>
        </Card>
        
        <Card className="bg-[#FCD34D] hoverable={true} p-4 md:p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-6">
              <BarChart3 className="w-6 h-6 text-[#18102B]" />
            </div>
          </div>
          <div>
            <span className="text-xl md:text-3xl md:text-5xl font-black text-[#18102B]">{stats.classesThisMonth}</span>
            <p className="text-sm font-bold text-[#18102B] uppercase tracking-wider mt-1">Created This Month</p>
          </div>
        </Card>
      </div>

      {/* Classes Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-8 pb-4 border-b-2 md:border-b-4 border-black gap-4">
        <h2 className="text-lg md:text-2xl md:text-4xl font-black text-[#18102B] uppercase tracking-tighter">Your Classes</h2>
        <div className="flex gap-4">
          <Link href="/teacher/browse">
            <Button variant="secondary" className="bg-white hover:bg-gray-100">Browse Public</Button>
          </Link>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-6 h-6 border-2 border-black bg-white text-black rounded-full" /> Create Class
          </Button>
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="w-full bg-white border-2 md:border-4 border-black rounded-[32px] p-4 md:p-6 md:p-12 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="w-12 md:w-24 h-12 md:h-24 bg-[#18102B] rounded-2xl flex items-center justify-center mb-6 border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-3">
            <Presentation className="w-12 h-12 text-[#FF6B35]" />
          </div>
          <h3 className="text-xl md:text-3xl font-black text-[#18102B] mb-2 uppercase tracking-tighter">No classes yet</h3>
          <p className="text-[#18102B] font-bold text-lg mb-4 md:mb-8">Create your first class to get started!</p>
          <Button size="lg" className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5" /> Create New Class
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-8">
          {/* Create New Class Card */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative overflow-hidden rounded-[32px] border-2 md:border-4 border-dashed border-[#18102B] bg-[#F5F3FF] hover:bg-[#C6FF3D] hover:border-solid hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300 p-4 md:p-8 flex flex-col items-center justify-center min-h-[260px]"
          >
            <div className="w-16 h-16 rounded-full bg-white border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <Plus className="w-8 h-8 text-[#18102B]" />
            </div>
            <span className="text-xl font-black text-[#18102B] uppercase tracking-tight">Create New</span>
          </button>

          {/* Class Cards */}
          {classes.map((cls, idx) => {
            const color = ticketColors[idx % ticketColors.length] as any;
            return (
              <TicketCard
                key={cls.id}
                color={color}
                title={cls.name}
                subtitle={`${cls._count?.memberships || 0} Students`}
                topLeftText="Manage Class"
                topRightText="Active"
                priceText={`${cls._count?.chapterLinks || 0} Chps`}
                className="min-h-[260px]"
              >
                <div 
                  className="inline-flex items-center gap-2 cursor-pointer transition-colors bg-white hover:bg-gray-100 px-3 py-1.5 rounded-lg mt-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                  onClick={(e) => { e.preventDefault(); copyToClipboard(cls.key); }}
                  title="Click to copy key"
                >
                  <Key className="w-4 h-4 text-[#18102B]" />
                  <span className="font-bold text-sm text-[#18102B] uppercase tracking-wider">
                    Key: {cls.key}
                  </span>
                </div>
                
                <div className="mt-6 pt-4 border-t-2 border-dashed border-black/30">
                  <Link href={`/teacher/classes/${cls.id}`} className="block w-full">
                    <Button variant="secondary" className="w-full bg-white text-black font-black hover:bg-gray-100">
                      Manage Class
                    </Button>
                  </Link>
                </div>
              </TicketCard>
            );
          })}
        </div>
      )}

      {/* Create Class Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Class">
        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-xs font-black uppercase text-[#18102B] mb-1 block">Class Name</label>
            <Input id="name" name="name" required placeholder="e.g. Advanced Physics 401" className="border-2 border-black font-bold" />
          </div>
          {state?.error && (
            <div className="bg-[#FF6B35] text-white p-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] font-black text-xs uppercase">
              {state.error}
            </div>
          )}
          <div className="flex justify-end gap-3 mt-4 md:mt-8">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="border-2 border-transparent hover:border-black font-bold">Cancel</Button>
            <Button type="submit" disabled={isPending} className="bg-[#18102B] text-white font-bold">
              {isPending ? 'Creating...' : 'Create Class'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
