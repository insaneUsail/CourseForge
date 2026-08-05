'use client';

import { LoginForm } from "@/components/auth/LoginForm";
import { BookOpen } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TiltWrapper } from '@/components/ui/TiltWrapper';

export default function LoginPage() {
  return (
    <div className="page-enter flex-1 flex flex-col min-h-screen bg-[#F5F3FF] overflow-hidden relative">
      {/* Heavy Dark Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_2px,transparent_2px),linear-gradient(to_bottom,#18102B15_2px,transparent_2px)] bg-[size:64px_64px] pointer-events-none z-0"></div>
      
      {/* Floating Geometric Shapes */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-12 md:w-24 h-12 md:h-24 bg-[#B4F481] border-2 md:border-4 border-[#18102B] rounded-full opacity-80 shadow-[8px_8px_0px_#18102B] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [12, -5, 12] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-16 md:w-32 h-16 md:h-32 bg-[#2563EB] border-2 md:border-4 border-[#18102B] opacity-80 rotate-12 shadow-[8px_8px_0px_#18102B] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ x: [0, 20, 0], rotate: [45, 90, 45] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute top-40 right-40 w-16 h-16 bg-[#F0E100] border-2 md:border-4 border-[#18102B] opacity-80 rotate-45 shadow-[4px_4px_0px_#18102B] pointer-events-none z-0"
      />

      <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full z-10 relative">
        {/* Left Side: Structural & Vibrant */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
          className="hidden md:flex md:w-1/2 relative flex-col justify-center p-4 md:p-6 md:p-12 lg:p-24"
        >
          <div className="w-20 h-20 bg-[#18102B] border-2 md:border-4 border-black rounded-2xl flex items-center justify-center mb-4 md:mb-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] -rotate-3">
            <BookOpen className="w-10 h-10 text-[#C6FF3D]" />
          </div>
          <h1 className="text-xl md:text-3xl md:text-5xl lg:text-5xl md:text-7xl font-black text-[#18102B] mb-6 tracking-tighter uppercase leading-[0.9]">
            Unlock <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #18102B' }}>your potential.</span>
          </h1>
          <p className="text-xl text-[#18102B] max-w-md leading-relaxed font-bold bg-[#F0E100] p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-1">
            Join thousands of educators and students on CourseForge today.
          </p>
        </motion.div>

        {/* Right Side: Form Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-6 lg:p-12 perspective-1000"
        >
          <TiltWrapper className="w-full max-w-md bg-white p-10 rounded-[32px] border-2 md:border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] relative z-20">
            {/* Decorative Corner Tags */}
            <div className="absolute -top-4 -right-4 bg-[#FF6B35] text-white font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-12">
              SECURE
            </div>

            <div className="mb-10 text-center">
              <h2 className="text-lg md:text-2xl md:text-4xl font-black text-[#18102B] tracking-tight mb-2 uppercase">Welcome Back</h2>
              <p className="text-sm font-bold text-[#6B6577] uppercase tracking-widest">Access Your Account</p>
            </div>
            
            <LoginForm />
            
            <div className="mt-4 md:mt-8 pt-8 border-t-2 border-dashed border-black text-center">
              <p className="text-sm font-bold text-[#18102B]">
                Don't have an account?{' '}
                <Link href="/signup" className="text-[#834DFB] hover:text-[#18102B] transition-colors font-black underline decoration-2 underline-offset-4">
                  Sign up
                </Link>
              </p>
            </div>
          </TiltWrapper>
        </motion.div>
      </main>
    </div>
  );
}
