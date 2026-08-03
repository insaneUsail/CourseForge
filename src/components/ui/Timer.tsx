'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export interface TimerProps {
  totalSeconds: number;
  onTimeUp?: () => void;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ totalSeconds, onTimeUp, className }) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isDanger = timeLeft < 60;

  return (
    <div className={clsx(
      'inline-flex items-center gap-2 bg-[var(--color-surface-alt)] rounded-full px-4 py-2 font-mono font-medium',
      isDanger ? 'text-[var(--color-error)]' : 'text-[var(--color-text)]',
      className
    )}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};
