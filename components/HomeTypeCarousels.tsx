'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

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
  viewMoreKicker: string;
  viewMoreTitle: string;
  viewMoreCta: string;
}

const CATEGORIES_METADATA: CategoryMeta[] = [
  {
    key: 'VELA_ESCULPIDA',
    title: 'Velas Esculpidas',
    href: '/catalogo?tipo=VELA_ESCULPIDA',
    viewMoreKicker: 'Colección Completa',
    viewMoreTitle: 'Explorar Velas Esculpidas',
    viewMoreCta: 'Ver catálogo',
  },
  {
    key: 'VELA_ENVASE',
    title: 'Velas en Envase',
    href: '/catalogo?tipo=VELA_ENVASE',
    viewMoreKicker: 'Colección Completa',
    viewMoreTitle: 'Explorar Velas en Envase',
    viewMoreCta: 'Ver catálogo',
  },
  {
    key: 'JABON',
    title: 'Jabones Artesanales',
    href: '/catalogo?tipo=JABON',
    viewMoreKicker: 'Colección Completa',
    viewMoreTitle: 'Explorar Jabones Artesanales',
    viewMoreCta: 'Ver catálogo',
  },
  {
    key: 'BAJO_PEDIDO',
    title: 'Velas Bajo Pedido',
    href: '/personalizadas',
    viewMoreKicker: 'Exclusivo por Encargo',
    viewMoreTitle: 'Personalizar mi Vela',
    viewMoreCta: 'Explorar Diseños Bajo Pedido',
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

export default function HomeTypeCarousels({ groupedProducts }: HomeTypeCarouselsProps) {
  // Detección de montaje segura contra desincronización de hidratación (React 18 & 19)
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Computar el orden de categorías y los 4 productos aleatorios por categoría
  const { categories, shuffledMap } = React.useMemo(() => {
    if (!isMounted) {
      return {
        categories: CATEGORIES_METADATA,
        shuffledMap: {
          VELA_ESCULPIDA: groupedProducts.VELA_ESCULPIDA?.slice(0, 4) || [],
          VELA_ENVASE: groupedProducts.VELA_ENVASE?.slice(0, 4) || [],
          JABON: groupedProducts.JABON?.slice(0, 4) || [],
          BAJO_PEDIDO: groupedProducts.BAJO_PEDIDO?.slice(0, 4) || [],
        },
      };
    }

    // 1. Barajar el orden vertical de las 4 categorías con Fisher-Yates
    const randomizedCategories = fisherYatesShuffle(CATEGORIES_METADATA);

    // 2. Barajar los productos de cada categoría y tomar exactamente los primeros 4
    const newShuffledMap: Record<string, CarouselProduct[]> = {};
    for (const cat of CATEGORIES_METADATA) {
      const items = groupedProducts[cat.key] || [];
      newShuffledMap[cat.key] = fisherYatesShuffle(items).slice(0, 4);
    }

    return {
      categories: randomizedCategories,
      shuffledMap: newShuffledMap,
    };
  }, [isMounted, groupedProducts]);

  return (
    <div className="w-full bg-[#FAF8F5] py-10 sm:py-16 space-y-12 sm:space-y-16">
      {categories.map((category) => {
        const totalItems = groupedProducts[category.key]?.length || 0;
        const currentProducts = shuffledMap[category.key] || [];

        // Si la categoría no tiene productos, no se renderiza
        if (totalItems === 0) return null;

        return (
          <section
            key={category.key}
            aria-labelledby={`heading-${category.key}`}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Cabecera de Sección limpia (sin enlace redundante 'Ver todas' en la cabecera) */}
            <div className="mb-6 sm:mb-8 pb-3 border-b border-brand-gold/15">
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

            {/* Track de Productos con Scroll-Snap responsivo */}
            <div className="flex overflow-x-auto pb-4 gap-4 sm:gap-5 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-5 md:overflow-visible">
              {/* 4 Tarjetas de Producto Estándar (Depuradas: Imagen + Título + Precio / Cotiza por WhatsApp) */}
              {currentProducts.map((product) => {
                const imageUrl = product.url_imagen || '/logo-sandra.png';
                const isBajoPedido = category.key === 'BAJO_PEDIDO';
                const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra%2C%20quisiera%20cotizar%20la%20vela%20personalizada%3A%20${encodeURIComponent(product.nombre)}`;

                if (isBajoPedido) {
                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-xl border border-stone-200/70 overflow-hidden flex flex-col h-full hover:shadow-lg hover:border-brand-gold/40 transition-all duration-300 min-w-[240px] md:min-w-0 snap-start"
                    >
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
                          sizes="(max-width: 640px) 75vw, (max-width: 1024px) 25vw, 20vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-stone-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </Link>

                      {/* 2 & 3. Nombre y Botón Cotiza por WhatsApp */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <Link href={`/productos/${product.slug}`} className="block">
                          <h3 className="font-serif font-medium text-stone-800 text-sm sm:text-base group-hover:text-brand-brown transition-colors duration-200 line-clamp-2 leading-snug">
                            {product.nombre}
                          </h3>
                        </Link>

                        <div className="mt-3 pt-2.5 border-t border-brand-gold/15">
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 text-center text-xs sm:text-sm font-medium rounded-full bg-amber-50/80 border border-amber-300/80 text-amber-900 hover:bg-amber-100 hover:border-amber-400 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer active:scale-98"
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
                    key={product.id}
                    href={`/productos/${product.slug}`}
                    className="group bg-white rounded-xl border border-stone-200/70 overflow-hidden flex flex-col h-full hover:shadow-lg hover:border-brand-gold/40 transition-all duration-300 min-w-[240px] md:min-w-0 snap-start"
                  >
                    {/* 1. Imagen del Producto con relación aspect-[4/5] y esquinas uniformes */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                      <Image
                        src={imageUrl}
                        alt={`Vela artesanal ${product.nombre} Sandra Gil`}
                        fill
                        sizes="(max-width: 640px) 75vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* 2 & 3. Nombre y Precio estrictos (sin badges ni líneas accesorias) */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <h3 className="font-serif font-medium text-stone-800 text-sm sm:text-base group-hover:text-brand-brown transition-colors duration-200 line-clamp-2 leading-snug">
                        {product.nombre}
                      </h3>

                      <div className="mt-3 pt-2.5 border-t border-brand-gold/15 flex items-center min-h-[38px]">
                        <span className="font-serif font-semibold text-brand-brown text-sm sm:text-base">
                          ${product.precio
                            ? product.precio.toLocaleString('es-CO')
                            : '0'} COP
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* 5ta Tarjeta Especial: "Ver Más / Explorar Colección Completa" */}
              <Link
                href={category.href}
                className="border-2 border-dashed border-amber-200/80 bg-amber-50/40 hover:bg-amber-100/50 transition-all duration-300 rounded-xl flex flex-col items-center justify-center text-center p-6 group cursor-pointer snap-start min-w-[240px] md:min-w-0 h-full shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100/80 border border-amber-300/60 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-brand-gold" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold font-sans mb-1">
                  {category.viewMoreKicker}
                </span>
                <h4 className="font-serif text-base sm:text-lg font-medium text-stone-900 mb-2">
                  {category.viewMoreTitle}
                </h4>
                <p className="text-xs text-stone-600 font-light mb-4 font-sans">
                  {totalItems} piezas disponibles
                </p>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 border border-amber-300/60 group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:text-stone-950 text-xs font-semibold text-brand-brown transition-all duration-300 uppercase tracking-wider font-sans shadow-2xs">
                  <span>{category.viewMoreCta}</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold group-hover:text-stone-950 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
