import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-out focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-[#18102B] text-white hover:bg-black hover:shadow-md active:scale-[0.98] focus:ring-2 focus:ring-offset-2 focus:ring-[#18102B]',
      secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[0.98]',
      danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.98]'
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm min-w-[44px]',
      md: 'h-11 px-6 text-base min-w-[44px]',
      lg: 'h-14 px-8 text-lg min-w-[44px]'
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
