import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { auth } from '@/lib/auth';
import { getPublicChapters } from '@/lib/actions/chapter-actions';
import { TicketCard, TicketColor } from '@/components/ui/TicketCard';
import { PillButton } from '@/components/ui/PillButton';
import Link from 'next/link';
import { Play } from 'lucide-react';

const ticketColors: TicketColor[] = ['blue', 'green', 'yellow', 'pink', 'purple'];

export default async function BrowsePublicPage() {
  const session = await auth();
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name || '',
    role: session.user.role.toLowerCase() as 'teacher' | 'student'
  } : null;

  const publicChapters = await getPublicChapters();

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <Navbar user={user} />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 md:py-6 md:py-12">
        <div className="mb-6 md:mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-lg md:text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Explore Free Content</h1>
          <p className="text-lg text-slate-600">
            Browse through our collection of free, high-quality public chapters created by teachers around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-8">
          {publicChapters.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
              <p className="text-xl font-medium">No public chapters available yet.</p>
              <p className="mt-2">Check back later for exciting new content!</p>
            </div>
          ) : (
            publicChapters.map((chapter: any, index: number) => {
              const color = ticketColors[index % ticketColors.length];
              const dateAdded = new Date(chapter.createdAt).toLocaleDateString('en-GB');

              return (
                <TicketCard
                  key={chapter.id}
                  color={color}
                  topLeftText="PUBLIC"
                  topRightText={dateAdded}
                  title={chapter.title}
                  subtitle={`By ${chapter.owner?.name || 'Unknown Author'}`}
                  statusBadge={
                    <span className="px-2 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                      {chapter._count?.contents || 0} Sections
                    </span>
                  }
                  priceText="Free"
                >
                  <Link href={`/chapters/${chapter.id}`}>
                    <PillButton color="dark" label="Start Reading" className="px-4 py-2 text-xs" icon={<Play className="w-3 h-3" />} />
                  </Link>
                </TicketCard>
              );
            })
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
