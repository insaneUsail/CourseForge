import React, { useId } from 'react';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={clsx(
            'bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#834DFB] focus:border-transparent min-h-[48px] placeholder:text-gray-400',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs font-semibold text-red-500 mt-1">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
