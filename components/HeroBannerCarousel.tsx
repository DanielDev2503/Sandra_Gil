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
    id: 'coleccion-navidad',
    slug: 'banner-navidad',
    titulo: 'Colección Navideña',
    title: 'Colección Navideña',
    subtitulo: 'Ilumina tus celebraciones con velas artesanales de temporada',
    description: 'Ilumina tus celebraciones con diseños navideños hechos a mano en 100% cera de soya y aromas cálidos de temporada.',
    ctaText: 'Ver Colección Navideña',
    enlace: '/catalogo?temporada=navidad',
    link: '/catalogo?temporada=navidad',
    kicker: 'Edición Especial Navidad',
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-navidad-hd.webp',
    mobileSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-navidad-hd-mobile.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-navidad-hd.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-navidad-hd.webp',
    imageMobile: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-navidad-hd-mobile.webp',
    alt: 'Colección navideña de velas artesanales de cera de soya Sandra Gil Bogotá',
  },
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
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-todos-los-prods.webp',
    mobileSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-todos-los-prods-mobile.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-todos-los-prods.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-todos-los-prods.webp',
    imageMobile: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-todos-los-prods-mobile.webp',
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
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-esculpidas.webp',
    mobileSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-esculpidas-mobile.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-esculpidas.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-esculpidas.webp',
    imageMobile: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-esculpidas-mobile.webp',
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
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-envase.webp',
    mobileSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-envase-mobile.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-envase.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-envase.webp',
    imageMobile: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-envase-mobile.webp',
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
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-jabones-artesanales.webp',
    mobileSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-jabones-artesanales-mobile.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-jabones-artesanales.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-jabones-artesanales.webp',
    imageMobile: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-jabones-artesanales-mobile.webp',
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
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-bajo-pedido.webp',
    mobileSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-bajo-pedido-mobile.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-bajo-pedido.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-bajo-pedido.webp',
    imageMobile: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-bajo-pedido-mobile.webp',
    alt: 'Velas personalizadas bajo pedido para eventos especiales en Bogotá',
  },
];

const AUTOPLAY_DURATION = 8000; // 8s por slide
const INITIAL_AUTOPLAY_DELAY = 25000; // Diferir primer avance para proteger LCP/trace inicial

/**
 * Subcomponente de imagen responsiva con SSR directo, prioritario para LCP en mobile:
 * - Slide inicial (isFirst): fetchPriority="high", loading="eager", priority={true}
 * - Slides posteriores: loading="lazy", priority={false}
 * - Encuadre calibrado con Tailwind: object-[center_60%] en móvil y sm:object-center en desktop.
 */
export function ResponsiveBannerImage({
  slide,
  isFirst = false,
}: {
  slide: BannerSlide;
  isFirst?: boolean;
}) {
  const altText = slide.alt || slide.title || slide.titulo;
  const imageSrc = slide.image || slide.desktopSrc || '';

  return (
    <Image
      src={imageSrc}
      alt={altText}
      fill
      quality={85}
      priority={isFirst}
      loading={isFirst ? 'eager' : 'lazy'}
      fetchPriority={isFirst ? 'high' : undefined}
      sizes="(max-width: 639px) 100vw, (max-width: 1400px) 1200px, 1920px"
      className="object-cover object-[center_60%] sm:object-center w-full h-full transition-transform duration-500 ease-out group-hover/slide:scale-[1.02]"
    />
  );
}

export default function HeroBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<number[]>([0]);
  const [autoplayReady, setAutoplayReady] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const totalSlides = BANNERS_DATA.length;

  const markSlideLoaded = useCallback(
    (index: number) => {
      const normalized = (index + totalSlides) % totalSlides;
      const next = (normalized + 1) % totalSlides;
      setLoadedSlides((prev) => {
        if (prev.includes(normalized) && prev.includes(next)) return prev;
        const merged = new Set(prev);
        merged.add(normalized);
        merged.add(next);
        return Array.from(merged);
      });
    },
    [totalSlides]
  );

  const goToSlide = useCallback((index: number) => {
    const target = (index + totalSlides) % totalSlides;
    markSlideLoaded(target);
    setAutoplayReady(true);
    setCurrentIndex(target);
  }, [totalSlides, markSlideLoaded]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Esperar antes de iniciar el autoplay automático para que el Slide 0 permanezca visible al cargar
  useEffect(() => {
    if (autoplayReady) return;
    const delayTimer = setTimeout(() => {
      markSlideLoaded(1);
      setAutoplayReady(true);
    }, INITIAL_AUTOPLAY_DELAY);
    return () => clearTimeout(delayTimer);
  }, [autoplayReady, markSlideLoaded]);

  // Autoplay con pausa en hover, foco e inactividad de pestaña
  useEffect(() => {
    if (isPaused || !autoplayReady) return;

    const interval = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);

    return () => clearInterval(interval);
  }, [isPaused, autoplayReady, nextSlide]);

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

  const slidesToRender = autoplayReady || currentIndex > 0 ? BANNERS_DATA : [BANNERS_DATA[0]];

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Banners destacados Sandra Gil Velas Artesanales"
      className="relative w-full bg-[#FAF8F5] border-b border-brand-gold/15 outline-none"
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
          - Mobile (< sm): aspect-[16/9] (altura compacta y panorámica, evita cortes en móvil).
          - Tablet (sm:): sm:aspect-[16/6] (proporción intermedia balanceada).
          - Desktop (lg:): lg:aspect-[1920/620] (composición amplia y vertical para respirar).
      */}
      <div
        className="relative w-full overflow-hidden select-none bg-[#FAF8F5] bg-stone-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Riel deslizante continuo de slides */}
        <div
          className={`flex w-full ${autoplayReady || currentIndex > 0 ? 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
          style={currentIndex === 0 ? undefined : { transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slidesToRender.map((slide, index) => {
            const isActive = index === currentIndex;
            const isFirst = index === 0;
            const title = slide.title || slide.titulo;
            const description = slide.description || slide.subtitulo;
            const link = slide.link || slide.enlace;
            const kicker = slide.kicker || 'Colección Artesanal';
            const ctaText = slide.ctaText || 'Explorar Colección';

            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} de ${totalSlides}: ${title}`}
                aria-hidden={!isActive}
                className="relative w-full shrink-0 group/slide bg-[#FAF8F5] bg-stone-100"
              >
                {/* Enlace de fondo para la imagen (accesible y clickable en toda la composición) */}
                <Link
                  href={link}
                  prefetch={false}
                  tabIndex={isActive ? 0 : -1}
                  className="block relative w-full aspect-[16/9] sm:aspect-[16/6] lg:aspect-[1920/620] cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold bg-[#FAF8F5] bg-stone-100"
                >
                  {/* Montar solo Slide 0 al inicio y slides adicionales bajo demanda */}
                  {isFirst || loadedSlides.includes(index) ? (
                    <ResponsiveBannerImage slide={slide} isFirst={isFirst} />
                  ) : (
                    <div className="w-full h-full bg-[#FAF8F5]" aria-hidden="true" />
                  )}

                  {/* Sutil viñeta degradada para legibilidad */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-stone-950/30 via-transparent to-transparent pointer-events-none"
                  />
                </Link>

                {/* Contenido Editorial Izquierdo en Cuadro (Mobile + Desktop) */}
                <div className="flex absolute inset-y-0 left-0 items-start pt-3 sm:items-center sm:pt-0 z-20 pl-3 sm:pl-10 lg:pl-14 pointer-events-none">
                  <div className="pointer-events-auto max-w-[265px] sm:max-w-sm lg:max-w-md bg-[#FAF8F5]/95 border border-stone-200/80 shadow-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-6 lg:p-8 space-y-1.5 sm:space-y-2.5 lg:space-y-3.5 transition-all">
                    {/* Kicker superior */}
                    <span className="inline-block text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#855E16] bg-amber-50/90 border border-amber-200/70 rounded-full px-2.5 sm:px-3 py-0.5">
                      {kicker}
                    </span>

                    {/* Título de la categoría */}
                    <h2 className="text-base sm:text-3xl lg:text-4xl font-serif text-stone-900 leading-[1.15] tracking-tight">
                      {title}
                    </h2>

                    {/* Subtítulo / Descripción */}
                    {description && (
                      <p className="text-xs sm:text-sm text-stone-700 font-light leading-snug sm:leading-relaxed">
                        {description}
                      </p>
                    )}

                    {/* Botón de Acción Principal */}
                    <div className="pt-0.5 sm:pt-1.5">
                      <Link
                        href={link}
                        prefetch={false}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 lg:px-7 py-1.5 sm:py-2.5 lg:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white bg-[#855E16] hover:bg-[#704E11] shadow-sm hover:shadow transition-all duration-200 active:scale-95"
                      >
                        <span>{ctaText || 'Explorar Catálogo'}</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
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
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-stone-800 shadow-md hover:shadow-xl backdrop-blur-md border border-stone-200/60 hidden sm:flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-85 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-stone-700" />
        </button>

        {/* Botón Flecha Derecha (Siguiente) */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Ver siguiente banner"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-stone-800 shadow-md hover:shadow-xl backdrop-blur-md border border-stone-200/60 hidden sm:flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-85 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ChevronRight className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-stone-700" />
        </button>

        {/* Indicadores de Slide estilo cápsula editorial (Paginación) */}
        <div
          role="tablist"
          aria-label="Control de diapositivas"
          className="absolute bottom-2.5 right-3 sm:bottom-6 sm:right-6 z-20 flex items-center gap-0.5 sm:gap-1 bg-stone-950/75 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full border border-white/20 shadow-md"
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
                className="w-6 h-6 flex items-center justify-center cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <span
                  className={`transition-all duration-300 rounded-full block ${
                    isCurrent
                      ? 'w-4 sm:w-5 h-1.5 sm:h-2 bg-amber-400 shadow-xs'
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/75 hover:bg-white'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Barra de progreso de slide sutil en el borde inferior (GPU transform) */}
        {autoplayReady && !isPaused && (
          <div
            key={currentIndex}
            className="absolute bottom-0 left-0 w-full origin-left h-[2.5px] bg-brand-gold z-30 opacity-80"
            style={{
              animation: `bannerProgress ${AUTOPLAY_DURATION}ms linear`,
            }}
          />
        )}
      </div>
    </section>
  );
}
