'use client';

import { useActionState, useState, useEffect } from 'react';
import { createClass, type ActionResult } from '@/lib/actions/class-actions';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, BookOpen, Plus, Key, BarChart3, Presentation, Calendar } from 'lucide-react';

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

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-10 h-[280px]">
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center mix-blend-overlay" />
        </div>

        <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 text-white bg-gradient-to-t from-black/80 to-transparent">
          <Badge className="w-fit mb-4 bg-white text-[#18102B]">TEACHER PORTAL</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Manage your classes, students, and course content.
          </p>
        </div>
      </div>

      {/* Finance / Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="bg-white hoverable={false} p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Presentation className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">Active</span>
          </div>
          <div>
            <span className="text-4xl font-bold text-gray-900">{stats.totalClasses}</span>
            <p className="text-sm font-medium text-gray-500 mt-1">Total Classes</p>
          </div>
        </Card>

        <Card className="bg-white hoverable={false} p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-bold text-gray-900">{stats.totalChapters}</span>
            <p className="text-sm font-medium text-gray-500 mt-1">Total Chapters</p>
          </div>
        </Card>

        <Card className="bg-white hoverable={false} p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-bold text-gray-900">{stats.totalStudents}</span>
            <p className="text-sm font-medium text-gray-500 mt-1">Total Students</p>
          </div>
        </Card>
        
        <Card className="bg-white hoverable={false} p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-bold text-gray-900">{stats.classesThisMonth}</span>
            <p className="text-sm font-medium text-gray-500 mt-1">Created This Month</p>
          </div>
        </Card>
      </div>

      {/* Classes Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Classes</h2>
        <div className="flex gap-4">
          <Link href="/teacher/browse">
            <Button variant="secondary" className="bg-white">Browse Public</Button>
          </Link>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-5 h-5" /> Create Class
          </Button>
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <Presentation className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No classes yet</h3>
          <p className="text-gray-500 mb-8">Create your first class to get started!</p>
          <Button size="lg" className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5" /> Create New Class
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Create New Class Card */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-white hover:border-[#18102B] transition-all duration-300 p-8 flex flex-col items-center justify-center min-h-[220px]"
          >
            <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#18102B]" />
            </div>
            <span className="text-lg font-semibold text-gray-500 group-hover:text-[#18102B]">Create New</span>
          </button>

          {/* Class Cards */}
          {classes.map((cls) => {
            return (
              <Card key={cls.id} className="flex flex-col justify-between min-h-[220px] hover:border-[#834DFB] transition-colors">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-gray-100 text-gray-700 font-medium">
                      {cls._count?.chapterLinks || 0} Chapters
                    </Badge>
                    <span className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                      <Users className="w-4 h-4" /> {cls._count?.memberships || 0}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {cls.name}
                  </h3>
                  
                  <div 
                    className="inline-flex items-center gap-2 cursor-pointer transition-colors bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded mt-2 border border-gray-200"
                    onClick={(e) => { e.preventDefault(); copyToClipboard(cls.key); }}
                    title="Click to copy"
                  >
                    <Key className="w-4 h-4 text-gray-500" />
                    <span className="font-mono text-sm text-gray-700">
                      Key: {cls.key}
                    </span>
                  </div>
                </div>
                
                {/* Action Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                  <Link href={`/teacher/classes/${cls.id}`}>
                    <Button variant="secondary" className="w-full bg-white">
                      Manage Class
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create Class Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Class">
        <form action={formAction} className="space-y-4">
          <div>
            <Input id="name" name="name" required placeholder="e.g. Advanced Physics 401" label="Class Name" />
          </div>
          {state?.error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 font-medium text-sm">
              {state.error}
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Class'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
