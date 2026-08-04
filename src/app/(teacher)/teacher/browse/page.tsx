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
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 pb-6 border-b-4 border-black">
        <div className="w-20 h-20 bg-[#60A5FA] border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-2xl flex items-center justify-center flex-shrink-0 -rotate-3">
          <Globe className="w-10 h-10 text-[#18102B]" />
        </div>
        
        <div>
          <span className="inline-block mb-3 bg-[#18102B] text-white font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Community
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#18102B] tracking-tighter uppercase">
            Browse Chapters
          </h1>
          <p className="text-lg text-white font-bold bg-[#18102B] px-4 py-1.5 mt-2 rounded border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] w-fit">
            Discover and link shared knowledge to your classes.
          </p>
        </div>
      </div>
      
      <BrowseClient classes={classes || []} initialChapters={publicChapters || []} />
    </div>
  );
}
