import React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hoverable = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'bg-[var(--color-surface)] rounded-[var(--radius)] border border-[var(--color-border)] shadow-sm transition-all duration-200 ease-out',
          hoverable && 'card-hover hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
