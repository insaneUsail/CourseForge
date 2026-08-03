'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, className, showLabel }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(Math.min(Math.max(value, 0), 100));
    }, 50);
    return () => clearTimeout(timer);
  }, [value]);

  const getColor = (val: number) => {
    if (val >= 80) return 'bg-[var(--color-success)]';
    if (val >= 50) return 'bg-[var(--color-warning)]';
    return 'bg-[var(--color-error)]';
  };

  return (
    <div className={clsx('w-full flex items-center gap-2', className)}>
      <div className="flex-1 h-2 bg-[var(--color-surface-alt)] rounded-full overflow-hidden">
        <div
          className={clsx('h-full transition-all duration-500 ease-out progress-fill', getColor(width))}
          style={{ width: `${width}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[var(--color-text-muted)] w-8 text-right">
          {Math.round(value)}%
        </span>
      )}
    </div>
  );
};
