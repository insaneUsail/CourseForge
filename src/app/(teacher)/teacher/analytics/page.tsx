import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTeacherAnalyticsOverview } from '@/lib/actions/analytics-actions';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { BarChart3, Users, CheckCircle2, AlertCircle } from 'lucide-react';

export default async function AnalyticsOverviewPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const data = await getTeacherAnalyticsOverview() || { totalStudents: 0, avgScore: 0, studentsWhoAttempted: 0, studentsNotStarted: 0, classes: [] };

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <Badge className="mb-1 bg-gray-100 text-gray-700 font-medium">
            Overview
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics</h1>
        </div>
      </div>
      
      {/* 4-Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="p-6 bg-white hoverable={false} flex flex-col justify-center h-36">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Students</span>
            <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <span className="text-3xl font-bold text-gray-900">{data.totalStudents}</span>
        </Card>
        
        <Card className="p-6 bg-white hoverable={false} flex flex-col justify-center h-36">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Avg Score</span>
            <div className="w-8 h-8 bg-purple-50 rounded flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <span className="text-3xl font-bold text-gray-900">{Math.round(data.avgScore)}%</span>
        </Card>
        
        <Card className="p-6 bg-white hoverable={false} flex flex-col justify-center h-36">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Attempted</span>
            <div className="w-8 h-8 bg-green-50 rounded flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <span className="text-3xl font-bold text-gray-900">{data.studentsWhoAttempted}</span>
        </Card>
        
        <Card className="p-6 bg-white hoverable={false} flex flex-col justify-center h-36">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Not Started</span>
            <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-orange-600" />
            </div>
          </div>
          <span className="text-3xl font-bold text-gray-900">{data.studentsNotStarted}</span>
        </Card>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Class Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.classes?.map((cls: any) => {
          return (
            <Link href={`/teacher/analytics/${cls.id}`} key={cls.id} className="block group">
              <Card className="p-6 h-full flex flex-col hover:border-[#834DFB] transition-colors">
                <h3 className="text-xl font-bold mb-6 text-gray-900 line-clamp-2">
                  {cls.name}
                </h3>
                
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-sm font-medium text-gray-500">
                      Students
                    </span>
                    <span className="font-semibold text-gray-900">
                      {cls.studentCount}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-sm font-medium text-gray-500">
                      Avg Score
                    </span>
                    <span className="font-semibold text-gray-900">
                      {Math.round(cls.avgScore || 0)}%
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
        {(!data.classes || data.classes.length === 0) && (
          <div className="col-span-full p-12 text-center bg-white border border-gray-200 border-dashed rounded-2xl shadow-sm">
            <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-500">No classes to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}
