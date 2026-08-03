'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function Hero() {
  const images = [
    { src: "/student.jpg", alt: "Student learning", rotation: -12, y: 20 },
    { src: "/course.jpg", alt: "Online course", rotation: -4, y: 0 },
    { src: "/books.jpg", alt: "Textbooks", rotation: 4, y: 0 },
    { src: "/teacher.jpg", alt: "Teacher teaching", rotation: 12, y: 20 },
  ];

  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center pt-12 pb-16 px-4 overflow-hidden">
      
      {/* Vibrant Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full -z-10 bg-[var(--color-background)] overflow-hidden">
        {/* Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '1s' }} />
        
        {/* Diagonal split color */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-tr from-[var(--color-primary)]/10 to-transparent skew-y-[-4deg] origin-bottom-left" />
      </div>

      {/* Floating decorative particles */}
      <motion.div className="absolute top-[15%] left-[15%] text-[var(--color-primary)] opacity-40 -z-10" animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg>
      </motion.div>
      <motion.div className="absolute top-[25%] right-[15%] text-emerald-500 opacity-40 -z-10" animate={{ y: [0, 30, 0], rotate: [0, 90, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
      </motion.div>
      <motion.div className="absolute bottom-[40%] left-[10%] text-purple-500 opacity-40 -z-10" animate={{ x: [0, 20, 0], rotate: [0, -45, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12L12 2 2 12l10 10 10-10z"/></svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center w-full max-w-5xl text-center"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-6 leading-tight">
          A place to display your <br/><span className="text-[var(--color-primary)]">masterpiece.</span>
        </h1>


        <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mb-8 font-medium">
          Educators can build their masterpiece courses, and students can discover and master skills that resonate with them.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full mt-6 mb-4">
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-10px_rgba(79,70,229,0.7)] hover:-translate-y-1 transition-all bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none font-bold">
              Join for Free
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--color-foreground)] font-semibold transition-all">
              Explore Platform
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
