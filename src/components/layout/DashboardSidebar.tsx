'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { logoutAction } from '@/lib/actions/auth-actions';
import { 
  LayoutDashboard, 
  History, 
  BarChart3, 
  Globe, 
  LogOut,
  FolderOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export interface DashboardSidebarProps {
  user: {
    id: string;
    role: 'teacher' | 'student';
    name: string;
  };
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user, isCollapsed = false, onToggleCollapse }) => {
  const pathname = usePathname();

  const teacherLinks = [
    { href: '/teacher/dashboard', label: 'My Classes', icon: FolderOpen },
    { href: '/teacher/browse', label: 'Browse Public', icon: Globe },
    { href: '/teacher/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const studentLinks = [
    { href: '/student/dashboard', label: 'My Classes', icon: FolderOpen },
    { href: '/student/history', label: 'History', icon: History },
  ];

  const links = user.role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <aside 
      className={clsx(
        "hidden md:flex h-screen bg-white border-r-2 border-black flex-col fixed left-0 top-0 z-40 overflow-y-auto shadow-[4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand */}
      <div className={clsx(
        "p-4 border-b-2 border-black flex items-center bg-[#C6FF3D] transition-all duration-300",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <Link href="/" className="text-lg font-black text-[#18102B] flex items-center gap-2 tracking-tighter uppercase">
            <div className="w-8 h-8 bg-[#18102B] border-2 border-black rounded-sm flex items-center justify-center font-black text-lg text-[#C6FF3D] shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              CF
            </div>
            CourseForge
          </Link>
        )}
        {isCollapsed && (
          <Link href="/" className="w-8 h-8 bg-[#18102B] border-2 border-black rounded-sm flex items-center justify-center font-black text-lg text-[#C6FF3D] shadow-[2px_2px_0px_rgba(0,0,0,1)] shrink-0">
            CF
          </Link>
        )}
      </div>

      {/* User Profile Snippet */}
      <div className={clsx(
        "p-4 border-b-2 border-black bg-[#18102B] text-white transition-all duration-300",
        isCollapsed ? "flex justify-center" : ""
      )}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-[#834DFB] border-2 border-black text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {user.name.charAt(0).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h3 className="font-black text-white leading-none mb-1 truncate text-sm uppercase">{user.name}</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C6FF3D]">
                {user.role}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-2">
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
                "group relative overflow-hidden flex items-center rounded-lg font-black uppercase tracking-wider transition-transform duration-200 border-2 border-transparent",
                isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
                isActive 
                  ? "bg-[#C6FF3D] border-black text-[#18102B] shadow-[3px_3px_0px_rgba(0,0,0,1)] translate-x-1" 
                  : "text-[#18102B] hover:border-black hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
              )}
              title={isCollapsed ? link.label : undefined}
            >
              {!isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#F0E100] transition-transform duration-300 ease-out group-hover:w-full z-0"></div>
              )}
              <div className="relative z-10 flex items-center gap-3">
                <Icon className={clsx("w-5 h-5", isActive ? "text-[#18102B]" : "text-[#18102B]")} strokeWidth={2.5} />
                {!isCollapsed && <span className="text-[11px]">{link.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      {onToggleCollapse && (
        <div className="px-4 py-2 border-t-2 border-black bg-slate-50 flex justify-end">
          <button 
            onClick={onToggleCollapse}
            className={clsx(
              "p-2 border-2 border-black rounded bg-white hover:bg-[#F0E100] transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none",
              isCollapsed && "mx-auto"
            )}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" strokeWidth={3} /> : <ChevronLeft className="w-4 h-4" strokeWidth={3} />}
          </button>
        </div>
      )}

      {/* Footer / Logout */}
      <div className="p-4 border-t-2 border-black bg-white">
        <form action={logoutAction}>
          <button 
            type="submit" 
            title={isCollapsed ? "Log out" : undefined}
            className={clsx(
              "w-full group relative overflow-hidden flex items-center justify-center border-2 border-black rounded-lg font-black uppercase tracking-wider text-[#18102B] hover:text-white transition-colors duration-200 shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
              isCollapsed ? "p-3" : "gap-2 px-4 py-3"
            )}
          >
            <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#FF6B35] transition-transform duration-300 ease-out group-hover:w-full z-0"></div>
            <div className="relative z-10 flex items-center gap-2">
              <LogOut className="w-5 h-5" strokeWidth={2.5} />
              {!isCollapsed && <span className="text-[11px]">Log out</span>}
            </div>
          </button>
        </form>
      </div>
    </aside>
  );
};
