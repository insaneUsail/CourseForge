'use client';

import { motion } from "framer-motion";

export function FloatingCards() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  const cards = [
    {
      title: "Rich Content Editor",
      description: "Build engaging chapters with our powerful rich text editor — add headings, code blocks, images, and more.",
      gradient: "from-violet-600 to-purple-700",
      shadowColor: "shadow-violet-500/25",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
      stat: "✍️",
    },
    {
      title: "Real-time Analytics",
      description: "Track student progress, quiz scores, and engagement metrics — all in one beautiful dashboard.",
      gradient: "from-blue-600 to-cyan-600",
      shadowColor: "shadow-blue-500/25",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
        </svg>
      ),
      stat: "📊",
    },
    {
      title: "Global Chapter Sharing",
      description: "Publish chapters publicly and let educators worldwide discover and add them to their own classes.",
      gradient: "from-emerald-600 to-teal-600",
      shadowColor: "shadow-emerald-500/25",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      stat: "🌍",
    }
  ];

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full pt-8 pb-24 px-4 md:px-8 max-w-6xl mx-auto"
      id="features"
    >
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, i) => (
          <motion.div
            variants={item}
            key={i}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative"
          >
            {/* Card */}
            <div className={`relative overflow-hidden rounded-3xl p-8 h-full bg-gradient-to-br ${card.gradient} text-white shadow-xl ${card.shadowColor} hover:shadow-2xl transition-shadow duration-300`}>
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-white/5 blur-xl" />

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-inner border border-white/10">
                {card.icon}
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold mb-3">{card.title}</h3>
              <p className="relative text-sm text-white/80 leading-relaxed mb-6">
                {card.description}
              </p>

              {/* Bottom decorative emoji */}
              <div className="relative flex items-center justify-between">
                <span className="text-3xl">{card.stat}</span>
                <span className="text-white/50 text-xs font-medium uppercase tracking-widest group-hover:text-white/80 transition-colors">
                  Learn more →
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
