import React from 'react';

export const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="neo-spinner" />
    </div>
  );
};

export default Loader;
