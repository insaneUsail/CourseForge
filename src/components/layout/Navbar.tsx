'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { PillButton } from '../ui/PillButton';
import { logoutAction } from '@/lib/actions/auth-actions';
import { LayoutDashboard, Globe, BarChart3, History, ArrowRight, Menu, X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={clsx(
      'sticky top-0 z-50 w-full h-20 transition-all duration-300 border-b',
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-sm border-[#E5DFF5]' 
        : 'bg-[#F5F3FF]/90 backdrop-blur-sm border-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-extrabold text-[#834DFB] flex items-center gap-1.5 min-h-[44px]">
            CourseForge
            <span className="w-2.5 h-2.5 rounded-full bg-[#F0E100] border border-[#834DFB] mt-1.5 animate-pulse"></span>
          </Link>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            user.role === 'teacher' ? (
              <>
                <Link href="/teacher/dashboard" className="nav-link text-[#18102B] hover:text-[#834DFB] transition-colors font-semibold min-h-[44px] flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-[#834DFB]" /> My Classes
                </Link>
                <Link href="/teacher/browse" className="nav-link text-[#6B6577] hover:text-[#18102B] transition-colors font-semibold min-h-[44px] flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#834DFB]" /> Browse Public
                </Link>
                <Link href="/teacher/analytics" className="nav-link text-[#6B6577] hover:text-[#18102B] transition-colors font-semibold min-h-[44px] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#834DFB]" /> Analytics
                </Link>
              </>
            ) : (
              <>
                <Link href="/student/dashboard" className="nav-link text-[#18102B] hover:text-[#834DFB] transition-colors font-semibold min-h-[44px] flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-[#834DFB]" /> My Classes
                </Link>
                <Link href="/student/history" className="nav-link text-[#6B6577] hover:text-[#18102B] transition-colors font-semibold min-h-[44px] flex items-center gap-2">
                  <History className="w-4 h-4 text-[#834DFB]" /> History
                </Link>
              </>
            )
          ) : (
            <>
              <a href="#features" className="text-[#6B6577] hover:text-[#834DFB] font-semibold transition-colors">Features</a>
              <a href="#how-it-works" className="text-[#6B6577] hover:text-[#834DFB] font-semibold transition-colors">How It Works</a>
              <a href="#compare" className="text-[#6B6577] hover:text-[#834DFB] font-semibold transition-colors">Why CourseForge</a>
              <a href="#pricing" className="text-[#6B6577] hover:text-[#834DFB] font-semibold transition-colors">Pricing</a>
              <a href="#faq" className="text-[#6B6577] hover:text-[#834DFB] font-semibold transition-colors">FAQ</a>
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login" className="text-[#18102B] hover:text-[#834DFB] transition-colors font-bold text-sm md:text-base hidden sm:flex items-center min-h-[44px]">
                Log in
              </Link>
              <Link href="/signup">
                <PillButton label="Get Started" color="purple" icon={<ArrowRight />} className="text-sm px-5 py-2.5 shadow-md shadow-[#834DFB]/20" />
              </Link>
            </>
          ) : (
            <>
              {user.role === 'teacher' && (
                <Link href="/teacher/dashboard" className="hidden sm:inline-flex">
                  <PillButton label="Dashboard" color="navy" className="text-sm px-5 py-2.5 shadow-sm" />
                </Link>
              )}
              {user.role === 'student' && (
                <Link href="/student/dashboard" className="hidden sm:inline-flex">
                  <PillButton label="Dashboard" color="navy" className="text-sm px-5 py-2.5 shadow-sm" />
                </Link>
              )}
              
              <form action={logoutAction} className="inline-flex items-center">
                <button type="submit" className="text-[#6B6577] hover:text-[#18102B] transition-colors font-bold text-sm md:text-base hidden sm:flex items-center min-h-[44px] cursor-pointer">
                  Log out
                </button>
              </form>

              {/* User Avatar */}
              <div 
                className="w-10 h-10 rounded-full bg-[#834DFB] border-2 border-[#E5DFF5] flex items-center justify-center text-white min-w-[40px] font-bold shadow-sm"
                title={user.name}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            </>
          )}

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#18102B] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-[#E5DFF5] shadow-lg py-6 px-6 z-50 flex flex-col gap-4 animate-fade-in">
          {user ? (
            user.role === 'teacher' ? (
              <>
                <Link href="/teacher/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-[#18102B] hover:text-[#834DFB] font-bold text-lg py-2 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-[#834DFB]" /> My Classes
                </Link>
                <Link href="/teacher/browse" onClick={() => setMobileMenuOpen(false)} className="text-[#18102B] hover:text-[#834DFB] font-bold text-lg py-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#834DFB]" /> Browse Public
                </Link>
                <Link href="/teacher/analytics" onClick={() => setMobileMenuOpen(false)} className="text-[#18102B] hover:text-[#834DFB] font-bold text-lg py-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#834DFB]" /> Analytics
                </Link>
              </>
            ) : (
              <>
                <Link href="/student/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-[#18102B] hover:text-[#834DFB] font-bold text-lg py-2 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-[#834DFB]" /> My Classes
                </Link>
                <Link href="/student/history" onClick={() => setMobileMenuOpen(false)} className="text-[#18102B] hover:text-[#834DFB] font-bold text-lg py-2 flex items-center gap-2">
                  <History className="w-5 h-5 text-[#834DFB]" /> History
                </Link>
              </>
            )
          ) : (
            <>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[#6B6577] hover:text-[#18102B] font-bold text-lg py-2">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-[#6B6577] hover:text-[#18102B] font-bold text-lg py-2">How It Works</a>
              <a href="#compare" onClick={() => setMobileMenuOpen(false)} className="text-[#6B6577] hover:text-[#18102B] font-bold text-lg py-2">Why CourseForge</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-[#6B6577] hover:text-[#18102B] font-bold text-lg py-2">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-[#6B6577] hover:text-[#18102B] font-bold text-lg py-2">FAQ</a>
            </>
          )}

          <div className="border-t border-[#E5DFF5] pt-4 mt-2 flex flex-col gap-4">
            {!user ? (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-[#18102B] hover:text-[#834DFB] font-bold text-center py-2.5">
                  Log in
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <PillButton label="Get Started" color="purple" icon={<ArrowRight />} className="w-full text-center" />
                </Link>
              </>
            ) : (
              <form action={logoutAction} className="w-full">
                <button type="submit" onClick={() => setMobileMenuOpen(false)} className="w-full text-[#6B6577] hover:text-[#18102B] font-bold text-center py-2.5 border border-[#E5DFF5] rounded-full cursor-pointer">
                  Log out
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
