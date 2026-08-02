'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Sparkles, Eye, MessageCircle, X, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import SkeletonImage from '@/components/SkeletonImage';

const WA_NUMBER = '573175752029';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  aroma: string;
  material?: string | null;
  dimensiones: string;
  precio: number | null;
  esBajoPedido: boolean;
  stock: number;
  url_imagen: string;
  imagenes?: string[];
  activo: boolean;
}

interface CatalogShellProps {
  products: Product[];
}

export default function CatalogShell({ products }: CatalogShellProps) {
  const { addToCart, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Read initial filters from URL query params
  const [selectedAroma, setSelectedAroma] = useState<string | null>(
    searchParams.get('aroma')
  );
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(
    searchParams.get('material')
  );

  // Derive unique aromas and materials from the product list
  const aromas = useMemo(() => {
    const set = new Set(products.map((p) => p.aroma).filter(Boolean));
    return Array.from(set).sort();
  }, [products]);

  const materials = useMemo(() => {
    const set = new Set(
      products.map((p) => p.material).filter((m): m is string => !!m)
    );
    return Array.from(set).sort();
  }, [products]);

  // Sync URL with filter state (shallow navigation)
  const syncUrl = useCallback(
    (aroma: string | null, material: string | null) => {
      const params = new URLSearchParams();
      if (aroma) params.set('aroma', aroma);
      if (material) params.set('material', material);
      const qs = params.toString();
      router.replace(`/catalogo${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router]
  );

  // Also sync when URL changes externally (e.g. from Home page links)
  useEffect(() => {
    setSelectedAroma(searchParams.get('aroma'));
    setSelectedMaterial(searchParams.get('material'));
  }, [searchParams]);

  const handleAromaToggle = (aroma: string) => {
    const next = selectedAroma === aroma ? null : aroma;
    setSelectedAroma(next);
    syncUrl(next, selectedMaterial);
  };

  const handleMaterialToggle = (material: string) => {
    const next = selectedMaterial === material ? null : material;
    setSelectedMaterial(next);
    syncUrl(selectedAroma, next);
  };

  const clearFilters = () => {
    setSelectedAroma(null);
    setSelectedMaterial(null);
    syncUrl(null, null);
  };

  const hasActiveFilters = selectedAroma || selectedMaterial;

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Aroma filter: substring match (case-insensitive) so Home links work with partial queries
      if (selectedAroma && !p.aroma.toLowerCase().includes(selectedAroma.toLowerCase())) {
        return false;
      }
      // Material filter: substring match
      if (selectedMaterial && (!p.material || !p.material.toLowerCase().includes(selectedMaterial.toLowerCase()))) {
        return false;
      }
      return true;
    });
  }, [products, selectedAroma, selectedMaterial]);

  const handleBuyNow = (product: Product) => {
    clearCart();
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-brand-cream">
      <Header />

      {/* Catalog Title Banner */}
      <section className="bg-[#F0E9DB]/60 py-8 sm:py-12 border-b border-stone-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2 sm:space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-bold">Colección Completa</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900">Nuestras Velas Decorativas</h1>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-2"></div>
          <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Explora nuestra variedad de velas aromáticas con cera de soya natural, diseñadas para iluminar y armonizar cada rincón de tu hogar.
          </p>
        </div>
      </section>

      {/* ── FILTER PANEL ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 w-full">
        <div className="bg-white rounded-lg border border-stone-200/60 p-4 sm:p-5 shadow-xs">
          {/* Filter header */}
          <div className="flex items-center justify-between mb-3.5 sm:mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Filtros</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium transition-colors duration-200 cursor-pointer min-h-[44px] py-1.5 px-2"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Aroma row */}
          <div className="mb-3">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-widest mb-2 block">Aroma</span>
            <div className="flex flex-wrap gap-2">
              {aromas.map((aroma) => (
                <button
                  key={aroma}
                  onClick={() => handleAromaToggle(aroma)}
                  className={`px-3.5 py-2 min-h-[44px] text-xs sm:text-[11px] uppercase tracking-wider font-medium rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    selectedAroma === aroma
                      ? 'bg-brand-gold text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {aroma}
                </button>
              ))}
            </div>
          </div>

          {/* Material row */}
          {materials.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-widest mb-2 block">Material</span>
              <div className="flex flex-wrap gap-2">
                {materials.map((material) => (
                  <button
                    key={material}
                    onClick={() => handleMaterialToggle(material)}
                    className={`px-3.5 py-2 min-h-[44px] text-xs sm:text-[11px] uppercase tracking-wider font-medium rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                      selectedMaterial === material
                        ? 'bg-brand-brown text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Active filters summary */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">Activos:</span>
            {selectedAroma && (
              <span className="inline-flex items-center gap-1 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded-full px-3 py-1.5 min-h-[36px] text-[10px] font-semibold uppercase tracking-wider">
                Aroma: {selectedAroma}
                <button onClick={() => { setSelectedAroma(null); syncUrl(null, selectedMaterial); }} className="hover:text-brand-brown cursor-pointer p-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedMaterial && (
              <span className="inline-flex items-center gap-1 bg-brand-brown/10 text-brand-brown border border-brand-brown/20 rounded-full px-3 py-1.5 min-h-[36px] text-[10px] font-semibold uppercase tracking-wider">
                Material: {selectedMaterial}
                <button onClick={() => { setSelectedMaterial(null); syncUrl(selectedAroma, null); }} className="hover:text-brand-gold cursor-pointer p-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <span className="text-[10px] text-stone-400 ml-auto">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
            </span>
          </div>
        )}
      </div>

      {/* Product Grid: mobile-first grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="text-stone-400 text-xs sm:text-sm font-sans">No se encontraron productos con esos filtros.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-brand-gold hover:text-brand-brown text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer min-h-[44px] px-4 py-2"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => {
              const isLowStock = product.stock > 0 && product.stock <= 15;
              const isOutOfStock = product.stock <= 0;
              const displayImage = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : product.url_imagen;
              const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20interesa%20cotizar%20la%20vela%20personalizada:%20${encodeURIComponent(product.nombre)}`;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg border border-stone-200/60 overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-350 ease-in-out"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Link href={`/productos/${product.id}`} className="relative aspect-square block overflow-hidden bg-stone-100">
                    <SkeletonImage
                      src={displayImage}
                      alt={product.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs border border-stone-100 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-gold shrink-0" />
                      <span className="text-[10px] font-semibold text-stone-700 uppercase tracking-wider">
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

                    {hoveredProduct === product.id && (
                      <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] hidden sm:flex items-center justify-center">
                        <span className="bg-white text-stone-900 text-xs font-semibold px-4 py-2 rounded-sm shadow-md flex items-center gap-2">
                          <Eye className="w-4 h-4 text-stone-700" /> Detalles
                        </span>
                      </div>
                    )}
                  </Link>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/productos/${product.id}`} className="block group/title">
                        <h3 className="font-serif font-medium text-stone-900 text-base sm:text-lg group-hover/title:text-brand-gold transition duration-200 line-clamp-1">
                          {product.nombre}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-400 font-sans">
                        <span>Medida: {product.dimensiones}</span>
                        <span>•</span>
                        <span>{product.material || 'Soya natural'}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-2.5 line-clamp-2 leading-relaxed font-light font-sans">
                        {product.descripcion}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-stone-100 font-sans">
                      <div className="flex justify-between items-center mb-3">
                        {product.esBajoPedido ? (
                          <span className="text-xs font-semibold text-brand-brown uppercase tracking-wider">Bajo Pedido</span>
                        ) : (
                          <span className="font-serif font-semibold text-brand-brown text-base sm:text-lg">
                            ${product.precio?.toLocaleString('es-CO')} COP
                          </span>
                        )}
                        {!product.esBajoPedido && (
                          isOutOfStock ? (
                            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Agotado</span>
                          ) : isLowStock ? (
                            <span className="text-[10px] text-amber-600 font-medium uppercase tracking-wider">Últimas {product.stock}</span>
                          ) : (
                            <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">En Stock</span>
                          )
                        )}
                      </div>

                      {product.esBajoPedido ? (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 min-h-[44px] text-center text-xs uppercase tracking-wider font-semibold rounded-sm bg-[#25D366] hover:bg-[#1da851] text-white transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-98"
                        >
                          <MessageCircle className="w-4 h-4" /> Cotizar
                        </a>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <button
                            onClick={() => addToCart(product)}
                            disabled={isOutOfStock}
                            className={`py-3 min-h-[44px] text-center text-xs uppercase tracking-wider font-semibold rounded-sm border border-brand-brown transition-all duration-300 cursor-pointer flex items-center justify-center active:scale-98 ${
                              isOutOfStock ? 'border-stone-200 text-stone-400 cursor-not-allowed' : 'bg-white hover:bg-stone-50 text-brand-brown'
                            }`}
                          >
                            Añadir
                          </button>
                          <button
                            onClick={() => handleBuyNow(product)}
                            disabled={isOutOfStock}
                            className={`py-3 min-h-[44px] text-center text-xs uppercase tracking-wider font-semibold rounded-sm text-white transition-all duration-300 cursor-pointer flex items-center justify-center active:scale-98 ${
                              isOutOfStock ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-brand-gold hover:bg-brand-brown'
                            }`}
                          >
                            Comprar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}

