import { auth } from '@/lib/auth';
import { getStudentClasses } from '@/lib/actions/class-actions';
import { StudentDashboardClient } from '@/components/student/StudentDashboardClient';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  const classes = await getStudentClasses();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-8 shadow-xl border border-[var(--color-border)]">
        <img src="/student_banner.jpg" alt="Student Dashboard" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 p-8 h-full flex flex-col justify-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Welcome, {session.user.name}</h1>
          <p className="text-lg text-white/80">Here are your classes and dashboard.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Col: Classes */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] mb-6">Your Classes</h2>
          {classes.length === 0 ? (
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
              <img src="/empty_classes.jpg" alt="No classes" className="w-48 h-48 mb-6 mix-blend-multiply dark:mix-blend-lighten opacity-80" />
              <p className="text-xl font-semibold text-[var(--color-foreground)] mb-2">No classes yet</p>
              <p className="text-[var(--color-text-muted)]">Join a class using the form on the right.</p>
            </div>
          ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((membership: any) => (
            <Link key={membership.class.id} href={`/student/classes/${membership.class.id}`}>
              <Card className="h-full hover:border-accent transition-colors">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-light mb-2">{membership.class.name}</h3>
                  <p className="text-text-default mb-4">Teacher: {membership.class.teacher?.name}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="public">{membership.class._count?.chapterLinks || 0} Chapters</Badge>
                  </div>
                  <p className="text-sm text-text-default">Joined: {new Date(membership.joinedAt).toLocaleDateString()}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
      </div>

      {/* Right Col: Actions */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <div className="sticky top-24">
          <StudentDashboardClient />
        </div>
      </div>
    </div>
  </div>
  );
}
