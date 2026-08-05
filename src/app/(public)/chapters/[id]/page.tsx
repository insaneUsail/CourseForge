import { getChapterDetail } from '@/lib/actions/chapter-actions';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { PillButton } from '@/components/ui/PillButton';
import { auth } from '@/lib/auth';

export default async function PublicChapterReaderPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name || '',
    role: session.user.role.toLowerCase() as 'teacher' | 'student'
  } : null;
  const { id } = await params;
  
  const chapter = await getChapterDetail(id);

  if (!chapter || !chapter.isPublic) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar user={user} />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-28 md:pt-32 pb-12">
        <h1 className="text-xl md:text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 text-center">{chapter.title}</h1>
        <p className="text-center text-slate-500 mb-6 md:mb-12 font-medium">
          Created by {chapter.owner?.name || 'Unknown Author'}
        </p>
        
        <div className="space-y-12">
          {chapter.contents.map((content: any, index: number) => (
            <div key={content.id} className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
              <h2 className="text-lg md:text-2xl font-bold text-slate-800 mb-6">{content.title || `Section ${index + 1}`}</h2>
              <div 
                className="prose prose-slate max-w-none text-slate-800"
                dangerouslySetInnerHTML={{ __html: content.text }}
              />
            </div>
          ))}

          {chapter.quizzes.length > 0 && (
            <div className="bg-indigo-50 rounded-3xl p-4 md:p-6 md:p-10 border border-indigo-100 text-center mt-6 md:mt-12">
              <h2 className="text-lg md:text-2xl md:text-3xl font-bold text-indigo-900 mb-4">Ready to test your knowledge?</h2>
              <p className="text-indigo-700 mb-4 md:mb-8 max-w-xl mx-auto">
                Join a class to track your score, take interactive quizzes, and monitor your learning progress!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/login">
                  <PillButton color="light" label="Log In" />
                </Link>
                <Link href="/signup">
                  <PillButton color="purple" label="Sign Up for Free" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
