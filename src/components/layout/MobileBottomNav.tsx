'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { 
  LayoutDashboard, 
  History, 
  BarChart3, 
  Globe,
  LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';

export interface MobileBottomNavProps {
  user: {
    role: 'teacher' | 'student';
  };
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ user }) => {
  const pathname = usePathname();

  const teacherLinks = [
    { href: '/teacher/dashboard', label: 'Classes', icon: LayoutDashboard },
    { href: '/teacher/browse', label: 'Browse', icon: Globe },
    { href: '/teacher/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const studentLinks = [
    { href: '/student/dashboard', label: 'Classes', icon: LayoutDashboard },
    { href: '/student/history', label: 'History', icon: History },
  ];

  const links = user.role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-black shadow-[0px_-4px_0px_rgba(0,0,0,1)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const isDashboard = link.href === '/teacher/dashboard' || link.href === '/student/dashboard';
          let isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          
          if (isDashboard) {
            const role = user.role === 'teacher' ? '/teacher' : '/student';
            isActive = pathname === link.href || pathname.startsWith(`${role}/classes`) || pathname.startsWith(`${role}/chapters`);
          }
          
          const Icon = link.icon;
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={clsx(
                "flex-1 flex flex-col items-center justify-center pt-3 pb-4 gap-1 transition-colors relative",
                isActive ? "text-[#18102B]" : "text-[#18102B]/60 hover:text-[#18102B]"
              )}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-[#C6FF3D] rounded-b-md border-x-2 border-b-2 border-black shadow-sm"></div>
              )}
              <Icon 
                className={clsx(
                  "w-6 h-6 transition-transform duration-200", 
                  isActive ? "scale-110" : "scale-100"
                )} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              <span className={clsx(
                "text-[9px] font-black uppercase tracking-wider mt-1",
                isActive ? "text-[#18102B]" : ""
              )}>
                {link.label}
              </span>
            </Link>
          );
        })}
        
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex-1 flex flex-col items-center justify-center pt-3 pb-4 gap-1 transition-colors relative text-[#18102B]/60 hover:text-[#FF6B35]"
        >
          <LogOut className="w-6 h-6 transition-transform duration-200 scale-100" strokeWidth={2} />
          <span className="text-[9px] font-black uppercase tracking-wider mt-1">
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
};
