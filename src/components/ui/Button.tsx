import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    
    const baseClasses = 'group relative overflow-hidden inline-flex items-center justify-center font-bold text-base border-2 border-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-transform duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none rounded-lg';
    
    const variants = {
      primary: 'bg-[#18102B] text-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-black',
      secondary: 'bg-white text-[#18102B] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-50',
      danger: 'bg-[#FF6B35] text-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#ff5511]',
      ghost: 'bg-transparent text-[#18102B] border-transparent hover:border-black shadow-none hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]'
    };

    const sizes = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-12 px-4 md:px-6 text-base',
      lg: 'h-14 px-4 md:px-8 text-lg'
    };

    return (
      <button
        ref={ref}
        className={clsx(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
