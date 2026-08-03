import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="page-enter flex-1 flex flex-col">
      <Navbar user={null} />
      <main className="flex-1 flex flex-col md:flex-row-reverse bg-[var(--color-background)]">
        {/* Right Side: Image */}
        <div className="hidden md:flex md:w-1/2 relative bg-[var(--color-primary)] overflow-hidden">
          <img src="/auth_bg.jpg" alt="Abstract learning" className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/80 to-[var(--color-background)]/80" />
          <div className="relative z-10 flex flex-col justify-center p-12 lg:p-24 text-white w-full h-full">
            <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Build the future.</h1>
            <p className="text-xl opacity-90 drop-shadow-md">Create your first class, or start learning something new today.</p>
          </div>
        </div>

        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-24">
          <div className="w-full max-w-md bg-[var(--color-surface)] p-10 rounded-3xl shadow-2xl border border-[var(--color-border)]">
            <h2 className="text-3xl font-bold text-center text-[var(--color-foreground)] mb-8 tracking-tight">Join CourseForge</h2>
            <SignupForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
