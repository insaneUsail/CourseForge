import { auth } from '@/lib/auth';
import { getStudentClasses } from '@/lib/actions/class-actions';
import { StudentDashboardClient } from '@/components/student/StudentDashboardClient';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Calendar, Clock, Star } from 'lucide-react';

export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  const classes = await getStudentClasses();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Hero Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-10 h-[280px]">
        {/* Simple Photo background (you can replace the src with a real image if you want) */}
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center mix-blend-overlay" />
        </div>

        <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 text-white bg-gradient-to-t from-black/80 to-transparent">
          <Badge className="w-fit mb-4 bg-[#C6FF3D] text-[#18102B]">STUDENT PORTAL</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome back, {session.user.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Here are your classes and dashboard.
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-10">
        {/* Left Col: Classes & Stats */}
        <div className="flex-1">
          
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Your Classes</h2>
            <Badge className="bg-gray-100 text-gray-700">
              {classes.length} Total
            </Badge>
          </div>

          {classes.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-500">Join a class using the form to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classes.map((membership: any) => {
                return (
                  <Link key={membership.class.id} href={`/student/classes/${membership.class.id}`} className="block">
                    <Card className="h-full hover:border-[#834DFB] transition-colors">
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">
                          {membership.class.name}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">Teacher: {membership.class.teacher?.name}</p>
                        
                        <Badge className="mb-4 bg-[#C6FF3D] text-[#18102B]">
                          {membership.class._count?.chapterLinks || 0} Chapters
                        </Badge>
                        
                        <p className="text-xs text-gray-400 mt-4">
                          Joined: {new Date(membership.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Col: Actions & Notices */}
        <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
          <div className="sticky top-6">
            <StudentDashboardClient />
          </div>
        </div>
      </div>
    </div>
  );
}
