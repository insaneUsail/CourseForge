import React from 'react';
import clsx from 'clsx';
import { Button } from '../ui/Button';
import { logoutAction } from '@/lib/actions/auth-actions';
import { ThemeToggle } from '../ui/ThemeToggle';

export interface NavbarProps {
  user?: {
    id: string;
    role: 'teacher' | 'student';
    name: string;
  } | null;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="bg-[var(--color-bg-dark)] border-b border-[var(--color-border)] sticky top-0 z-40 w-full h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold text-[var(--color-foreground)] flex items-center gap-1 min-h-[44px]">
            CourseForge
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] mt-1"></span>
          </a>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {user?.role === 'teacher' && (
            <>
              <a href="/teacher/dashboard" className="nav-link text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors font-medium min-h-[44px] flex items-center">My Classes</a>
              <a href="/teacher/browse" className="nav-link text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors font-medium min-h-[44px] flex items-center">Browse Public</a>
              <a href="/teacher/analytics" className="nav-link text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors font-medium min-h-[44px] flex items-center">Analytics</a>
            </>
          )}
          {user?.role === 'student' && (
            <>
              <a href="/student/dashboard" className="nav-link text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors font-medium min-h-[44px] flex items-center">My Classes</a>
              <a href="/student/history" className="nav-link text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors font-medium min-h-[44px] flex items-center">History</a>
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!user ? (
            <>
              <a href="/login" className="text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors font-medium text-sm md:text-base hidden sm:flex items-center min-h-[44px]">Log in</a>
              <Button variant="primary" size="sm">Get Started</Button>
            </>
          ) : (
            <>
              {user.role === 'teacher' && (
                <a href="/teacher/dashboard" className="hidden sm:inline-flex">
                  <Button variant="primary" size="sm">
                    Dashboard
                  </Button>
                </a>
              )}
              {user.role === 'student' && (
                <a href="/student/dashboard" className="hidden sm:inline-flex">
                  <Button variant="primary" size="sm">
                    Dashboard
                  </Button>
                </a>
              )}
              
              <form action={logoutAction} className="inline-flex items-center">
                <button type="submit" className="text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors font-medium text-sm md:text-base hidden sm:flex items-center min-h-[44px]">
                  Log out
                </button>
              </form>

              {/* User Avatar */}
              <div 
                className="w-9 h-9 rounded-full bg-[var(--color-primary)] border border-[var(--color-border)] flex items-center justify-center text-white min-w-[44px] ml-2 font-semibold shadow-sm"
                title={user.name}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            </>
          )}

          {/* Mobile Menu Trigger */}
          <button className="md:hidden text-[var(--color-foreground)] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
