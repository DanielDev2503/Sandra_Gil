'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

export const DEFAULT_FALLBACK_IMAGE = '/logo-sandra.webp';

export function formatSupabaseUrl(url?: string | null): string {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('data:image/svg+xml')) {
    return DEFAULT_FALLBACK_IMAGE;
  }
  let cleanUrl = url.trim();

  // Eliminar parámetros de consulta dinámicos (?t=..., ?v=..., timestamps) para permitir cache hit en Vercel CDN
  if (!cleanUrl.startsWith('data:')) {
    const questionMarkIndex = cleanUrl.indexOf('?');
    if (questionMarkIndex !== -1) {
      cleanUrl = cleanUrl.substring(0, questionMarkIndex);
    }
  }

  if (
    cleanUrl.startsWith('http://') ||
    cleanUrl.startsWith('https://') ||
    cleanUrl.startsWith('data:') ||
    cleanUrl.startsWith('/logo') ||
    cleanUrl.startsWith('/favicon') ||
    cleanUrl.startsWith('/icon')
  ) {
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
  onError: _onError,
  ...props
}: SkeletonImageProps) {
  const formatted = formatSupabaseUrl(src);
  const imgSrc = formatted === DEFAULT_FALLBACK_IMAGE ? fallbackSrc : formatted;

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      sizes={fill ? sizes : undefined}
      priority={false}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      unoptimized={imgSrc.startsWith('data:')}
      className={className}
      {...props}
    />
  );
}


