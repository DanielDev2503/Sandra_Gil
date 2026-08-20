'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

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
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !glowRef.current) return;

    // Organic flickering pulse using Anime.js v4
    const animation = animate(glowRef.current, {
      scale: [1, 1.22, 0.95, 1.15, 1],
      opacity: [0.65, 1, 0.55, 0.9, 0.65],
      duration: 3200,
      ease: 'inOutSine',
      loop: true,
    });

    return () => {
      // Clean up animation on unmount
      if (animation && typeof animation.pause === 'function') {
        animation.pause();
      }
    };
  }, []);

  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
    lg: 'w-5 h-5',
  }[size];

  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Animated Warm Glow Backdrop */}
      <span
        ref={glowRef}
        aria-hidden="true"
        className={`absolute rounded-full bg-gradient-to-r from-amber-400 via-brand-gold to-amber-600 blur-[6px] pointer-events-none ${sizeClasses}`}
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
