import React from 'react';
import clsx from 'clsx';

export type TicketColor = 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'orange' | 'teal' | 'navy';

export interface TicketCardProps {
  color?: TicketColor;
  topLeftText?: React.ReactNode;
  topRightText?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  statusBadge?: React.ReactNode;
  priceText?: string;
  children?: React.ReactNode;
  className?: string;
}

const headerColors: Record<TicketColor, string> = {
  blue: 'bg-[#22D3EE] text-[#18102B]',
  green: 'bg-[#C6FF3D] text-[#18102B]',
  yellow: 'bg-[#F0E100] text-[#18102B]',
  pink: 'bg-[#FF6B35] text-white',
  purple: 'bg-[#834DFB] text-white',
  orange: 'bg-[#FF6B35] text-white',
  teal: 'bg-[#C6FF3D] text-[#18102B]',
  navy: 'bg-[#18102B] text-white',
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
    <div className={clsx('flex flex-col rounded-2xl overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-white border-2 border-black relative', className)}>
      {/* Corner crosshairs for aesthetics */}
      <span className="absolute top-2 left-2 font-black text-black opacity-20 z-10 text-xs">+</span >
      <span className="absolute top-2 right-2 font-black text-black opacity-20 z-10 text-xs">+</span >

      {/* Header section */}
      <div className={clsx('px-4 md:px-6 py-4 flex justify-between items-center text-[10px] uppercase tracking-widest font-black border-b-2 border-black', headerColors[color])}>
        <div>{topLeftText}</div>
        <div>{topRightText}</div>
      </div>
      
      {/* Body section */}
      <div className="p-4 md:p-6 flex flex-col flex-1 relative bg-white">
        <div className="text-xs font-black uppercase tracking-widest text-[#6B6577] mb-2">{subtitle}</div>
        
        <div className="flex justify-between items-start gap-4 mb-4 md:mb-8">
          <h3 className="text-lg md:text-2xl font-black text-[#18102B] leading-tight tracking-tight">{title}</h3>
          {statusBadge && (
            <div className="flex-shrink-0">
              {statusBadge}
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t-2 border-black border-dashed flex justify-between items-center">
          <div className="text-xl font-black text-[#18102B] uppercase tracking-widest">{priceText}</div>
          <div className="flex items-center gap-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
