'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback, useId } from 'react';
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
  pebetero: CarouselProduct[];
  waxmell: CarouselProduct[];
  BAJO_PEDIDO: CarouselProduct[];
}

export interface ColeccionCarousel {
  id: string;
  nombre: string;
  productos: CarouselProduct[];
}

interface HomeTypeCarouselsProps {
  groupedProducts: GroupedProducts;
  colecciones?: ColeccionCarousel[];
  categoryOrder?: (keyof GroupedProducts)[];
}

interface CarouselSectionMeta {
  key: string;
  title: string;
  href: string;
}

interface CategoryMeta extends CarouselSectionMeta {
  key: keyof GroupedProducts;
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
    key: 'pebetero',
    title: 'Pebeteros',
    href: '/catalogo?tipo=pebetero',
  },
  {
    key: 'waxmell',
    title: 'Waxmell',
    href: '/catalogo?tipo=waxmell',
  },
  {
    key: 'BAJO_PEDIDO',
    title: 'Velas Bajo Pedido',
    href: '/personalizadas',
  },
];

function getColeccionHref(nombre: string): string {
  const norm = nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (norm.includes('navid')) return '/catalogo?temporada=navidad';
  if (norm.includes('oton')) return '/catalogo?temporada=otono';
  if (norm.includes('amor') || norm.includes('amistad')) return '/catalogo?temporada=amor_amistad';
  if (norm.includes('primavera')) return '/catalogo?temporada=primavera';
  return '/catalogo';
}

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
  const aromaSelectId = useId();

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
  const [showOptions, setShowOptions] = useState(false);

  const imageUrl = product.url_imagen || '/logo-sandra.webp';
  const effectiveIsBajoPedido = isBajoPedidoCategory || Boolean(product.esBajoPedido);
  const isOutOfStock = !effectiveIsBajoPedido && typeof product.stock === 'number' && product.stock <= 0;

  // Enlace dinámico de WhatsApp para productos bajo pedido con el aroma seleccionado
  const waAromaSuffix = selectedAroma ? ` con aroma: ${selectedAroma}` : '';
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hola Sandra, quisiera cotizar la vela personalizada: ${product.nombre}${waAromaSuffix}`
  )}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
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
        stock: product.stock,
        esBajoPedido: effectiveIsBajoPedido,
      },
      1,
      effectiveAroma
    );
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
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
        stock: product.stock,
        esBajoPedido: effectiveIsBajoPedido,
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
          prefetch={false}
          className="relative aspect-[4/3] w-full block overflow-hidden bg-stone-100 rounded-t-xl group/img"
          aria-label={`Ver detalles de ${product.nombre}`}
        >
          <Image
            src={imageUrl}
            alt={`Vela artesanal ${product.nombre} Sandra Gil`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 18vw, (max-width: 1024px) 16vw, 180px"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-stone-950/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Link>

        {/* 2. Cuerpo: Título y Selector de Aroma */}
        <div className="p-2.5 sm:p-3 pb-1">
          <Link href={`/productos/${product.slug}`} prefetch={false} className="block group/title">
            <h3 className="font-serif text-xs sm:text-sm font-medium text-stone-900 truncate my-1.5 group-hover/title:text-brand-brown transition-colors">
              {product.nombre}
            </h3>
          </Link>

          {/* Selector de aroma inline compacto */}
          <label htmlFor={aromaSelectId} className="sr-only">
            Seleccionar Aroma
          </label>
          <select
            id={aromaSelectId}
            aria-label={`Seleccionar aroma para ${product.nombre}`}
            value={selectedAroma}
            onFocus={() => setShowOptions(true)}
            onMouseEnter={() => setShowOptions(true)}
            onTouchStart={() => setShowOptions(true)}
            onChange={(e) => setSelectedAroma(e.target.value)}
            className="w-full text-[10px] sm:text-xs rounded-full border border-stone-200/90 bg-[#FAF8F5] py-1 px-2.5 text-stone-700 focus:outline-none focus:border-amber-400 mb-2 truncate cursor-pointer"
          >
            <option value="" disabled>Aroma (28 disponibles)...</option>
            {showOptions ? (
              <>
                {initialAroma && !AROMAS.some((a) => a.toLowerCase() === initialAroma.toLowerCase()) && (
                  <option value={initialAroma}>{initialAroma}</option>
                )}
                {AROMAS.map((a) => (
                  <option key={a} value={a}>
                    {a.charAt(0).toUpperCase() + a.slice(1)}
                  </option>
                ))}
              </>
            ) : (
              selectedAroma && (
                <option value={selectedAroma}>
                  {selectedAroma.charAt(0).toUpperCase() + selectedAroma.slice(1)}
                </option>
              )
            )}
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
              aria-label={`Cotizar ${product.nombre} por WhatsApp`}
              className="bg-amber-50/90 border border-amber-300 text-amber-950 hover:bg-amber-100 rounded-full py-1.5 px-3 text-[10px] sm:text-xs font-medium w-full flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-98 shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-800 shrink-0" />
              <span className="truncate">Cotiza por WhatsApp</span>
            </a>
          </div>
        ) : (
          <div>
            <div className="pt-1.5 border-t border-stone-100 flex justify-between items-center mb-1.5">
              <span className="font-serif text-sm sm:text-base font-semibold tracking-tight text-[#855E16]">
                ${product.precio ? product.precio.toLocaleString('es-CO') : '0'} COP
              </span>
              {isOutOfStock && (
                <span className="text-[9px] text-red-700 font-bold uppercase tracking-wider">
                  Agotado
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="rounded-full py-1 px-2.5 text-[9px] sm:text-xs font-semibold uppercase tracking-wider bg-white border border-stone-300 text-stone-800 hover:border-[#855E16] hover:text-[#855E16] transition-all cursor-pointer flex items-center justify-center active:scale-98 shadow-2xs disabled:border-stone-200 disabled:text-stone-600 disabled:bg-stone-50 disabled:cursor-not-allowed"
              >
                Añadir
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="rounded-full py-1 px-2.5 text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-white bg-[#855E16] hover:bg-[#704E11] transition-all cursor-pointer flex items-center justify-center active:scale-98 shadow-2xs disabled:bg-stone-200 disabled:text-stone-600 disabled:cursor-not-allowed"
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
  category: CarouselSectionMeta;
  products: CarouselProduct[];
}

/**
 * Carrusel por lotes con 5.5 productos visibles en escritorio (peeking card),
 * navegación fluida por botones circulares estilo e-commerce y swipe táctil nativo.
 */
function CategoryCarousel({ category, products }: CategoryCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(products.length > 2);
  const [showAllCards, setShowAllCards] = useState(false);
  const isCheckingRef = useRef(false);
  const visibleProducts = showAllCards ? products : products.slice(0, 6);

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
    return () => {
      el.removeEventListener('scroll', checkScrollBounds);
    };
  }, [checkScrollBounds]);

  const handleScroll = (direction: 'left' | 'right') => {
    setShowAllCards(true);
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
      onMouseEnter={() => setShowAllCards(true)}
      onTouchStart={() => setShowAllCards(true)}
      onFocus={() => setShowAllCards(true)}
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
          prefetch={false}
          aria-label={`Ver todos los productos de ${category.title}`}
          className="text-xs sm:text-sm font-medium text-stone-600 hover:text-[#855E16] flex items-center gap-1 transition-colors group"
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
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto scrollbar-none py-2 px-1 focus:outline-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {visibleProducts.map((product) => {
            const isBajoPedido = category.key === 'BAJO_PEDIDO';
            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-[48vw] sm:w-[38vw] md:w-[28vw] lg:w-[calc((100%-4*1rem)/5.5)] xl:w-[calc((100%-4*1.25rem)/5.5)] flex flex-col"
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

export default function HomeTypeCarousels({
  groupedProducts,
  colecciones,
  categoryOrder,
}: HomeTypeCarouselsProps) {
  const categories = useMemo(() => {
    if (!categoryOrder || categoryOrder.length === 0) {
      return CATEGORIES_METADATA;
    }
    const orderMap = new Map(categoryOrder.map((key, idx) => [key, idx]));
    return [...CATEGORIES_METADATA].sort(
      (a, b) => (orderMap.get(a.key) ?? 99) - (orderMap.get(b.key) ?? 99)
    );
  }, [categoryOrder]);

  const allSections = useMemo(() => {
    const sections: Array<{
      key: string;
      category: CarouselSectionMeta;
      products: CarouselProduct[];
    }> = [];

    if (colecciones && colecciones.length > 0) {
      for (const coleccion of colecciones) {
        if (coleccion.productos.length > 0) {
          sections.push({
            key: coleccion.id,
            category: {
              key: `coleccion-${coleccion.id}`,
              title: coleccion.nombre,
              href: getColeccionHref(coleccion.nombre),
            },
            products: coleccion.productos,
          });
        }
      }
    }

    for (const category of categories) {
      const products = groupedProducts[category.key] || [];
      if (products.length > 0) {
        sections.push({
          key: category.key,
          category,
          products,
        });
      }
    }

    return sections;
  }, [colecciones, categories, groupedProducts]);

  const [visibleCarousels, setVisibleCarousels] = useState(1);

  useEffect(() => {
    if (visibleCarousels >= allSections.length) return;

    const expandAll = () => {
      setVisibleCarousels(allSections.length);
    };

    const events: (keyof WindowEventMap)[] = ['scroll', 'wheel', 'touchmove', 'pointerdown', 'keydown'];
    events.forEach((ev) => window.addEventListener(ev, expandAll, { once: true, passive: true }));

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, expandAll));
    };
  }, [visibleCarousels, allSections.length]);

  return (
    <div className="relative w-full max-w-full overflow-hidden bg-[#FAF8F5] py-6 sm:py-8 space-y-6 sm:space-y-8">
      {allSections.slice(0, visibleCarousels).map((section) => (
        <CategoryCarousel
          key={section.key}
          category={section.category}
          products={section.products}
        />
      ))}
    </div>
  );
}
