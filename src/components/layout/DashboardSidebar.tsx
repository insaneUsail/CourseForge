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
  FolderOpen
} from 'lucide-react';

export interface DashboardSidebarProps {
  user: {
    id: string;
    role: 'teacher' | 'student';
    name: string;
  };
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
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
    <aside className="w-64 h-screen bg-[#FDFDFD] border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40 overflow-y-auto">
      {/* Brand */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-center">
        <Link href="/" className="text-2xl font-black text-[#18102B] flex items-center gap-2 tracking-tight">
          <div className="w-8 h-8 bg-[#C6FF3D] rounded flex items-center justify-center font-bold text-lg text-[#18102B]">
            C
          </div>
          CourseForge
        </Link>
      </div>

      {/* User Profile Snippet */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#18102B] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h3 className="font-semibold text-gray-900 leading-none mb-1 truncate text-sm">{user.name}</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          const Icon = link.icon;
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 group",
                isActive 
                  ? "bg-[#C6FF3D]/20 text-[#18102B]" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive ? "text-[#18102B]" : "text-gray-400 group-hover:text-gray-600")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm tracking-wide">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-200 bg-[#FDFDFD]">
        <form action={logoutAction}>
          <button type="submit" className="w-full flex items-center gap-2 px-4 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5" strokeWidth={2} />
            <span className="text-sm tracking-wide">Log out</span>
          </button>
        </form>
      </div>
    </aside>
  );
};
