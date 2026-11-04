'use client';

import React, { useState } from 'react';
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
}: {
  product: PersonalizadaProductItem;
}) {
  const [selectedAroma, setSelectedAroma] = useState<string>(product.aroma || '');

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
          className="aspect-square w-full rounded-lg overflow-hidden relative mb-2 block bg-stone-100 group/img"
          aria-label={`Ver detalles de ${product.nombre}`}
        >
          <SkeletonImage
            src={displayImage ?? ''}
            alt={`Vela artesanal personalizada ${product.nombre} Sandra Gil Bogotá`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
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
        <Link href={`/productos/${product.slug}`} className="block group/title">
          <h3 className="font-serif text-xs sm:text-sm text-stone-900 truncate mb-1 group-hover/title:text-brand-brown transition-colors">
            {product.nombre}
          </h3>
        </Link>

        {/* Selector de Aroma Inline Compacto */}
        <select
          value={selectedAroma}
          onChange={(e) => setSelectedAroma(e.target.value)}
          className="w-full text-[10px] py-1 px-2 rounded-full border border-stone-200 bg-[#FAF8F5] mb-2 truncate text-stone-700 focus:outline-none focus:border-amber-400 cursor-pointer"
        >
          <option value="" disabled>Aroma (28 disp.)...</option>
          {currentAroma && !AROMAS.some((a) => a.toLowerCase() === currentAroma.toLowerCase()) && (
            <option value={currentAroma}>{currentAroma}</option>
          )}
          {AROMAS.map((a) => (
            <option key={a} value={a}>
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Botón de Acción Cotiza por WhatsApp */}
      <div className="pt-1 border-t border-stone-100">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-full py-1.5 px-2 text-[10px] sm:text-xs font-medium text-amber-950 bg-amber-50/90 border border-amber-300 hover:bg-amber-100 flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-98 shadow-2xs"
        >
          <MessageCircle className="w-3.5 h-3.5 text-amber-800 shrink-0" />
          <span className="truncate">Cotiza por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
