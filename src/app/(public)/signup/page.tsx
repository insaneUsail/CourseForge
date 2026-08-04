'use client';

import { SignupForm } from "@/components/auth/SignupForm";
import { GraduationCap } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TiltWrapper } from '@/components/ui/TiltWrapper';

export default function SignupPage() {
  return (
    <div className="page-enter flex-1 flex flex-col min-h-screen bg-[#F5F3FF] overflow-hidden relative">
      {/* Heavy Dark Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_2px,transparent_2px),linear-gradient(to_bottom,#18102B15_2px,transparent_2px)] bg-[size:64px_64px] pointer-events-none z-0"></div>
      
      {/* Floating Geometric Shapes */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute top-10 left-20 w-32 h-32 bg-[#FF6B35] border-4 border-[#18102B] rounded-full opacity-80 shadow-[8px_8px_0px_#18102B] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], rotate: [12, -10, 12] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
        className="absolute bottom-10 right-20 w-40 h-40 bg-[#834DFB] border-4 border-[#18102B] opacity-80 rotate-12 shadow-[8px_8px_0px_#18102B] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ x: [0, -20, 0], rotate: [45, 0, 45] }}
        transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
        className="absolute top-40 right-10 w-20 h-20 bg-[#C6FF3D] border-4 border-[#18102B] opacity-80 rotate-45 shadow-[6px_6px_0px_#18102B] pointer-events-none z-0"
      />

      <main className="flex-1 flex flex-col md:flex-row-reverse max-w-7xl mx-auto w-full z-10 relative">
        {/* Right Side: Structural & Vibrant */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
          className="hidden md:flex md:w-1/2 relative flex-col justify-center p-12 lg:p-24"
        >
          <div className="w-20 h-20 bg-[#C6FF3D] border-4 border-black rounded-2xl flex items-center justify-center mb-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] rotate-3">
            <GraduationCap className="w-10 h-10 text-[#18102B]" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-[#18102B] mb-6 tracking-tighter uppercase leading-[0.9]">
            Build <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #18102B' }}>the future.</span>
          </h1>
          <p className="text-xl text-white max-w-md leading-relaxed font-bold bg-[#18102B] p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-1">
            Create your first class, or start learning something new today.
          </p>
        </motion.div>

        {/* Left Side: Form Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 perspective-1000"
        >
          <TiltWrapper className="w-full max-w-md bg-white p-10 rounded-[32px] border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] relative z-20">
            {/* Decorative Corner Tags */}
            <div className="absolute -top-4 -left-4 bg-[#834DFB] text-white font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-12">
              START
            </div>

            <div className="mb-10 text-center">
              <h2 className="text-4xl font-black text-[#18102B] tracking-tight mb-2 uppercase">Join Us</h2>
              <p className="text-sm font-bold text-[#6B6577] uppercase tracking-widest">Create Your Account</p>
            </div>
            
            <SignupForm />
            
            <div className="mt-8 pt-8 border-t-2 border-dashed border-black text-center">
              <p className="text-sm font-bold text-[#18102B]">
                Already have an account?{' '}
                <Link href="/login" className="text-[#FF6B35] hover:text-[#18102B] transition-colors font-black underline decoration-2 underline-offset-4">
                  Log in
                </Link>
              </p>
            </div>
          </TiltWrapper>
        </motion.div>
      </main>
    </div>
  );
}
