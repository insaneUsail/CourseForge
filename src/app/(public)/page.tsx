import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { FloatingCards } from "@/components/landing/FloatingCards";
import { RatingLine } from "@/components/landing/RatingLine";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { auth } from "@/lib/auth";

export default async function LandingPage() {
  const session = await auth();
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name || '',
    role: session.user.role.toLowerCase() as 'teacher' | 'student'
  } : null;
  return (
    <div className="page-enter flex-1 flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 flex flex-col">
        <Hero />
        <FloatingCards />
        <TestimonialsSection />
        <RatingLine />
        <LogoStrip />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
}
