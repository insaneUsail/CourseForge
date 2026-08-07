import React from 'react';
import clsx from 'clsx';

export type PillColor = 'purple' | 'yellow' | 'dark' | 'light' | 'green' | 'blue' | 'pink' | 'orange' | 'teal' | 'navy';

export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: PillColor;
  icon?: React.ReactNode;
  label: string;
}

const colorStyles: Record<PillColor, string> = {
  purple: 'bg-indigo-500 hover:bg-indigo-600 text-white border-transparent',
  yellow: 'bg-amber-400 hover:bg-amber-500 text-slate-900 border-transparent',
  dark: 'bg-slate-900 hover:bg-slate-800 text-white border-transparent',
  light: 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200',
  green: 'bg-emerald-500 hover:bg-emerald-600 text-white border-transparent',
  blue: 'bg-blue-500 hover:bg-blue-600 text-white border-transparent',
  pink: 'bg-pink-500 hover:bg-pink-600 text-white border-transparent',
  orange: 'bg-[#FF6B35] hover:bg-[#E85A27] text-white border-transparent',
  teal: 'bg-[#00C9A7] hover:bg-[#00B396] text-white border-transparent',
  navy: 'bg-[#0A1628] hover:bg-[#1a2a42] text-white border-transparent',
};

export const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ className, color = 'dark', icon, label, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-full font-bold text-sm transition-transform border shadow-sm hover:shadow active:scale-95',
          colorStyles[color],
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">{icon}</span>}
        <span>{label}</span>
      </button>
    );
  }
);

PillButton.displayName = 'PillButton';
