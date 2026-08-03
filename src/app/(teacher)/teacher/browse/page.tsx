import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTeacherClasses } from '@/lib/actions/class-actions';
import { getPublicChapters } from '@/lib/actions/chapter-actions';
import BrowseClient from './BrowseClient';

export default async function BrowsePage() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'TEACHER') {
    redirect('/');
  }

  const classes = await getTeacherClasses();
  const publicChapters = await getPublicChapters();

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Hero Banner */}
      <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-8 shadow-xl border border-[var(--color-border)]">
        <img src="/browse_hero.jpg" alt="Browse Public Chapters" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 p-8 h-full flex flex-col justify-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Browse Public Chapters</h1>
          <p className="text-lg text-white/80">Discover and link shared knowledge to your classes.</p>
        </div>
      </div>
      <BrowseClient classes={classes || []} initialChapters={publicChapters || []} />
    </div>
  );
}
