'use client';

import React, { useRef, useState, useEffect, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const WA_NUMBER = '573175752029';

export interface CarouselProduct {
  id: string;
  nombre: string;
  slug: string;
  precio: number | null;
  url_imagen: string | null;
  tipo?: string | null;
  esBajoPedido?: boolean | null;
}

export interface GroupedProducts {
  VELA_ENVASE: CarouselProduct[];
  VELA_ESCULPIDA: CarouselProduct[];
  JABON: CarouselProduct[];
  BAJO_PEDIDO: CarouselProduct[];
}

interface HomeTypeCarouselsProps {
  groupedProducts: GroupedProducts;
}

interface CategoryMeta {
  key: keyof GroupedProducts;
  title: string;
  href: string;
}

const CATEGORIES_METADATA: CategoryMeta[] = [
  {
    key: 'VELA_ESCULPIDA',
    title: 'Velas Esculpidas',
    href: '/catalogo?tipo=VELA_ESCULPIDA',
  },
  {
    key: 'VELA_ENVASE',
    title: 'Velas en Envase',
    href: '/catalogo?tipo=VELA_ENVASE',
  },
  {
    key: 'JABON',
    title: 'Jabones Artesanales',
    href: '/catalogo?tipo=JABON',
  },
  {
    key: 'BAJO_PEDIDO',
    title: 'Velas Bajo Pedido',
    href: '/personalizadas',
  },
];

/**
 * Algoritmo Fisher-Yates para barajado aleatorio uniforme sin sesgos
 */
function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const emptySubscribe = () => () => {};

interface CategoryCarouselProps {
  category: CategoryMeta;
  products: CarouselProduct[];
}

/**
 * Carrusel dinámico con ticker/marquee continuo a 60fps (requestAnimationFrame),
 * pausa interactiva (hover/touch) y flechas de navegación manual.
 */
function CategoryCarousel({ category, products }: CategoryCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // 1. Asegurar densidad visual base
  const baseList = useMemo(() => {
    if (products.length === 0) return [];
    if (products.length < 6) {
      return [...products, ...products, ...products];
    }
    return products;
  }, [products]);

  // 2. Duplicación simétrica exacta para loop continuo infinito sin cortes
  const displayProducts = useMemo(() => {
    if (baseList.length === 0) return [];
    return [...baseList, ...baseList];
  }, [baseList]);

  // 3. Motor de desplazamiento continuo lineal a 60 fps (requestAnimationFrame)
  useEffect(() => {
    const container = railRef.current;
    if (!container) return;

    let animationFrameId: number;
    // Velocidad suave y moderada: ~0.55 píxeles por frame
    const speed = 0.55;

    const animate = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;
        const halfWidth = container.scrollWidth / 2;
        // Al alcanzar la mitad exacta del contenido duplicado, reiniciar a 0 sin salto perceptible
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // 4. Controles de navegación manual con soporte para loop bidireccional
  const scrollLeft = () => {
    const container = railRef.current;
    if (!container) return;
    const halfWidth = container.scrollWidth / 2;
    if (container.scrollLeft <= 10) {
      container.scrollLeft += halfWidth;
    }
    container.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = railRef.current;
    if (!container) return;
    const halfWidth = container.scrollWidth / 2;
    if (container.scrollLeft >= halfWidth) {
      container.scrollLeft = 0;
    }
    container.scrollBy({ left: 320, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby={`heading-${category.key}`}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Cabecera de Sección con enlace para explorar toda la categoría */}
      <div className="flex items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-brand-gold/15">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold font-sans block mb-1">
            COLECCIÓN ARTESANAL
          </span>
          <h2
            id={`heading-${category.key}`}
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-stone-900 tracking-tight"
          >
            {category.title}
          </h2>
        </div>

        <Link
          href={category.href}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors group/link pb-1"
        >
          <span>Ver todos</span>
          <ChevronRight className="w-4 h-4 text-brand-gold group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Contenedor interactivo del riel con flechas de navegación y pausa interactiva */}
      <div
        className="relative group/carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Botón Flotante Izquierdo */}
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Ver productos anteriores"
          className="absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-white/90 border border-stone-200 text-stone-700 shadow-md hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 flex items-center justify-center transition-all z-20 cursor-pointer active:scale-95 opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 focus:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Botón Flotante Derecho */}
        <button
          type="button"
          onClick={scrollRight}
          aria-label="Ver siguientes productos"
          className="absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-white/90 border border-stone-200 text-stone-700 shadow-md hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 flex items-center justify-center transition-all z-20 cursor-pointer active:scale-95 opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 focus:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Riel Deslizable de Productos con aceleración por GPU */}
        <div
          ref={railRef}
          className="flex gap-4 overflow-x-auto scrollbar-none py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden will-change-[scroll-position]"
        >
          {displayProducts.map((product, index) => {
            const imageUrl = product.url_imagen || '/logo-sandra.png';
            const isBajoPedido = category.key === 'BAJO_PEDIDO';
            const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra%2C%20quisiera%20cotizar%20la%20vela%20personalizada%3A%20${encodeURIComponent(product.nombre)}`;
            const loopKey = `${product.id}-loop-${index}`;

            if (isBajoPedido) {
              return (
                <div
                  key={loopKey}
                  className="group/card bg-white rounded-xl border border-stone-200/70 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-brand-gold/40 transition-all duration-300 min-w-[220px] sm:min-w-[260px] w-[220px] sm:w-[260px] shrink-0 flex-shrink-0"
                >
                  <div>
                    {/* 1. Imagen del Producto con enlace al detalle */}
                    <Link
                      href={`/productos/${product.slug}`}
                      className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 block"
                      aria-label={`Ver detalles de ${product.nombre}`}
                    >
                      <Image
                        src={imageUrl}
                        alt={`Vela artesanal ${product.nombre} Sandra Gil`}
                        fill
                        sizes="(max-width: 640px) 220px, 260px"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-950/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </Link>

                    {/* 2. Título */}
                    <div className="p-4 sm:p-5">
                      <Link href={`/productos/${product.slug}`} className="block">
                        <h3 className="font-serif font-medium text-stone-800 text-sm sm:text-base group-hover/card:text-brand-brown transition-colors duration-200 line-clamp-2 leading-snug">
                          {product.nombre}
                        </h3>
                      </Link>
                    </div>
                  </div>

                  {/* 3. Botón Cotiza por WhatsApp */}
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                    <div className="pt-2.5 border-t border-brand-gold/15">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 text-center text-xs sm:text-sm font-medium rounded-full bg-amber-50/80 border border-amber-300/80 text-amber-900 hover:bg-amber-100 hover:border-amber-400 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer active:scale-98"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0 text-amber-700" />
                        <span>Cotiza por WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={loopKey}
                href={`/productos/${product.slug}`}
                className="group/card bg-white rounded-xl border border-stone-200/70 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-brand-gold/40 transition-all duration-300 min-w-[220px] sm:min-w-[260px] w-[220px] sm:w-[260px] shrink-0 flex-shrink-0"
              >
                <div>
                  {/* 1. Imagen del Producto con relación aspect-[4/5] */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={imageUrl}
                      alt={`Vela artesanal ${product.nombre} Sandra Gil`}
                      fill
                      sizes="(max-width: 640px) 220px, 260px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-stone-950/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* 2. Título */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif font-medium text-stone-800 text-sm sm:text-base group-hover/card:text-brand-brown transition-colors duration-200 line-clamp-2 leading-snug">
                      {product.nombre}
                    </h3>
                  </div>
                </div>

                {/* 3. Precio */}
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                  <div className="pt-2.5 border-t border-brand-gold/15 flex items-center min-h-[38px]">
                    <span className="font-serif font-semibold text-brand-brown text-sm sm:text-base">
                      ${product.precio ? product.precio.toLocaleString('es-CO') : '0'} COP
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomeTypeCarousels({ groupedProducts }: HomeTypeCarouselsProps) {
  // Detección de montaje segura contra desincronización de hidratación (React 18 & 19)
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Computar el orden de categorías y los productos aleatorios por categoría
  const { categories, shuffledMap } = useMemo(() => {
    if (!isMounted) {
      return {
        categories: CATEGORIES_METADATA,
        shuffledMap: {
          VELA_ESCULPIDA: groupedProducts.VELA_ESCULPIDA || [],
          VELA_ENVASE: groupedProducts.VELA_ENVASE || [],
          JABON: groupedProducts.JABON || [],
          BAJO_PEDIDO: groupedProducts.BAJO_PEDIDO || [],
        },
      };
    }

    // 1. Barajar el orden vertical de las 4 categorías con Fisher-Yates
    const randomizedCategories = fisherYatesShuffle(CATEGORIES_METADATA);

    // 2. Barajar los productos de cada categoría
    const newShuffledMap: Record<string, CarouselProduct[]> = {};
    for (const cat of CATEGORIES_METADATA) {
      const items = groupedProducts[cat.key] || [];
      newShuffledMap[cat.key] = fisherYatesShuffle(items);
    }

    return {
      categories: randomizedCategories,
      shuffledMap: newShuffledMap,
    };
  }, [isMounted, groupedProducts]);

  return (
    <div className="w-full bg-[#FAF8F5] py-10 sm:py-16 space-y-12 sm:space-y-16">
      {categories.map((category) => {
        const products = shuffledMap[category.key] || [];
        return (
          <CategoryCarousel
            key={category.key}
            category={category}
            products={products}
          />
        );
      })}
    </div>
  );
}
