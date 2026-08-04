import { LoginForm } from "@/components/auth/LoginForm";
import { BookOpen } from "lucide-react";
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="page-enter flex-1 flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Left Side: Structural & Vibrant */}
        <div className="hidden md:flex md:w-1/2 relative flex-col justify-center p-12 lg:p-24">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Unlock your <br/>potential.
          </h1>
          <p className="text-lg text-gray-600 max-w-md leading-relaxed">
            Join thousands of educators and students on CourseForge today.
          </p>
        </div>

        {/* Right Side: Form Container */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md bg-white p-10 rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/50">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Welcome Back</h2>
              <p className="text-sm font-medium text-gray-500">Access Your Account</p>
            </div>
            
            <LoginForm />
            
            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm font-medium text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 transition-colors font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
