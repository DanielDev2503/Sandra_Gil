'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export interface BannerSlide {
  id: string;
  slug: string;
  titulo: string;
  subtitulo: string;
  ctaText: string;
  enlace: string;
  desktopSrc: string; // ej: '/banners/desktop/banner con todos los prods.png'
  mobileSrc: string;  // ej: '/banners/mobile/banner con todos los prods.png'
  alt: string;
}

export const BANNERS_DATA: BannerSlide[] = [
  {
    id: 'todos-los-prods',
    slug: 'banner-todos-los-prods',
    titulo: 'Colección Botánica & Cera de Soya',
    subtitulo: 'Aromaterapia pura vertida a mano en Bogotá',
    ctaText: 'Explorar Catálogo',
    enlace: '/catalogo',
    desktopSrc: '/banners/desktop/banner con todos los prods.png',
    mobileSrc: '/banners/mobile/banner con todos los prods.png',
    alt: 'Colección completa de velas artesanales y botánicas Sandra Gil Bogotá',
  },
  {
    id: 'velas-esculpidas',
    slug: 'banner-velas-esculpidas',
    titulo: 'Velas Esculpidas',
    subtitulo: 'Diseños de molde decorativos para elevar tus espacios',
    ctaText: 'Ver detalles',
    enlace: '/catalogo?tipo=VELA_ESCULPIDA',
    desktopSrc: '/banners/desktop/banner velas esculpidas.png',
    mobileSrc: '/banners/mobile/banner velas esculpidas.png',
    alt: 'Velas artesanales esculpidas de cera de soya Sandra Gil Bogotá',
  },
  {
    id: 'velas-envase',
    slug: 'banner-velas-envase',
    titulo: 'Velas en Envase',
    subtitulo: 'Contenedores reutilizables con aromas envolventes',
    ctaText: 'Ver detalles',
    enlace: '/catalogo?tipo=VELA_ENVASE',
    desktopSrc: '/banners/desktop/banner velas envase.jpg',
    mobileSrc: '/banners/mobile/banner velas envase.jpg',
    alt: 'Velas aromáticas en envase artesanal de cera de soya',
  },
  {
    id: 'jabones-artesanales',
    slug: 'banner-jabones-artesanales',
    titulo: 'Jabones Artesanales',
    subtitulo: 'Cuidado botánico natural para tu piel',
    ctaText: 'Ver detalles',
    enlace: '/catalogo?tipo=JABON',
    desktopSrc: '/banners/desktop/banner jabones artesalanes.png',
    mobileSrc: '/banners/mobile/banner jabones artesalanes.png',
    alt: 'Jabones artesanales naturales Sandra Gil Bogotá',
  },
  {
    id: 'velas-bajo-pedido',
    slug: 'banner-velas-bajo-pedido',
    titulo: 'Velas Personalizadas & Bajo Pedido',
    subtitulo: 'Detalles exclusivos para eventos y ocasiones especiales',
    ctaText: 'Cotizar Personalizadas',
    enlace: '/personalizadas',
    desktopSrc: '/banners/desktop/banner velas bajo pedido.png',
    mobileSrc: '/banners/mobile/banner velas bajo pedido.png',
    alt: 'Velas personalizadas bajo pedido para eventos especiales en Bogotá',
  },
];

const AUTOPLAY_DURATION = 5500; // 5.5s por slide

/**
 * Subcomponente de imagen responsiva con Art Direction nativa de Next.js:
 * En pantallas >= 768px (Desktop/Tablet) consume la versión panorámica (1920x500).
 * En pantallas < 768px (Mobile) consume la versión móvil (800x600).
 * Utiliza next/image con fill, priority en el primer slide y background cálido de respaldo.
 */
function ResponsiveBannerImage({
  slide,
  isFirst,
}: {
  slide: BannerSlide;
  isFirst: boolean;
}) {
  const encodedDesktop = encodeURI(slide.desktopSrc);
  const encodedMobile = encodeURI(slide.mobileSrc);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FAF8F5] bg-stone-100">
      {/* Mobile view (< 768px): Formato móvil calibrado */}
      <div className="relative w-full h-full md:hidden">
        <Image
          src={encodedMobile}
          alt={slide.alt}
          fill
          priority={isFirst}
          sizes="(max-width: 767px) 100vw, 800px"
          className="object-cover object-center w-full h-full transition-transform duration-1000 ease-out group-hover/slide:scale-[1.02]"
        />
      </div>

      {/* Desktop view (>= 768px): Formato panorámico */}
      <div className="relative w-full h-full hidden md:block">
        <Image
          src={encodedDesktop}
          alt={slide.alt}
          fill
          priority={isFirst}
          sizes="(min-width: 768px) 100vw, 1920px"
          className="object-cover object-center w-full h-full transition-transform duration-1000 ease-out group-hover/slide:scale-[1.02]"
        />
      </div>
    </div>
  );
}

export default function HeroBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const totalSlides = BANNERS_DATA.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Autoplay con pausa en hover, foco e inactividad de pestaña
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Pausa cuando la pestaña pierde visibilidad
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.visibilityState === 'hidden');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Navegación por teclado (Flechas izquierda/derecha)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  // Soporte de gestos táctiles (Swipe mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 45;

    if (diffX > swipeThreshold) {
      nextSlide();
    } else if (diffX < -swipeThreshold) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Banners destacados Sandra Gil Velas Artesanales"
      className="relative w-full bg-[#FAF8F5] border-b border-brand-gold/15 outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Encabezado semántico H1 oculto visualmente para blindar SEO local en Bogotá */}
      <h1 className="sr-only">
        Sandra Gil | Velas Decorativas y Aromáticas de Cera de Soya en Bogotá - Catálogo y Colecciones
      </h1>

      {/* Contenedor responsivo calibrado:
          - Mobile (< 768px): aspect-square max-h-[520px] (1:1 nativo para banner 800x800 sin recortes).
          - Desktop (>= 768px): mayor altura vertical (md:h-[480px] lg:h-[560px] xl:h-[620px] 2xl:h-[650px]) para lucir panorámico sin verse aplastado.
      */}
      <div
        className="relative w-full aspect-square md:aspect-auto max-h-[520px] md:max-h-none md:h-[480px] lg:h-[560px] xl:h-[620px] 2xl:h-[650px] overflow-hidden select-none bg-[#FAF8F5] bg-stone-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Riel deslizante continuo de slides */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          aria-live="polite"
        >
          {BANNERS_DATA.map((slide, index) => {
            const isActive = index === currentIndex;
            const isFirst = index === 0;

            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} de ${totalSlides}: ${slide.titulo}`}
                aria-hidden={!isActive}
                className="relative h-full w-full shrink-0 group/slide bg-[#FAF8F5] bg-stone-100"
              >
                <Link
                  href={slide.enlace}
                  tabIndex={isActive ? 0 : -1}
                  className="block relative w-full h-full cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold bg-[#FAF8F5] bg-stone-100"
                >
                  {/* Art Direction responsiva: Mobile 800x600 vs Desktop 1920x500 */}
                  <ResponsiveBannerImage slide={slide} isFirst={isFirst} />

                  {/* Sutil viñeta degradada inferior para legibilidad editorial */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-stone-950/10 to-transparent pointer-events-none"
                  />

                  {/* Tarjeta editorial flotante con llamada a la acción (CTA) */}
                  <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-8 z-20 max-w-[82%] sm:max-w-md">
                    <div className="bg-white/92 hover:bg-white backdrop-blur-md px-3 py-2 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border border-stone-200/80 shadow-lg shadow-stone-900/10 transition-all duration-300 group-hover/slide:shadow-xl group-hover/slide:border-brand-gold/40">
                      <div className="flex items-center justify-between gap-2.5 sm:gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="hidden xs:flex items-center gap-1.5 mb-0.5">
                            <Sparkles className="w-3 h-3 text-brand-gold shrink-0" />
                            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
                              Sandra Gil Bogotá
                            </span>
                          </div>
                          <h2 className="text-xs sm:text-base font-serif font-medium text-stone-900 tracking-tight leading-tight truncate">
                            {slide.titulo}
                          </h2>
                          {slide.subtitulo && (
                            <p className="hidden sm:block text-[11px] sm:text-xs text-stone-600 font-light truncate mt-0.5">
                              {slide.subtitulo}
                            </p>
                          )}
                        </div>

                        {/* Botón CTA con micro-interacción */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-brown hover:bg-stone-900 text-[#FAF8F5] text-[11px] sm:text-xs uppercase tracking-wider font-semibold rounded-full shadow-xs shrink-0 transition-all duration-200 group-hover/slide:bg-stone-900 group-hover/slide:translate-x-0.5">
                          <span>{slide.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-gold transition-transform duration-200 group-hover/slide:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Botón Flecha Izquierda (Anterior) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Ver banner anterior"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-stone-800 shadow-md hover:shadow-xl backdrop-blur-md border border-stone-200/60 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-85 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-stone-700" />
        </button>

        {/* Botón Flecha Derecha (Siguiente) */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Ver siguiente banner"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-stone-800 shadow-md hover:shadow-xl backdrop-blur-md border border-stone-200/60 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-85 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-stone-700" />
        </button>

        {/* Indicadores de Slide estilo cápsula editorial (Paginación) */}
        <div
          role="tablist"
          aria-label="Control de diapositivas"
          className="absolute bottom-3 sm:bottom-4 right-3 sm:right-8 z-30 flex items-center gap-1.5 sm:gap-2 bg-stone-950/50 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-white/20 shadow-md"
        >
          {BANNERS_DATA.map((slide, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Ir al slide ${idx + 1}: ${slide.titulo}`}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${isCurrent
                    ? 'w-5 sm:w-7 h-1.5 sm:h-2 bg-brand-gold shadow-xs'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/60 hover:bg-white'
                  }`}
              />
            );
          })}
        </div>

        {/* Barra de progreso de slide sutil en el borde inferior */}
        <div
          key={currentIndex}
          className={`absolute bottom-0 left-0 h-[2.5px] bg-brand-gold z-30 ${isPaused ? 'opacity-0' : 'opacity-80 animate-banner-progress'
            }`}
          style={{
            animation: !isPaused ? `bannerProgress ${AUTOPLAY_DURATION}ms linear` : 'none',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes bannerProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
