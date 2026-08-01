'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

export const DEFAULT_FALLBACK_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><rect width="400" height="400" fill="%23F5F5F4"/><g transform="translate(100, 70)"><path d="M100 30C100 30 80 70 80 90C80 101.046 88.954 110 100 110C111.046 110 120 101.046 120 90C120 70 100 30 100 30Z" fill="%23D4AF37"/><rect x="60" y="110" width="80" height="120" rx="8" fill="%23E7E5E4" stroke="%23D4AF37" stroke-width="2"/><line x1="80" y1="140" x2="120" y2="140" stroke="%23D4AF37" stroke-width="1.5" stroke-dasharray="2 2"/><text x="100" y="270" font-family="serif" font-size="14" fill="%2378716C" text-anchor="middle" letter-spacing="1">SANDRA GIL VELAS</text></g></svg>`;

export function formatSupabaseUrl(url?: string | null): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return DEFAULT_FALLBACK_IMAGE;
  }
  const cleanUrl = url.trim();
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') || cleanUrl.startsWith('data:')) {
    return cleanUrl;
  }
  const basePath = 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos';
  if (cleanUrl.startsWith('/')) {
    return `${basePath}${cleanUrl}`;
  }
  return `${basePath}/${cleanUrl}`;
}

export interface SkeletonImageProps extends Partial<Omit<ImageProps, 'src' | 'alt'>> {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

/**
 * Image component with built-in skeleton pulse loader, Next.js Image optimization,
 * responsive sizes prop, Supabase URL formatting, and graceful SVG fallback handling.
 */
export default function SkeletonImage({
  src,
  alt,
  className = '',
  fill = true,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  ...props
}: SkeletonImageProps) {
  const initialUrl = formatSupabaseUrl(src);
  const [imgSrc, setImgSrc] = useState<string>(initialUrl);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(initialUrl === DEFAULT_FALLBACK_IMAGE);

  useEffect(() => {
    const formatted = formatSupabaseUrl(src);
    setImgSrc(formatted);
    setHasError(formatted === DEFAULT_FALLBACK_IMAGE);
    setLoaded(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      setLoaded(true);
    }
  };

  return (
    <>
      {/* Skeleton Pulse Placeholder — visible until image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse z-0" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        sizes={fill ? sizes : undefined}
        priority={priority}
        unoptimized={hasError || imgSrc.startsWith('data:')}
        className={`${className} transition-opacity duration-500 ease-in-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        {...props}
      />
    </>
  );
}


