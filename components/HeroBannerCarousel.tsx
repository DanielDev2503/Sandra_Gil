'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  // Compatibilidad y campos editoriales
  kicker?: string;
  description?: string;
  link?: string;
  title?: string;
  imageDesktop?: string;
  imageMobile?: string;
  image?: string;
}

export const BANNERS_DATA: BannerSlide[] = [
  {
    id: 'todos-los-prods',
    slug: 'banner-todos-los-prods',
    titulo: 'Colección Botánica & Cera de Soya',
    title: 'Colección Botánica & Cera de Soya',
    subtitulo: 'Aromaterapia pura vertida a mano en Bogotá',
    description: 'Aromaterapia pura vertida a mano en Bogotá con 100% cera de soya natural y esencias selectas.',
    ctaText: 'Explorar Catálogo',
    enlace: '/catalogo',
    link: '/catalogo',
    kicker: 'Colección Signature',
    desktopSrc: '/banners/desktop/banner con todos los prods.png',
    mobileSrc: '/banners/mobile/banner con todos los prods.png',
    alt: 'Colección completa de velas artesanales y botánicas Sandra Gil Bogotá',
  },
  {
    id: 'velas-esculpidas',
    slug: 'banner-velas-esculpidas',
    titulo: 'Velas Esculpidas',
    title: 'Velas Esculpidas',
    subtitulo: 'Diseños de molde decorativos para elevar tus espacios',
    description: 'Diseños de molde decorativos para elevar tus espacios con luz suave y texturas artesanales.',
    ctaText: 'Ver Colección',
    enlace: '/catalogo?tipo=VELA_ESCULPIDA',
    link: '/catalogo?tipo=VELA_ESCULPIDA',
    kicker: 'Arte & Moldes Botánicos',
    desktopSrc: '/banners/desktop/banner velas esculpidas.png',
    mobileSrc: '/banners/mobile/banner velas esculpidas.png',
    alt: 'Velas artesanales esculpidas de cera de soya Sandra Gil Bogotá',
  },
  {
    id: 'velas-envase',
    slug: 'banner-velas-envase',
    titulo: 'Velas en Envase',
    title: 'Velas en Envase',
    subtitulo: 'Contenedores reutilizables con aromas envolventes',
    description: 'Contenedores reutilizables con aromas envolventes y combustión limpia de larga duración.',
    ctaText: 'Ver Velas en Envase',
    enlace: '/catalogo?tipo=VELA_ENVASE',
    link: '/catalogo?tipo=VELA_ENVASE',
    kicker: 'Aromaterapia Pura',
    desktopSrc: '/banners/desktop/banner velas envase.jpg',
    mobileSrc: '/banners/mobile/banner velas envase.jpg',
    alt: 'Velas aromáticas en envase artesanal de cera de soya',
  },
  {
    id: 'jabones-artesanales',
    slug: 'banner-jabones-artesanales',
    titulo: 'Jabones Artesanales',
    title: 'Jabones Artesanales',
    subtitulo: 'Cuidado botánico natural para tu piel',
    description: 'Cuidado botánico natural para tu piel con aceites esenciales nutritivos y extractos florales.',
    ctaText: 'Ver Jabones',
    enlace: '/catalogo?tipo=JABON',
    link: '/catalogo?tipo=JABON',
    kicker: 'Cosmética Natural',
    desktopSrc: '/banners/desktop/banner jabones artesalanes.png',
    mobileSrc: '/banners/mobile/banner jabones artesalanes.png',
    alt: 'Jabones artesanales naturales Sandra Gil Bogotá',
  },
  {
    id: 'velas-bajo-pedido',
    slug: 'banner-velas-bajo-pedido',
    titulo: 'Velas Personalizadas & Bajo Pedido',
    title: 'Velas Bajo Pedido',
    subtitulo: 'Detalles exclusivos para eventos y ocasiones especiales',
    description: 'Detalles exclusivos para bodas, recordatorios, eventos corporativos y celebraciones especiales.',
    ctaText: 'Cotizar Bajo Pedido',
    enlace: '/personalizadas',
    link: '/personalizadas',
    kicker: 'Eventos & Recordatorios',
    desktopSrc: '/banners/desktop/banner velas bajo pedido.png',
    mobileSrc: '/banners/mobile/banner velas bajo pedido.png',
    alt: 'Velas personalizadas bajo pedido para eventos especiales en Bogotá',
  },
];

const AUTOPLAY_DURATION = 5500; // 5.5s por slide

/**
 * Subcomponente de imagen responsiva con Art Direction nativa de Next.js:
 * En pantallas >= sm (Tablet y Desktop) consume la versión panorámica (1920x620).
 * En pantallas < sm (Mobile) consume la versión móvil con calibración object-[center_60%].
 * Calibración de object-position:
 * - Mobile: object-[center_60%] para conservar tanto la base de los productos como la parte superior.
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
      {/* Imagen para Celular (< sm): calibración object-[center_60%] */}
      <div className="block sm:hidden absolute inset-0">
        <Image
          src={encodedMobile}
          alt={altText}
          fill
          priority={isFirst}
          sizes="100vw"
          className="object-cover object-[center_60%] w-full h-full transition-transform duration-500 ease-out group-hover/slide:scale-[1.02]"
        />
      </div>

      {/* Imagen para Tablet y PC (sm:): 1920x620 panorámica con enfoque centrado */}
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
          - Mobile (< sm): aspect-[16/8] (altura compacta y panorámica, evita cortes en móvil).
          - Tablet (sm:): sm:aspect-[16/6] (proporción intermedia balanceada).
          - Desktop (lg:): lg:aspect-[1920/620] (composición amplia y vertical para respirar).
      */}
      <div
        className="relative w-full aspect-[16/8] sm:aspect-[16/6] lg:aspect-[1920/620] overflow-hidden select-none bg-[#FAF8F5] bg-stone-100"
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
            const title = slide.title || slide.titulo;
            const description = slide.description || slide.subtitulo;
            const link = slide.link || slide.enlace;
            const kicker = slide.kicker || 'Colección Artesanal';
            const ctaText = slide.ctaText || 'Explorar Colección';

            const mobileButtonText =
              title === 'Velas Bajo Pedido' || title === 'Velas Personalizadas & Bajo Pedido'
                ? 'Cotizar Bajo Pedido'
                : title === 'Colección Botánica & Cera de Soya'
                ? 'Ver Catálogo Completo'
                : title.startsWith('Ver ')
                ? title
                : `Ver ${title}`;

            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} de ${totalSlides}: ${title}`}
                aria-hidden={!isActive}
                className="relative h-full w-full shrink-0 group/slide bg-[#FAF8F5] bg-stone-100"
              >
                {/* Enlace de fondo para la imagen (accesible y clickable en toda la composición) */}
                <Link
                  href={link}
                  tabIndex={isActive ? 0 : -1}
                  className="block relative w-full h-full cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold bg-[#FAF8F5] bg-stone-100"
                >
                  {/* Art Direction responsiva: Mobile 800x600 (object-[center_60%]) vs Desktop 1920x620 */}
                  <ResponsiveBannerImage slide={slide} isFirst={isFirst} />

                  {/* Sutil viñeta degradada para legibilidad */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-stone-950/30 via-transparent to-transparent pointer-events-none"
                  />
                </Link>

                {/* Contenido Editorial Izquierdo para Desktop (>= sm) */}
                <div className="hidden sm:flex absolute inset-y-0 left-0 items-center z-20 pl-8 sm:pl-12 lg:pl-16 max-w-md lg:max-w-xl pointer-events-none">
                  <div className="pointer-events-auto space-y-3 lg:space-y-4 bg-white/40 lg:bg-transparent backdrop-blur-xs lg:backdrop-blur-none p-6 lg:p-0 rounded-3xl">
                    {/* Kicker superior */}
                    <span className="inline-block text-[11px] lg:text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 bg-amber-50/80 border border-amber-200/60 rounded-full px-3.5 py-1">
                      {kicker}
                    </span>

                    {/* Título de la categoría */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-[1.1] tracking-tight drop-shadow-xs">
                      {title}
                    </h2>

                    {/* Subtítulo / Descripción */}
                    {description && (
                      <p className="text-xs sm:text-sm lg:text-base text-stone-700 font-light leading-relaxed max-w-sm lg:max-w-md line-clamp-2 lg:line-clamp-3">
                        {description}
                      </p>
                    )}

                    {/* Botón de Acción Principal (Pill) */}
                    <div className="pt-2">
                      <Link
                        href={link}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center gap-2.5 rounded-full px-6 lg:px-8 py-3 lg:py-3.5 text-xs lg:text-sm font-semibold uppercase tracking-wider text-white bg-[#B8862D] hover:bg-[#A37424] shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                      >
                        <span>{ctaText}</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Botón Compacto Exclusivo para Móvil (< sm) */}
                <div className="sm:hidden absolute bottom-3 left-3 z-20 max-w-[calc(100%-80px)]">
                  <Link
                    href={link}
                    tabIndex={isActive ? 0 : -1}
                    className="inline-flex items-center gap-2 rounded-full py-2 px-4 bg-stone-900/90 backdrop-blur-md text-white text-xs font-semibold shadow-lg border border-white/20 active:scale-95 transition-all truncate"
                  >
                    <span className="truncate">{mobileButtonText}</span>
                    <span aria-hidden="true" className="text-amber-400 font-bold">&rarr;</span>
                  </Link>
                </div>
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
          className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1 sm:gap-2 bg-stone-950/45 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20 shadow-md"
        >
          {BANNERS_DATA.map((slide, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Ir al slide ${idx + 1}: ${slide.titulo || slide.title}`}
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
