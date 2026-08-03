'use client';

import { motion } from "framer-motion";

export function TestimonialsSection() {
  const testimonials = [
    {
      stars: 5,
      text: "\"CourseForge makes creating and sharing a curriculum so easy! I can publish my chapters in minutes and get straight to teaching. Highly recommend!\"",
      name: "Joao M.",
      role: "Science Educator",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      stars: 5,
      text: "\"Our school needed a flexible way to manage digital content, and CourseForge delivered. The process was smooth, and the interactive editor was exactly what we needed!\"",
      name: "Bruno K.",
      role: "University Lecturer",
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    {
      stars: 5,
      text: "\"I love the variety of public chapters available! Whether I need to catch up on a missed lecture or learn something totally new, CourseForge always has the perfect option.\"",
      name: "Lais A.",
      role: "High School Student",
      avatar: "https://i.pravatar.cc/150?img=47"
    }
  ];

  return (
    <section className="w-full bg-[var(--color-background)] py-24 px-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="border border-[var(--color-border)] rounded-full px-6 py-2 mb-6 bg-[var(--color-surface)] shadow-sm">
            <span className="text-sm font-semibold text-[var(--color-text-muted)] tracking-wide">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-foreground)] max-w-4xl tracking-tight leading-tight">
            Trusted by creatives and leaders <br/>
            <span className="text-[var(--color-text-muted)]">from various industries</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl px-4 md:px-0">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + (i * 0.1) }}
              className="flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6 text-[#FFB800]">
                {[...Array(test.stars)].map((_, idx) => (
                  <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              
              <p className="text-[var(--color-text-muted)] text-lg mb-8 leading-relaxed font-medium flex-grow">
                {test.text}
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img src={test.avatar} alt={test.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                <div className="flex flex-col">
                  <span className="font-bold text-[var(--color-foreground)]">{test.name}</span>
                  <span className="text-sm text-[var(--color-text-muted)]">{test.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
