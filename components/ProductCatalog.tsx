'use client';

import React, { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { Sparkles, Eye, MessageCircle, Leaf, Flame, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import SkeletonImage from './SkeletonImage';

const WA_NUMBER = '573175752029';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  tipo?: 'VELA' | 'JABON';
  aroma?: string | null;
  material?: string | null;
  dimensiones?: string | null;
  precio: number | null;
  esBajoPedido: boolean;
  stock: number;
  url_imagen: string | null;
  imagenes?: string[];
  activo: boolean;
}

interface ProductCatalogProps {
  products: Product[];
}

const ARTISAN_BADGES = [
  { icon: Leaf, label: '100% Cera de Soya Natural' },
  { icon: Sparkles, label: 'Esencias Aromáticas Premium' },
  { icon: Flame, label: 'Combustión Limpia sin Plomo' },
  { icon: ShieldCheck, label: 'Vertido a Mano en Bogotá' },
];

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const { addToCart } = useCart();
  const [selectedAroma, setSelectedAroma] = useState<string>('Todos');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const aromas = useMemo(() => {
    const list = new Set(products.map((p) => p.aroma).filter((a): a is string => Boolean(a)));
    return ['Todos', ...Array.from(list)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedAroma === 'Todos') return products;
    return products.filter((p) => p.aroma === selectedAroma);
  }, [products, selectedAroma]);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">


      {/* Catalog Header */}
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Nuestra Colección</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900 mt-1 sm:mt-2">Velas con Propósito</h2>
        <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-3 sm:mt-4"></div>
        <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto mt-3 sm:mt-4 leading-relaxed font-sans">
          Cada vela está vertida a mano en Bogotá con cera de soya natural, enriquecida con esencias aromáticas premium.
        </p>
      </div>

      {/* Artisan badges row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
        {ARTISAN_BADGES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 bg-white border border-brand-gold/25 rounded-sm px-3 py-2.5 shadow-xs">
            <Icon className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="text-[10px] font-semibold text-brand-brown uppercase tracking-wide leading-tight">{label}</span>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
        {aromas.map((aroma) => (
          <button
            key={aroma}
            onClick={() => setSelectedAroma(aroma)}
            className={`px-4 py-2.5 min-h-[44px] text-xs uppercase tracking-wider font-medium rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer ${
              selectedAroma === aroma
                ? 'bg-brand-gold text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {aroma}
          </button>
        ))}
      </div>

      {/* Products Grid: grid-cols-1 on small mobile screens (320px-430px), sm:grid-cols-2 on small tablets, etc. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => {
          const isLowStock = product.stock > 0 && product.stock <= 15;
          const isOutOfStock = product.stock <= 0;
          // Prefer first image from Supabase imagenes array
          const displayImage =
            product.imagenes && product.imagenes.length > 0
              ? product.imagenes[0]
              : product.url_imagen;

          const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20interesa%20cotizar%20la%20vela%20personalizada:%20${encodeURIComponent(product.nombre)}`;

          return (
            <div
              key={product.id}
              className="group bg-white rounded-lg border border-stone-200/60 overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-350 ease-in-out"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image */}
              <Link href={`/productos/${product.id}`} className="relative aspect-square block overflow-hidden bg-stone-100">
                <SkeletonImage
                  src={displayImage ?? ''}
                  alt={product.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Handcrafted Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs border border-stone-100 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-gold shrink-0" />
                  <span className="text-[10px] font-medium text-stone-700 uppercase tracking-wider">
                    {product.esBajoPedido ? 'Bajo Pedido' : 'Hecho a Mano'}
                  </span>
                </div>

                {/* Aroma & Material badges */}
                <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5 max-w-[90%]">
                  <span className="bg-brand-brown/80 backdrop-blur-xs text-[#FAF8F5] px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-widest truncate">
                    {product.aroma}
                  </span>
                  {product.material && (
                    <span className="bg-brand-gold/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-widest truncate">
                      {product.material}
                    </span>
                  )}
                </div>

                {/* Hover overlay */}
                {hoveredProduct === product.id && (
                  <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] hidden sm:flex items-center justify-center transition-all duration-300">
                    <span className="bg-white text-stone-900 text-xs font-semibold px-4 py-2 rounded-sm shadow-md flex items-center gap-2">
                      <Eye className="w-4 h-4" /> Ver Detalles
                    </span>
                  </div>
                )}
              </Link>

              {/* Product Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/productos/${product.id}`} className="block group/title">
                    <h3 className="font-serif font-medium text-stone-900 text-base sm:text-lg group-hover/title:text-brand-gold transition duration-200 line-clamp-2 min-h-[2.8rem] sm:min-h-[3.2rem] leading-snug">
                      {product.nombre}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-400">
                    <span>Tamaño: {product.dimensiones}</span>
                    <span>•</span>
                    <span>{product.material || 'Cera de Soya'}</span>
                  </div>

                  <p className="text-xs text-stone-500 mt-2.5 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    {product.descripcion ? product.descripcion.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : ''}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-stone-100">
                  <div className="flex justify-between items-center mb-3">
                    {/* Price or "Bajo Pedido" label */}
                    {product.esBajoPedido ? (
                      <span className="font-sans text-xs font-semibold text-brand-brown uppercase tracking-wider">
                        Elaboración Bajo Pedido
                      </span>
                    ) : (
                      <span className="font-serif font-semibold text-brand-brown text-base sm:text-lg">
                        ${product.precio?.toLocaleString('es-CO')} COP
                      </span>
                    )}

                    {/* Stock status */}
                    {!product.esBajoPedido && (
                      isOutOfStock ? (
                        <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Agotado</span>
                      ) : isLowStock ? (
                        <span className="text-[10px] text-amber-600 font-medium uppercase tracking-wider animate-pulse">
                          Últimas {product.stock}
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">En Stock</span>
                      )
                    )}
                  </div>

                  {/* CTA button with touch target height min-h-[44px] */}
                  {product.esBajoPedido ? (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 min-h-[44px] text-center text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-300 bg-[#25D366] hover:bg-[#1da851] text-white shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 active:scale-98"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Cotizar por WhatsApp
                    </a>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      disabled={isOutOfStock}
                      className={`w-full py-3 min-h-[44px] text-center text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-98 ${
                        isOutOfStock
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : 'bg-brand-brown hover:bg-brand-gold text-white shadow-xs hover:shadow-md'
                      }`}
                    >
                      {isOutOfStock ? 'Agotado' : 'Añadir al Carrito'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

