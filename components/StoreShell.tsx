'use client';

import React from 'react';
import Header from './Header';
import ProductCatalog from './ProductCatalog';
import CartDrawer from './CartDrawer';
import Footer from './Footer';
import { Sparkles, Leaf, Flame, ShieldCheck, Gem, Ribbon, Droplets } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import SkeletonImage from './SkeletonImage';

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
  url_imagen: string;
  imagenes?: string[];
  activo: boolean;
}

const MATERIAL_CATEGORIES = [
  { name: '100% Cera de Soya', query: 'Cera de Soya', icon: Leaf },
  { name: 'Aceites Esenciales', query: 'Aceites Esenciales', icon: Droplets },
  { name: 'Cristales & Cuarzos', query: 'Cristales', icon: Gem },
  { name: 'Pabilo de Algodón Orgánico', query: 'Pabilo', icon: Ribbon },
];

interface StoreShellProps {
  products: Product[];
  heroProduct: Product | null;
}

const WA_NUMBER = '573175752029';

const ARTISAN_BADGES = [
  { icon: Leaf, label: '100% Cera de Soya Natural' },
  { icon: Sparkles, label: 'Esencias Aromáticas Premium' },
  { icon: Flame, label: 'Combustión Limpia sin Plomo' },
  { icon: ShieldCheck, label: 'Vertido a Mano en Bogotá' },
];

export default function StoreShell({ products, heroProduct }: StoreShellProps) {
  const router = useRouter();
  const { addToCart, clearCart } = useCart();

  const heroImage =
    heroProduct?.imagenes && heroProduct.imagenes.length > 0
      ? heroProduct.imagenes[0]
      : heroProduct?.url_imagen ?? null;

  const handleBuyNow = (product: Product) => {
    clearCart();
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-brand-cream overflow-hidden py-10 sm:py-20 lg:py-24 border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Hero copy */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-xs rounded-full border border-brand-gold/30 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span className="text-[10px] font-bold text-brand-brown uppercase tracking-widest">
                Artesanía Premium · Bogotá
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
              Velas Artesanales y Aromáticas{' '}
              <br className="hidden sm:inline" />
              <span className="font-normal italic text-brand-gold">de Cera de Soya en Bogotá</span>
            </h1>

            <p className="text-stone-600 text-xs sm:text-sm md:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Velas decorativas y aromáticas vertidas a mano con cera de soya pura y esencias exclusivas. Un toque de elegancia natural para tus espacios en Bogotá.
            </p>

            {/* Artisan badges strip */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-2.5 pt-2">
              {ARTISAN_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white/80 rounded-sm px-3 py-2 border border-brand-gold/20 shadow-xs">
                  <Icon className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span className="text-[10px] font-semibold text-brand-brown uppercase tracking-wide leading-tight">{label}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              <a
                href="#catalogo"
                className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] bg-brand-brown hover:bg-brand-gold text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-center flex items-center justify-center cursor-pointer"
              >
                Explorar Catálogo
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20gustar%C3%ADa%20cotizar%20una%20vela%20personalizada`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] bg-white hover:bg-stone-50 border border-brand-brown text-brand-brown text-xs uppercase tracking-widest font-semibold transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Asesoría por WhatsApp
              </a>
            </div>
          </div>

          {/* Hero product image */}
          <div className="lg:col-span-6 relative flex justify-center w-full">
            <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-xl sm:shadow-2xl border border-brand-gold/20 bg-stone-100">
              {heroImage ? (
                <SkeletonImage
                  src={heroImage}
                  alt={heroProduct?.nombre ?? 'Vela artesanal Sandra Gil'}
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-cream">
                  <Image
                    src="/logo-sandra.png"
                    alt="Sandra Gil Velas Artesanales"
                    width={180}
                    height={180}
                    className="object-contain opacity-60"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4 sm:p-6 z-10">
                <div className="text-white">
                  <p className="font-serif text-base sm:text-lg font-medium">{heroProduct?.nombre ?? 'Colección Exclusiva'}</p>
                  <p className="text-[11px] sm:text-xs text-white/90 mt-0.5">Vertido a mano · Aromas selectos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCT ─────────────────────────────────── */}
      {heroProduct && !heroProduct.esBajoPedido && (
        <section className="bg-white py-10 sm:py-16 border-b border-stone-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Más Solicitado</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 mt-1 sm:mt-2">Nuestra Vela del Momento</h2>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-3 sm:mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Gallery */}
              <div className="lg:col-span-6 space-y-3 sm:space-y-4">
                <div className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden border border-stone-200/40 shadow-xs">
                  <SkeletonImage
                    src={heroImage ?? heroProduct.url_imagen}
                    alt={heroProduct.nombre}
                    className="w-full h-full object-cover transition duration-500 hover:scale-102"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Additional gallery images from Supabase */}
                {heroProduct.imagenes && heroProduct.imagenes.length > 1 && (
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                    {heroProduct.imagenes.slice(1, 4).map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-stone-100 border border-stone-200/30">
                        <SkeletonImage
                          src={img}
                          alt={`${heroProduct.nombre} – vista ${i + 2}`}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                          fill
                          sizes="(max-width: 768px) 33vw, 15vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="lg:col-span-6 space-y-5 sm:space-y-6">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-gold font-semibold">100% Cera de Soya Natural</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-stone-900 mt-1">{heroProduct.nombre}</h3>
                  <p className="text-base sm:text-lg font-semibold text-brand-brown mt-2 font-serif">
                    ${heroProduct.precio?.toLocaleString('es-CO')} COP
                  </p>
                </div>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light font-sans">{heroProduct.descripcion}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-stone-50 p-4 sm:p-5 rounded-md border border-stone-200/40 font-sans">
                  <div className="flex items-start gap-2.5">
                    <Leaf className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-stone-800">Aromaterapia Natural</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Notas de {heroProduct.aroma}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Flame className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-stone-800">Combustión Limpia</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Pabilo de algodón orgánico sin plomo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-stone-800">Diseño Ecológico</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{heroProduct.dimensiones} · Envase reutilizable</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-stone-800">Esencias Seleccionadas</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Insumos 100% artesanales</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 font-sans w-full">
                  <button
                    onClick={() => handleBuyNow(heroProduct)}
                    disabled={heroProduct.stock <= 0}
                    className="w-full py-3.5 min-h-[44px] bg-brand-gold hover:bg-brand-brown text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed"
                  >
                    Comprar Ahora · Envío GRATIS
                  </button>
                  <button
                    onClick={() => addToCart(heroProduct)}
                    disabled={heroProduct.stock <= 0}
                    className="w-full py-3.5 min-h-[44px] bg-white hover:bg-stone-50 border border-brand-brown text-brand-brown text-xs uppercase tracking-widest font-semibold transition-all duration-300 text-center flex items-center justify-center cursor-pointer disabled:border-stone-300 disabled:text-stone-400 disabled:cursor-not-allowed"
                  >
                    Añadir al Carrito
                  </button>
                </div>

                <p className="text-[10px] text-stone-400 text-center font-sans tracking-wide">
                  🚚 Despachos locales e intermunicipales. Pago protegido por Wompi (Bancolombia).
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CATALOG ──────────────────────────────────────────── */}
      <ProductCatalog products={products} />

      {/* ── EXPLORE BY MATERIAL (MOVED TO END OF HOME BEFORE PRE-FOOTER) ── */}
      <section className="bg-brand-cream py-10 sm:py-16 border-t border-b border-stone-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Insumos Naturales</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900 mt-1 sm:mt-2">Explorar por Material</h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-3 sm:mt-4"></div>
            <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mt-3 sm:mt-4 leading-relaxed font-sans">
              Nuestras velas y productos combinan materiales premium seleccionados por su pureza y rendimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MATERIAL_CATEGORIES.map((mat) => {
              const Icon = mat.icon;
              return (
                <Link
                  key={mat.name}
                  href={`/catalogo?material=${encodeURIComponent(mat.query)}`}
                  className="group flex items-center gap-3 bg-white rounded-lg border border-brand-gold/20 px-4 sm:px-5 py-3.5 sm:py-4 shadow-xs hover:shadow-md hover:border-brand-gold/40 transition-all duration-300 min-h-[44px] active:scale-[0.99]"
                >
                  <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors duration-300">
                    <Icon className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-stone-800 uppercase tracking-wide block">{mat.name}</span>
                    <span className="text-[10px] text-brand-gold font-medium opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explorar →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CartDrawer />
      <Footer />
    </div>
  );
}
