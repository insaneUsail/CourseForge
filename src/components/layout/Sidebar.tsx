'use client';
import React, { useState } from 'react';
import clsx from 'clsx';

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
        className="md:hidden fixed bottom-4 right-4 z-40 bg-[var(--color-primary)] text-white p-3 rounded-full shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={clsx(
        'fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-[var(--color-surface-alt)] border-r border-[var(--color-border)] z-30 transition-transform duration-300 ease-out flex flex-col',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}>
        
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
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
                      'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 min-h-[44px]',
                      isActive 
                        ? 'bg-[var(--color-surface)] border-l-4 border-l-[var(--color-primary)] text-[var(--color-foreground)] font-medium shadow-sm' 
                        : 'border-l-4 border-l-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)]'
                    )}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
                      {item.completed ? '✓' : index + 1}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        
        {footer && (
          <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-alt)]">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};
