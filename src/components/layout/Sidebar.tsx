'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  completed?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  activeId?: string;
  onSelect: (id: string) => void;
  footer?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, activeId, onSelect, footer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed bottom-24 right-6 z-40 bg-[#C6FF3D] text-[#18102B] p-3 rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] border-2 border-black min-w-[56px] min-h-[56px] flex items-center justify-center hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-8 h-8" strokeWidth={3} /> : <Menu className="w-8 h-8" strokeWidth={3} />}
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-[#18102B]/80 z-30 transition-opacity backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={clsx(
        'fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-[#F5F3FF] border-r-4 border-black z-30 transition-transform duration-300 ease-out flex flex-col',
        isOpen ? 'translate-x-0 shadow-[8px_0px_0px_rgba(0,0,0,1)]' : '-translate-x-full md:translate-x-0 md:shadow-[4px_0px_0px_rgba(0,0,0,1)]'
      )}>
        
        <div className="flex-1 overflow-y-auto py-3 md:py-6 px-4">
          <ul className="space-y-3">
            {items.map((item, index) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onSelect(item.id);
                      setIsOpen(false);
                    }}
                    className={clsx(
                      'w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-transform duration-200 min-h-[44px] border-2 border-black',
                      isActive 
                        ? 'bg-[#18102B] text-white shadow-[4px_4px_0px_rgba(198,255,61,1)]' 
                        : 'bg-white text-[#18102B] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]'
                    )}
                  >
                    <span className={clsx(
                      "flex-shrink-0 w-8 h-8 rounded border-2 flex items-center justify-center text-sm font-black",
                      isActive ? "border-[#C6FF3D] bg-[#18102B] text-[#C6FF3D]" : "border-black bg-white text-[#18102B]"
                    )}>
                      {item.completed ? '✓' : index + 1}
                    </span>
                    <span className="truncate font-black tracking-wide text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        
        {footer && (
          <div className="p-4 border-t-4 border-black bg-[#C6FF3D] text-[#18102B] font-black uppercase tracking-widest text-xs text-center">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};
