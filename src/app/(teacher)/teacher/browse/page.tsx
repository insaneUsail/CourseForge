import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTeacherClasses } from '@/lib/actions/class-actions';
import { getPublicChapters } from '@/lib/actions/chapter-actions';
import { Badge } from '@/components/ui/Badge';
import { Globe } from 'lucide-react';
import BrowseClient from './BrowseClient';

export default async function BrowsePage() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const classes = await getTeacherClasses();
  const publicChapters = await getPublicChapters();

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 pb-6 border-b border-gray-200">
        <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <Globe className="w-8 h-8 text-blue-600" />
        </div>
        
        <div>
          <Badge className="mb-2 bg-gray-100 text-gray-700 font-medium">
            Community
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Browse Chapters
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Discover and link shared knowledge to your classes.
          </p>
        </div>
      </div>
      
      <BrowseClient classes={classes || []} initialChapters={publicChapters || []} />
    </div>
  );
}
