'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import clsx from 'clsx';

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  user: {
    id: string;
    role: 'teacher' | 'student';
    name: string;
  };
}

export const DashboardLayoutWrapper: React.FC<DashboardLayoutWrapperProps> = ({ children, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <DashboardSidebar 
        user={user} 
        isCollapsed={isCollapsed} 
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)} 
      />
      
      {/* Main Content Area */}
      <main 
        className={clsx(
          "flex-1 w-full pb-20 md:pb-0 transition-all duration-300 ease-in-out",
          isCollapsed ? "md:ml-20" : "md:ml-64"
        )}
      >
        <div className="w-full h-full p-4 md:p-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav user={user} />
    </div>
  );
};
