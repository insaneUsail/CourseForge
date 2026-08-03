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
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={clsx(
            'bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-3 py-2 text-[var(--color-text)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent min-h-[44px]',
            error && 'border-[var(--color-error)] focus:ring-[var(--color-error)]',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-sm text-[var(--color-error)] mt-1">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
