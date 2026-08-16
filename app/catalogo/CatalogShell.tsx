'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Sparkles, Eye, MessageCircle, X, SlidersHorizontal, ArrowUpDown, Tag } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import SkeletonImage from '@/components/SkeletonImage';

const WA_NUMBER = '573175752029';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
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

interface CatalogShellProps {
  products: Product[];
}

export function isSoapProduct(product: { nombre: string; material?: string | null; descripcion?: string }) {
  const text = `${product.nombre} ${product.material || ''} ${product.descripcion || ''}`.toLowerCase();
  return text.includes('jabón') || text.includes('jabon') || text.includes('soap');
}

export default function CatalogShell({ products }: CatalogShellProps) {
  const { addToCart, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Read initial filters from URL query params
  const [selectedType, setSelectedType] = useState<'todos' | 'velas' | 'jabones'>('todos');
  const [selectedMaterial, setSelectedMaterial] = useState<string>(
    searchParams.get('material') || ''
  );
  const [sortOrder, setSortOrder] = useState<'predeterminado' | 'precio-asc' | 'precio-desc'>('predeterminado');

  // Derive unique materials from the product list
  const materials = useMemo(() => {
    const set = new Set(
      products.map((p) => p.material).filter((m): m is string => !!m)
    );
    return Array.from(set).sort();
  }, [products]);

  // Sync URL with filter state
  const syncUrl = useCallback(
    (material: string) => {
      const params = new URLSearchParams();
      if (material) params.set('material', material);
      const qs = params.toString();
      router.replace(`/catalogo${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    const mat = searchParams.get('material');
    if (mat) setSelectedMaterial(mat);
  }, [searchParams]);

  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedMaterial(val);
    syncUrl(val);
  };

  const clearFilters = () => {
    setSelectedType('todos');
    setSelectedMaterial('');
    setSortOrder('predeterminado');
    syncUrl('');
  };

  const hasActiveFilters = selectedType !== 'todos' || selectedMaterial !== '' || sortOrder !== 'predeterminado';

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      const soap = isSoapProduct(p);
      // Type filter
      if (selectedType === 'velas' && soap) return false;
      if (selectedType === 'jabones' && !soap) return false;

      // Material filter
      if (
        selectedMaterial &&
        (!p.material || !p.material.toLowerCase().includes(selectedMaterial.toLowerCase()))
      ) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortOrder === 'precio-asc') {
      result = [...result].sort((a, b) => (a.precio || 0) - (b.precio || 0));
    } else if (sortOrder === 'precio-desc') {
      result = [...result].sort((a, b) => (b.precio || 0) - (a.precio || 0));
    }

    return result;
  }, [products, selectedType, selectedMaterial, sortOrder]);

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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900">
            Nuestros Productos Artesanales
          </h1>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-2"></div>
          <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Explora nuestra colección exclusiva de velas y jabones artesanales diseñados con insumos 100% naturales en Bogotá.
          </p>
        </div>
      </section>

      {/* ── FILTER PANEL ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 w-full space-y-4">
        {/* Type Tabs: Todos, Velas Artesanales, Jabones Artesanales */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-stone-200 pb-4">
          {[
            { id: 'todos', label: 'Todos los Productos' },
            { id: 'velas', label: 'Velas Artesanales' },
            { id: 'jabones', label: 'Jabones Artesanales' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id as any)}
              className={`px-5 py-2.5 min-h-[44px] text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                selectedType === tab.id
                  ? 'bg-brand-brown text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Filters & Sorting Bar */}
        <div className="bg-white rounded-xl border border-stone-200/60 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Filtrar por:</span>
            </div>

            {/* Clean Dropdown for Material */}
            <select
              value={selectedMaterial}
              onChange={handleMaterialChange}
              className="px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition cursor-pointer min-h-[44px]"
            >
              <option value="">Todos los materiales</option>
              {materials.map((mat) => (
                <option key={mat} value={mat}>
                  Material: {mat}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-stone-500 shrink-0" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition cursor-pointer min-h-[44px]"
            >
              <option value="predeterminado">Ordenar por: Relevancia</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="p-2 text-xs text-red-500 hover:text-red-700 font-medium transition cursor-pointer min-h-[44px] flex items-center justify-center rounded-lg hover:bg-red-50"
                title="Limpiar filtros"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-end text-xs text-stone-500 font-sans">
          <span>
            Mostrando <strong>{filteredAndSortedProducts.length}</strong> {filteredAndSortedProducts.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>
      </div>

      {/* Product Grid: mobile-first grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white rounded-xl border border-stone-200/60 p-8">
            <p className="text-stone-500 text-sm font-sans">No se encontraron productos con los criterios seleccionados.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-brand-gold hover:text-brand-brown text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer min-h-[44px] px-6 py-2 border border-brand-gold rounded-lg"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredAndSortedProducts.map((product) => {
              const soap = isSoapProduct(product);
              const isLowStock = product.stock > 0 && product.stock <= 15;
              const isOutOfStock = product.stock <= 0;
              const displayImage = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : product.url_imagen;
              const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20interesa%20cotizar%20el%20producto:%20${encodeURIComponent(product.nombre)}`;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg border border-stone-200/60 overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-350 ease-in-out"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Link href={`/productos/${product.id}`} className="relative aspect-square block overflow-hidden bg-stone-100">
                    <SkeletonImage
                      src={displayImage ?? ''}
                      alt={product.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs border border-stone-100 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-gold shrink-0" />
                      <span className="text-[10px] font-semibold text-stone-700 uppercase tracking-wider">
                        {soap ? 'Jabón Artesanal' : product.esBajoPedido ? 'Bajo Pedido' : 'Vela Artesanal'}
                      </span>
                    </div>

                    {/* Material & Aroma Badges (Aroma hidden for soaps!) */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5 max-w-[90%]">
                      {!soap && product.aroma && (
                        <span className="bg-brand-brown/80 backdrop-blur-xs text-[#FAF8F5] px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-widest truncate">
                          {product.aroma}
                        </span>
                      )}
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
                        {product.material && (
                          <>
                            <span>•</span>
                            <span>{product.material}</span>
                          </>
                        )}
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
