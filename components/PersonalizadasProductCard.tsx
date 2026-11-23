'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SkeletonImage from '@/components/SkeletonImage';
import { MessageCircle, Sparkles } from 'lucide-react';
import { AROMAS } from '@/lib/aromas';

const WA_NUMBER = '573175752029';

export interface PersonalizadaProductItem {
  id: string;
  slug: string;
  nombre: string;
  descripcion?: string | null;
  aroma?: string | null;
  url_imagen?: string | null;
  imagenes?: string[];
}

export default function PersonalizadasProductCard({
  product,
  priority = false,
}: {
  product: PersonalizadaProductItem;
  priority?: boolean;
}) {
  const [selectedAroma, setSelectedAroma] = useState<string>(product.aroma || '');
  const [showOptions, setShowOptions] = useState(false);

  const displayImage =
    product.imagenes && product.imagenes.length > 0
      ? product.imagenes[0]
      : product.url_imagen;

  const currentAroma = product.aroma;
  const waAromaSuffix = selectedAroma ? ` con aroma: ${selectedAroma}` : '';
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hola Sandra, me interesa cotizar la vela personalizada: ${product.nombre}${waAromaSuffix}`
  )}`;

  return (
    <div className="bg-white rounded-xl border border-stone-200/70 p-2.5 sm:p-3 flex flex-col justify-between hover:shadow-md transition-shadow group">
      <div>
        {/* Imagen cuadrada compacta */}
        <Link
          href={`/productos/${product.slug}`}
          prefetch={false}
          className="aspect-square w-full rounded-lg overflow-hidden relative mb-2 block bg-stone-100 group/img"
          aria-label={`Ver detalles de ${product.nombre}`}
        >
          <SkeletonImage
            src={displayImage ?? ''}
            alt={`Vela artesanal personalizada ${product.nombre} Sandra Gil Bogotá`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            fill
            priority={priority}
            sizes="(max-width: 640px) 35vw, (max-width: 1024px) 22vw, 180px"
          />

          {/* Badge superior discreto */}
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            <span className="bg-white/90 backdrop-blur-xs text-brand-brown border border-brand-gold/30 text-[9px] uppercase px-2 py-0.5 rounded-full font-medium shadow-2xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-brand-gold shrink-0" />
              Bajo Pedido
            </span>
          </div>
        </Link>

        {/* Título en una línea para evitar desbordes */}
        <Link href={`/productos/${product.slug}`} prefetch={false} className="block group/title">
          <h3 className="font-serif text-xs sm:text-sm text-stone-900 truncate mb-1 group-hover/title:text-brand-brown transition-colors">
            {product.nombre}
          </h3>
        </Link>

        {/* Selector de Aroma Inline Compacto */}
        <select
          aria-label={`Seleccionar aroma para ${product.nombre}`}
          value={selectedAroma}
          onFocus={() => setShowOptions(true)}
          onMouseEnter={() => setShowOptions(true)}
          onTouchStart={() => setShowOptions(true)}
          onChange={(e) => setSelectedAroma(e.target.value)}
          className="w-full text-[10px] py-1 px-2 rounded-full border border-stone-200 bg-[#FAF8F5] mb-2 truncate text-stone-700 focus:outline-none focus:border-amber-400 cursor-pointer"
        >
          <option value="" disabled>Aroma (28 disp.)...</option>
          {showOptions ? (
            <>
              {currentAroma && !AROMAS.some((a) => a.toLowerCase() === currentAroma.toLowerCase()) && (
                <option value={currentAroma}>{currentAroma}</option>
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

      {/* Botón de Acción Cotiza por WhatsApp */}
      <div className="pt-1 border-t border-stone-100">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Cotizar ${product.nombre} por WhatsApp`}
          className="w-full rounded-full py-1.5 px-2 text-[10px] sm:text-xs font-medium text-amber-950 bg-amber-50/90 border border-amber-300 hover:bg-amber-100 flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-98 shadow-2xs"
        >
          <MessageCircle className="w-3.5 h-3.5 text-amber-800 shrink-0" />
          <span className="truncate">Cotiza por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

/**
 * Grilla progresiva para velas bajo pedido: renderiza las primeras 6 tarjetas al inicio
 * y expande el resto al primer scroll o interacción para proteger LCP en móvil.
 */
export function PersonalizadasProductGrid({
  products,
}: {
  products: PersonalizadaProductItem[];
}) {
  const [visibleCount, setVisibleCount] = useState(6);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount >= products.length) return;

    const expandAll = () => {
      setVisibleCount(products.length);
    };

    const events: (keyof WindowEventMap)[] = ['scroll', 'wheel', 'touchmove', 'pointerdown', 'keydown'];
    events.forEach((ev) => window.addEventListener(ev, expandAll, { once: true, passive: true }));

    let observer: IntersectionObserver | null = null;
    if (sentinelRef.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            expandAll();
          }
        },
        { rootMargin: '150px' }
      );
      observer.observe(sentinelRef.current);
    }

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, expandAll));
      observer?.disconnect();
    };
  }, [visibleCount, products.length]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4">
        {products.slice(0, visibleCount).map((product, idx) => (
          <PersonalizadasProductCard key={product.id} product={product} priority={idx === 0} />
        ))}
      </div>
      {visibleCount < products.length && (
        <div ref={sentinelRef} className="h-4 w-full" aria-hidden="true" />
      )}
    </>
  );
}
