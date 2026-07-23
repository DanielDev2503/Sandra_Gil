'use client';

import React, { useState } from 'react';
import Header from './Header';
import ProductCatalog from './ProductCatalog';
import CartDrawer from './CartDrawer';
import { Heart, Sparkles, MapPin, Flame, ShieldCheck, Leaf, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  aroma: string;
  dimensiones: string;
  precio: number;
  stock: number;
  url_imagen: string;
  imagenes?: string[];
  activo: boolean;
}

interface StoreShellProps {
  products: Product[];
}

export default function StoreShell({ products }: StoreShellProps) {
  const router = useRouter();
  const { addToCart, clearCart } = useCart();

  // Find the Lavender candle or fallback to the first product
  const featuredProduct = products.find(p => p.nombre.toLowerCase().includes('lavanda')) || products[0];

  const handleBuyNow = (product: Product) => {
    clearCart();
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#EBE7E0]/60 overflow-hidden py-16 sm:py-24 border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/70 backdrop-blur-xs rounded-full border border-stone-200/60 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#A68F81]" />
              <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">
                Premium Soya Wax
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
              Luz que Inspira, <br />
              <span className="font-normal italic text-[#A68F81]">Aromas</span> que Cautivan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Nuestras velas decorativas son moldeadas y vertidas a mano con flores preservadas y cuarzos. Un toque de elegancia, paz y luz natural para tus espacios en Bogotá.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="#catalogo"
                className="px-8 py-3 bg-[#2C2A29] hover:bg-[#A68F81] hover:scale-[1.02] active:scale-[0.98] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-center cursor-pointer"
              >
                Explorar Catálogo
              </a>
              <a
                href="https://wa.me/573000000000?text=Hola,%20quisiera%20saber%20mas%20sobre%20las%20velas%20artesanales"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white hover:bg-stone-50 hover:scale-[1.02] active:scale-[0.98] border border-stone-300 text-stone-850 text-xs uppercase tracking-widest font-semibold transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Asesoría por WhatsApp
              </a>
            </div>
          </div>

          {/* Hero Images Carousel/Stack */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square sm:aspect-4/3 rounded-lg overflow-hidden shadow-2xl border border-stone-200/50 bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800"
                alt="Sandra Gil Velas Artesanales Premium"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="font-serif text-lg">Colección Botánica</p>
                  <p className="text-xs text-white/80 mt-1">Flores preservadas & Aromas selectos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Showcase Section (Comprar Ahora) */}
      {featuredProduct && (
        <section className="bg-white py-16 border-b border-stone-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-[#A68F81] font-semibold">Producto Destacado</span>
              <h2 className="text-3xl font-serif font-light text-stone-900 mt-2">Detalle de Nuestro Best Seller</h2>
              <div className="w-12 h-[1px] bg-[#A68F81] mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Product Gallery (Left) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden border border-stone-200/40 shadow-xs">
                  <img
                    src={featuredProduct.url_imagen}
                    alt={featuredProduct.nombre}
                    className="w-full h-full object-cover hover:scale-102 transition duration-500"
                  />
                </div>
                {/* Mini-Gallery Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square rounded-md overflow-hidden bg-stone-100 border border-stone-200/30">
                    <img
                      src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=300"
                      alt="Flores de lavanda preservadas"
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="aspect-square rounded-md overflow-hidden bg-stone-100 border border-stone-200/30">
                    <img
                      src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=300"
                      alt="Cera de soya natural y cristales"
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="aspect-square rounded-md overflow-hidden bg-stone-100 border border-stone-200/30">
                    <img
                      src="https://images.unsplash.com/photo-1596435707261-05608be50720?auto=format&fit=crop&q=80&w=300"
                      alt="Detalle de vertido a mano"
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Product Info (Right) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#A68F81] font-semibold">100% Cera de Soya Natural</span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 mt-1">
                    {featuredProduct.nombre}
                  </h3>
                  <p className="text-lg font-semibold text-[#2C2A29] mt-2 font-serif">
                    ${featuredProduct.precio.toLocaleString('es-CO')} COP
                  </p>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed font-light font-sans">
                  {featuredProduct.descripcion} Esta vela está diseñada no solo para iluminar, sino para purificar tu entorno. La combinación de aceites esenciales franceses y flores botánicas secas crea un ambiente de relajación y paz en tu propio hogar.
                </p>

                {/* Specs Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-5 rounded-md border border-stone-200/40 font-sans">
                  <div className="flex items-start gap-2.5">
                    <Leaf className="w-4.5 h-4.5 text-[#A68F81] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-stone-850">Aromaterapia Natural</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Notas de {featuredProduct.aroma}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4.5 h-4.5 text-[#A68F81] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-stone-850">Larga Duración</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">~40 a 45 horas de encendido</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Flame className="w-4.5 h-4.5 text-[#A68F81] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-stone-850">Combustión Limpia</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Pabilo de algodón orgánico sin plomo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-[#A68F81] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-stone-850">Diseño Ecológico</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Dimensiones: {featuredProduct.dimensiones} | Envase reutilizable</p>
                    </div>
                  </div>
                </div>

                {/* Checkout & Cart Buttons */}
                <div className="space-y-3 pt-2 font-sans">
                  <button
                    onClick={() => handleBuyNow(featuredProduct)}
                    disabled={featuredProduct.stock <= 0}
                    className="w-full py-3.5 bg-[#A68F81] hover:bg-[#927d70] hover:scale-[1.02] active:scale-[0.98] text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    Comprar Ahora (Envío Directo)
                  </button>
                  <button
                    onClick={() => addToCart(featuredProduct)}
                    disabled={featuredProduct.stock <= 0}
                    className="w-full py-3.5 bg-white hover:bg-stone-50 hover:scale-[1.02] active:scale-[0.98] border border-[#2C2A29] text-[#2C2A29] text-xs uppercase tracking-widest font-semibold transition-all duration-300 text-center cursor-pointer disabled:border-stone-350 disabled:text-stone-400 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    Añadir al Carrito
                  </button>
                </div>

                <p className="text-[10px] text-stone-400 text-center font-sans tracking-wide">
                  🚚 Despachos locales desde Bogotá. Pago protegido por la pasarela oficial Wompi de Bancolombia.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Catalog */}
      <ProductCatalog products={products} />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <footer className="bg-[#2C2A29] text-[#FBF9F6] border-t border-stone-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-stone-800">
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-light tracking-widest">SANDRA GIL</h3>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
                Creación artesanal de velas decorativas y aromáticas premium. Diseñadas para armonizar tus sentidos y transformar tus espacios con elegancia natural.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <MapPin className="w-4 h-4 text-[#A68F81]" />
                <span>Bogotá, Colombia (Envíos locales)</span>
              </div>
            </div>

            {/* Column 2: Quick links */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A68F81]">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li><a href="#catalogo" className="hover:text-white transition">Catálogo</a></li>
                <li><Link href="/checkout" className="hover:text-white transition">Checkout / Pago</Link></li>
                <li><a href="https://wa.me/573000000000" className="hover:text-white transition">Soporte WhatsApp</a></li>
              </ul>
            </div>

            {/* Column 3: Instagram/Contact */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A68F81]">Conecta con Nosotros</h4>
              <p className="text-xs text-stone-400">
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
