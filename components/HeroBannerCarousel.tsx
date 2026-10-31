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
  // Compatibilidad con props alternativas
  imageDesktop?: string;
  imageMobile?: string;
  image?: string;
  title?: string;
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
 * En pantallas >= sm (Tablet y Desktop) consume la versión panorámica (1920x500).
 * En pantallas < sm (Mobile) consume la versión móvil (800x600, proporción 16:9 recortada al foco inferior).
 * Calibración de object-position:
 * - Mobile: object-[center_80%] para anclar el tercio inferior (mesa y piezas) y descartar pared/techo.
 * - Desktop: object-center para un encuadre panorámico balanceado.
 */
export function ResponsiveBannerImage({
  slide,
  isFirst = false,
}: {
  slide: BannerSlide;
  isFirst?: boolean;
}) {
  const desktopSource = slide.desktopSrc || slide.imageDesktop || slide.image || '';
  const mobileSource = slide.mobileSrc || slide.imageMobile || slide.image || desktopSource;
  const encodedDesktop = encodeURI(desktopSource);
  const encodedMobile = encodeURI(mobileSource);
  const altText = slide.alt || slide.title || slide.titulo;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FAF8F5] bg-stone-100">
      {/* Imagen para Celular (< sm): enfoque inferior al 80% para priorizar productos y mesa */}
      <div className="block sm:hidden absolute inset-0">
        <Image
          src={encodedMobile}
          alt={altText}
          fill
          priority={isFirst}
          sizes="100vw"
          className="object-cover object-[center_80%] w-full h-full transition-transform duration-500 ease-out group-hover/slide:scale-[1.02]"
        />
      </div>

      {/* Imagen para Tablet y PC (sm:): 1920x500 panorámica con enfoque centrado */}
      <div className="hidden sm:block absolute inset-0">
        <Image
          src={encodedDesktop}
          alt={altText}
          fill
          priority={isFirst}
          sizes="100vw"
          className="object-cover object-center w-full h-full transition-transform duration-500 ease-out group-hover/slide:scale-[1.02]"
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

      {/* Contenedor responsivo con relación de aspecto fluida anti-CLS:
          - Mobile (< sm): aspect-[16/9] (altura contenida de ~215px a 225px).
          - Tablet (sm:): sm:aspect-[16/6] (proporción intermedia balanceada).
          - Desktop (lg:): lg:aspect-[1920/500] (proporción panorámica nativa 1920x500).
      */}
      <div
        className="relative w-full aspect-[16/9] sm:aspect-[16/6] lg:aspect-[1920/500] overflow-hidden select-none bg-[#FAF8F5] bg-stone-100"
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
                  {/* Art Direction responsiva: Mobile 800x600 (object-[center_80%]) vs Desktop 1920x500 */}
                  <ResponsiveBannerImage slide={slide} isFirst={isFirst} />

                  {/* Degradado suave de fondo en la base del slide para contraste sin tapar la foto */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-16 sm:h-28 bg-gradient-to-t from-black/35 via-black/10 to-transparent pointer-events-none"
                  />

                  {/* Pastilla editorial flotante compacta con llamada a la acción (CTA) */}
                  <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 z-20 flex items-center gap-1.5 sm:gap-3 bg-white/95 backdrop-blur-md py-1 px-2.5 sm:py-2 sm:px-4 rounded-full shadow-md border border-stone-200/60 max-w-[calc(100%-80px)] group-hover/slide:shadow-xl transition-all duration-300">
                    <div className="min-w-0 flex-1">
                      <div className="hidden sm:flex items-center gap-1.5 mb-0.5">
                        <Sparkles className="w-3 h-3 text-brand-gold shrink-0" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
                          Sandra Gil Bogotá
                        </span>
                      </div>
                      <h2 className="text-[10px] sm:text-xs font-serif text-stone-800 truncate leading-tight">
                        {slide.titulo}
                      </h2>
                      {slide.subtitulo && (
                        <p className="hidden sm:block text-[11px] text-stone-600 font-light truncate mt-0.5">
                          {slide.subtitulo}
                        </p>
                      )}
                    </div>

                    {/* Botón CTA píldora compacto */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-4 sm:py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[9px] sm:text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs shrink-0 transition-all duration-200 group-hover/slide:translate-x-0.5">
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-brand-gold transition-transform duration-200 group-hover/slide:translate-x-0.5" />
                    </span>
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
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-stone-800 shadow-md hover:shadow-xl backdrop-blur-md border border-stone-200/60 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-85 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-stone-700" />
        </button>

        {/* Botón Flecha Derecha (Siguiente) */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Ver siguiente banner"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-stone-800 shadow-md hover:shadow-xl backdrop-blur-md border border-stone-200/60 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-85 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ChevronRight className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-stone-700" />
        </button>

        {/* Indicadores de Slide estilo cápsula editorial (Paginación) */}
        <div
          role="tablist"
          aria-label="Control de diapositivas"
          className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1 sm:gap-2 bg-stone-950/45 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20 shadow-md"
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
                className={`transition-all duration-300 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
                  isCurrent
                    ? 'w-3.5 sm:w-6 h-1.5 sm:h-2 bg-brand-gold shadow-xs'
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
