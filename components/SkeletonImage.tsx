'use client';

import React, { useState, useRef, useEffect } from 'react';

interface SkeletonImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Image component with a built-in skeleton/pulse loader.
 * Shows an animated pulse placeholder while the image loads,
 * then fades the image in smoothly to prevent layout shifts.
 */
export default function SkeletonImage({ src, alt, className = '' }: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <>
      {/* Skeleton Pulse Placeholder — visible until image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

