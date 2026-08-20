'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { Sparkles, Eye, ShoppingBag, MessageCircle, Leaf, Flame, ShieldCheck, Check } from 'lucide-react';
import SkeletonImage from './SkeletonImage';
import CandleGlowPulse from './CandleGlowPulse';

const WA_NUMBER = '573175752029';

interface Variacion {
  id: string;
  nombre: string;
  imagen: string;
  precio: number | null;
  activo: boolean;
}

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
  variaciones?: Variacion[];
}

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const { addToCart } = useCart();
  const [selectedAroma, setSelectedAroma] = useState<string>('Todos');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Extract all unique aromas from active products
  const aromas = useMemo(() => {
    const list = new Set(products.map((p) => p.aroma).filter((a): a is string => Boolean(a)));
    return ['Todos', ...Array.from(list)];
  }, [products]);

  // Filter products by selected aroma
  const filteredProducts = useMemo(() => {
    if (selectedAroma === 'Todos') return products;
    return products.filter((p) => p.aroma === selectedAroma);
  }, [products, selectedAroma]);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      {/* Catalog Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-stone-50 rounded-full border border-brand-gold/25 mb-3">
          <CandleGlowPulse size="sm">
            <Sparkles className="w-3 h-3 text-brand-gold" />
          </CandleGlowPulse>
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold font-sans">
            Nuestra Colección
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900 tracking-tight">
          Velas con Propósito & Luz Propia
        </h2>
        <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-3 mb-4" />
        <p className="text-stone-500 text-xs sm:text-sm font-sans font-light leading-relaxed">
          Cada diseño es vertido individualmente a mano con cera de soya natural, enriquecido con fragancias selectas y detalles botánicos preservados.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-14">
        {aromas.map((aroma) => {
          const isSelected = selectedAroma === aroma;
          return (
            <button
              key={aroma}
              onClick={() => setSelectedAroma(aroma)}
              className={`px-5 py-2.5 min-h-[44px] text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                isSelected
                  ? 'bg-brand-brown text-white border-brand-brown shadow-md scale-102'
                  : 'bg-white text-stone-600 border-brand-gold/20 hover:border-brand-gold/60 hover:bg-stone-50'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 text-brand-gold" />}
              <span>{aroma}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid with motion stagger */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
      >
        <AnimatePresence>
          {filteredProducts.map((product, idx) => {
            const isLowStock = product.stock > 0 && product.stock <= 10;
            const isOutOfStock = product.stock <= 0;
            
            const displayImage =
              product.imagenes && product.imagenes.length > 0
                ? product.imagenes[0]
                : product.url_imagen;

            const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20interesa%20cotizar%20la%20vela%20personalizada:%20${encodeURIComponent(product.nombre)}`;

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white rounded-xl border border-brand-gold/20 overflow-hidden flex flex-col h-full hover:shadow-xl hover:border-brand-gold/60 transition-all duration-300"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image Box */}
                <Link 
                  href={`/productos/${product.id}`} 
                  className="relative aspect-square block overflow-hidden bg-[#FAF8F5]"
                  aria-label={`Ver detalles de ${product.nombre}`}
                >
                  <SkeletonImage
                    src={displayImage ?? ''}
                    alt={product.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-brand-gold/25 flex items-center gap-1.5 z-10">
                    <Sparkles className="w-3 h-3 text-brand-gold shrink-0" />
                    <span className="text-[9px] font-bold text-brand-brown uppercase tracking-wider font-sans">
                      {product.esBajoPedido ? 'Bajo Pedido' : 'Cera de Soya'}
                    </span>
                  </div>

                  {/* Scent & Dimension Pills */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-1.5 z-10">
                    {product.aroma && (
                      <span className="bg-stone-900/80 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-sans truncate max-w-[70%]">
                        {product.aroma}
                      </span>
                    )}
                  </div>

                  {/* Desktop Quick View Overlay */}
                  <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center pointer-events-none">
                    <span className="bg-white text-stone-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Ver Detalles</span>
                    </span>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/productos/${product.id}`} className="block group/title">
                      <h3 className="font-serif font-medium text-stone-900 text-base sm:text-lg group-hover/title:text-brand-brown transition-colors duration-200 line-clamp-2 leading-snug">
                        {product.nombre}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-stone-400 font-sans">
                      <span>{product.dimensiones || 'Tamaño estándar'}</span>
                      <span>•</span>
                      <span>100% Artesanal</span>
                    </div>

                    <p className="text-xs text-stone-500 mt-2.5 line-clamp-2 leading-relaxed font-sans font-light">
                      {product.descripcion ? product.descripcion.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : ''}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-brand-gold/15">
                    
                    {/* Price & Stock status */}
                    <div className="flex justify-between items-center mb-3">
                      {product.esBajoPedido ? (
                        <span className="font-sans text-xs font-bold text-brand-brown uppercase tracking-wider">
                          Bajo Pedido
                        </span>
                      ) : (
                        <span className="font-serif font-semibold text-brand-brown text-base sm:text-lg">
                          ${product.precio?.toLocaleString('es-CO')} COP
                        </span>
                      )}

                      {!product.esBajoPedido && (
                        isOutOfStock ? (
                          <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider">
                            Agotado
                          </span>
                        ) : isLowStock ? (
                          <span className="text-[10px] text-amber-600 font-semibold uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                            Últimas {product.stock}
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">
                            En Stock
                          </span>
                        )
                      )}
                    </div>

                    {/* Action Button */}
                    {product.esBajoPedido ? (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 min-h-[44px] text-center text-xs uppercase tracking-wider font-bold rounded-lg transition-all duration-300 bg-[#25D366] hover:bg-[#1da851] text-white shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Cotizar por WhatsApp</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        disabled={isOutOfStock}
                        className={`w-full py-3.5 min-h-[44px] text-center text-xs uppercase tracking-widest font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                          isOutOfStock
                            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            : 'bg-brand-brown hover:bg-stone-900 text-white shadow-xs hover:shadow-md'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4 text-brand-gold" />
                        <span>{isOutOfStock ? 'Agotado' : 'Añadir al Carrito'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

    </section>
  );
}
