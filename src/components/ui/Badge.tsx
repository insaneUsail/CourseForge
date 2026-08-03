import React from 'react';
import clsx from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'public' | 'private' | 'success' | 'warning' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'public', className, children, ...props }) => {
  const variants = {
    public: 'bg-[var(--color-accent)] text-[var(--color-text)]',
    private: 'bg-[var(--color-bg-dark2)] text-white',
    success: 'bg-[var(--color-success)] text-white',
    warning: 'bg-[var(--color-warning)] text-[var(--color-text)]',
    error: 'bg-[var(--color-error)] text-white'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold badge-pulse',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
