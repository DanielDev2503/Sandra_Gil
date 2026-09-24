'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { 
  Sparkles, 
  Eye, 
  ShoppingBag, 
  MessageCircle, 
  Leaf, 
  Flame, 
  ShieldCheck, 
  Check, 
  Zap, 
  ArrowRight 
} from 'lucide-react';
import SkeletonImage from './SkeletonImage';
import CandleGlowPulse from './CandleGlowPulse';
import { isSoapProduct } from '@/app/catalogo/CatalogShell';

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
  slug: string;
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
  showFilters?: boolean;
}

export default function ProductCatalog({ products, showFilters = false }: ProductCatalogProps) {
  const router = useRouter();
  const { addToCart, clearCart } = useCart();
  const [selectedAroma, setSelectedAroma] = useState<string>('Todos');

  // Extract all unique aromas from active products (only used if showFilters is true)
  const aromas = useMemo(() => {
    if (!showFilters) return [];
    const list = new Set(products.map((p) => p.aroma).filter((a): a is string => Boolean(a)));
    return ['Todos', ...Array.from(list)];
  }, [products, showFilters]);

  // Filter products by selected aroma only if showFilters is active
  const filteredProducts = useMemo(() => {
    if (!showFilters || selectedAroma === 'Todos') return products;
    return products.filter((p) => p.aroma === selectedAroma);
  }, [products, selectedAroma, showFilters]);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (product.stock <= 0 || product.esBajoPedido) return;

    const displayImage =
      product.imagenes && product.imagenes.length > 0
        ? product.imagenes[0]
        : product.url_imagen;

    const defaultAroma = product.aroma || (isSoapProduct(product) ? null : 'Lavanda & Manzanilla');

    addToCart(
      {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        url_imagen: displayImage,
        aroma: defaultAroma,
      },
      1,
      defaultAroma || undefined,
      product.variaciones && product.variaciones.length > 0 ? product.variaciones[0] : null
    );
  };

  const handleBuyNow = (product: Product, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (product.stock <= 0 || product.esBajoPedido) return;

    const displayImage =
      product.imagenes && product.imagenes.length > 0
        ? product.imagenes[0]
        : product.url_imagen;

    const defaultAroma = product.aroma || (isSoapProduct(product) ? null : 'Lavanda & Manzanilla');

    clearCart();
    addToCart(
      {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        url_imagen: displayImage,
        aroma: defaultAroma,
      },
      1,
      defaultAroma || undefined,
      product.variaciones && product.variaciones.length > 0 ? product.variaciones[0] : null
    );
    router.push('/checkout');
  };

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
          Cada diseño es vertido individualmente a mano con cera de soya natural, enriquecido con fragancias selectas y detalles botánicos naturales seleccionados.
        </p>
      </div>

      {/* Scent Filters (Hidden in Home view by default to keep clean aesthetics) */}
      {showFilters && aromas.length > 0 && (
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
                <span className="capitalize">{aroma}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Products Grid with motion stagger */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
      >
        <AnimatePresence>
          {filteredProducts.map((product, idx) => {
            const soap = isSoapProduct(product);
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
              >
                {/* Product Image Box */}
                <Link 
                  href={`/productos/${product.slug}`} 
                  className="relative aspect-square block overflow-hidden bg-[#FAF8F5]"
                  aria-label={`Ver detalles de ${product.nombre}`}
                >
                  <SkeletonImage
                    src={displayImage ?? ''}
                    alt={soap ? `Jabón artesanal botánico ${product.nombre} Sandra Gil - Taller Bogotá` : `Vela artesanal ${product.nombre} en cera de soya natural Sandra Gil - Taller Bogotá`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Top-Left Dynamic Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs border border-brand-gold/30 flex items-center gap-1.5 z-10">
                    <Sparkles className="w-3 h-3 text-brand-gold shrink-0" />
                    <span className="text-[10px] font-semibold text-brand-brown uppercase tracking-wider font-sans truncate max-w-[160px] sm:max-w-[180px]">
                      {product.esBajoPedido
                        ? 'Bajo Pedido'
                        : soap
                          ? 'Jabón Artesanal'
                          : product.aroma
                            ? product.aroma
                            : 'Vela Artesanal'}
                    </span>
                  </div>

                  {/* Top-Right Stock Badge */}
                  {!product.esBajoPedido && (
                    isOutOfStock ? (
                      <div className="absolute top-3 right-3 bg-rose-600/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider z-10 shadow-xs">
                        Agotado
                      </div>
                    ) : isLowStock ? (
                      <div className="absolute top-3 right-3 bg-amber-500/95 backdrop-blur-xs text-white px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider z-10 shadow-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Últimas {product.stock}
                      </div>
                    ) : null
                  )}

                  {/* Bottom Badges: Authentic Material & Scent Attributes */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-1.5 z-10 max-w-[90%]">
                    <span className="bg-brand-gold/85 backdrop-blur-xs text-white px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-widest truncate shadow-xs">
                      {product.material || (soap ? 'Base Botánica Vegetal' : '100% Cera de Soya Natural')}
                    </span>
                    {product.esBajoPedido && !soap && product.aroma && (
                      <span className="bg-brand-brown/85 backdrop-blur-xs text-[#FAF8F5] px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-widest truncate shadow-xs">
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
                    <Link href={`/productos/${product.slug}`} className="block group/title">
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

                  <div className="mt-5 pt-4 border-t border-brand-gold/15 font-sans">
                    
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

                    {/* Action Buttons: Direct Cart / WhatsApp purchase */}
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
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={isOutOfStock}
                          className={`py-3 min-h-[44px] text-center text-xs uppercase tracking-wider font-semibold rounded-lg border border-brand-brown transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
                            isOutOfStock
                              ? 'border-stone-200 text-stone-400 cursor-not-allowed'
                              : 'bg-white hover:bg-stone-50 text-brand-brown hover:shadow-xs'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                          <span>Añadir</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleBuyNow(product, e)}
                          disabled={isOutOfStock}
                          className={`py-3 min-h-[44px] text-center text-xs uppercase tracking-wider font-semibold rounded-lg text-white transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 shadow-xs ${
                            isOutOfStock
                              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                              : 'bg-brand-gold hover:bg-brand-brown hover:shadow-md'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 fill-current shrink-0" />
                          <span>Comprar</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Link to Full Catalog */}
      <div className="mt-12 text-center">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 px-8 py-3.5 min-h-[44px] bg-white border border-brand-gold/40 hover:border-brand-brown text-stone-800 hover:text-brand-brown font-serif text-sm rounded-full shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <span>Explorar Catálogo Completo & Filtros</span>
          <ArrowRight className="w-4 h-4 text-brand-gold" />
        </Link>
      </div>

      {/* GEO & Conversational Search Direct Answers Block */}
      <div className="mt-16 sm:mt-24 pt-12 border-t border-brand-gold/20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold font-sans">
            Guía Esencial & Transparencia
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-light text-stone-900 mt-1">
            Lo que Debes Saber de Nuestras Velas
          </h3>
          <div className="w-10 h-[1px] bg-brand-gold mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 p-6 rounded-xl border border-brand-gold/20 shadow-xs">
            <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center mb-3.5">
              <Leaf className="w-4 h-4 text-brand-gold" />
            </div>
            <h4 className="font-serif font-medium text-stone-900 text-sm mb-2">
              ¿Por qué cera de soya vs. parafina tradicional?
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-sans font-light">
              La cera de soya 100% natural ofrece una combustión limpia con hasta un 90% menos de hollín que la parafina derivada del petróleo. Quema a menor temperatura, garantizando que tu vela dure hasta un 50% más tiempo y difunda esencias botánicas puras sin toxinas.
            </p>
          </div>

          <div className="bg-white/80 p-6 rounded-xl border border-brand-gold/20 shadow-xs">
            <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center mb-3.5">
              <Flame className="w-4 h-4 text-brand-gold" />
            </div>
            <h4 className="font-serif font-medium text-stone-900 text-sm mb-2">
              ¿Cuál es la regla recomendada de encendido?
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-sans font-light">
              En el primer encendido, mantén la vela prendida entre 2 y 3 horas para formar una piscina completa y prevenir el túnel. En encendidos posteriores, la duración máxima de quemado continuo recomendada es de 2 horas consecutivas, recordando recortar el pabilo a 5 mm.
            </p>
          </div>

          <div className="bg-white/80 p-6 rounded-xl border border-brand-gold/20 shadow-xs">
            <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center mb-3.5">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
            </div>
            <h4 className="font-serif font-medium text-stone-900 text-sm mb-2">
              ¿Cómo funcionan los envíos y garantías?
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-sans font-light">
              Realizamos envíos gratis en Bogotá urbana y municipios de la Sabana en 2 a 3 días hábiles, además de contar con opción express el mismo día. A nivel nacional, despachamos vía Servientrega en 2 a 5 días hábiles con tarifa fija de $9.000 COP y empaque de seguridad multicapa.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
