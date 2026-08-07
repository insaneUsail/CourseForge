import { getChapterDetail } from '@/lib/actions/chapter-actions';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
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
    <div className="min-h-screen bg-[#F5F3FF] flex flex-col relative overflow-hidden">
      {/* Heavy Dark Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_2px,transparent_2px),linear-gradient(to_bottom,#18102B15_2px,transparent_2px)] bg-[size:64px_64px] pointer-events-none z-0"></div>

      <Navbar user={user} />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-28 md:pt-32 pb-12 relative z-10">
        <div className="bg-white border-4 border-black p-6 md:p-10 rounded-[32px] shadow-[8px_8px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-[#18102B] mb-4 text-center uppercase tracking-tighter leading-tight" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}>{chapter.title}</h1>
          <div className="flex items-center justify-center gap-2 text-[#18102B] font-bold text-sm md:text-base uppercase tracking-widest bg-[#C6FF3D] w-fit mx-auto px-4 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <span>Created by</span>
            <span className="font-black">{chapter.owner?.name || 'Unknown Author'}</span>
          </div>
        </div>
        
        <div className="space-y-8 md:space-y-12">
          {chapter.contents.map((content: any, index: number) => (
            <div key={content.id} className="bg-white rounded-3xl p-6 md:p-10 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-4 mb-6 md:mb-8 border-b-4 border-black pb-4">
                <span className="w-12 h-12 flex items-center justify-center bg-[#834DFB] text-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] font-black text-xl rounded flex-shrink-0">
                  {index + 1}
                </span>
                <h2 className="text-xl md:text-3xl font-black text-[#18102B] uppercase tracking-tighter">{content.title || `Section ${index + 1}`}</h2>
              </div>
              <div 
                className="prose prose-slate max-w-none text-[#18102B] font-medium leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[#18102B]"
                dangerouslySetInnerHTML={{ __html: content.text }}
              />
            </div>
          ))}

          {chapter.quizzes.length > 0 && (
            <div className="bg-[#FF6B35] rounded-3xl p-6 md:p-12 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_rgba(0,0,0,1)] text-center mt-8 md:mt-16 transform transition-transform hover:-translate-y-1">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-6 uppercase tracking-tighter" style={{ WebkitTextStroke: '1px black', textShadow: '4px 4px 0 #18102B' }}>Ready to test your knowledge?</h2>
              <p className="text-white font-bold text-lg mb-8 max-w-2xl mx-auto bg-[#18102B] p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                Join a class to track your score, take interactive quizzes, and monitor your learning progress!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full font-black uppercase tracking-widest text-lg py-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-white hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 border-4">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full font-black uppercase tracking-widest text-lg py-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#18102B] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 border-4 border-black bg-[#834DFB]">
                    Sign Up for Free
                  </Button>
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
