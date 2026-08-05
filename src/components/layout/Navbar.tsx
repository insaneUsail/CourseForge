'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { logoutAction } from '@/lib/actions/auth-actions';
import { LayoutDashboard, Globe, BarChart3, History, Menu, X } from 'lucide-react';

export interface NavbarProps {
  user?: {
    id: string;
    role: 'teacher' | 'student';
    name: string;
  } | null;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy Logic for public landing page
      if (!user) {
        const sections = ['home', 'features', 'how-it-works', 'pricing'];
        let current = 'home';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the top of the section is above the middle of the screen (or close to it)
            if (rect.top <= window.innerHeight / 3) {
              current = section;
            }
          }
        }
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initialize immediately
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'Workflow' },
    { id: 'pricing', label: 'Pricing' }
  ];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4 pointer-events-none">
        <nav 
          className={clsx(
            'pointer-events-auto transition-all duration-300 flex items-center justify-between rounded-full',
            scrolled 
              ? 'bg-white/40 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-white/30 px-3 py-2.5 w-full max-w-5xl' 
              : 'bg-white/20 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 px-3 py-3 w-full max-w-6xl'
          )}
        >
          
          {/* Logo (Left) */}
          <Link href="/" className="pl-4 text-xl font-extrabold text-[#18102B] flex items-center gap-1.5 hidden sm:flex tracking-tight hover:opacity-80 transition-opacity">
            CourseForge
          </Link>
          
          {/* Mobile Logo */}
          <Link href="/" className="pl-3 text-lg font-extrabold text-[#18102B] sm:hidden tracking-tight flex items-center">
            Course<span className="animate-sway inline-block text-[#834DFB] origin-bottom-left ml-0.5">Forge</span>
          </Link>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              user.role === 'teacher' ? (
                <>
                  <Link href="/teacher/dashboard" className="bg-[#B4F481] text-[#18102B] font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-all hover:shadow-md border border-black/10">
                    <LayoutDashboard className="w-4 h-4" /> My Classes
                  </Link>
                  <Link href="/teacher/browse" className="text-[#18102B] hover:bg-white/50 font-bold px-4 py-2 rounded-full transition-colors flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Browse
                  </Link>
                  <Link href="/teacher/analytics" className="text-[#18102B] hover:bg-white/50 font-bold px-4 py-2 rounded-full transition-colors flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Analytics
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/student/dashboard" className="bg-[#B4F481] text-[#18102B] font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-all hover:shadow-md border border-black/10">
                    <LayoutDashboard className="w-4 h-4" /> My Classes
                  </Link>
                  <Link href="/student/history" className="text-[#18102B] hover:bg-white/50 font-bold px-4 py-2 rounded-full transition-colors flex items-center gap-2">
                    <History className="w-4 h-4" /> History
                  </Link>
                </>
              )
            ) : (
              <>
                {navLinks.map((link) => (
                  <a 
                    key={link.id}
                    href={`#${link.id}`} 
                    onClick={(e) => scrollTo(e, link.id)}
                    className={clsx(
                      "font-bold px-5 py-2 rounded-full transition-all flex items-center gap-2",
                      activeSection === link.id 
                        ? "bg-[#18102B] text-white shadow-md border border-black/10 scale-105" 
                        : "text-[#18102B]/80 hover:text-[#18102B] hover:bg-white/40"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 pr-1">
            {!user ? (
              <>
                <Link href="/login" className="text-sm font-bold text-[#18102B]/80 hover:text-[#18102B] hover:bg-white/40 px-4 py-2 rounded-full hidden md:block transition-colors">
                  Log in
                </Link>
                <Link href="/signup" className="bg-[#18102B] text-[#C6FF3D] px-4 md:px-6 py-2.5 rounded-full text-sm font-black hover:bg-black transition-colors shadow-md hidden sm:block border-2 border-black">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <form action={logoutAction} className="inline-flex items-center">
                  <button type="submit" className="text-sm font-bold text-[#18102B]/80 hover:text-[#18102B] hover:bg-white/40 px-3 py-2 rounded-full hidden md:block transition-colors cursor-pointer">
                    Log out
                  </button>
                </form>

                {/* User Avatar */}
                <div 
                  className="w-9 h-9 rounded-full bg-[#18102B] text-white flex items-center justify-center font-bold shadow-md cursor-pointer ml-2 border-2 border-black"
                  title={user.name}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </>
            )}

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#18102B] p-2 ml-1 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-black/5 focus:outline-none transition-colors bg-white/50 border border-white/50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Overlay & Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Sidebar Drawer */}
          <div className="relative w-[85%] max-w-sm h-full bg-[#18102B] border-l-4 border-black pt-28 px-4 md:px-8 pb-10 flex flex-col gap-3 md:gap-6 overflow-y-auto animate-slide-in-right shadow-[-12px_0px_0px_rgba(198,255,61,1)]">
            
            <div className="flex flex-col gap-3 md:gap-6 text-right items-end flex-1">
              {user ? (
                user.role === 'teacher' ? (
                  <>
                    <Link href="/teacher/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#C6FF3D] font-black text-lg md:text-2xl py-3 flex items-center justify-end gap-4 w-full transition-colors">
                      My Classes <LayoutDashboard className="w-7 h-7 text-[#C6FF3D]" />
                    </Link>
                    <Link href="/teacher/browse" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#C6FF3D] font-black text-lg md:text-2xl py-3 flex items-center justify-end gap-4 w-full transition-colors">
                      Browse Public <Globe className="w-7 h-7 text-[#C6FF3D]" />
                    </Link>
                    <Link href="/teacher/analytics" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#C6FF3D] font-black text-lg md:text-2xl py-3 flex items-center justify-end gap-4 w-full transition-colors">
                      Analytics <BarChart3 className="w-7 h-7 text-[#C6FF3D]" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/student/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#C6FF3D] font-black text-lg md:text-2xl py-3 flex items-center justify-end gap-4 w-full transition-colors">
                      My Classes <LayoutDashboard className="w-7 h-7 text-[#C6FF3D]" />
                    </Link>
                    <Link href="/student/history" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#C6FF3D] font-black text-lg md:text-2xl py-3 flex items-center justify-end gap-4 w-full transition-colors">
                      History <History className="w-7 h-7 text-[#C6FF3D]" />
                    </Link>
                  </>
                )
              ) : (
                <>
                  {navLinks.map((link) => (
                    <a 
                      key={link.id}
                      href={`#${link.id}`} 
                      onClick={(e) => scrollTo(e, link.id)} 
                      className={clsx(
                        "font-black text-xl md:text-3xl py-2 w-full text-right transition-colors",
                        activeSection === link.id ? "text-[#C6FF3D]" : "text-white/80 hover:text-white"
                      )}
                    >
                      {link.label}
                    </a>
                  ))}
                </>
              )}
            </div>

            <div className="border-t-2 border-white/20 pt-8 mt-4 flex flex-col gap-4">
              {!user ? (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-[#18102B] bg-white border-2 border-black font-black text-center py-4 rounded-xl text-xl shadow-[4px_4px_0px_rgba(198,255,61,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                    Log in
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="text-[#18102B] bg-[#C6FF3D] border-2 border-black font-black text-center py-4 rounded-xl text-xl shadow-[4px_4px_0px_rgba(255,107,53,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                    Get Started
                  </Link>
                </>
              ) : (
                <form action={logoutAction} className="w-full">
                  <button type="submit" onClick={() => setMobileMenuOpen(false)} className="w-full text-white bg-[#FF6B35] border-2 border-black font-black text-center py-4 rounded-xl text-xl cursor-pointer shadow-[4px_4px_0px_rgba(240,225,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all hover:bg-[#e85a25]">
                    Log out
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

