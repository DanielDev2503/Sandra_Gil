'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Announcement {
  id: string;
  text: string;
  linkText?: string;
  linkHref?: string;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'envio-express',
    text: '🚚 Envío Express en Bogotá el mismo día',
    linkText: 'Ver detalles →',
    linkHref: '/envio-express',
  },
  {
    id: 'pagos-seguros',
    text: '🔒 Paga seguro con Wompi, Nequi, PSE y Tarjetas de Crédito',
  },
  {
    id: 'marca-artesanal',
    text: '🕯️ 100% Cera de Soya Natural & Vertido a Mano en Bogotá',
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      role="region"
      aria-label="Avisos de la tienda"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative h-8 sm:h-9 bg-[#1C1917] text-[#FAF8F5] border-b border-stone-800 flex items-center justify-center overflow-hidden px-3 text-[11px] sm:text-xs font-light tracking-wide font-sans select-none"
    >
      <div className="w-full max-w-7xl mx-auto relative h-full flex items-center justify-center">
        {ANNOUNCEMENTS.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out px-2 text-center ${
                isActive
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 truncate max-w-full">
                <span className="truncate">{item.text}</span>
                {item.linkHref && item.linkText && (
                  <Link
                    href={item.linkHref}
                    className="shrink-0 text-amber-300 hover:text-amber-200 underline underline-offset-2 font-medium transition inline-flex items-center gap-0.5 ml-1"
                  >
                    <span>{item.linkText}</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
