import React from 'react';
import clsx from 'clsx';

export interface ScorePillProps {
  score: number;
  total?: number;
  className?: string;
}

export const ScorePill: React.FC<ScorePillProps> = ({ score, total = 100, className }) => {
  const percentage = (score / total) * 100;
  
  const getColor = (val: number) => {
    if (val >= 80) return 'bg-[var(--color-success)] text-white';
    if (val >= 50) return 'bg-[var(--color-warning)] text-[var(--color-text)]';
    return 'bg-[var(--color-error)] text-white';
  };

  return (
    <div className={clsx('inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold', getColor(percentage), className)}>
      {score}{total === 100 ? '%' : `/${total}`}
    </div>
  );
};
