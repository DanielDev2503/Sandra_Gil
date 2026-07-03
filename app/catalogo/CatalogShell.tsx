'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/context/CartContext';
import { Sparkles, MapPin, Eye, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SkeletonImage from '@/components/SkeletonImage';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  aroma: string;
  dimensiones: string;
  precio: number;
  stock: number;
  url_imagen: string;
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

  // Helper to categorize products in-memory dynamically
  const getProductCategory = (product: Product) => {
    const name = product.nombre.toLowerCase();
    if (
      name.includes('flores') ||
      name.includes('rosas') ||
      name.includes('peonía') ||
      name.includes('caléndula')
    ) {
      return 'Diseños Florales';
    }
    return 'Aromáticas Premium';
  };

  // Filter products based on selected category
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
    <div className="flex-1 flex flex-col min-h-screen bg-[#FBF9F6]">
      {/* Header */}
      <Header />

      {/* Catalog Title Banner */}
      <section className="bg-[#EBE7E0]/40 py-12 border-b border-stone-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A68F81] font-bold">Colección Completa</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-900">Nuestras Velas Decorativas</h2>
          <div className="w-12 h-[1px] bg-[#A68F81] mx-auto mt-2"></div>
          <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Explora nuestra variedad de velas aromáticas con cera de soya, diseñadas especialmente para iluminar y armonizar cada rincón de tu hogar.
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
                  ? 'bg-[#A68F81] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product List Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => {
            const isLowStock = product.stock > 0 && product.stock <= 15;
            const isOutOfStock = product.stock <= 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-lg border border-stone-200/60 overflow-hidden flex flex-col h-full hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-350 ease-in-out"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image Link Container */}
                <Link href={`/productos/${product.id}`} className="relative aspect-square block overflow-hidden bg-stone-100">
                  <SkeletonImage
                    src={product.url_imagen}
                    alt={product.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Handcrafted Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs border border-stone-100 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#A68F81]" />
                    <span className="text-[10px] font-semibold text-stone-700 uppercase tracking-wider">
                      Hecho a Mano
                    </span>
                  </div>

                  {/* Scent Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#2C2A29]/80 backdrop-blur-xs text-[#FBF9F6] px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-widest">
                    {product.aroma}
                  </div>

                  {/* Hover Eye Overlay */}
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300">
                      <span className="bg-white text-stone-900 text-xs font-semibold px-4 py-2 rounded-sm shadow-md flex items-center gap-2 transform translate-y-0 opacity-100 transition-all duration-300">
                        <Eye className="w-4 h-4 text-stone-700" /> Detalles
                      </span>
                    </div>
                  )}
                </Link>

                {/* Product Information */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/productos/${product.id}`} className="block group/title">
                      <h3 className="font-serif font-medium text-stone-900 text-base group-hover/title:text-[#A68F81] transition duration-200 line-clamp-1">
                        {product.nombre}
                      </h3>
                    </Link>

                    {/* Specifications */}
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
                      <span className="font-serif font-semibold text-[#2C2A29] text-base">
                        ${product.precio.toLocaleString('es-CO')} COP
                      </span>

                      {/* Stock status */}
                      {isOutOfStock ? (
                        <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                          Agotado
                        </span>
                      ) : isLowStock ? (
                        <span className="text-[10px] text-amber-600 font-medium uppercase tracking-wider">
                          Últimas {product.stock} u.
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">
                          En Stock
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => addToCart(product)}
                        disabled={isOutOfStock}
                        className={`py-2 text-center text-[10px] uppercase tracking-wider font-semibold rounded-sm border border-[#2C2A29] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                          isOutOfStock
                            ? 'border-stone-200 text-stone-400 cursor-not-allowed'
                            : 'bg-white hover:bg-stone-50 text-stone-850 hover:border-[#A68F81]'
                        }`}
                      >
                        Añadir
                      </button>
                      <button
                        onClick={() => handleBuyNow(product)}
                        disabled={isOutOfStock}
                        className={`py-2 text-center text-[10px] uppercase tracking-wider font-semibold rounded-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                          isOutOfStock
                            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            : 'bg-[#A68F81] hover:bg-[#927d70]'
                        }`}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <footer className="bg-[#2C2A29] text-[#FBF9F6] border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-stone-800">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-light tracking-widest">SANDRA GIL</h3>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed font-light">
                Creación artesanal de velas decorativas y aromáticas premium. Diseñadas para armonizar tus sentidos y transformar tus espacios con elegancia natural.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <MapPin className="w-4 h-4 text-[#A68F81]" />
                <span>Bogotá, Colombia (Envíos locales)</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A68F81]">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li><Link href="/" className="hover:text-white transition">Inicio</Link></li>
                <li><Link href="/checkout" className="hover:text-white transition">Checkout / Pago</Link></li>
                <li><a href="https://wa.me/573000000000" className="hover:text-white transition">Soporte WhatsApp</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A68F81]">Conecta con Nosotros</h4>
              <p className="text-xs text-stone-400 font-light">
                Síguenos en redes sociales para ver el proceso de vertido de velas y lanzamientos de nuevas colecciones.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-[#A68F81] transition flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} Sandra Gil Velas. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Hecho con <Heart className="w-3.5 h-3.5 text-red-400 fill-current" /> en Bogotá.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
