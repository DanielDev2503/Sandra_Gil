'use client';

import React from 'react';

interface CandleGlowPulseProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export default function CandleGlowPulse({
  className = '',
  size = 'md',
  children,
}: CandleGlowPulseProps) {
  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
    lg: 'w-5 h-5',
  }[size];

  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Animated Warm Glow Backdrop */}
      <span
        aria-hidden="true"
        className={`absolute rounded-full bg-gradient-to-r from-amber-400 via-brand-gold to-amber-600 blur-[6px] pointer-events-none animate-pulse ${sizeClasses}`}
      />
      {/* Core Flame / Icon */}
      <span className="relative z-10 flex items-center justify-center">
        {children ?? (
          <span className="w-2 h-2 rounded-full bg-amber-200 border border-brand-gold shadow-xs" />
        )}
      </span>
    </span>
  );
}
