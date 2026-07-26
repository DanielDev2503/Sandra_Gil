'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Sparkles, Eye, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SkeletonImage from '@/components/SkeletonImage';

const WA_NUMBER = '573175752029';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  aroma: string;
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
  const [selectedCategory, setSelectedCategory] = useState<string>('Ver Todas');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const getProductCategory = (product: Product) => {
    const name = product.nombre.toLowerCase();
    if (name.includes('flores') || name.includes('rosas') || name.includes('peonía') || name.includes('caléndula')) {
      return 'Diseños Florales';
    }
    return 'Aromáticas Premium';
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Ver Todas') return products;
    return products.filter((p) => getProductCategory(p) === selectedCategory);
  }, [products, selectedCategory]);

  const handleBuyNow = (product: Product) => {
    clearCart();
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-brand-cream">
      <Header />

      {/* Catalog Title Banner */}
      <section className="bg-[#F0E9DB]/60 py-12 border-b border-stone-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-bold">Colección Completa</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-stone-900">Nuestras Velas Decorativas</h1>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-2"></div>
          <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Explora nuestra variedad de velas aromáticas con cera de soya natural, diseñadas para iluminar y armonizar cada rincón de tu hogar.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex justify-center gap-2.5">
          {['Ver Todas', 'Diseños Florales', 'Aromáticas Premium'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-brand-gold text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => {
            const isLowStock = product.stock > 0 && product.stock <= 15;
            const isOutOfStock = product.stock <= 0;
            const displayImage = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : product.url_imagen;
            const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20interesa%20cotizar%20la%20vela%20personalizada:%20${encodeURIComponent(product.nombre)}`;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-lg border border-stone-200/60 overflow-hidden flex flex-col h-full hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-350 ease-in-out"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link href={`/productos/${product.id}`} className="relative aspect-square block overflow-hidden bg-stone-100">
                  <SkeletonImage
                    src={displayImage}
                    alt={product.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs border border-stone-100 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-gold" />
                    <span className="text-[10px] font-semibold text-stone-700 uppercase tracking-wider">
                      {product.esBajoPedido ? 'Bajo Pedido' : 'Hecho a Mano'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-brand-brown/80 backdrop-blur-xs text-[#FAF8F5] px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-widest">
                    {product.aroma}
                  </div>
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-white text-stone-900 text-xs font-semibold px-4 py-2 rounded-sm shadow-md flex items-center gap-2">
                        <Eye className="w-4 h-4 text-stone-700" /> Detalles
                      </span>
                    </div>
                  )}
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/productos/${product.id}`} className="block group/title">
                      <h3 className="font-serif font-medium text-stone-900 text-base group-hover/title:text-brand-gold transition duration-200 line-clamp-1">
                        {product.nombre}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-400 font-sans">
                      <span>Medida: {product.dimensiones}</span>
                      <span>•</span>
                      <span>Soya natural</span>
                    </div>
                    <p className="text-xs text-stone-500 mt-2.5 line-clamp-2 leading-relaxed font-light font-sans">
                      {product.descripcion}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 font-sans">
                    <div className="flex justify-between items-center mb-3">
                      {product.esBajoPedido ? (
                        <span className="text-xs font-semibold text-brand-brown uppercase tracking-wider">Bajo Pedido</span>
                      ) : (
                        <span className="font-serif font-semibold text-brand-brown text-base">
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
                        className="w-full py-2 text-center text-[10px] uppercase tracking-wider font-semibold rounded-sm bg-[#25D366] hover:bg-[#1da851] text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3 h-3" /> Cotizar
                      </a>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <button
                          onClick={() => addToCart(product)}
                          disabled={isOutOfStock}
                          className={`py-2 text-center text-[10px] uppercase tracking-wider font-semibold rounded-sm border border-brand-brown transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                            isOutOfStock ? 'border-stone-200 text-stone-400 cursor-not-allowed' : 'bg-white hover:bg-stone-50 text-brand-brown'
                          }`}
                        >
                          Añadir
                        </button>
                        <button
                          onClick={() => handleBuyNow(product)}
                          disabled={isOutOfStock}
                          className={`py-2 text-center text-[10px] uppercase tracking-wider font-semibold rounded-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
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
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
