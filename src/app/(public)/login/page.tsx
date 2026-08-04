import { LoginForm } from "@/components/auth/LoginForm";
import { BookOpen } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="page-enter flex-1 flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col md:flex-row bg-white">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 relative bg-navy overflow-hidden">
          <div className="relative z-10 flex flex-col justify-center items-center p-12 lg:p-24 text-white w-full h-full text-center">
            <BookOpen className="w-20 h-20 text-orange mb-8" />
            <h1 className="text-5xl font-extrabold mb-6">Unlock your potential.</h1>
            <p className="text-xl text-white/90">Join thousands of educators and students on CourseForge today.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
          <div className="w-full max-w-md bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">
            <h2 className="text-3xl font-bold text-center text-navy mb-8 tracking-tight">Welcome Back</h2>
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  );
}
