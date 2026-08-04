'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Sparkles, ArrowRight, BookOpen, Users, Play, Check, 
  ChevronDown, HelpCircle, Layers, Settings, Eye, Target, 
  Globe, BarChart3, Award, Star, History, Clock, BookOpenCheck
} from 'lucide-react';

export default function LandingClientPage({ user }: { user: any }) {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Counter targets
  const counters = [
    { target: 120, label: 'Educators Connected', suffix: '' },
    { target: 64, label: 'Chapter Reuse Rate', suffix: '%' },
    { target: 520, label: 'Chapters Live', suffix: '+' },
    { target: 20, label: 'Subjects Covered', suffix: '+' }
  ];

  return (
    <main className="flex-1 flex flex-col bg-[#F5F3FF]">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text & CTAs */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-[#E5DFF5] text-xs font-semibold text-[#834DFB] w-fit">
            <Sparkles className="w-4 h-4 text-[#F0E100] fill-[#F0E100] animate-spin-slow" />
            <span>Next Generation Education Space</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#18102B] leading-[1.1]">
            Your Partner in <span className="text-[#834DFB] underline decoration-[#F0E100] decoration-wavy decoration-3 underline-offset-8">Smarter</span> Class Learning
          </h1>
          
          <p className="text-lg md:text-xl text-[#6B6577] max-w-xl leading-relaxed">
            Write your own chapters, or reuse content already trusted by other teachers — and still track every one of your own students, separately, in one clean dashboard.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href={user ? (user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard') : '/signup'}>
              <button className="group inline-flex items-center gap-2.5 px-8 py-4.5 rounded-full bg-[#834DFB] text-white font-bold text-base hover:bg-[#723ee6] active:scale-95 transition-all duration-200 shadow-lg shadow-[#834DFB]/35">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </Link>
            <a href="#how-it-works">
              <button className="inline-flex items-center gap-2 px-8 py-4.5 rounded-full bg-transparent border-2 border-[#18102B] text-[#18102B] font-bold text-base hover:bg-[#18102B]/5 active:scale-95 transition-all duration-200">
                See How It Works
              </button>
            </a>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-4">
            {['Public Chapters', 'Private Classes', 'Practice Quizzes', 'Class Analytics'].map((tag) => (
              <span key={tag} className="border border-[#E5DFF5] bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-[#6B6577]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Reference Image Styled Visuals */}
        <div className="relative w-full h-[520px] flex items-center justify-center">
          
          {/* Card 1: Red/Orange Class Card (Marathon Shakeout style) */}
          <div className="absolute top-0 left-6 w-[290px] bg-[#FF6B35] text-white rounded-[24px] shadow-2xl p-6 rotate-[-4deg] transition-all duration-300 hover:rotate-[0deg] hover:translate-y-[-8px] hover:scale-[1.02] border border-[#FF8A5C] z-20 group">
            
            {/* Corner Crosshairs */}
            <span className="crosshair-corner crosshair-top-left">+</span>
            <span className="crosshair-corner crosshair-top-right">+</span>
            <span className="crosshair-corner crosshair-bottom-left">+</span>
            <span className="crosshair-corner crosshair-bottom-right">+</span>

            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-orange-200 mb-6">
              <span>Class Card</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F0E100] animate-pulse"></span>
            </div>

            <h3 className="text-3xl font-extrabold leading-tight tracking-tight mb-8">
              Physics 101<br/>Shakeout
            </h3>

            {/* Custom stylized overlapping ovals */}
            <div className="flex gap-1.5 mb-8 relative">
              <div className="w-16 h-24 bg-white/20 rounded-full border border-white/40 overflow-hidden relative rotate-[-12deg] flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/60 to-purple-600/60 mix-blend-overlay"></div>
                <Users className="w-7 h-7 text-white absolute inset-0 m-auto opacity-75" />
              </div>
              <div className="w-16 h-24 bg-white/20 rounded-full border border-white/40 overflow-hidden relative rotate-[4deg] flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/60 to-emerald-600/60 mix-blend-overlay"></div>
                <BookOpen className="w-7 h-7 text-white absolute inset-0 m-auto opacity-75" />
              </div>
              <div className="w-16 h-24 bg-[#18102B] rounded-full border border-white/40 overflow-hidden relative rotate-[16deg] flex-shrink-0 flex items-center justify-center text-[#F0E100] font-extrabold text-xl">
                CF
              </div>
            </div>

            {/* Dotted grid lines */}
            <div className="border-t border-white/20 border-dashed py-3 flex justify-between items-center text-[11px] font-bold tracking-wide uppercase">
              <span className="text-orange-200">Teacher</span>
              <span className="text-white">Prof. Verma</span>
            </div>
            
            <div className="border-t border-white/20 border-dashed py-3 flex justify-between items-center text-[11px] font-bold tracking-wide uppercase">
              <span className="text-orange-200">Join Key</span>
              <span className="text-[#F0E100] font-mono">CF-93XQ</span>
            </div>

            {/* Custom simulated barcode at bottom */}
            <div className="border-t border-white/20 border-dashed pt-4 flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-widest text-orange-200">E-TICKET CODE</span>
              <div className="h-6 flex gap-[2px] items-center opacity-70">
                {[1,3,2,1,4,2,1,3,2,1].map((w, i) => (
                  <div key={i} className="h-full bg-white" style={{ width: `${w}px` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Dark Theme Ribbon Card (Lights Out Race style) */}
          <div className="absolute bottom-4 right-6 w-[310px] bg-[#18102B] text-white rounded-[24px] shadow-2xl p-6 rotate-[3deg] transition-all duration-300 hover:rotate-[0deg] hover:translate-y-[-8px] hover:scale-[1.02] border border-[#30244D] z-15">
            
            {/* Angled Ribbon tags */}
            <div className="absolute -top-3 left-6 flex flex-col gap-1.5 z-30">
              <div className="bg-[#F0E100] text-black font-extrabold text-[10px] uppercase tracking-wider py-1 px-3 rounded-full transform -rotate-3 border border-[#18102B]">
                24.03.2026 - Central Park
              </div>
              <div className="bg-[#834DFB] text-white font-extrabold text-[10px] uppercase tracking-wider py-1 px-3 rounded-full transform rotate-2 border border-[#18102B]">
                Intro to Mechanics
              </div>
            </div>

            <div className="pt-6 flex justify-between items-start mb-6">
              <div>
                <span className="text-[#F0E100] text-[11px] font-extrabold uppercase tracking-widest">Active Chapter</span>
                <h4 className="text-2xl font-bold mt-1 tracking-tight">Kinematics & Motion</h4>
              </div>
              <BookOpenCheck className="w-8 h-8 text-[#834DFB] mt-1" />
            </div>

            {/* Simulated registration fields */}
            <div className="space-y-3 mb-6 pt-2">
              <div className="bg-[#241B3B] rounded-lg p-3 border border-[#3B305C]">
                <div className="text-[9px] text-[#A29CB0] uppercase font-bold">Module Topic</div>
                <div className="text-xs font-bold text-white mt-0.5">Newtonian Gravity & Orbitals</div>
              </div>
              <div className="bg-[#241B3B] rounded-lg p-3 border border-[#3B305C]">
                <div className="text-[9px] text-[#A29CB0] uppercase font-bold">Estimated Reading</div>
                <div className="text-xs font-bold text-white mt-0.5 flex justify-between">
                  <span>35 Minutes</span>
                  <span className="text-[#F0E100]">2 Practice Quizzes</span>
                </div>
              </div>
            </div>

            {/* Solid modern CTA button */}
            <button className="w-full bg-white hover:bg-[#F0E100] text-[#18102B] font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-colors duration-200">
              Join Class Now
            </button>
          </div>

          {/* Card 3: Mini Stat Dial Card (Weekly Progress style) */}
          <div className="absolute top-12 right-20 bg-white rounded-[20px] p-5 shadow-xl border border-[#E5DFF5] rotate-[-8deg] z-25 hover:rotate-[0deg] hover:translate-y-[-4px] transition-all duration-300 flex items-center gap-4">
            {/* Mini Concentric Gauge Ring SVG */}
            <div className="relative w-12 h-12">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="18" className="stroke-slate-100 fill-none" strokeWidth="4" />
                <circle cx="24" cy="24" r="18" className="stroke-[#834DFB] fill-none" strokeWidth="4" strokeDasharray="113" strokeDashoffset="25" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-extrabold text-xs text-[#18102B]">
                78%
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#6B6577] uppercase tracking-wider">Class Average</div>
              <div className="text-base font-extrabold text-[#18102B]">Outstanding!</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RATING & PARTNER MARQUEE */}
      <section className="bg-white border-y border-[#E5DFF5] py-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left: Star ratings */}
          <div className="flex flex-col items-center lg:items-start gap-2 flex-shrink-0 text-center lg:text-left">
            <span className="text-sm font-semibold text-[#6B6577] uppercase tracking-widest">PLATFORM RATING</span>
            <div className="flex items-center gap-1.5 text-2xl font-extrabold text-[#18102B]">
              4,900+ Students
              <div className="flex gap-0.5 ml-2 text-[#F0E100] text-xl">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current stroke-[#834DFB] stroke-2" />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Scrolling Marquee of Schools */}
          <div className="flex-1 w-full overflow-hidden relative">
            {/* Fade overlays for smooth scrolling transition */}
            <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            <div className="text-[11px] font-bold text-[#834DFB] uppercase tracking-widest mb-3 text-center lg:text-left">
              TRUSTED BY EDUCATORS AT
            </div>
            
            <div className="w-full overflow-hidden relative h-8">
              <div className="animate-marquee flex gap-12 items-center">
                {[
                  'Greenview High', 'St. Xavier\'s', 'Lincoln Academy', 'Sunrise Tutorials', 'Northfield Prep', 'Delhi Public School',
                  'Greenview High', 'St. Xavier\'s', 'Lincoln Academy', 'Sunrise Tutorials', 'Northfield Prep', 'Delhi Public School'
                ].map((school, idx) => (
                  <span key={idx} className="font-extrabold text-base text-[#B9B2C9] hover:text-[#834DFB] transition-colors cursor-default whitespace-nowrap">
                    {school}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURE CARDS GRID (6 cards matching design layout) */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-3xl mb-16">
          <span className="inline-block bg-[#18102B] text-[#F5F3FF] text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#18102B] leading-tight">
            Everything a teacher needs to <span className="text-[#834DFB]">write once and teach everywhere</span> — without losing track.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Reuse Public Chapter (Gradient style with oval cutouts) */}
          <div className="bg-gradient-to-br from-[#834DFB] to-[#5B2FD1] text-white rounded-[24px] p-8 flex flex-col justify-between min-h-[320px] border border-[#A67DFF] shadow-lg relative overflow-hidden group">
            <span className="crosshair-corner crosshair-top-left">+</span>
            <span className="crosshair-corner crosshair-top-right">+</span>
            <span className="crosshair-corner crosshair-bottom-right">+</span>

            <div className="absolute right-[-10px] top-6 w-32 h-44 bg-white/10 rounded-full border border-white/20 transform rotate-12 flex items-center justify-center opacity-70 group-hover:scale-105 transition-transform duration-300">
              <Globe className="w-12 h-12 text-white/55" />
            </div>

            <Layers className="w-10 h-10 text-[#F0E100] mb-6" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">Reuse Any Public Chapter</h3>
              <p className="text-slate-200 text-sm leading-relaxed max-w-[220px]">
                Add another teacher's chapter to your class in one click — content remains theirs, results stay yours.
              </p>
            </div>
          </div>

          {/* Card 2: Private Class Keys (Dark theme with grid/layout) */}
          <div className="bg-[#18102B] text-white rounded-[24px] p-8 flex flex-col justify-between min-h-[320px] border border-[#2D2342] shadow-lg relative">
            <span className="crosshair-corner crosshair-top-left">+</span>
            <span className="crosshair-corner crosshair-top-right">+</span>
            <span className="crosshair-corner crosshair-bottom-left">+</span>
            <span className="crosshair-corner crosshair-bottom-right">+</span>

            <div className="flex justify-between items-center">
              <Settings className="w-10 h-10 text-[#834DFB]" />
              <span className="font-mono text-xs text-[#F0E100] bg-[#241B3B] px-2.5 py-1 rounded-md border border-[#3B305C]">CF-KEY</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Private Class Keys</h3>
              <p className="text-[#A29CB0] text-sm leading-relaxed">
                One key per class. Students join once, and stay linked automatically for every chapter you add later.
              </p>
            </div>
          </div>

          {/* Card 3: Timed Practice Quizzes (Yellow theme) */}
          <div className="bg-[#F0E100] text-[#18102B] rounded-[24px] p-8 flex flex-col justify-between min-h-[320px] border border-[#DCD000] shadow-lg relative overflow-hidden group">
            <div className="absolute right-6 top-6 opacity-10 group-hover:rotate-12 transition-transform duration-300">
              <Award className="w-28 h-28" />
            </div>

            <Target className="w-10 h-10 text-[#834DFB]" />
            <div>
              <h3 className="text-2xl font-extrabold mb-3">Timed Practice Quizzes</h3>
              <p className="text-[#18102B]/80 text-sm font-semibold leading-relaxed">
                Mid-chapter quizzes for quick learning reinforcement, and a final evaluation quiz once the chapter is marked complete.
              </p>
            </div>
          </div>

          {/* Card 4: Per-Class Analytics (Chalk Outline) */}
          <div className="bg-white text-[#18102B] rounded-[24px] p-8 flex flex-col justify-between min-h-[320px] border-2 border-[#E5DFF5] shadow-sm hover:border-[#834DFB] transition-colors duration-300">
            <BarChart3 className="w-10 h-10 text-[#834DFB]" />
            <div>
              <h3 className="text-2xl font-bold mb-3">Per-Class Analytics</h3>
              <p className="text-[#6B6577] text-sm leading-relaxed">
                See only your own students' scores — even on chapters shared with dozens of other classes. Clean separated rosters.
              </p>
            </div>
          </div>

          {/* Card 5: Multi-Class Students (Chalk Outline) */}
          <div className="bg-white text-[#18102B] rounded-[24px] p-8 flex flex-col justify-between min-h-[320px] border-2 border-[#E5DFF5] shadow-sm hover:border-[#834DFB] transition-colors duration-300">
            <Users className="w-10 h-10 text-[#834DFB]" />
            <div>
              <h3 className="text-2xl font-bold mb-3">Multi-Class Students</h3>
              <p className="text-[#6B6577] text-sm leading-relaxed">
                Students can join more than one class at once — school, tuition, and extra classes are all tracked separately in their portals.
              </p>
            </div>
          </div>

          {/* Card 6: Full Attempt History (Dark theme with DOT Activity indicator) */}
          <div className="bg-[#18102B] text-white rounded-[24px] p-8 flex flex-col justify-between min-h-[320px] border border-[#2D2342] shadow-lg relative overflow-hidden">
            <span className="crosshair-corner crosshair-top-left">+</span>
            <span className="crosshair-corner crosshair-bottom-right">+</span>
            
            <div className="flex justify-between items-center">
              <History className="w-10 h-10 text-[#F0E100]" />
              {/* Dot grid indicating completions like Github/Running Grid */}
              <div className="grid grid-cols-5 gap-1 opacity-60">
                {[1,1,1,1,0,1,1,0,1,1,1,1,1,1,1].map((dot, idx) => (
                  <div key={idx} className={`w-2 h-2 rounded-full ${dot ? 'bg-[#F0E100]' : 'bg-[#3A3056]'}`}></div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Full Attempt History</h3>
              <p className="text-[#A29CB0] text-sm leading-relaxed">
                Every quiz attempt is saved with score, response records, and time taken, so progress history is never lost.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BIG STEPS SECTION WITH LIVE ANALYTICS CARD (Marathon LSD/Training style) */}
      <section className="bg-white py-24 border-y border-[#E5DFF5] w-full px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Mock Live Class Analytics Card */}
          <div className="flex items-center justify-center relative">
            {/* Decorative background grid */}
            <div className="absolute inset-0 bg-grid-slate-100 opacity-50 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]"></div>
            
            {/* Visual Card (Marathon Training style) */}
            <div className="relative w-[340px] bg-white rounded-[28px] border-2 border-[#E5DFF5] shadow-2xl p-8 z-10">
              <div className="flex justify-between items-center text-xs font-bold text-[#6B6577] mb-6">
                <span>Class Overview</span>
                <span className="px-2 py-0.5 rounded-md bg-[#F5F3FF] text-[#834DFB]">LIVE DATA</span>
              </div>

              {/* Weekly Concentric Progress Arc Visual */}
              <div className="flex flex-col items-center justify-center py-6 mb-6 bg-[#F5F3FF] rounded-2xl border border-[#E5DFF5]">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Ring 1: Progress */}
                    <circle cx="56" cy="56" r="44" className="stroke-slate-200 fill-none" strokeWidth="6" />
                    <circle cx="56" cy="56" r="44" className="stroke-[#834DFB] fill-none" strokeWidth="6" strokeDasharray="276" strokeDashoffset="75" strokeLinecap="round" />
                    
                    {/* Ring 2: Nested Progress */}
                    <circle cx="56" cy="56" r="32" className="stroke-slate-200 fill-none" strokeWidth="6" />
                    <circle cx="56" cy="56" r="32" className="stroke-[#F0E100] fill-none" strokeWidth="6" strokeDasharray="201" strokeDashoffset="40" strokeLinecap="round" stroke-linecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold text-[#18102B]">74%</span>
                    <span className="text-[8px] font-bold text-[#6B6577] uppercase tracking-wider">Avg Score</span>
                  </div>
                </div>
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
              <div className="flex gap-2.5 mt-8 border-t border-[#E5DFF5] pt-5">
                <button className="flex-1 bg-[#18102B] hover:bg-[#834DFB] text-white font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-colors">
                  View Roster
                </button>
                <button className="flex-1 border border-[#E5DFF5] hover:bg-slate-50 text-[#18102B] font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-colors">
                  + Add Chapter
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Step descriptions */}
          <div className="space-y-8">
            <span className="inline-block bg-[#F0E100] text-black text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">
              Start Teaching
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#18102B]">
              Start Teaching in 3 Easy Steps
            </h2>
            <p className="text-lg text-[#6B6577]">
              CourseForge is designed to remove the friction of content creation and administration. You build the content once, and direct it to multiple cohorts with ease.
            </p>

            <div className="space-y-6 pt-4">
              {[
                { step: 1, title: 'Create a Class & Get Key', desc: 'Create your digital classroom dashboard in seconds and share the unique join key with your student group once.' },
                { step: 2, title: 'Write or Link Chapters', desc: 'Write your customized lessons using our modular block editor, or search public repository chapters to instantly link them.' },
                { step: 3, title: 'Students Learn, You Track', desc: 'Students read, practice quizzes, and complete evaluations. All analytics report back to your private teacher roster automatically.' }
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#F0E100] text-[#18102B] font-extrabold flex items-center justify-center text-base border-2 border-[#18102B] shadow-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#18102B]">{item.title}</h4>
                    <p className="text-sm text-[#6B6577] mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. ROLE SPECIFIC FLOWS */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6">
            Two Sides, One Platform
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#18102B]">
            Built differently for <span className="text-[#834DFB]">teachers</span> and <span className="text-[#834DFB]">students</span>
          </h2>
          <p className="text-base text-[#6B6577] mt-4">
            Teachers get powerful authoring and roster control. Students get a distraction-free learning space with self-guided reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Teacher flow card */}
          <div className="bg-white rounded-[28px] p-8 md:p-10 border-2 border-[#E5DFF5] shadow-sm relative overflow-hidden group hover:border-[#834DFB] transition-colors duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F3FF] flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-[#834DFB]" />
            </div>
            
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#834DFB] bg-[#F5F3FF] px-3 py-1 rounded-full">
              For Teachers
            </span>
            <h3 className="text-2xl font-bold text-[#18102B] mt-4 mb-6">Your class, your way</h3>
            
            <ul className="space-y-4">
              {[
                'Create a class and get a shareable key in seconds',
                'Write original chapters or reuse public ones you trust',
                'Add practice quizzes, then unlock a final evaluation',
                'Watch your class-only analytics update in real time'
              ].map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[#6B6577] font-medium items-start">
                  <span className="w-2 h-2 rounded-full bg-[#834DFB] mt-2 flex-shrink-0"></span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Student flow card */}
          <div className="bg-white rounded-[28px] p-8 md:p-10 border-2 border-[#E5DFF5] shadow-sm relative overflow-hidden group hover:border-[#834DFB] transition-colors duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#FFFDF0] flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-[#FF6B35]" />
            </div>
            
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              For Students
            </span>
            <h3 className="text-2xl font-bold text-[#18102B] mt-4 mb-6">Learn at your pace</h3>
            
            <ul className="space-y-4">
              {[
                'Join one class, or several, using a simple join key',
                'Read public chapters anytime, no account creation required',
                'Practice with unlimited mid-chapter quizzes',
                'Track your own scores and attempt history over time'
              ].map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[#6B6577] font-medium items-start">
                  <span className="w-2 h-2 rounded-full bg-[#F0E100] border border-[#18102B] mt-2 flex-shrink-0"></span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* 6. COMPARISON TABLE */}
      <section id="compare" className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6">
            Why CourseForge
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#18102B]">
            How it's different from what you know
          </h2>
        </div>

        <div className="w-full overflow-x-auto rounded-[24px] border-2 border-[#E5DFF5] shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#18102B] text-white">
                <th className="p-5 text-xs font-bold uppercase tracking-wider">Capability</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider">Content Sites (GFG-style)</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider">Classroom Tools</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider bg-[#834DFB]">CourseForge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFF5] text-sm text-[#18102B] font-semibold">
              {[
                { cap: 'Public, reusable content', c1: 'Yes', c2: 'No', cf: 'Yes', highlight: false },
                { cap: 'Private, trackable classes', c1: 'No', c2: 'Yes', cf: 'Yes', highlight: false },
                { cap: 'Reuse another teacher\'s content', c1: 'No', c2: 'No', cf: 'Yes', highlight: false },
                { cap: 'Per-teacher analytics on shared content', c1: 'No', c2: 'No', cf: 'Yes', highlight: true },
                { cap: 'Students join multiple classes easily', c1: 'No', c2: 'Limited', cf: 'Yes', highlight: false }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-[#6B6577]">{row.cap}</td>
                  <td className={`p-5 ${row.c1 === 'Yes' ? 'text-[#834DFB] font-bold' : 'text-[#C7C1D6]'}`}>{row.c1}</td>
                  <td className={`p-5 ${row.c2 === 'Yes' ? 'text-[#834DFB] font-bold' : 'text-[#C7C1D6]'}`}>{row.c2}</td>
                  <td className={`p-5 bg-purple-50/50 ${row.cf === 'Yes' ? 'text-[#834DFB] font-bold' : 'text-[#C7C1D6]'} ${row.highlight ? 'bg-purple-50 font-bold border-x border-[#E5DFF5]' : ''}`}>
                    {row.cf}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. HOW IT WORKS & STATS GRID */}
      <section id="how-it-works" className="bg-white py-24 border-y border-[#E5DFF5] w-full px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* How it works grid */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6">
                Workflow
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#18102B]">
                From blank chapter to tracked results
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '📝', title: 'Write or Reuse', desc: 'Create original text content chapter by chapter with our rich editor, or link a public chapter someone else already wrote.' },
                { icon: '🔑', title: 'Share Your Key', desc: 'Students join your class once using the key — no re-joining needed as you add new chapters and assignments.' },
                { icon: '📊', title: 'Track Results', desc: 'Every quiz attempt is tied to your class, so your analytics stay accurate and secure even on shared content.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-[24px] p-8 border-2 border-[#E5DFF5] shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-2xl mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#18102B] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6B6577] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[#E5DFF5]">
            {counters.map((counter, idx) => {
              const statColors = [
                'bg-white border border-[#E5DFF5] text-[#18102B]',
                'bg-[#834DFB] text-white border border-transparent',
                'bg-[#F0E100] text-[#18102B] border border-transparent',
                'bg-[#18102B] text-white border border-transparent'
              ];
              return (
                <div key={idx} className={`${statColors[idx]} rounded-[20px] p-6 shadow-sm`}>
                  <div className="text-4xl font-extrabold tracking-tight">
                    {counter.target}{counter.suffix}
                  </div>
                  <div className="text-xs uppercase tracking-wider font-bold opacity-80 mt-2">
                    {counter.label}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#18102B]">
            Teachers already teaching smarter
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: 'I stopped rewriting the same chapter every term. I just reuse what\'s already public and my class scores stay completely separate and private.', author: 'R. Sharma', role: 'Physics Teacher', initial: 'RS' },
            { quote: 'My students join once with a key and I never have to resend it — even after I add five more chapters. It is remarkably frictionless.', author: 'A. Verma', role: 'Python Tutor', initial: 'AV' },
            { quote: 'The analytics only show my own students, which is exactly what I needed when using shared public curriculum chapters.', author: 'K. Iyer', role: 'School Coordinator', initial: 'KI' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[24px] p-8 border-2 border-[#E5DFF5] shadow-sm flex flex-col justify-between hover:border-[#834DFB] transition-colors duration-300">
              <p className="text-sm text-[#18102B] leading-relaxed font-semibold italic mb-8">
                "{item.quote}"
              </p>
              
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#F5F3FF]">
                <div className="w-10 h-10 rounded-full bg-[#834DFB] text-white font-bold flex items-center justify-center text-sm">
                  {item.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#18102B]">{item.author}</h4>
                  <p className="text-[11px] text-[#6B6577] font-semibold">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. PRICING & FAQ */}
      <section id="pricing" className="bg-white py-24 border-t border-[#E5DFF5] w-full px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Pricing header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6">
              Pricing Plans
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#18102B]">
              Free to start, upgrade anytime
            </h2>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            
            {/* Plan 1: Student */}
            <div className="bg-white border-2 border-[#E5DFF5] rounded-[24px] p-8 flex flex-col justify-between hover:border-[#834DFB] transition-colors duration-300">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#834DFB]">Student</span>
                <div className="text-4xl font-extrabold text-[#18102B] mt-4 mb-6">Free</div>
                
                <ul className="space-y-3.5 mb-8 text-sm text-[#6B6577] font-semibold">
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Join unlimited classes</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Read all public chapters</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Track your own scores</li>
                </ul>
              </div>
              <Link href="/signup">
                <button className="w-full border-2 border-[#834DFB] hover:bg-[#834DFB]/5 text-[#834DFB] font-bold text-sm py-3.5 rounded-full transition-colors">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Plan 2: Teacher (Highlighted) */}
            <div className="bg-[#18102B] text-white rounded-[24px] p-8 flex flex-col justify-between border border-transparent shadow-xl relative overflow-hidden">
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-[#F0E100] text-[#18102B] font-extrabold text-[9px] uppercase tracking-wider py-1 px-4 transform rotate-45 translate-x-4 translate-y-3">
                POPULAR
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F0E100]">Teacher</span>
                <div className="text-4xl font-extrabold mt-4 mb-2 flex items-baseline gap-1">
                  Free
                  <span className="text-xs font-medium text-slate-400">/ class</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">No credit card required.</p>
                
                <ul className="space-y-3.5 mb-8 text-sm text-slate-300 font-semibold">
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#F0E100]" /> Create unlimited classes</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#F0E100]" /> Reuse any public chapter</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#F0E100]" /> Full class-only analytics</li>
                </ul>
              </div>
              <Link href="/signup">
                <button className="w-full bg-[#F0E100] hover:bg-[#dcd000] text-[#18102B] font-extrabold text-sm py-3.5 rounded-full transition-colors shadow-lg shadow-[#F0E100]/20">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Plan 3: School */}
            <div className="bg-white border-2 border-[#E5DFF5] rounded-[24px] p-8 flex flex-col justify-between hover:border-[#834DFB] transition-colors duration-300">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#834DFB]">School</span>
                <div className="text-4xl font-extrabold text-[#18102B] mt-4 mb-6">Custom</div>
                
                <ul className="space-y-3.5 mb-8 text-sm text-[#6B6577] font-semibold">
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Multiple teachers, one org</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Dedicated support</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#834DFB]" /> Custom onboarding setup</li>
                </ul>
              </div>
              <Link href="/contact">
                <button className="w-full border-2 border-[#834DFB] hover:bg-[#834DFB]/5 text-[#834DFB] font-bold text-sm py-3.5 rounded-full transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>

          </div>

          {/* FAQ Accordion Section */}
          <div id="faq" className="max-w-4xl mx-auto border-t border-[#E5DFF5] pt-20">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6">
                FAQ
              </span>
              <h3 className="text-3xl font-bold text-[#18102B]">
                Common Questions
              </h3>
            </div>

            <div className="space-y-2">
              {[
                { q: 'Can students join more than one teacher\'s class?', a: 'Yes — a student can join multiple different teachers\' classes at the same time using different class keys, and their progress data is kept secure and tracked separately under each roster.' },
                { q: 'Can I edit a chapter I reused from another teacher?', a: 'No — only the original owner (author) can edit a chapter\'s core content blocks. Reused chapters linked into your class are read-only to preserve curriculum integrity.' },
                { q: 'Do students need an account to read public chapters?', a: 'No — public chapters are readable by anyone instantly with no registration required. An account is only needed to join a teacher\'s private class roster or attempt quizzes for grade-tracking.' },
                { q: 'What happens if a student runs out of quiz attempts?', a: 'On an evaluation-type final quiz, once attempts run out the student sees only their final score, not a review of past answers.' },
                { q: 'Is there a limit on how many classes I can create?', a: 'No — teachers can create as many classes as they need under the free tier, with no caps.' }
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-[#E5DFF5] py-4.5">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center text-left font-bold text-[#18102B] text-base md:text-lg hover:text-[#834DFB] transition-colors py-2 cursor-pointer focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#834DFB] transform transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-[#6B6577] leading-relaxed pt-2 pb-4 pr-6">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 10. RESOURCES / BLOG */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-3xl mb-16">
          <span className="inline-block bg-[#18102B] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-6">
            Resources
          </span>
          <h2 className="text-4xl font-extrabold text-[#18102B]">
            Guides to get the most out of CourseForge
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: 'GUIDE', title: 'Writing your first chapter', desc: 'A short walkthrough for new teachers setting up their first class and authoring modules.' },
            { tag: 'GUIDE', title: 'Reusing public content well', desc: 'How to search, find, and link high-quality chapters into your classroom roster instantly.' },
            { tag: 'TIPS', title: 'Reading your class analytics', desc: 'What each number and completion percentage on your teacher dashboard actually tells you.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[24px] overflow-hidden border-2 border-[#E5DFF5] shadow-sm hover:border-[#834DFB] transition-colors duration-300">
              <div className="h-32 bg-gradient-to-br from-[#834DFB] to-[#18102B]"></div>
              <div className="p-6">
                <span className="text-[10px] font-extrabold text-[#834DFB] tracking-wider uppercase bg-[#F5F3FF] px-2.5 py-1 rounded-md">
                  {item.tag}
                </span>
                <h4 className="text-base font-bold text-[#18102B] mt-4 mb-2">{item.title}</h4>
                <p className="text-xs text-[#6B6577] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24 w-full">
        <div className="bg-[#18102B] text-white rounded-[32px] p-10 md:p-16 text-center border border-[#2D2342] shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-[#834DFB]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight max-w-2xl mx-auto">
            Ready to teach without rewriting everything?
          </h2>
          <p className="text-[#A29CB0] text-sm md:text-base mb-10 max-w-md mx-auto">
            Create your first class, add a chapter, and share your key — setup takes less than five minutes.
          </p>

          <Link href="/signup">
            <button className="bg-[#F0E100] hover:bg-[#dcd000] text-[#18102B] font-extrabold text-base px-10 py-4.5 rounded-full transition-all duration-200 shadow-xl shadow-[#F0E100]/10 hover:scale-[1.02] active:scale-[0.98]">
              Get Started Free
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}
