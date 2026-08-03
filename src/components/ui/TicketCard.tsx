import React from 'react';
import clsx from 'clsx';

export type TicketColor = 'blue' | 'green' | 'yellow' | 'pink' | 'purple';

export interface TicketCardProps {
  color?: TicketColor;
  topLeftText?: React.ReactNode;
  topRightText?: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  statusBadge?: React.ReactNode;
  priceText?: string;
  children?: React.ReactNode;
  className?: string;
}

const headerColors: Record<TicketColor, string> = {
  blue: 'bg-indigo-500 text-white',
  green: 'bg-emerald-400 text-slate-900',
  yellow: 'bg-amber-300 text-slate-900',
  pink: 'bg-pink-400 text-slate-900',
  purple: 'bg-purple-500 text-white',
};

export const TicketCard: React.FC<TicketCardProps> = ({
  color = 'blue',
  topLeftText,
  topRightText,
  title,
  subtitle,
  statusBadge,
  priceText = 'Free',
  children,
  className
}) => {
  return (
    <div className={clsx('flex flex-col rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white border border-slate-100', className)}>
      {/* Header section */}
      <div className={clsx('px-6 py-4 flex justify-between items-center text-sm font-semibold', headerColors[color])}>
        <div>{topLeftText}</div>
        <div>{topRightText}</div>
      </div>
      
      {/* Body section */}
      <div className="p-6 flex flex-col flex-1 relative">
        {/* Notch effect (optional detail for ticket look) */}
        <div className="absolute -left-3 top-0 w-6 h-6 bg-[var(--color-background)] rounded-full -mt-3 shadow-inner hidden"></div>
        <div className="absolute -right-3 top-0 w-6 h-6 bg-[var(--color-background)] rounded-full -mt-3 shadow-inner hidden"></div>

        <div className="text-sm font-medium text-slate-400 mb-1">{subtitle}</div>
        
        <div className="flex justify-between items-start gap-4 mb-8">
          <h3 className="text-xl font-bold text-slate-800 leading-tight">{title}</h3>
          {statusBadge && (
            <div className="flex-shrink-0">
              {statusBadge}
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-100 border-dashed flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-900">{priceText}</div>
          <div className="flex items-center gap-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
