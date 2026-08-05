import React from 'react';

// Common SVG Filters for Glow and Drop Shadows
const Defs = () => (
  <defs>
    <filter id="glow-neon" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="glow-large" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
    </filter>
    <filter id="glass-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
    </filter>

    <linearGradient id="grad-purple-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#c084fc" />
      <stop offset="100%" stopColor="#22d3ee" />
    </linearGradient>
    <linearGradient id="grad-pink-orange" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#f472b6" />
      <stop offset="100%" stopColor="#fb923c" />
    </linearGradient>
    <linearGradient id="grad-green-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#34d399" />
      <stop offset="100%" stopColor="#3b82f6" />
    </linearGradient>
    <linearGradient id="grad-glass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
    </linearGradient>
  </defs>
);

export const IconDocument3D = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <Defs />
    {/* Base Paper */}
    <rect x="14" y="10" width="36" height="46" rx="4" fill="url(#grad-glass)" stroke="url(#grad-purple-cyan)" strokeWidth="1.5" filter="url(#glass-shadow)" />
    {/* Folded Corner */}
    <path d="M50 22L38 22L38 10Z" fill="url(#grad-purple-cyan)" filter="url(#drop-shadow)" />
    {/* Lines */}
    <rect x="22" y="26" width="20" height="3" rx="1.5" fill="url(#grad-purple-cyan)" />
    <rect x="22" y="34" width="14" height="3" rx="1.5" fill="url(#grad-purple-cyan)" opacity="0.7" />
    <rect x="22" y="42" width="22" height="3" rx="1.5" fill="url(#grad-purple-cyan)" opacity="0.4" />
    {/* Glowing floating dot */}
    <circle cx="48" cy="46" r="4" fill="#22d3ee" filter="url(#glow-neon)" />
  </svg>
);

export const IconKey3D = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <Defs />
    {/* Ring */}
    <circle cx="20" cy="32" r="10" stroke="url(#grad-green-blue)" strokeWidth="4" filter="url(#glow-neon)" />
    <circle cx="20" cy="32" r="5" fill="url(#grad-glass)" />
    {/* Shaft */}
    <rect x="30" y="30" width="24" height="4" rx="2" fill="url(#grad-green-blue)" filter="url(#drop-shadow)" />
    {/* Teeth */}
    <rect x="42" y="34" width="4" height="8" rx="1" fill="url(#grad-green-blue)" />
    <rect x="48" y="34" width="4" height="6" rx="1" fill="url(#grad-green-blue)" />
    {/* Highlight dot */}
    <circle cx="20" cy="32" r="2" fill="#fff" />
  </svg>
);

export const IconChart3D = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <Defs />
    {/* Glass Backboard */}
    <rect x="8" y="14" width="48" height="36" rx="6" fill="url(#grad-glass)" stroke="url(#grad-pink-orange)" strokeWidth="1" filter="url(#glass-shadow)" />
    {/* Bars */}
    <rect x="16" y="34" width="6" height="10" rx="2" fill="url(#grad-pink-orange)" opacity="0.6" />
    <rect x="28" y="24" width="6" height="20" rx="2" fill="url(#grad-pink-orange)" opacity="0.8" />
    <rect x="40" y="18" width="6" height="26" rx="2" fill="url(#grad-pink-orange)" filter="url(#glow-neon)" />
    {/* Line */}
    <path d="M12 36L26 22L36 28L48 14" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#drop-shadow)" />
    <circle cx="48" cy="14" r="3" fill="#fff" filter="url(#glow-neon)" />
  </svg>
);

export const IconTarget3D = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <Defs />
    <circle cx="32" cy="32" r="22" fill="url(#grad-glass)" stroke="url(#grad-pink-orange)" strokeWidth="2" filter="url(#glass-shadow)" />
    <circle cx="32" cy="32" r="12" stroke="url(#grad-pink-orange)" strokeWidth="3" opacity="0.8" />
    <circle cx="32" cy="32" r="4" fill="#f472b6" filter="url(#glow-neon)" />
    <path d="M42 22L60 4" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" filter="url(#glow-neon)" />
    <path d="M60 4L52 4M60 4L60 12" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Abstract Background/Decoration Elements
export const AbstractSphere = ({ className = "w-12 md:w-24 h-12 md:h-24" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <Defs />
    <circle cx="50" cy="50" r="40" fill="url(#grad-purple-cyan)" filter="url(#glow-large)" opacity="0.4" />
    <circle cx="40" cy="40" r="20" fill="url(#grad-glass)" filter="url(#drop-shadow)" />
    <circle cx="65" cy="30" r="5" fill="#fff" filter="url(#glow-neon)" />
  </svg>
);

export const AbstractRing = ({ className = "w-12 md:w-24 h-12 md:h-24" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <Defs />
    <circle cx="50" cy="50" r="35" stroke="url(#grad-green-blue)" strokeWidth="6" strokeDasharray="10 5" filter="url(#glow-large)" opacity="0.6" />
    <circle cx="50" cy="50" r="25" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
    <circle cx="20" cy="20" r="4" fill="#34d399" filter="url(#glow-neon)" />
    <circle cx="80" cy="80" r="3" fill="#3b82f6" filter="url(#glow-neon)" />
  </svg>
);

export const AbstractCube = ({ className = "w-12 md:w-24 h-12 md:h-24" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <Defs />
    <path d="M50 20L75 35L50 50L25 35L50 20Z" fill="url(#grad-pink-orange)" opacity="0.8" filter="url(#glow-neon)" />
    <path d="M25 35V65L50 80V50L25 35Z" fill="url(#grad-pink-orange)" opacity="0.5" />
    <path d="M75 35V65L50 80V50L75 35Z" fill="url(#grad-pink-orange)" opacity="0.3" />
    <circle cx="50" cy="20" r="4" fill="#ffffff" filter="url(#glow-neon)" />
  </svg>
);

export const IconQuote3D = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <Defs />
    <path d="M20 20C24 20 26 22 26 26C26 32 20 38 14 42L10 38C14 34 16 30 16 26H12C10 26 8 24 8 20C8 16 12 12 16 12C20 12 24 16 20 20Z" fill="url(#grad-glass)" stroke="url(#grad-purple-cyan)" strokeWidth="2" filter="url(#glass-shadow)" />
    <path d="M46 20C50 20 52 22 52 26C52 32 46 38 40 42L36 38C40 34 42 30 42 26H38C36 26 34 24 34 20C34 16 38 12 42 12C46 12 50 16 46 20Z" fill="url(#grad-purple-cyan)" filter="url(#drop-shadow)" />
    <circle cx="48" cy="14" r="4" fill="#22d3ee" filter="url(#glow-neon)" />
  </svg>
);

export const IconStar3D = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <Defs />
    <path d="M32 4L39.5 22.5L59 24.5L44 37L48.5 56L32 46L15.5 56L20 37L5 24.5L24.5 22.5L32 4Z" fill="url(#grad-glass)" stroke="url(#grad-pink-orange)" strokeWidth="2" filter="url(#glass-shadow)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 10L37.5 24.5L53 26L41.5 35L44.5 49L32 41.5L19.5 49L22.5 35L11 26L26.5 24.5L32 10Z" fill="url(#grad-pink-orange)" filter="url(#drop-shadow)" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
