'use client';

import { motion } from "framer-motion";

export function StatsSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="w-full py-20 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-foreground)] mb-12">
        Why CourseForge?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={item} className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] p-8 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-lg">
          <div className="text-4xl mb-4 bg-[var(--color-surface-alt)] p-4 rounded-full">📖</div>
          <div className="text-3xl font-extrabold text-[var(--color-foreground)] mb-2">10,000+</div>
          <div className="text-[var(--color-text-muted)] font-medium">Students</div>
        </motion.div>
        
        <motion.div variants={item} className="bg-[var(--color-surface-alt)] rounded-2xl border border-[var(--color-border)] p-8 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-lg">
          <div className="text-4xl mb-4 bg-[var(--color-surface)] shadow-sm p-4 rounded-full">📚</div>
          <div className="text-3xl font-extrabold text-[var(--color-foreground)] mb-2">500+</div>
          <div className="text-[var(--color-text-muted)] font-medium">Chapters</div>
        </motion.div>

        <motion.div variants={item} className="bg-[var(--color-primary)] rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-lg shadow-md">
          <div className="text-4xl mb-4 bg-white/20 p-4 rounded-full">👨‍🏫</div>
          <div className="text-3xl font-extrabold text-white mb-2">100+</div>
          <div className="text-white/80 font-medium">Teachers</div>
        </motion.div>

        <motion.div variants={item} className="bg-[var(--color-foreground)] rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-lg shadow-md">
          <div className="text-4xl mb-4 bg-white/10 p-4 rounded-full">⭐</div>
          <div className="text-3xl font-extrabold text-[var(--color-background)] mb-2">95%</div>
          <div className="text-[var(--color-background)]/80 font-medium">Satisfaction</div>
        </motion.div>
      </div>
    </motion.section>
  );
}
