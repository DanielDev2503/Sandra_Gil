'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { AROMAS } from '@/lib/aromas';

const WA_NUMBER = '573175752029';

export interface CarouselProduct {
  id: string;
  nombre: string;
  slug: string;
  precio: number | null;
  url_imagen: string | null;
  tipo?: string | null;
  esBajoPedido?: boolean | null;
  aroma?: string | null;
  stock?: number | null;
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

const emptySubscribe = () => () => { };

interface CarouselProductCardProps {
  product: CarouselProduct;
  isBajoPedidoCategory: boolean;
}

/**
 * Tarjeta de producto de altura compacta con selector de aroma inline
 * idéntica en diseño y experiencia a la del catálogo.
 */
function CarouselProductCard({ product, isBajoPedidoCategory }: CarouselProductCardProps) {
  const { addToCart, clearCart } = useCart();
  const router = useRouter();

  const initialAroma = useMemo(() => {
    if (product.aroma) {
      const trimmed = product.aroma.trim();
      const match = AROMAS.find((a) => a.toLowerCase() === trimmed.toLowerCase());
      if (match) return match;
      return trimmed;
    }
    return '';
  }, [product.aroma]);

  const [selectedAroma, setSelectedAroma] = useState<string>(initialAroma);

  const imageUrl = product.url_imagen || '/logo-sandra.webp';
  const effectiveIsBajoPedido = isBajoPedidoCategory || Boolean(product.esBajoPedido);

  // Enlace dinámico de WhatsApp para productos bajo pedido con el aroma seleccionado
  const waAromaSuffix = selectedAroma ? ` con aroma: ${selectedAroma}` : '';
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hola Sandra, quisiera cotizar la vela personalizada: ${product.nombre}${waAromaSuffix}`
  )}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const effectiveAroma = selectedAroma || AROMAS[0];
    if (!selectedAroma) {
      setSelectedAroma(effectiveAroma);
    }
    addToCart(
      {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        url_imagen: imageUrl,
        aroma: effectiveAroma,
      },
      1,
      effectiveAroma
    );
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearCart();
    const effectiveAroma = selectedAroma || AROMAS[0];
    if (!selectedAroma) {
      setSelectedAroma(effectiveAroma);
    }
    addToCart(
      {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        url_imagen: imageUrl,
        aroma: effectiveAroma,
      },
      1,
      effectiveAroma
    );
    router.push('/checkout');
  };

  return (
    <div className="group/card bg-white rounded-xl border border-stone-200/70 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-brand-gold/40 transition-all duration-300 w-full flex-1">
      <div>
        {/* 1. Imagen aspect-[4/3] con esquinas redondeadas superiores */}
        <Link
          href={`/productos/${product.slug}`}
          className="relative aspect-[4/3] w-full block overflow-hidden bg-stone-100 rounded-t-xl group/img"
          aria-label={`Ver detalles de ${product.nombre}`}
        >
          <Image
            src={imageUrl}
            alt={`Vela artesanal ${product.nombre} Sandra Gil`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 220px"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-stone-950/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Link>

        {/* 2. Cuerpo: Título y Selector de Aroma */}
        <div className="p-2.5 sm:p-3 pb-1">
          <Link href={`/productos/${product.slug}`} className="block group/title">
            <h3 className="font-serif text-xs sm:text-sm font-medium text-stone-900 truncate my-1.5 group-hover/title:text-brand-brown transition-colors">
              {product.nombre}
            </h3>
          </Link>

          {/* Selector de aroma inline compacto */}
          <label htmlFor={`carousel-aroma-${product.id}`} className="sr-only">
            Seleccionar Aroma
          </label>
          <select
            id={`carousel-aroma-${product.id}`}
            value={selectedAroma}
            onChange={(e) => setSelectedAroma(e.target.value)}
            className="w-full text-[10px] sm:text-xs rounded-full border border-stone-200/90 bg-[#FAF8F5] py-1 px-2.5 text-stone-700 focus:outline-none focus:border-amber-400 mb-2 truncate cursor-pointer"
          >
            <option value="" disabled>Aroma (28 disponibles)...</option>
            {initialAroma && !AROMAS.some((a) => a.toLowerCase() === initialAroma.toLowerCase()) && (
              <option value={initialAroma}>{initialAroma}</option>
            )}
            {AROMAS.map((a) => (
              <option key={a} value={a}>
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Precios y Botones */}
      <div className="p-2.5 sm:p-3 pt-0 font-sans">
        {effectiveIsBajoPedido ? (
          <div>
            <div className="pt-1.5 border-t border-stone-100 flex justify-between items-center mb-1.5">
              <span className="text-[10px] sm:text-xs font-semibold text-brand-brown uppercase tracking-wider">
                Bajo Pedido
              </span>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-50/90 border border-amber-300 text-amber-950 hover:bg-amber-100 rounded-full py-1.5 px-3 text-[10px] sm:text-xs font-medium w-full flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-98 shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-800 shrink-0" />
              <span className="truncate">Cotiza por WhatsApp</span>
            </a>
          </div>
        ) : (
          <div>
            <div className="pt-1.5 border-t border-stone-100 flex justify-between items-center mb-1.5">
              <span className="font-serif text-sm sm:text-base font-semibold tracking-tight text-[#B8862D]">
                ${product.precio ? product.precio.toLocaleString('es-CO') : '0'} COP
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded-full py-1 px-2.5 text-[9px] sm:text-xs font-semibold uppercase tracking-wider bg-white border border-stone-300 text-stone-800 hover:border-[#B8862D] hover:text-[#B8862D] transition-all cursor-pointer flex items-center justify-center active:scale-98 shadow-2xs"
              >
                Añadir
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="rounded-full py-1 px-2.5 text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-white bg-[#B8862D] hover:bg-[#A37424] transition-all cursor-pointer flex items-center justify-center active:scale-98 shadow-2xs"
              >
                Comprar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface CategoryCarouselProps {
  category: CategoryMeta;
  products: CarouselProduct[];
}

/**
 * Carrusel por lotes con 5.5 productos visibles en escritorio (peeking card),
 * navegación fluida por botones circulares estilo e-commerce y swipe táctil nativo.
 */
function CategoryCarousel({ category, products }: CategoryCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isCheckingRef = useRef(false);

  const checkScrollBounds = useCallback(() => {
    if (isCheckingRef.current || !carouselRef.current) return;
    isCheckingRef.current = true;

    requestAnimationFrame(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      }
      isCheckingRef.current = false;
    });
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds, { passive: true });

    // Evitar layout thrashing sincrónico inicial: diferir la comprobación 300ms tras el montaje
    const timer = setTimeout(() => {
      checkScrollBounds();
    }, 300);

    return () => {
      clearTimeout(timer);
      el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [checkScrollBounds, products]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    // Desplazar el 88% del ancho visible para avanzar exactamente el bloque de productos
    const containerWidth = carouselRef.current.clientWidth;
    const scrollAmount = direction === 'left' ? -containerWidth * 0.88 : containerWidth * 0.88;

    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby={`heading-${category.key}`}
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Cabecera Limpia y Minimalista */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 px-1 pb-2.5 border-b border-brand-gold/15">
        <h2
          id={`heading-${category.key}`}
          className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-stone-900 tracking-tight"
        >
          {category.title}
        </h2>

        <Link
          href={category.href}
          className="text-xs sm:text-sm font-medium text-stone-600 hover:text-[#B8862D] flex items-center gap-1 transition-colors group"
        >
          <span>Ver todos</span>
          <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Contenedor del Riel con Flechas Circulares Flotantes (Mercado Libre Style) */}
      <div className="relative group/carousel">
        {/* Flecha Izquierda */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Ver productos anteriores"
            className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-stone-700 shadow-md border border-stone-200/80 flex items-center justify-center hover:bg-stone-50 hover:text-stone-900 hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-stone-800" />
          </button>
        )}

        {/* Riel Deslizable con Efecto Peeking */}
        <div
          ref={carouselRef}
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto scroll-smooth scrollbar-none py-2 px-1 focus:outline-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => {
            const isBajoPedido = category.key === 'BAJO_PEDIDO';
            return (
              <div
                key={product.id}
                className="snap-start flex-shrink-0 w-[68vw] sm:w-[38vw] md:w-[28vw] lg:w-[calc((100%-4*1rem)/5.5)] xl:w-[calc((100%-4*1.25rem)/5.5)] flex flex-col"
              >
                <CarouselProductCard
                  product={product}
                  isBajoPedidoCategory={isBajoPedido}
                />
              </div>
            );
          })}
        </div>

        {/* Flecha Derecha */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Ver siguientes productos"
            className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-stone-700 shadow-md border border-stone-200/80 flex items-center justify-center hover:bg-stone-50 hover:text-stone-900 hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-stone-800" />
          </button>
        )}
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
    <div className="relative w-full max-w-full overflow-hidden bg-[#FAF8F5] py-6 sm:py-8 space-y-6 sm:space-y-8">
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
