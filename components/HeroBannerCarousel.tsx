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
  ctaShort?: string;
  enlace: string;
  desktopSrc: string; // ej: '/banners/desktop/banner con todos los prods.png'
  alt: string;
  // Compatibilidad y campos editoriales
  kicker?: string;
  description?: string;
  link?: string;
  title?: string;
  imageDesktop?: string;
  image?: string;
}

export const BANNERS_DATA: BannerSlide[] = [
  {
    id: 'coleccion-navidad',
    slug: 'banner-navidad',
    titulo: 'Colección Navideña',
    title: 'Colección Navideña',
    subtitulo: 'Ilumina tus celebraciones con velas artesanales de temporada',
    description: 'Ilumina tus celebraciones con nuestra edición navideña de velas aromáticas y decorativas elaboradas a mano en Bogotá con cera de soya 100% natural, flores artesanales y esencias cálidas de temporada perfectas para regalar y transformar tus espacios.',
    ctaText: 'Ver Colección Navideña',
    ctaShort: 'Ver Navidad',
    enlace: '/catalogo?temporada=navidad',
    link: '/catalogo?temporada=navidad',
    kicker: 'Edición Especial Navidad',
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-navidad-hd.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-navidad-hd.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-navidad-hd.webp',
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
    ctaShort: 'Explorar',
    enlace: '/catalogo',
    link: '/catalogo',
    kicker: 'Colección Signature',
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-todos-los-prods.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-todos-los-prods.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-todos-los-prods.webp',
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
    ctaShort: 'Ver esculpidas',
    enlace: '/catalogo?tipo=VELA_ESCULPIDA',
    link: '/catalogo?tipo=VELA_ESCULPIDA',
    kicker: 'Arte & Moldes Botánicos',
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-esculpidas.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-esculpidas.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-esculpidas.webp',
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
    ctaShort: 'Ver envases',
    enlace: '/catalogo?tipo=VELA_ENVASE',
    link: '/catalogo?tipo=VELA_ENVASE',
    kicker: 'Aromaterapia Pura',
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-envase.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-envase.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-envase.webp',
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
    ctaShort: 'Ver jabones',
    enlace: '/catalogo?tipo=JABON',
    link: '/catalogo?tipo=JABON',
    kicker: 'Cosmética Natural',
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-jabones-artesanales.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-jabones-artesanales.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-jabones-artesanales.webp',
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
    ctaShort: 'Cotizar',
    enlace: '/personalizadas',
    link: '/personalizadas',
    kicker: 'Eventos & Recordatorios',
    desktopSrc: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-bajo-pedido.webp',
    image: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-bajo-pedido.webp',
    imageDesktop: 'https://imdyyahjqntkcjdliywt.supabase.co/storage/v1/object/public/productos/banners/banner-velas-bajo-pedido.webp',
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
    <div className="relative w-full aspect-[1056/672] sm:aspect-auto sm:h-[340px] lg:h-[430px] overflow-hidden">
      <Image
        src={imageSrc}
        alt={altText}
        fill
        quality={75}
        priority={false}
        loading={isFirst ? 'eager' : 'lazy'}
        sizes="(max-width: 639px) 150vw, (max-width: 1400px) 1200px, 1920px"
        className="object-cover object-right sm:object-center transition-transform duration-500 ease-out group-hover/slide:scale-[1.02]"
      />
    </div>
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
  const isMultiSlide = slidesToRender.length > 1;

  const renderSlide = (slide: BannerSlide, index: number) => {
    const isActive = index === currentIndex;
    const isFirst = index === 0;
    const title = slide.title || slide.titulo;
    const description = slide.description || slide.subtitulo;
    const link = slide.link || slide.enlace;
    const kicker = slide.kicker || 'Colección Artesanal';
    const ctaText = slide.ctaText || 'Explorar Catálogo';
    const HeadingTag = isFirst ? 'h1' : 'h2';

    return (
      <div
        key={slide.id}
        {...(isMultiSlide
          ? {
              role: 'group',
              'aria-roledescription': 'slide',
              'aria-label': `Slide ${index + 1} de ${totalSlides}: ${title}`,
              'aria-hidden': !isActive,
            }
          : {})}
        className={`relative w-full group/slide bg-[#FAF8F5] ${isMultiSlide ? 'shrink-0' : ''}`}
      >
        {/* Enlace de fondo para la imagen */}
        <Link
          href={link}
          prefetch={false}
          tabIndex={isActive ? 0 : -1}
          className="block relative w-full cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold bg-[#FAF8F5]"
        >
          {isFirst || loadedSlides.includes(index) ? (
            <ResponsiveBannerImage slide={slide} isFirst={isFirst} />
          ) : (
            <div className="w-full aspect-[1056/672] sm:aspect-auto sm:h-[340px] lg:h-[430px] bg-[#FAF8F5]" aria-hidden="true" />
          )}
          <div
            aria-hidden="true"
            className="sm:hidden absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none"
          />
        </Link>

        {/* Cuadro Indicativo Editorial: título arriba centrado y CTA abajo izquierda en móvil; flotante izquierdo en desktop */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-3 sm:p-0 sm:right-auto sm:flex-row sm:items-center sm:justify-start sm:pl-10 lg:pl-14">
          <div className="contents sm:block sm:pointer-events-auto sm:max-w-sm lg:max-w-md sm:bg-[#FAF8F5]/95 sm:border sm:border-stone-200/80 sm:shadow-xl sm:rounded-2xl lg:rounded-3xl sm:p-6 lg:p-8 sm:space-y-2.5 lg:space-y-3.5">
            <span className="hidden sm:inline-block text-[10px] lg:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#855E16] bg-amber-50/90 border border-amber-200/70 rounded-full px-2.5 sm:px-3 py-0.5">
              {kicker}
            </span>
            <HeadingTag
              className={`text-center sm:text-left px-2 sm:px-0 text-[1.4rem] leading-tight sm:text-3xl lg:text-4xl font-serif text-white sm:text-stone-900 tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] sm:[text-shadow:none] sm:leading-[1.15] ${
                isActive ? 'banner-title-in' : 'max-sm:opacity-0'
              }`}
            >
              {title}
            </HeadingTag>
            {description && (
              <p className="hidden sm:block text-base sm:text-sm text-stone-700 font-light leading-[1.7] sm:leading-relaxed">
                {description}
              </p>
            )}
            <div className="self-start pointer-events-auto sm:pt-1.5">
              <Link
                href={link}
                prefetch={false}
                tabIndex={isActive ? 0 : -1}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-4 sm:px-5 lg:px-7 py-2 sm:py-2.5 lg:py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white bg-[#855E16] hover:bg-[#704E11] shadow-lg sm:shadow-sm hover:shadow transition-all duration-200 active:scale-95"
              >
                <span className="sm:hidden">{slide.ctaShort || 'Ver más'}</span>
                <span className="hidden sm:inline">{ctaText || 'Explorar Catálogo'}</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
      <div
        className="relative w-full overflow-hidden bg-[#FAF8F5]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isMultiSlide ? (
          <div
            className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={currentIndex === 0 ? undefined : { transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slidesToRender.map((slide, index) => renderSlide(slide, index))}
          </div>
        ) : (
          <div className="w-full">{renderSlide(slidesToRender[0], 0)}</div>
        )}

        {/* Botón Flecha Izquierda (Anterior) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Ver banner anterior"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md hover:shadow-xl border border-stone-200/60 hidden sm:flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-85 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-stone-700" />
        </button>

        {/* Botón Flecha Derecha (Siguiente) */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Ver siguiente banner"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md hover:shadow-xl border border-stone-200/60 hidden sm:flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-85 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ChevronRight className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-stone-700" />
        </button>

        {/* Indicadores de Slide estilo cápsula editorial (Paginación) */}
        <div
          role="tablist"
          aria-label="Control de diapositivas"
          className="flex items-center justify-center gap-0.5 py-2 sm:py-1 sm:px-2.5 sm:absolute sm:bottom-6 sm:right-6 sm:z-20 sm:gap-1 sm:bg-stone-950/75 sm:rounded-full sm:border sm:border-white/20 sm:shadow-md"
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
                      ? 'w-5 h-1.5 sm:h-2 bg-[#855E16] sm:bg-amber-400 shadow-xs'
                      : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-stone-300 sm:bg-white/75 hover:bg-stone-400 sm:hover:bg-white'
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
