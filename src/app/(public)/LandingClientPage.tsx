'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  Sparkles, ArrowRight, BookOpen, Users, Play, Check, 
  ChevronDown, HelpCircle, Layers, Settings, Eye, Target, 
  Globe, BarChart3, Award, Star, History, Clock, BookOpenCheck, Plus,
  GraduationCap, School, Presentation, User
} from 'lucide-react';
import { IconDocument3D, IconKey3D, IconChart3D, AbstractSphere, AbstractRing, AbstractCube, IconQuote3D, IconStar3D } from '@/components/ui/CustomIcons';

// ===================================================================
// Typewriter Animation Component
const TypewriterText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: delay }
        }
      }}
      className={`inline-block ${className}`}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Interactive 3D Mouse-Follow Tilt Wrapper Component
// ===================================================================
function TiltWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth transformation mapping with springs (Increased Sensitivity)
  const rotateX = useSpring(useTransform(y, [-150, 150], [25, -25]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-25, 25]), { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`transition-shadow duration-300 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function LandingClientPage({ user }: { user: any }) {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Features sticky scroll
  const featureScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: featureScrollY } = useScroll({
    target: featureScrollRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(featureScrollY, "change", (latest) => {
    const newIndex = Math.min(5, Math.max(0, Math.round(latest * 5)));
    if (newIndex !== activeFeature) {
      setActiveFeature(newIndex);
    }
  });

  // Cycling phrases for the hero section
  const textPhrases = ["I ELEVATE CLASSES.", "I REACH EVERYONE.", "I TRACK RESULTS."];
  const [phraseIdx, setPhraseIdx] = useState(0);

  // Mouse follow state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add smooth spring physics for that "laggy/animated" trailing effect
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.5 });
  
  // Zigzag text parallax tracking (using smooth coordinates)
  const textX1 = useTransform(smoothMouseX, (val) => (val - (typeof window !== 'undefined' ? window.innerWidth / 2 : 500)) * 0.03);
  const textY1 = useTransform(smoothMouseY, (val) => (val - (typeof window !== 'undefined' ? window.innerHeight / 2 : 500)) * 0.02);
  const textX2 = useTransform(smoothMouseX, (val) => (val - (typeof window !== 'undefined' ? window.innerWidth / 2 : 500)) * -0.03);
  const textY2 = useTransform(smoothMouseY, (val) => (val - (typeof window !== 'undefined' ? window.innerHeight / 2 : 500)) * -0.02);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx((prev) => (prev + 1) % textPhrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Counter targets
  const counters = [
    { target: 120, label: 'Educators Connected', suffix: '' },
    { target: 64, label: 'Chapter Reuse Rate', suffix: '%' },
    { target: 520, label: 'Chapters Live', suffix: '+' },
    { target: 20, label: 'Subjects Covered', suffix: '+' }
  ];

  return (
    <>
      {/* Custom Smart Cursor - Small UI element that adapts to backgrounds */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
        style={{
          x: useTransform(smoothMouseX, (val) => val - 16),
          y: useTransform(smoothMouseY, (val) => val - 16),
          width: 32,
          height: 32,
        }}
      >
        <div className="w-8 h-8 rounded-full border-[2px] border-white flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.8)]">
           <div className="w-2 h-2 rounded-full bg-white absolute shadow-[0_0_10px_rgba(255,255,255,0.9)]"></div>
        </div>
      </motion.div>
      
      <main className="flex-1 flex flex-col bg-[#f5f3ff00] overflow-x-clip" style={{ perspective: '1200px' }}>
      
      {/* 1. HERO SECTION (Redesigned with High-Contrast DEV/PIXEL Style) */}
      <section id="home" className="relative w-full overflow-hidden border-b-2 border-black bg-[#B4F481] min-h-screen flex items-center">
        {/* Massive Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.04]">
          <h1 className="text-[20vw] font-black text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '4px #18102B' }}>
            COURSEFORGE
          </h1>
        </div>

        {/* Premium Code-Driven Vector Background Layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Blueprint Grid (Black) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B1a_1px,transparent_1px),linear-gradient(to_bottom,#18102B1a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          
          {/* Glowing Aura Bubbles (White glow behind text for readability) */}
          <div className="absolute top-[5%] right-[-5%] w-[150vw] md:w-[550px] h-[150vw] md:h-[550px] bg-[#834DFB]/10 rounded-full hidden md:block blur-[120px] will-change-transform animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[150vw] md:w-[800px] h-[150vw] md:h-[800px] bg-white/70 rounded-full hidden md:block blur-[120px] pointer-events-none"></div>

          {/* Spinning Vector Blueprint Geometry */}
          <div className="absolute top-[15%] left-[25%] w-[150vw] md:w-[450px] h-[150vw] md:h-[450px] opacity-[0.05] will-change-transform animate-[spin_90s_linear_infinite]">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#18102B]">
              <path d="M100 0 L200 100 L100 200 L0 100 Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,4" />
              <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" />
              <rect x="35" y="35" width="130" height="130" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            </svg>
          </div>
          
          <div className="absolute bottom-[10%] right-[20%] w-[380px] h-[380px] opacity-[0.05] will-change-transform animate-[spin_60s_linear_infinite_reverse]">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#18102B]">
              <polygon points="100,5 195,190 5,190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8,4" />
              <circle cx="100" cy="125" r="60" stroke="currentColor" strokeWidth="1" />
              <line x1="100" y1="5" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Neon Star Pulsars */}
          <div className="absolute top-[25%] right-[20%] w-3 h-3 bg-[#18102B] rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-[30%] left-[15%] w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        </div>

        <AbstractSphere className="absolute top-[20%] right-[10%] w-16 md:w-32 h-16 md:h-32 opacity-90 pointer-events-none animate-[bounce_8s_ease-in-out_infinite] z-0 text-[#18102B] animate-sway" />
        <AbstractRing className="absolute bottom-[15%] left-[5%] w-12 md:w-24 md:w-48 h-12 md:h-24 md:h-48 opacity-80 pointer-events-none will-change-transform animate-[pulse_6s_ease-in-out_infinite] z-0 text-[#18102B] animate-sway" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-36 pb-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 md:p-16 items-center">
          
          {/* Left Column: Text & Dynamic Phrase Cycling */}
          <motion.div 
            className="space-y-8 flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
        
            
            <h1 className="text-lg md:text-2xl md:text-4xl md:text-6xl md:text-8xl font-black tracking-tighter text-[#18102B] uppercase leading-[0.95] flex flex-col">
              <motion.span style={isMounted ? { x: textX1, y: textY1 } : { x: 0, y: 0 }} className="block">I WRITE.</motion.span>
              <motion.span style={isMounted ? { x: textX2, y: textY2 } : { x: 0, y: 0 }} className="block">I TEACH.</motion.span>
              <motion.div style={isMounted ? { x: textX1, y: textY2 } : { x: 0, y: 0 }} className="h-[75px] md:h-[95px] relative overflow-hidden mt-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIdx}
                    className="absolute left-0 text-[#C6FF3D] bg-[#18102B] px-5 py-2.5 transform -rotate-1 inline-block text-xl md:text-3xl md:text-5xl font-black rounded-xl border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] whitespace-nowrap"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {textPhrases[phraseIdx]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </h1>
            
            <p className="text-lg md:text-xl text-[#18102B]/90 max-w-xl leading-relaxed font-bold pt-4 relative z-10">
              Write your own chapters, or reuse content already trusted by other teachers — and still track every one of your own students, separately, in one clean dashboard.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href={user ? (user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard') : '/signup'}>
                <button className="cta-button-group group relative overflow-hidden inline-flex items-center gap-2.5 px-4 md:px-8 py-4.5 rounded-full bg-[#18102B] text-white font-bold text-base hover:text-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-200 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer">
                  <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-300">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#C6FF3D] transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                </button>
              </Link>
              <a href="#how-it-works">
                <button className="cta-button-group group relative overflow-hidden inline-flex items-center gap-2 px-4 md:px-8 py-4.5 rounded-full bg-white border-2 border-black text-[#18102B] hover:text-white font-bold text-base active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer">
                  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                    See How It Works
                  </span>
                  <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#834DFB] transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                </button>
              </a>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-4">
              {['Public Chapters', 'Private Classes', 'Practice Quizzes', 'Class Analytics'].map((tag, i) => (
                <span key={tag} className="group relative overflow-hidden border-2 border-black bg-white rounded-md px-4 py-1.5 text-xs font-bold text-[#18102B] shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:text-white transition-colors duration-300 cursor-default">
                  <span className="relative z-10">{tag}</span>
                  <div className={`absolute left-0 top-0 bottom-0 w-0 transition-all duration-300 ease-out group-hover:w-full z-0 ${['bg-[#FF6B35]', 'bg-[#834DFB]', 'bg-[#18102B]', 'bg-[#F0E100] group-hover:text-black'][i]}`}></div>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Modern Clean Overlapping Cards with 3D Tilt */}
          <motion.div 
            className="relative w-full min-h-[400px] md:h-[520px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Aesthetic Floating Glass Orbs Background */}
            <motion.div 
              className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_30%_30%,_rgba(198,255,61,0.8),_rgba(37,99,235,0.4),_transparent_70%)] blur-[40px] -z-10 mix-blend-screen pointer-events-none"
              animate={{ 
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-10 left-10 w-12 md:w-24 md:w-48 h-12 md:h-24 md:h-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,_rgba(131,77,251,0.8),_rgba(255,107,53,0.4),_transparent_70%)] blur-[40px] -z-10 mix-blend-screen pointer-events-none"
              animate={{ 
                y: [0, 40, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
            />
            
            {/* Card 1: Orange Modern Ticket Card */}
            <motion.div 
              className="absolute top-0 left-6 w-[290px] z-20"
              initial={{ rotate: -12, y: 30, opacity: 0 }}
              animate={{ rotate: -4, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.3 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-full h-full"
              >
              <TiltWrapper className="bg-[#FF6B35] text-white rounded-2xl p-4 md:p-6 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] relative w-full h-full hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
                {/* Corner Crosshairs */}
                <span className="crosshair-corner crosshair-top-left font-black text-black">+</span >
                <span className="crosshair-corner crosshair-top-right font-black text-black">+</span >
                <span className="crosshair-corner crosshair-bottom-left font-black text-black">+</span >
                <span className="crosshair-corner crosshair-bottom-right font-black text-black">+</span >

                <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider text-[#18102B] mb-6">
                  <span>Class Ticket</span>
                  <span className="w-3 h-3 rounded-full bg-[#C6FF3D] border border-black animate-pulse"></span>
                </div>

                <h3 className="text-xl md:text-3xl font-black leading-tight tracking-tighter text-[#18102B] mb-4 md:mb-8">
                  <TypewriterText text="PHYSICS 101" delay={0.5} /><br/>
                  <TypewriterText text="SHAKEOUT" delay={0.8} />
                </h3>

                {/* Minimalist modern avatars containing new circle doodles */}
                <div className="flex gap-2 mb-4 md:mb-8">
                  <div className="w-14 h-14 bg-black rounded-xl border-2 border-black overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,1)] relative flex-shrink-0">
                    <img src="/circle_doodles.png" className="w-full h-full object-cover" alt="doodles circle logo" />
                  </div>
                  <div className="w-14 h-14 bg-[#C6FF3D] rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <BookOpen className="w-6 h-6 text-black" />
                  </div>
                  <div className="w-14 h-14 bg-[#18102B] rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#C6FF3D] font-black text-base">
                    CF
                  </div>
                </div>

                {/* Dotted grid lines */}
                <div className="border-t-2 border-black border-dashed py-3 flex justify-between items-center text-[11px] font-black tracking-wide uppercase text-[#18102B]">
                  <span>Teacher</span>
                  <span>Prof. Verma</span>
                </div>
                
                <div className="border-t-2 border-black border-dashed py-3 flex justify-between items-center text-[11px] font-black tracking-wide uppercase text-[#18102B]">
                  <span>Join Key</span>
                  <span className="bg-[#18102B] text-[#C6FF3D] px-2 py-0.5 rounded font-mono">CF-93XQ</span>
                </div>

                {/* Simulated barcode at bottom */}
                <div className="border-t-2 border-black border-dashed pt-4 flex justify-between items-center">
                  <span className="text-[10px] font-black tracking-widest text-[#18102B]">E-TICKET CODE</span>
                  <div className="h-6 flex gap-[2px] items-center opacity-90">
                    {[1,3,2,1,4,2,1,3,2,1].map((w, i) => (
                      <div key={i} className="h-full bg-black" style={{ width: `${w}px` }}></div>
                    ))}
                  </div>
                </div>
              </TiltWrapper>
              </motion.div>
            </motion.div>

            {/* Card 2: Modern Dark Card with Lime Ribbon */}
            <motion.div 
              className="absolute bottom-4 right-6 w-[310px] z-15"
              initial={{ rotate: 12, y: 30, opacity: 0 }}
              animate={{ rotate: 3, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.4 }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.2 }}
                className="w-full h-full"
              >
              <TiltWrapper className="bg-[#18102B] text-white rounded-2xl p-4 md:p-6 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] relative w-full h-full hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
                {/* Angled Ribbon tags */}
                <div className="absolute -top-3.5 left-6 flex flex-col gap-1 z-30">
                  <div className="bg-[#C6FF3D] text-black font-black text-[10px] uppercase tracking-wider py-1 px-3 rounded-md border-2 border-black transform -rotate-3">
                    ACTIVE CHAPTER
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[#C6FF3D] text-[11px] font-black uppercase tracking-widest">CHAPTER 04</span>
                    <h4 className="text-lg md:text-2xl font-black mt-1 tracking-tight">
                      <TypewriterText text="Kinematics & Motion" delay={1.2} />
                    </h4>
                  </div>
                  <BookOpenCheck className="w-8 h-8 text-[#C6FF3D] mt-1" />
                </div>

                {/* Simulated registration fields */}
                <div className="space-y-3 mb-6 pt-2">
                  <div className="bg-[#241B3B] rounded-xl p-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <div className="text-[9px] text-[#A29CB0] uppercase font-black">Module Topic</div>
                    <div className="text-xs font-bold text-white mt-0.5">Newtonian Gravity & Orbitals</div>
                  </div>
                  <div className="bg-[#241B3B] rounded-xl p-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <div className="text-[9px] text-[#A29CB0] uppercase font-black">Estimated Reading</div>
                    <div className="text-xs font-bold text-white mt-0.5 flex justify-between">
                      <span>35 Minutes</span>
                      <span className="text-[#C6FF3D]">2 Practice Quizzes</span>
                    </div>
                  </div>
                </div>

                {/* Solid flat neon-lime button */}
                <Link href="/signup">
                <button className="cta-button-group w-full bg-[#C6FF3D] hover:bg-[#b0f020] text-black font-black text-xs uppercase tracking-widest py-3.5 rounded-xl border-2 border-black transition-all duration-200 shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer">
                  <TypewriterText text="Join Class Now" delay={1.5} />
                </button>
                </Link>
              </TiltWrapper>
              </motion.div>
            </motion.div>

            {/* Card 3: Mini Stat Dial Card */}
            <motion.div 
              className="absolute top-6 md:p-12 right-20 z-25"
              initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
              animate={{ rotate: -8, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="w-full h-full"
              >
              <TiltWrapper className="bg-white rounded-2xl p-5 border-2 border-black flex items-center gap-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full h-full hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
                {/* Concentric Gauge SVG */}
                <div className="relative w-12 h-12">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="24" cy="24" r="18" className="stroke-slate-200 fill-none" strokeWidth="4" />
                    <circle cx="24" cy="24" r="18" className="stroke-[#834DFB] fill-none" strokeWidth="4" strokeDasharray="113" strokeDashoffset="25" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-black text-xs text-[#18102B]">
                    78%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-[#6B6577] uppercase tracking-wider">Class Average</div>
                  <h5 className="font-black text-base text-[#18102B]">
                    <TypewriterText text="Outstanding!" delay={1.8} />
                  </h5>
                </div>
              </TiltWrapper>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. RATING & PARTNER MARQUEE (Shutter Scale vertical reveal) */}
      <motion.section 
        className="relative bg-[#18102B] border-b-2 border-black py-3 md:py-6 md:py-12 px-4 md:px-6 overflow-hidden origin-center"
        initial={{ opacity: 0, scaleY: 0.2 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#B4F48115_1px,transparent_1px),linear-gradient(to_bottom,#B4F48115_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 md:gap-6 md:p-12">
          
          {/* Left: Star ratings */}
          <div className="flex flex-col items-center lg:items-start gap-2 flex-shrink-0 text-center lg:text-left">
            <span className="text-sm font-bold text-white/60 uppercase tracking-widest">PLATFORM RATING</span>
            <div className="flex items-center gap-1.5 text-lg md:text-2xl font-extrabold text-white">
              4,900+ Students
              <div className="flex gap-0.5 ml-2 text-[#B4F481] text-xl">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current stroke-[#B4F481] stroke-2" />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Scrolling Marquee of Schools */}
          <div className="flex-1 w-full overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#18102B] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#18102B] to-transparent z-10"></div>
            
            <div className="text-[11px] font-bold text-white/60 uppercase tracking-widest mb-3 text-center lg:text-left">
              TRUSTED BY EDUCATORS AT
            </div>
            
            <div className="w-full overflow-hidden relative h-8">
              <div className="animate-marquee flex gap-3 md:gap-6 md:p-12 items-center">
                {[
                  'Greenview High', 'St. Xavier\'s', 'Lincoln Academy', 'Sunrise Tutorials', 'Northfield Prep', 'Delhi Public School',
                  'Greenview High', 'St. Xavier\'s', 'Lincoln Academy', 'Sunrise Tutorials', 'Northfield Prep', 'Delhi Public School'
                ].map((school, idx) => (
                  <span key={idx} className={`font-extrabold text-base transition-colors cursor-default whitespace-nowrap ${idx % 2 === 0 ? 'text-[#B4F481]' : 'text-white'}`}>
                    {school}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. FEATURE CARDS CAROUSEL (Converted to Sticky Scroll Cover Flow) */}
      <div ref={featureScrollRef} className="relative h-[300vh] w-full bg-[#2563EB] border-b-2 border-black">
        <section id="features" className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Background Texture: Huge Starbursts and Crosses */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-10">
           <svg viewBox="0 0 800 800" className="w-[80vw] h-[80vw] max-w-[1200px] text-white will-change-transform animate-[spin_120s_linear_infinite]" fill="currentColor">
              <path d="M400,0 L430,370 L800,400 L430,430 L400,800 L370,430 L0,400 L370,370 Z" />
           </svg>
        </div>
        <div className="absolute top-[10%] left-[10%] opacity-20 pointer-events-none z-0">
           <Plus className="w-16 md:w-32 h-16 md:h-32 text-[#B4F481]" strokeWidth={3} />
        </div>
        <div className="absolute bottom-[10%] right-[10%] opacity-20 pointer-events-none z-0">
           <Plus className="w-12 md:w-24 md:w-48 h-12 md:h-24 md:h-48 text-[#F0E100]" strokeWidth={2} />
        </div>
        <AbstractCube className="absolute top-1/3 right-[5%] w-12 md:w-24 h-12 md:h-24 opacity-60 pointer-events-none animate-[bounce_10s_ease-in-out_infinite] z-0 animate-sway" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
          <motion.div 
            className="max-w-3xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#18102B] text-[#F5F3FF] text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6 border border-black">
              Features Carousel
            </span>
            <h2 className="text-lg md:text-2xl md:text-4xl md:text-5xl font-extrabold tracking-tight text-[#18102B] leading-tight">
              Everything a teacher needs to <span className="text-[#834DFB]">write once and teach everywhere</span> — without losing track.
            </h2>
            <p className="text-xs text-[#18102B]/60 font-extrabold mt-3 uppercase tracking-wider">Keep Scrolling Down ↓</p>
          </motion.div>

          {/* 3D Cover Flow Carousel */}
          <div className="relative w-full h-[150vw] md:h-[550px] flex items-center justify-center" style={{ perspective: '1200px' }}>
            
            {[
              {
                bgClass: 'bg-[#C6FF3D]', // vibrant lime green
                tags: ['Curriculum', 'Reuse'],
                titleLine1: 'Public',
                titleLine2: 'Chapters',
                desc: 'Add another teacher\'s chapter to your class in one click. Content remains theirs, results stay yours.',
                img: 'media_1785836248967.jpg'
              },
              {
                bgClass: 'bg-[#F5F3FF]', // light cream/purple
                tags: ['Security', 'Access'],
                titleLine1: 'Private',
                titleLine2: 'Class Keys',
                desc: 'One key per class. Students join once, and stay linked automatically for every chapter you add later.',
                img: 'media_1785836415777.jpg'
              },
              {
                bgClass: 'bg-[#FF6B35]', // vibrant orange
                tags: ['Assessment', 'Exams'],
                titleLine1: 'Timed',
                titleLine2: 'Quizzes',
                desc: 'Mid-chapter quizzes for quick learning reinforcement, and a final evaluation quiz once the chapter is marked complete.',
                img: 'media_1785829776307.jpg'
              },
              {
                bgClass: 'bg-[#F0E100]', // bright yellow
                tags: ['Data', 'Tracking'],
                titleLine1: 'Per-Class',
                titleLine2: 'Analytics',
                desc: 'See only your own students\' scores — even on chapters shared with dozens of other classes. Clean separated rosters.',
                img: 'media_1785836479267.png'
              },
              {
                bgClass: 'bg-white',
                tags: ['Flexibility', 'Enrollment'],
                titleLine1: 'Multi-Class',
                titleLine2: 'Students',
                desc: 'Students can join more than one class at once — school, tuition, and extra classes are all tracked separately.',
                img: 'media_1785835644449.png'
              },
              {
                bgClass: 'bg-[#22D3EE]', // cyan
                tags: ['Records', 'Storage'],
                titleLine1: 'Attempt',
                titleLine2: 'History',
                desc: 'Every quiz attempt is saved with score, response records, and time taken, so progress history is never lost.',
                img: 'media_1785836459972.png'
              }
            ].map((card, idx, arr) => {
              const offset = idx - activeFeature;
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;
              const isLeft = offset < 0;
              const isRight = offset > 0;
              
              if (absOffset > 4) return null; // Performance optimization

              return (
                <motion.div
                  key={idx}
                  className={`absolute w-[300px] md:w-[340px] flex-shrink-0 cursor-pointer ${isCenter ? 'z-40' : 'z-30'}`}
                  initial={false}
                  animate={{
                    x: offset * 180, // Horizontal spread
                    scale: isCenter ? 1 : Math.max(0.75, 1 - absOffset * 0.1), // Scale down siblings
                    rotateY: isCenter ? 0 : isLeft ? 35 : -35, // 3D rotation
                    zIndex: 40 - absOffset,
                    opacity: isCenter ? 1 : Math.max(0.4, 1 - absOffset * 0.25),
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ transformOrigin: 'center center' }}
                  onClick={() => !isCenter && setActiveFeature(idx)}
                >
                  <div className={`w-full h-[480px] rounded-[32px] overflow-hidden flex flex-col relative group border-2 border-black transition-all duration-300 ${isCenter ? 'shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)]' : 'shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)]'}`}>
                    {/* TOP HALF: Color block with text */}
                    <div className={`p-4 md:p-8 pb-10 flex-1 flex flex-col gap-5 ${card.bgClass}`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        {card.tags.map(tag => (
                          <span key={tag} className="feature-tag bg-white text-black px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm border border-black">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div>
                        <h3 className={`text-lg md:text-2xl md:text-4xl font-black leading-[0.95] tracking-tight ${card.bgClass === 'bg-[#FF6B35]' ? 'text-white' : 'text-[#18102B]'}`}>
                          {card.titleLine1}<br/>
                          {card.titleLine2}
                        </h3>
                        <p className={`text-[13px] font-semibold mt-4 leading-relaxed line-clamp-3 ${card.bgClass === 'bg-[#FF6B35]' ? 'text-white/80' : 'text-[#18102B]/70'}`}>
                          {card.desc}
                        </p>
                      </div>
                    </div>
                    
                    {/* BOTTOM HALF: Full-bleed image */}
                    <div className="relative h-[220px] w-full flex-shrink-0 bg-[#18102B]">
                      <img src={`/images/${card.img}`} alt={card.titleLine1} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none" />
                      
                      {/* Gradient overlay for text readability at the bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                      
                      {/* Read more pill button at bottom left over the image */}
                      <div className="absolute bottom-5 left-5 z-10">
                        <Link href="/signup">
                        <button className="cta-button-group bg-[#18102B] border-2 border-black text-[#CCFF00] pl-4 pr-1.5 py-1.5 rounded-full flex items-center gap-4 text-xs font-bold hover:bg-[#834DFB] hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                          Read More 
                          <span className="bg-[#CCFF00] text-[#18102B] border-2 border-black rounded-full w-7 h-7 flex items-center justify-center text-[10px] font-black">→</span>
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center gap-3 mt-16 relative z-50">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <button 
                key={idx}
                onClick={() => setActiveFeature(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-3 h-3 rounded-full border-2 border-black transition-all duration-300 ${activeFeature === idx ? 'bg-[#CCFF00] scale-125' : 'bg-white/30 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>

      {/* 4. BIG STEPS SECTION WITH LIVE ANALYTICS CARD (Horizontal Drawer Reveal) */}
      <section className="relative bg-white py-24 border-y-2 border-black w-full px-4 md:px-6 overflow-hidden">
        {/* Heavy Dark Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_2px,transparent_2px),linear-gradient(to_bottom,#18102B15_2px,transparent_2px)] bg-[size:64px_64px] pointer-events-none z-0"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-12 md:w-24 h-12 md:h-24 bg-[#B4F481] border-2 md:border-4 border-[#18102B] rounded-full opacity-50 shadow-[8px_8px_0px_#18102B] pointer-events-none -z-0"></div>
        <div className="absolute bottom-20 right-10 w-16 md:w-32 h-16 md:h-32 bg-[#2563EB] border-2 md:border-4 border-[#18102B] opacity-30 rotate-12 shadow-[8px_8px_0px_#18102B] pointer-events-none -z-0"></div>

        {/* Decorative Blueprint Guide marks */}
        <div className="absolute top-4 md:p-8 left-8 text-[9px] font-black tracking-widest text-[#18102B] opacity-60 select-none uppercase z-0">
          [cf.timeline.03 // global_rules]
        </div>
        <div className="absolute bottom-4 md:m-8 right-8 text-[9px] font-black tracking-widest text-[#18102B] opacity-60 select-none uppercase z-0">
          [x_coordinate_grid.04]
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 md:p-16 items-center">
          
          {/* Left Side: Mock Live Class Analytics Card */}
          <motion.div 
            className="flex items-center justify-center relative"
            initial={{ opacity: 0, x: -100, rotate: -6 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ type: "spring", stiffness: 60, damping: 12 }}
          >
            {/* Decorative background grid */}
            <div className="absolute inset-0 bg-grid-slate-100 opacity-50 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]"></div>
            
            {/* Visual Card */}
            <div className="w-[340px]">
              <TiltWrapper className="relative bg-white rounded-[28px] border-2 border-black p-4 md:p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-center text-xs font-bold text-[#6B6577] mb-6">
                  <span>Class Overview</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F5F3FF] text-[#834DFB] font-bold border border-black">LIVE DATA</span>
                </div>

                {/* Watercolor Globe illustration */}
                <div className="flex flex-col items-center justify-center py-3 md:py-6 mb-6 bg-white rounded-2xl border-2 border-black overflow-hidden relative shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  <img src="/globe_education.png" className="h-40 object-contain" alt="Globe Education" />
                </div>

                <h4 className="text-xl font-bold text-[#18102B] mb-2">Class 10 — Physics</h4>
                <p className="text-xs text-[#6B6577] mb-6">Active learning tracking across modules.</p>

                {/* Progress items */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#18102B] mb-1">
                      <span>Chapter Completion</span>
                      <span>74%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#834DFB] rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#18102B] mb-1">
                      <span>Quiz Performance</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F0E100] rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Action row */}
                <div className="flex gap-2.5 mt-4 md:mt-8 border-t-2 border-black pt-5">
                  <Link href="/signup">
                  <button className="flex-1 bg-[#18102B] hover:bg-[#834DFB] text-white font-bold text-xs uppercase tracking-widest py-3 rounded-lg border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    View Roster
                  </button>
                  </Link>
                  <Link href="/signup">
                  <button className="flex-1 border-2 border-black hover:bg-slate-50 text-[#18102B] font-bold text-xs uppercase tracking-widest py-3 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white">
                    + Add Chapter
                  </button>
                  </Link>
                </div>
              </TiltWrapper>
            </div>
          </motion.div>

          {/* Right Side: Step descriptions */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-[#F0E100] text-black text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-4 border-2 border-black">
                Start Teaching
              </span>
              <h2 className="text-lg md:text-2xl md:text-4xl md:text-5xl font-extrabold text-[#18102B]">
                Start Teaching in 3 Easy Steps
              </h2>
              <p className="text-lg text-[#6B6577] mt-2 font-medium">
                CourseForge is designed to remove the friction of content creation and administration. You build the content once, and direct it to multiple cohorts with ease.
              </p>
            </motion.div>

            <div className="space-y-6 pt-4">
              
              {/* Card 1: Dashboard Setup */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#22D3EE] rounded-[32px] p-4 md:p-6 sm:p-8 border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col gap-5 group hover:-translate-y-2 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="bg-white text-[#18102B] px-4 py-1.5 rounded-full border-2 border-black font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    STEP 01
                  </div>
                  <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider hidden sm:flex">
                    <span className="bg-[#18102B] text-[#CCFF00] px-4 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">Dashboard</span>
                    <span className="bg-white text-[#18102B] px-4 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">Security</span>
                  </div>
                </div>
                
                <div className="flex gap-3 md:gap-6 items-center mt-2">
                  <div className="flex-1">
                    <h4 className="text-lg md:text-2xl sm:text-3xl font-black text-[#18102B] leading-tight">Create a Class & Get Key</h4>
                    <p className="text-[14px] sm:text-[15px] text-[#18102B]/80 mt-3 font-bold leading-relaxed">
                      Create your digital classroom dashboard in seconds and share the unique join key with your student group once.
                    </p>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 md:w-24 h-12 md:h-24 sm:w-32 sm:h-32 bg-white rounded-[24px] flex-shrink-0 flex items-center justify-center p-4 border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                  >
                    <IconKey3D className="w-full h-full drop-shadow-xl" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Card 2: Write/Link Chapters */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#F0E100] rounded-[32px] p-4 md:p-6 sm:p-8 border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] flex gap-4 sm:gap-6 items-center relative overflow-hidden group hover:-translate-y-2 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex-shrink-0 flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] z-10 relative group-hover:bg-[#18102B] transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl border-2 border-black bg-[#C6FF3D] flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                    <Presentation className="w-6 h-6 text-black" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-[#FF6B35] text-white w-8 h-8 rounded-full border-[3px] border-black flex items-center justify-center text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    2
                  </div>
                </div>
                
                <div className="flex-1 z-10 py-2">
                  <div className="flex justify-between items-start sm:items-center mb-2 flex-col sm:flex-row gap-2">
                    <h4 className="text-lg md:text-2xl sm:text-3xl font-black text-[#18102B] leading-tight">Write or Link Chapters</h4>
                    <div className="flex gap-1 bg-white px-3 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-[14px] sm:text-[15px] text-[#18102B]/80 font-bold leading-relaxed max-w-xl">
                    Write your customized lessons using our modular block editor, or search public repository chapters to instantly link them.
                  </p>
                </div>
              </motion.div>

              {/* Card 3: Live Analytics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative bg-[#FF6B35] rounded-[32px] p-4 md:p-6 sm:p-8 border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col gap-3 md:gap-6 overflow-hidden group hover:-translate-y-2 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                {/* Background watermark */}
                <div className="absolute right-0 bottom-0 text-[200px] font-black text-black/10 leading-none select-none pointer-events-none translate-x-10 translate-y-10">
                  3
                </div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex-1">
                    <div className="bg-white text-[#18102B] px-4 py-1.5 rounded-full border-2 border-black font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_rgba(0,0,0,1)] inline-flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B35] inline-block animate-pulse"></span>
                      Live Analytics
                    </div>
                    <h4 className="text-lg md:text-2xl sm:text-3xl font-black text-white leading-tight">Students Learn, You Track</h4>
                    <p className="text-[14px] sm:text-[15px] text-white/90 font-bold mt-3 leading-relaxed max-w-xl">
                      Students read, practice quizzes, and complete evaluations. All analytics report back to your private teacher roster automatically.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 relative z-10 flex-wrap gap-4">
                  <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-full border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    <div className="flex -space-x-3 ml-2">
                      <div className="w-10 h-10 rounded-full border-[3px] border-white bg-[#C6FF3D] flex items-center justify-center text-sm shadow-sm z-30">🧑‍🎓</div>
                      <div className="w-10 h-10 rounded-full border-[3px] border-white bg-[#22D3EE] flex items-center justify-center text-sm shadow-sm z-20">👩‍🎓</div>
                      <div className="w-10 h-10 rounded-full border-[3px] border-white bg-[#F0E100] flex items-center justify-center text-sm shadow-sm z-10">👨‍🎓</div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-[#18102B] leading-none">5K+</span>
                      <span className="text-[9px] text-[#18102B]/60 font-bold uppercase tracking-wider">Enrolled</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#18102B] text-[#C6FF3D] px-4 md:px-6 py-4 rounded-full text-sm font-black flex items-center gap-2 border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#C6FF3D] hover:text-[#18102B] transition-colors cursor-pointer group/btn">
                    View Roster <span className="transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform">↗</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. ROLE SPECIFIC FLOWS (Split Shutter Magnetic Slide) */}
      <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-white to-[#F5F3FF]">
        {/* Creative mesh overlay background and blur bubble */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5dff5_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.25] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[150vw] md:w-[500px] h-[150vw] md:h-[500px] rounded-full bg-[#834DFB]/5 hidden md:block blur-[120px] pointer-events-none z-0"></div>
        <AbstractSphere className="absolute bottom-1/4 right-1/4 w-40 h-40 opacity-50 pointer-events-none will-change-transform animate-[pulse_8s_ease-in-out_infinite] z-0 animate-sway" />
        <AbstractRing className="absolute top-1/4 left-[10%] w-20 h-20 opacity-60 pointer-events-none animate-[bounce_6s_ease-in-out_infinite] z-0 animate-sway" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6 border border-black">
              Two Sides, One Platform
            </span>
            <h2 className="text-lg md:text-2xl md:text-4xl md:text-5xl font-extrabold text-[#18102B]">
              Built differently for <span className="text-[#834DFB]">teachers</span> and <span className="text-[#834DFB]">students</span>
            </h2>
            <p className="text-base text-[#6B6577] mt-4 font-medium">
              Teachers get powerful authoring and roster control. Students get a distraction-free learning space with self-guided reviews.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:p-8">
            
            {/* Teacher flow card */}
            <motion.div 
              className="w-full flex"
              initial={{ opacity: 0, x: -120, rotate: -4 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 70, damping: 14 }}
            >
              <TiltWrapper className="bg-white rounded-[32px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden w-full flex flex-col relative group">
                {/* Top Green Section */}
                <div className="bg-[#CCFF00] p-4 md:p-8 pb-12 relative overflow-hidden border-b-2 border-black h-12 md:h-24 md:h-48 flex flex-col justify-between">
                  {/* Subtle geometric line art background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="1.5" />
                      <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="1.5" />
                      <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  
                  <div className="flex justify-between items-start z-10 w-full">
                    <h3 className="text-xl md:text-3xl font-black text-[#18102B] leading-[0.95] tracking-tight max-w-[220px]">
                      Build, Author, & Roster Control.
                    </h3>
                    <div className="text-[#18102B]">
                      <IconDocument3D className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                {/* Overlapping Avatar Badge */}
                <div className="absolute left-8 top-[148px] w-20 h-20 rounded-full bg-[#18102B] border-[6px] border-white flex items-center justify-center shadow-md z-20 overflow-hidden">
                  <div className="w-14 h-14 rounded-full border-2 border-black bg-[#C6FF3D] flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <Presentation className="w-7 h-7 text-black" />
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="p-4 md:p-8 pt-12 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-lg md:text-2xl font-black text-[#18102B] leading-none tracking-tight">For Teachers</h4>
                        <span className="text-xs font-bold text-[#6B6577]/60">@courseforge.teacher</span>
                      </div>
                      <Link href="/signup">
                      <button className="bg-[#18102B] text-white hover:bg-slate-800 text-xs font-bold px-4 md:px-6 py-2.5 rounded-full transition-colors">
                        Start Free
                      </button>
                      </Link>
                    </div>

                    <p className="text-[14px] text-[#6B6577] font-semibold leading-relaxed mb-6">
                      Teachers get powerful authoring tools and roster controls. Build modular content once and distribute it across multiple cohorts seamlessly.
                    </p>

                    <ul className="space-y-3 mb-4 md:mb-8">
                      {[
                        'Create a class and get a shareable key in seconds',
                        'Write original chapters or reuse public ones you trust',
                        'Add practice quizzes, then unlock a final evaluation',
                        'Watch your class-only analytics update in real time'
                      ].map((step, idx) => (
                        <li key={idx} className="flex gap-3 text-xs text-[#18102B] font-extrabold items-center">
                          <span className="w-2 h-2 rounded-full bg-[#CCFF00] border border-black flex-shrink-0"></span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Meta Row */}
                  <div className="border-t border-slate-100 pt-5 flex justify-between items-center text-[11px] font-bold text-slate-400">
                    <span>100% Free</span>
                    <span>Real-Time Analytics</span>
                    <a href="https://courseforge.co" className="flex items-center gap-1 hover:text-[#834DFB] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      courseforge.co
                    </a>
                  </div>
                </div>
              </TiltWrapper>
            </motion.div>

            {/* Student flow card */}
            <motion.div 
              className="w-full flex"
              initial={{ opacity: 0, x: 120, rotate: 4 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 70, damping: 14 }}
            >
              <TiltWrapper className="bg-white rounded-[32px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden w-full flex flex-col relative group">
                {/* Top Green Section */}
                <div className="bg-[#CCFF00] p-4 md:p-8 pb-12 relative overflow-hidden border-b-2 border-black h-12 md:h-24 md:h-48 flex flex-col justify-between">
                  {/* Subtle geometric line art background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="1.5" />
                      <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="1.5" />
                      <circle cx="30" cy="30" r="25" stroke="black" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  
                  <div className="flex justify-between items-start z-10 w-full">
                    <h3 className="text-xl md:text-3xl font-black text-[#18102B] leading-[0.95] tracking-tight max-w-[220px]">
                      Distraction-Free Self Learning.
                    </h3>
                    <div className="text-[#18102B]">
                      <IconChart3D className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                {/* Overlapping Avatar Badge */}
                <div className="absolute left-8 top-[148px] w-20 h-20 rounded-full bg-[#18102B] border-[6px] border-white flex items-center justify-center shadow-md z-20 overflow-hidden">
                  <div className="w-14 h-14 rounded-full border-2 border-black bg-[#FF6B35] flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <GraduationCap className="w-7 h-7 text-black" />
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="p-4 md:p-8 pt-12 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-lg md:text-2xl font-black text-[#18102B] leading-none tracking-tight">For Students</h4>
                        <span className="text-xs font-bold text-[#6B6577]/60">@courseforge.student</span>
                      </div>
                      <Link href="/signup">
                      <button className="bg-[#18102B] text-white hover:bg-slate-800 text-xs font-bold px-4 md:px-6 py-2.5 rounded-full transition-colors">
                        Join Class
                      </button>
                      </Link>
                    </div>

                    <p className="text-[14px] text-[#6B6577] font-semibold leading-relaxed mb-6">
                      Students get an ad-free, distraction-free layout to read chapters, take unlimited mock quizzes, and automatically track scores.
                    </p>

                    <ul className="space-y-3 mb-4 md:mb-8">
                      {[
                        'Join one class, or several, using a simple join key',
                        'Read public chapters anytime, no account creation required',
                        'Practice with unlimited mid-chapter quizzes',
                        'Track your own scores and attempt history over time'
                      ].map((step, idx) => (
                        <li key={idx} className="flex gap-3 text-xs text-[#18102B] font-extrabold items-center">
                          <span className="w-2 h-2 rounded-full bg-[#CCFF00] border border-black flex-shrink-0"></span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Meta Row */}
                  <div className="border-t border-slate-100 pt-5 flex justify-between items-center text-[11px] font-bold text-slate-400">
                    <span>No Signup Required</span>
                    <span>Practice Mode</span>
                    <a href="https://courseforge.co" className="flex items-center gap-1 hover:text-[#834DFB] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      courseforge.co
                    </a>
                  </div>
                </div>
              </TiltWrapper>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. COMPARISON TABLE (Row-by-Row Venetian Blinds Flips) */}
      <section id="compare" className="relative w-full py-24 border-y-2 border-black bg-[#F0E100] overflow-hidden">
        {/* Massive Typographic Watermarks */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 opacity-[0.07] overflow-hidden">
          <div className="text-[18vw] font-black leading-[0.8] whitespace-nowrap text-[#18102B] transform -rotate-2 scale-110">DIFFERENT</div>
          <div className="text-[18vw] font-black leading-[0.8] whitespace-nowrap text-[#18102B] transform rotate-1 scale-110">FASTER</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6 border border-black">
              Why CourseForge
            </span>
            <h2 className="text-lg md:text-2xl md:text-4xl md:text-5xl font-extrabold text-[#18102B]">
              How it's different from what you know
            </h2>
          </motion.div>

          <motion.div 
            className="w-full overflow-x-auto rounded-[32px] border-2 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8 }}
          >
            {/* Window Header (Retro macOS/Browser Style) */}
            <div className="bg-[#18102B] px-4 md:px-6 py-4 flex items-center justify-between border-b-2 border-black select-none">
              {/* Window dots */}
              <div className="flex gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#FF6B35] border border-black shadow-sm"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#F0E100] border border-black shadow-sm"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#CCFF00] border border-black shadow-sm"></span>
              </div>
              {/* Search bar URL */}
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 md:px-8 py-1.5 text-xs text-slate-300 font-mono tracking-wider border border-white/20 hidden sm:block w-[320px] text-center select-none truncate">
                https://courseforge.co/compare
              </div>
              <div className="text-[10px] font-black text-[#CCFF00] tracking-widest uppercase">
                Capability Matrix
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-[#18102B] text-white border-b-2 border-black text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 md:p-6 border-r border-white/10">Capability</th>
                  <th className="p-4 md:p-6 border-r border-white/10 text-center">Content Sites (GFG-style)</th>
                  <th className="p-4 md:p-6 border-r border-white/10 text-center">Classroom Tools</th>
                  <th className="p-4 md:p-6 bg-[#834DFB] text-center border-l-2 border-black">CourseForge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black text-sm text-[#18102B] font-bold">
                {[
                  { cap: 'Public, reusable content', c1: 'Yes', c2: 'No', cf: 'Yes', highlight: false },
                  { cap: 'Private, trackable classes', c1: 'No', c2: 'Yes', cf: 'Yes', highlight: false },
                  { cap: 'Reuse another teacher\'s content', c1: 'No', c2: 'No', cf: 'Yes', highlight: false },
                  { cap: 'Per-teacher analytics on shared content', c1: 'No', c2: 'No', cf: 'Yes', highlight: true },
                  { cap: 'Students join multiple classes easily', c1: 'No', c2: 'Limited', cf: 'Yes', highlight: false }
                ].map((row, idx) => (
                  <motion.tr 
                    key={idx} 
                    className="hover:bg-slate-50 transition-colors duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <td className="p-4 md:p-6 text-base font-extrabold text-[#18102B] bg-slate-50/30 border-r-2 border-black max-w-[280px]">
                      {row.cap}
                    </td>
                    
                    <td className="p-4 md:p-6 text-center border-r-2 border-black">
                      {row.c1 === 'Yes' ? (
                        <span className="bg-slate-100 text-[#18102B] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-slate-300 shadow-sm">
                          Yes
                        </span>
                      ) : (
                        <span className="bg-rose-50/50 text-rose-500 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-rose-200">
                          ✕ No
                        </span>
                      )}
                    </td>
                    
                    <td className="p-4 md:p-6 text-center border-r-2 border-black">
                      {row.c2 === 'Yes' ? (
                        <span className="bg-slate-100 text-[#18102B] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-slate-300 shadow-sm">
                          Yes
                        </span>
                      ) : row.c2 === 'Limited' ? (
                        <span className="bg-amber-50 text-amber-600 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-amber-200">
                          ⚠ Limited
                        </span>
                      ) : (
                        <span className="bg-rose-50/50 text-rose-500 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-rose-200">
                          ✕ No
                        </span>
                      )}
                    </td>

                    <td className={`p-4 md:p-6 text-center bg-[#F5F3FF]/40 border-l-2 border-black transition-all ${row.highlight ? 'bg-[#CCFF00]/10' : ''}`}>
                      <span className="bg-[#CCFF00] text-[#18102B] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] inline-flex items-center gap-1.5 transform hover:scale-105 transition-transform duration-200 select-none">
                        ✓ YES
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. HOW IT WORKS & STATS GRID (3D Reveal Zooms) */}
      <section id="how-it-works" className="relative bg-white py-24 border-y-2 border-black w-full px-4 md:px-6 overflow-hidden">
        {/* Soft background light sphere */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[150vw] md:w-[500px] h-[150vw] md:h-[500px] rounded-full bg-[#F0E100]/5 hidden md:block blur-[120px] pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* How it works grid */}
          <div className="mb-20">
            <motion.div 
              className="text-center max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6 border border-black">
                Workflow
              </span>
              <h2 className="text-lg md:text-2xl md:text-4xl md:text-5xl font-extrabold text-[#18102B]">
                From blank chapter to tracked results
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8">
              {[
                { 
                  icon: <IconDocument3D className="w-16 h-16" />, 
                  step: '1', 
                  title: 'Write or Reuse', 
                  desc: 'Create original text content chapter by chapter with our rich editor, or link a public chapter someone else already wrote.',
                  bgClass: 'bg-[#C6FF3D]', // vibrant lime
                  textColor: 'text-[#18102B]',
                  descColor: 'text-[#18102B]/80',
                  badgeBg: 'bg-white',
                  badgeText: 'text-[#18102B]'
                },
                { 
                  icon: <IconKey3D className="w-16 h-16 drop-shadow-xl" />, 
                  step: '2', 
                  title: 'Share Your Key', 
                  desc: 'Students join your class once using the key — no re-joining needed as you add new chapters and assignments.',
                  bgClass: 'bg-[#834DFB]', // deep purple
                  textColor: 'text-white',
                  descColor: 'text-white/80',
                  badgeBg: 'bg-[#CCFF00]',
                  badgeText: 'text-[#18102B]'
                },
                { 
                  icon: <IconChart3D className="w-16 h-16" />, 
                  step: '3', 
                  title: 'Track Results', 
                  desc: 'Every quiz attempt is tied to your class, so your analytics stay accurate and secure even on shared content.',
                  bgClass: 'bg-[#FF6B35]', // vibrant orange
                  textColor: 'text-white',
                  descColor: 'text-white/90',
                  badgeBg: 'bg-white',
                  badgeText: 'text-[#18102B]'
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex"
                  initial={{ opacity: 0, y: 50, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.15 }}
                >
                  <motion.div 
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`${item.bgClass} rounded-[40px] p-4 md:p-8 sm:p-10 border-2 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_rgba(0,0,0,1)] relative overflow-hidden w-full flex flex-col justify-between group transition-all duration-300`}
                  >
                    {/* Giant Watermark Step Number */}
                    <div className="absolute -bottom-10 -right-6 text-[180px] font-black opacity-10 pointer-events-none leading-none select-none mix-blend-overlay">
                      {item.step}
                    </div>
                    
                    {/* Top row: Badge and Icon */}
                    <div className="relative z-10 flex flex-col gap-4 md:p-8 mb-4 md:mb-8">
                      <div className="flex justify-between items-start">
                        <span className={`${item.badgeBg} ${item.badgeText} px-4 py-2 rounded-full text-xs font-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] tracking-wide`}>
                          STEP {item.step}
                        </span>
                      </div>
                      
                      {/* Animated Floating Icon */}
                      <motion.div 
                        className="w-12 md:w-24 h-12 md:h-24 rounded-3xl bg-black/10 border-2 border-black/20 flex items-center justify-center shadow-inner backdrop-blur-sm group-hover:bg-white/20 transition-colors"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    
                    {/* Bottom row: Text */}
                    <div className="relative z-10 mt-auto">
                      <h3 className={`text-xl md:text-3xl font-black ${item.textColor} mb-4 tracking-tight leading-none`}>
                        {item.title}
                      </h3>
                      <p className={`text-[15px] ${item.descColor} font-bold leading-relaxed`}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 pt-12 border-t-2 border-black border-dashed">
            {counters.map((counter, idx) => {
              const statColors = [
                'bg-white border-2 border-black text-[#18102B] shadow-[4px_4px_0px_rgba(0,0,0,1)]',
                'bg-[#834DFB] text-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]',
                'bg-[#F0E100] text-[#18102B] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]',
                'bg-[#18102B] text-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]'
              ];
              return (
                <motion.div 
                  key={idx} 
                  className={`${statColors[idx]} rounded-[20px] p-4 md:p-6`}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.1 }}
                >
                  <div className="text-lg md:text-2xl md:text-4xl font-extrabold tracking-tight">
                    {counter.target}{counter.suffix}
                  </div>
                  <div className="text-xs uppercase tracking-wider font-bold opacity-80 mt-2">
                    {counter.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS (Waterfall Parallax Slide) */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-6 py-24 w-full overflow-hidden">
        {/* Premium Vector Background for Testimonials */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          <div className="absolute top-[10%] left-[-15%] w-[150vw] md:w-[450px] h-[150vw] md:h-[450px] rounded-full bg-gradient-to-tr from-[#834DFB]/5 to-[#CCFF00]/5 hidden md:block blur-[120px] pointer-events-none z-0 animate-pulse"></div>

          <div className="absolute top-[25%] left-[5%] w-72 h-72 opacity-[0.03] will-change-transform animate-[spin_60s_linear_infinite]">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-800">
              <rect x="20" y="20" width="160" height="160" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8,8" />
              <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        <div className="relative z-10">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6 border border-black">
              Testimonials
            </span>
            <h2 className="text-lg md:text-2xl md:text-4xl md:text-5xl font-extrabold text-[#18102B]">
              Teachers already teaching smarter
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 md:gap-4 md:p-8" style={{ perspective: '1200px' }}>
            {[
              { 
                bgClass: 'bg-white', 
                textClass: 'text-[#18102B]', 
                subTextClass: 'text-slate-400',
                btnClass: 'bg-[#18102B] text-white',
                quote: 'I stopped rewriting the same chapter every term.',
                author: 'Raj Sharma', 
                role: 'Physics', 
                Icon: IconQuote3D 
              },
              { 
                bgClass: 'bg-gradient-to-br from-[#FF6B35] to-[#f59e0b]', 
                textClass: 'text-white', 
                subTextClass: 'text-white/70',
                btnClass: 'bg-white text-[#FF6B35]',
                quote: 'My students join once with a key and I never resend it.',
                author: 'Anita Verma', 
                role: 'Python', 
                Icon: IconChart3D 
              },
              { 
                bgClass: 'bg-[#18102B]', 
                textClass: 'text-white', 
                subTextClass: 'text-[#A29CB0]',
                btnClass: 'bg-white text-black',
                quote: 'Analytics only show my own students, exactly what I needed.',
                author: 'K. Iyer', 
                role: 'Coordinator', 
                Icon: IconStar3D 
              },
              { 
                bgClass: 'bg-white', 
                textClass: 'text-[#18102B]', 
                subTextClass: 'text-slate-400',
                btnClass: 'bg-[#18102B] text-white',
                quote: 'Everything is tracked automatically across multiple cohorts.',
                author: 'S. Patel', 
                role: 'Maths', 
                Icon: IconDocument3D 
              }
            ].map((item, idx) => {
              const Icon = item.Icon;
              return (
              <motion.div 
                key={idx} 
                className="flex"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ type: "spring", stiffness: 80, damping: 14, delay: idx * 0.1 }}
              >
                <TiltWrapper className={`relative w-full h-[240px] md:h-[260px] rounded-[24px] p-4 md:p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,1)] border-2 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300 ${item.bgClass}`}>
                  {/* Giant 3D Icon Overlay on Right */}
                  <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-90 z-0 pointer-events-none drop-shadow-2xl">
                    <Icon className="w-full h-full" />
                  </div>
                  
                  {/* Content (Z-10 keeps it above icon) */}
                  <div className={`relative z-10 max-w-[65%] md:max-w-[55%] ${item.textClass}`}>
                    <h3 className="text-xl md:text-3xl md:text-4xl font-black mb-1 tracking-tight leading-none">
                      {item.author.split(' ')[0]} <br/>
                      <span className={item.subTextClass}>{item.role}</span>
                    </h3>
                    <p className={`text-xs md:text-sm mt-4 font-semibold italic opacity-90 line-clamp-3 leading-relaxed`}>
                      "{item.quote}"
                    </p>
                  </div>
                  
                  {/* Button */}
                  <div className="relative z-10 mt-6">
                    <Link href="/signup">
                    <button className="flex items-center gap-2 text-[10px] md:text-xs font-black tracking-widest uppercase hover:opacity-80 transition-opacity">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${item.btnClass}`}>
                        ↗
                      </span>
                      <span className={item.textClass}>READ STORY</span>
                    </button>
                    </Link>
                  </div>
                </TiltWrapper>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* 9. PRICING & FAQ */}
      <section id="pricing" className="relative bg-[#18102B] py-24 border-t-2 border-black w-full px-4 md:px-6 overflow-hidden">
        {/* Premium Vector Background for Pricing & FAQ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* Large glowing neon orbs */}
          <div className="absolute top-[20%] left-[-10%] w-[150vw] md:w-[600px] h-[150vw] md:h-[600px] bg-[#B4F481] rounded-full hidden md:block blur-[140px] will-change-transform animate-[pulse_8s_ease-in-out_infinite] opacity-[0.15]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[150vw] md:w-[500px] h-[150vw] md:h-[500px] bg-[#834DFB] rounded-full hidden md:block blur-[120px] opacity-[0.2]"></div>

          {/* Floating abstract mathematical and geometry SVGs */}
          <div className="absolute top-[15%] right-[15%] w-96 h-96 opacity-[0.05] will-change-transform animate-[spin_85s_linear_infinite_reverse]">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5" />
              <rect x="40" y="40" width="120" height="120" stroke="currentColor" strokeWidth="1" />
              <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
            </svg>
          </div>

          <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] opacity-[0.05] will-change-transform animate-[spin_55s_linear_infinite]">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
              <polygon points="100,10 190,190 10,190" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="100" cy="120" r="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Pricing header */}
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-[#B4F481] text-[#18102B] text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6 border border-black">
              Pricing Plans
            </span>
            <h2 className="text-lg md:text-2xl md:text-4xl md:text-5xl font-extrabold text-white">
              Free to start, upgrade anytime
            </h2>
          </motion.div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8 mb-24">
            
            {/* Plan 1: Student */}
            <motion.div 
              className="flex"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0 }}
            >
              <TiltWrapper className="bg-white border-2 border-black rounded-[32px] shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden w-full flex flex-col relative group">
                {/* Top Colored Section */}
                <div className="bg-[#22D3EE] p-4 md:p-8 pb-12 relative overflow-hidden border-b-2 border-black h-12 md:h-24 md:h-48 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <circle cx="20" cy="20" r="15" stroke="black" strokeWidth="2" fill="none" />
                      <circle cx="80" cy="80" r="25" stroke="black" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className="flex justify-between items-start z-10 w-full">
                    <h3 className="text-xl md:text-3xl font-black text-[#18102B] leading-[0.95] tracking-tight max-w-[200px]">
                      STUDENT LIFE.
                    </h3>
                    <div className="text-[#18102B]">
                      <IconStar3D className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                {/* Overlapping Avatar Badge */}
                <div className="absolute left-8 top-[148px] w-20 h-20 rounded-full bg-[#18102B] border-[6px] border-white flex items-center justify-center shadow-md z-20 overflow-hidden">
                  <div className="w-14 h-14 rounded-full border-2 border-black bg-[#FF6B35] flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <GraduationCap className="w-7 h-7 text-black" />
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="p-4 md:p-8 pt-12 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-lg md:text-2xl font-black text-[#18102B] leading-none tracking-tight">Student Plan</h4>
                        <span className="text-xs font-bold text-[#6B6577]/60">@courseforge.student</span>
                      </div>
                      <Link href="/signup">
                        <button className="bg-[#18102B] text-white hover:bg-slate-800 text-xs font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer">
                          Join Free
                        </button>
                      </Link>
                    </div>

                    <div className="text-xl md:text-3xl font-black text-[#18102B] mb-6">Free</div>

                    <ul className="space-y-3.5 mb-4 md:mb-8 text-sm text-[#6B6577] font-semibold">
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#22D3EE]" /> Join unlimited classes</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#22D3EE]" /> Read all public chapters</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#22D3EE]" /> Track your own scores</li>
                    </ul>
                  </div>

                  {/* Bottom Meta Row */}
                  <div className="border-t border-slate-100 pt-5 flex justify-between items-center text-[11px] font-bold text-slate-400">
                    <span>No Signup Required</span>
                    <span>Self-Paced</span>
                    <a href="https://courseforge.co" className="flex items-center gap-1 hover:text-[#834DFB] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      courseforge.co
                    </a>
                  </div>
                </div>
              </TiltWrapper>
            </motion.div>

            {/* Plan 2: Teacher (Highlighted) */}
            <motion.div 
              className="flex"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.15 }}
            >
              <TiltWrapper className="bg-white border-2 border-black rounded-[32px] shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden w-full flex flex-col relative group">
                {/* Top Green Section */}
                <div className="bg-[#CCFF00] p-4 md:p-8 pb-12 relative overflow-hidden border-b-2 border-black h-12 md:h-24 md:h-48 flex flex-col justify-between">
                  <div className="absolute top-0 right-0 bg-[#18102B] text-white font-extrabold text-[9px] uppercase tracking-wider py-1 px-4 transform rotate-45 translate-x-4 translate-y-3 z-20 border border-black shadow-sm">
                    POPULAR
                  </div>
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="2" />
                      <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex justify-between items-start z-10 w-full">
                    <h3 className="text-xl md:text-3xl font-black text-[#18102B] leading-[0.95] tracking-tight max-w-[200px]">
                      TEACHER FORCE.
                    </h3>
                    <div className="text-[#18102B]">
                      <IconDocument3D className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                {/* Overlapping Avatar Badge */}
                <div className="absolute left-8 top-[148px] w-20 h-20 rounded-full bg-[#18102B] border-[6px] border-white flex items-center justify-center shadow-md z-20 overflow-hidden">
                  <div className="w-14 h-14 rounded-full border-2 border-black bg-[#C6FF3D] flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <Presentation className="w-7 h-7 text-black" />
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="p-4 md:p-8 pt-12 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-lg md:text-2xl font-black text-[#18102B] leading-none tracking-tight">Teacher Plan</h4>
                        <span className="text-xs font-bold text-[#6B6577]/60">@courseforge.teacher</span>
                      </div>
                      <Link href="/signup">
                        <button className="bg-[#18102B] text-white hover:bg-slate-800 text-xs font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer">
                          Start Free
                        </button>
                      </Link>
                    </div>

                    <div className="text-xl md:text-3xl font-black text-[#18102B] mb-6 flex items-baseline gap-1">
                      Free
                      <span className="text-xs font-medium text-slate-400">/ class</span>
                    </div>

                    <ul className="space-y-3.5 mb-4 md:mb-8 text-sm text-[#6B6577] font-semibold">
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Create unlimited classes</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Reuse any public chapter</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Full class-only analytics</li>
                    </ul>
                  </div>

                  {/* Bottom Meta Row */}
                  <div className="border-t border-slate-100 pt-5 flex justify-between items-center text-[11px] font-bold text-slate-400">
                    <span>No Credit Card</span>
                    <span>Unlimited Students</span>
                    <a href="https://courseforge.co" className="flex items-center gap-1 hover:text-[#834DFB] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      courseforge.co
                    </a>
                  </div>
                </div>
              </TiltWrapper>
            </motion.div>

            {/* Plan 3: School */}
            <motion.div 
              className="flex"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.3 }}
            >
              <TiltWrapper className="bg-white border-2 border-black rounded-[32px] shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden w-full flex flex-col relative group">
                {/* Top Colored Section */}
                <div className="bg-[#834DFB] p-4 md:p-8 pb-12 relative overflow-hidden border-b-2 border-black h-12 md:h-24 md:h-48 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <rect x="10" y="10" width="80" height="80" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className="flex justify-between items-start z-10 w-full">
                    <h3 className="text-xl md:text-3xl font-black text-white leading-[0.95] tracking-tight max-w-[200px]">
                      SCHOOL POWER.
                    </h3>
                    <div className="text-white">
                      <IconKey3D className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                {/* Overlapping Avatar Badge */}
                <div className="absolute left-8 top-[148px] w-20 h-20 rounded-full bg-[#18102B] border-[6px] border-white flex items-center justify-center shadow-md z-20 overflow-hidden">
                  <div className="w-14 h-14 rounded-full border-2 border-black bg-[#834DFB] flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <School className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="p-4 md:p-8 pt-12 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-lg md:text-2xl font-black text-[#18102B] leading-none tracking-tight">School Plan</h4>
                        <span className="text-xs font-bold text-[#6B6577]/60">@courseforge.school</span>
                      </div>
                      <Link href="/contact">
                        <button className="bg-[#18102B] text-white hover:bg-slate-800 text-xs font-bold px-4 md:px-6 py-2.5 rounded-full transition-colors cursor-pointer">
                          Contact Us
                        </button>
                      </Link>
                    </div>

                    <div className="text-xl md:text-3xl font-black text-[#18102B] mb-6">Custom</div>

                    <ul className="space-y-3.5 mb-4 md:mb-8 text-sm text-[#6B6577] font-semibold">
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Multiple teachers, one org</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Dedicated support</li>
                      <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Custom onboarding setup</li>
                    </ul>
                  </div>

                  {/* Bottom Meta Row */}
                  <div className="border-t border-slate-100 pt-5 flex justify-between items-center text-[11px] font-bold text-slate-400">
                    <span>Org-wide Controls</span>
                    <span>Enterprise Support</span>
                    <a href="https://courseforge.co" className="flex items-center gap-1 hover:text-[#834DFB] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      courseforge.co
                    </a>
                  </div>
                </div>
              </TiltWrapper>
            </motion.div>
          </div>

          {/* FAQ Accordion Section */}
          <div id="faq" className="max-w-4xl mx-auto border-t-2 border-black border-dashed pt-20">
            <div className="text-center mb-6 md:mb-12">
              <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6 border border-black">
                FAQ
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-[#18102B]">
                Common Questions
              </h3>
            </div>

            <div className="space-y-4">
              {[
                { q: 'Can students join more than one teacher\'s class?', a: 'Yes — a student can join multiple different teachers\' classes at the same time using different class keys, and their progress data is kept secure and tracked separately under each roster.' },
                { q: 'Can I edit a chapter I reused from another teacher?', a: 'No — only the original owner (author) can edit a chapter\'s core content blocks. Reused chapters linked into your class are read-only to preserve curriculum integrity.' },
                { q: 'Do students need an account to read public chapters?', a: 'No — public chapters are readable by anyone instantly with no registration required. An account is only needed to join a teacher\'s private class roster or attempt quizzes for grade-tracking.' },
                { q: 'What happens if a student runs out of quiz attempts?', a: 'On an evaluation-type final quiz, once attempts run out the student sees only their final score, not a review of past answers.' },
                { q: 'Is there a limit on how many classes I can create?', a: 'No — teachers can create as many classes as they need under the free tier, with no caps.' }
              ].map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <motion.div 
                    key={idx} 
                    layout
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className={`bg-white rounded-[24px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 md:p-6 hover:border-[#834DFB] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer relative overflow-hidden select-none ${isOpen ? 'border-[#834DFB] shadow-[6px_6px_0px_#834DFB]' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.05 }}
                  >
                    {/* Glowing highlight blob when open */}
                    {isOpen && (
                      <div className="absolute -right-10 -bottom-10 w-16 md:w-32 h-16 md:h-32 bg-[#CCFF00]/10 rounded-full blur-[40px] pointer-events-none"></div>
                    )}
                    
                    <div className="flex justify-between items-center gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 border-black flex-shrink-0 shadow-sm ${isOpen ? 'bg-[#CCFF00] text-[#18102B]' : 'bg-[#F5F3FF] text-[#834DFB]'}`}>
                          Q
                        </div>
                        <span className="font-extrabold text-[#18102B] text-base md:text-lg leading-tight">
                          {faq.q}
                        </span>
                      </div>
                      <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#18102B] text-white' : 'bg-slate-50 text-slate-600'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden relative z-10"
                        >
                          <div className="border-t border-dashed border-slate-200 pt-4 flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-[#18102B] text-[#CCFF00] flex items-center justify-center font-black text-xs border-2 border-black flex-shrink-0 shadow-sm">
                              A
                            </div>
                            <p className="text-sm text-[#6B6577] font-semibold leading-relaxed pt-1.5 flex-1 pr-4">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 10. RESOURCES / BLOG (With Uploaded Illustrations Cover Images) */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-6 py-24 w-full border-t-2 border-black border-dashed overflow-hidden">
        {/* Premium Vector Background for Resources */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute top-[10%] left-[-15%] w-[150vw] md:w-[450px] h-[150vw] md:h-[450px] rounded-full bg-gradient-to-br from-[#C6FF3D]/10 to-[#834DFB]/5 hidden md:block blur-[120px] pointer-events-none z-0"></div>
          
          <div className="absolute bottom-[15%] right-[5%] w-80 h-80 opacity-[0.03] will-change-transform animate-[spin_70s_linear_infinite_reverse]">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#834DFB]">
              <path d="M100,0 L200,100 L100,200 L0,100 Z" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
            </svg>
          </div>
        </div>

        <div className="relative z-10">
          <motion.div 
            className="max-w-3xl mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6 border border-black">
              Resources
            </span>
            <h2 className="text-lg md:text-2xl md:text-4xl font-extrabold text-[#18102B]">
              Guides to get the most out of CourseForge
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-8">
            {[
              { tag: 'GUIDE', titleLine1: 'Writing your first', titleLine2: 'Chapter Outline', desc: 'A short walkthrough for new teachers setting up their first class and authoring modules.', img: '/lofi_study_room.png', bgClass: 'bg-[#FF6B35]' },
              { tag: 'GUIDE', titleLine1: 'Reusing Public', titleLine2: 'Content Well', desc: 'How to search, find, and link high-quality chapters into your classroom roster instantly.', img: '/globe_education.png', bgClass: 'bg-[#CCFF00]' },
              { tag: 'TIPS', titleLine1: 'Reading your class', titleLine2: 'Analytics Dashboard', desc: 'What each number and completion percentage on your teacher dashboard actually tells you.', img: '/stationery_flatlay.jpg', bgClass: 'bg-white' }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="flex"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
              >
                <TiltWrapper className="w-full h-[480px] rounded-[32px] overflow-hidden flex flex-col relative group shadow-[6px_6px_0px_rgba(0,0,0,1)] border-2 border-black hover:border-[#834DFB] transition-colors duration-300 bg-white">
                  {/* TOP HALF: Color block with text */}
                  <div className={`p-4 md:p-6 pb-8 flex-1 flex flex-col gap-4 ${item.bgClass}`}>
                    <div>
                      <span className="bg-white text-black px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest shadow-sm">
                        {item.tag}
                      </span>
                    </div>
                    <div>
                      <h4 className={`text-lg md:text-2xl font-black leading-[0.95] tracking-tight ${item.bgClass === 'bg-[#FF6B35]' ? 'text-white' : 'text-[#18102B]'}`}>
                        {item.titleLine1}<br/>
                        {item.titleLine2}
                      </h4>
                      <p className={`text-[12px] font-semibold mt-3 leading-relaxed line-clamp-3 ${item.bgClass === 'bg-[#FF6B35]' ? 'text-white/80' : 'text-[#18102B]/70'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* BOTTOM HALF: Full-bleed image */}
                  <div className="relative h-[220px] w-full flex-shrink-0 bg-[#18102B] border-t-2 border-black overflow-hidden">
                    <img src={item.img} alt={item.titleLine1} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    
                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                    
                    {/* CTA Pill button at bottom left over the image */}
                    <div className="absolute bottom-5 left-5 z-10">
                      <Link href="/signup">
                      <button className="cta-button-group bg-[#18102B] border-2 border-black text-[#FF6B35] pl-4 pr-1.5 py-1.5 rounded-full flex items-center gap-4 text-xs font-bold hover:bg-white hover:text-[#18102B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        Read Guide 
                        <span className="bg-[#FF6B35] text-white border-2 border-black rounded-full w-7 h-7 flex items-center justify-center text-[10px] font-black">→</span>
                      </button>
                      </Link>
                    </div>
                  </div>
                </TiltWrapper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-24 w-full">
        <motion.div 
          className="bg-[#F5F3FF] text-[#18102B] rounded-[32px] p-10 md:p-16 text-center border-2 border-black relative overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, scale: 1.05,  }}
          whileInView={{ opacity: 1, scale: 1,  }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Creative Dark Vector Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B08_1px,transparent_1px),linear-gradient(to_bottom,#18102B08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            
            {/* Neon color blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] md:w-[600px] h-[150vw] md:h-[600px] bg-[#834DFB]/15 rounded-full hidden md:block blur-[140px]"></div>
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#B4F481]/30 rounded-full hidden md:block blur-[100px] will-change-transform animate-[pulse_8s_ease-in-out_infinite]"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#22D3EE]/20 rounded-full hidden md:block blur-[100px] will-change-transform animate-[pulse_10s_ease-in-out_infinite]" style={{ animationDelay: '3s' }}></div>

            {/* Glowing tech blueprint lines */}
            <svg className="absolute top-0 left-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#18102B" strokeWidth="1.5" strokeDasharray="8,8" />
              <line x1="0" y1="80%" x2="100%" y2="20%" stroke="#18102B" strokeWidth="1.5" strokeDasharray="8,8" />
            </svg>
          </div>
          
          <h2 className="text-xl md:text-3xl md:text-5xl font-black mb-6 leading-tight max-w-2xl mx-auto uppercase relative z-10">
            Ready to teach without rewriting everything?
          </h2>
          <p className="text-[#6B6577] text-sm md:text-base mb-10 max-w-md mx-auto font-semibold relative z-10">
            Create your first class, add a chapter, and share your key — setup takes less than five minutes.
          </p>

          <div className="relative z-10">
            <Link href="/signup">
              <button className="cta-button-group bg-[#18102B] hover:bg-black text-[#B4F481] font-black text-base px-10 py-4.5 rounded-full border-2 border-black transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              Get Started Free
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

    
      {/* 12. NEO-BRUTALIST FOOTER */}
      <footer className="w-full bg-[#18102B] border-t-2 md:border-t-4 border-black py-16 px-4 md:px-6 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#FFFFFF08_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider">CourseForge</h3>
            <p className="text-[#9CA3AF] font-bold text-sm max-w-sm">Write once and teach everywhere without losing track.</p>
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-6">
            {/* Twitter / X */}
            <a href="https://www.twitter.com/JDmOwO" target="_blank" rel="noreferrer" className="social-button social-twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 50 50" className="social-icon icon-twitter fill-white">
                <path d="M49.5,10.9c-1.8,0.8-3.7,1.3-5.7,1.5c2.1-1.3,3.7-3.4,4.5-5.9c-2,1.2-4.2,2.1-6.6,2.6c-1.9-2-4.6-3.2-7.6-3.2c-5.8,0-10.5,4.7-10.5,10.5c0,0.8,0.1,1.6,0.4,2.3C11,18,6.3,15.2,3.4,11.5C2.5,13.1,2,14.9,2,16.7c0,3.6,1.8,6.8,4.6,8.6c-1.7,0-3.3-0.5-4.7-1.3v0.1c0,5,3.5,9.2,8.2,10.2c-0.9,0.2-1.8,0.3-2.7,0.3c-0.7,0-1.4,0-2-0.1c1.4,4.3,5.4,7.4,10.2,7.5c-3.7,2.9-8.3,4.6-13.3,4.6c-0.9,0-1.8,0-2.7-0.1c4.8,3.1,10.5,4.9,16.7,4.9c20,0,30.9-16.6,30.9-30.9c0-0.5,0-1.1,0-1.6C46.8,14.6,48.3,12.9,49.5,10.9z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 50 50" className="social-icon icon-x fill-white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/JDmOwO" target="_blank" rel="noreferrer" className="social-button social-facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 50 50" className="social-icon fill-white">
                <path d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/jd-yqr/" target="_blank" rel="noreferrer" className="social-button social-linkedin">
              <svg viewBox="55.005 23.8289 333.061 333.0491" width={36} height={36} xmlns="http://www.w3.org/2000/svg" className="social-icon fill-[#0b65c2]">
                <path d="M 338.789 307.609 L 289.44 307.609 L 289.44 230.326 C 289.44 211.898 289.111 188.174 263.773 188.174 C 238.07 188.174 234.138 208.253 234.138 228.985 L 234.138 307.604 L 184.788 307.604 L 184.788 148.679 L 232.164 148.679 L 232.164 170.398 L 232.827 170.398 C 242.491 153.881 260.452 144.017 279.57 144.726 C 329.587 144.726 338.809 177.626 338.809 220.426 L 338.789 307.609 Z M 129.106 126.955 C 107.063 126.96 93.281 103.098 104.298 84.006 C 115.319 64.909 142.877 64.909 153.904 83.996 C 156.418 88.35 157.739 93.29 157.739 98.312 C 157.744 114.13 144.923 126.955 129.106 126.955 M 153.781 307.609 L 104.38 307.609 L 104.38 148.679 L 153.781 148.679 L 153.781 307.609 Z M 363.391 23.851 L 79.582 23.851 C 66.17 23.702 55.169 34.446 55.005 47.858 L 55.005 332.844 C 55.164 346.266 66.165 357.02 79.582 356.876 L 363.391 356.876 C 376.839 357.046 387.881 346.292 388.066 332.844 L 388.066 47.837 C 387.876 34.4 376.834 23.656 363.391 23.831" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>

    </>
  );
}
