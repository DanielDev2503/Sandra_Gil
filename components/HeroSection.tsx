'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Leaf, Flame, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import CandleGlowPulse from './CandleGlowPulse';
import SkeletonImage from './SkeletonImage';
import HeroBannerCarousel, {
  BANNERS_DATA,
  ResponsiveBannerImage,
  type BannerSlide,
} from './HeroBannerCarousel';

export {
  BANNERS_DATA,
  BANNERS_DATA as HERO_SLIDES,
  BANNERS_DATA as slides,
  ResponsiveBannerImage,
  HeroBannerCarousel,
  type BannerSlide,
};

interface Product {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  tipo?: 'VELA' | 'VELA_ENVASE' | 'VELA_ESCULPIDA' | 'JABON' | string;
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

interface HeroSectionProps {
  heroProduct?: Product | null;
}

const WA_NUMBER = '573175752029';

const ARTISAN_PILLARS = [
  { icon: Leaf, title: '100% Cera de Soya', subtitle: 'Biodegradable & limpia' },
  { icon: Sparkles, title: 'Flores Artesanales', subtitle: 'Diseño botánico natural' },
  { icon: Flame, title: 'Combustión Limpia', subtitle: 'Pabilo de algodón sin plomo' },
  { icon: ShieldCheck, title: 'Hecho a Mano', subtitle: 'Vertido en Bogotá' },
];

export default function HeroSection({ heroProduct = null }: HeroSectionProps) {
  const heroImages = useMemo(() => {
    if (heroProduct?.imagenes && heroProduct.imagenes.length > 0) {
      return heroProduct.imagenes;
    }
    if (heroProduct?.url_imagen) {
      return [heroProduct.url_imagen];
    }
    return [];
  }, [heroProduct]);

  const [activeIdx, setActiveIdx] = useState(0);

  // Reiniciar índice si cambia el producto
  useEffect(() => {
    setActiveIdx(0);
  }, [heroProduct]);

  // Transición automática suave si hay varias imágenes en el banner
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const currentImage = heroImages[activeIdx] ?? null;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-18 lg:pb-28 border-b border-brand-gold/15">
      {/* Ambient background warm glows */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/8 rounded-full blur-3xl pointer-events-none -z-0 transform -translate-y-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-10 w-80 h-80 bg-brand-accent/10 rounded-full blur-2xl pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left"
          >
            {/* Top Floating Badge with live pulse */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-brand-gold/30 shadow-xs">
              <CandleGlowPulse size="sm">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              </CandleGlowPulse>
              <span className="text-[11px] font-semibold tracking-widest text-brand-brown uppercase font-sans">
                Artesanía Botánica · Bogotá
              </span>
            </div>

            {/* Main Editorial Headline with dominant H1 hierarchy */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-stone-900 tracking-tight leading-[1.12]">
              Velas Artesanales y Aromáticas de{' '}
              <span className="font-normal italic text-brand-gold relative inline-block">
                Cera de Soya en Bogotá
                <span className="absolute left-0 bottom-1 w-full h-[2px] bg-brand-gold/30 -z-10 rounded-full" />
              </span>
            </h1>

            {/* Subtitle / Value Thesis */}
            <p className="text-stone-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Taller artesanal en Bogotá especializado en velas aromáticas vertidas a mano con 100% cera de soya natural pura, flores artesanales y pabilo de algodón sin plomo. Disfruta de una combustión limpia y no tóxica con envíos en Bogotá, Chía, Cajicá y despacho nacional a toda Colombia.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start gap-3.5 sm:gap-4 w-full">
              <Link
                href="/catalogo"
                className="group w-full sm:w-auto px-8 py-4 min-h-[48px] bg-brand-brown hover:bg-stone-900 text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-xl text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 rounded-full"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/personalizadas"
                className="w-full sm:w-auto px-8 py-4 min-h-[48px] bg-white hover:bg-stone-50 border border-brand-brown/40 hover:border-brand-brown text-brand-brown text-xs uppercase tracking-widest font-semibold transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-xs rounded-full"
              >
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Cotizar Velas Personalizadas</span>
              </Link>
            </div>

            {/* 4 Pillars Strip */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-brand-gold/15">
              {ARTISAN_PILLARS.map(({ icon: Icon, title, subtitle }) => (
                <div
                  key={title}
                  className="bg-white/60 backdrop-blur-xs p-3 rounded-md border border-brand-gold/15 hover:border-brand-gold/40 transition-colors text-left"
                >
                  <Icon className="w-4 h-4 text-brand-gold mb-1.5" />
                  <p className="text-xs font-semibold text-stone-900 leading-tight">{title}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">{subtitle}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex justify-center w-full"
          >
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/25 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#EAE3DA] group">
              {/* Resplandor ambiental suave con los tonos naturales de la vela */}
              {currentImage && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 filter blur-3xl scale-125"
                >
                  <SkeletonImage
                    src={currentImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              )}

              {/* Contenedor principal de la imagen: object-contain preserva 100% la relación de aspecto original sin deformaciones */}
              <div className="relative w-full h-full p-4 sm:p-6 pb-28 sm:pb-32 flex items-center justify-center">
                {currentImage ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <SkeletonImage
                        src={currentImage}
                        alt={
                          heroProduct?.nombre
                            ? `Vela artesanal ${heroProduct.nombre} en cera de soya natural Sandra Gil - Taller Bogotá`
                            : 'Vela artesanal en cera de soya natural Sandra Gil - Taller Bogotá'
                        }
                        className="w-full h-full object-contain drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-105"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 512px"
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-brand-cream/50 p-8 text-center">
                    <Image
                      src="/logo-sandra.png"
                      alt="Sandra Gil Velas"
                      width={160}
                      height={160}
                      priority
                      unoptimized
                      className="object-contain opacity-70"
                    />
                    <p className="font-serif text-lg text-stone-700 mt-4">Velas Botánicas Hechas a Mano</p>
                  </div>
                )}
              </div>

              {/* Sello artesanal flotante */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-brand-gold/30 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-[10px] font-bold text-brand-brown uppercase tracking-wider">
                  Edición Artesanal
                </span>
              </div>

              {/* Controles de navegación si hay múltiples imágenes en el banner */}
              {heroImages.length > 1 && (
                <>
                  {/* Contador de imagen */}
                  <div className="absolute top-4 right-4 z-20 bg-stone-900/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] font-medium text-white/90">
                    {activeIdx + 1} / {heroImages.length}
                  </div>

                  {/* Flechas de navegación anterior / siguiente */}
                  <button
                    onClick={handlePrev}
                    aria-label="Imagen anterior"
                    className="absolute left-2.5 top-[40%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/85 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-all opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-stone-800" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Siguiente imagen"
                    className="absolute right-2.5 top-[40%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/85 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-all opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-stone-800" />
                  </button>

                  {/* Indicadores de puntos (Dots) */}
                  <div className="absolute bottom-28 sm:bottom-32 inset-x-0 z-20 flex items-center justify-center gap-1.5 pointer-events-auto">
                    {heroImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveIdx(idx);
                        }}
                        aria-label={`Ver imagen ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          activeIdx === idx
                            ? 'w-5 bg-brand-gold shadow-xs'
                            : 'w-1.5 bg-stone-400/60 hover:bg-stone-600'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Ficha flotante inferior con detalles del producto sin tapar la vela */}
              <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 p-4 sm:p-5 z-20 rounded-xl bg-stone-900/90 backdrop-blur-md border border-brand-gold/30 text-white shadow-xl flex flex-col gap-1 transition-all group-hover:border-brand-gold/50">
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold font-sans">
                  {heroProduct?.aroma ? `Aroma: ${heroProduct.aroma}` : 'Cera 100% de Soya'}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-normal leading-snug line-clamp-1">
                  {heroProduct?.nombre ?? 'Colección Signature'}
                </h3>
                <div className="flex items-center justify-between pt-1 mt-1 border-t border-white/20">
                  <p className="text-sm sm:text-base font-semibold text-brand-gold font-serif">
                    {heroProduct?.precio ? `$${heroProduct.precio.toLocaleString('es-CO')} COP` : 'Bajo Pedido'}
                  </p>
                  <Link
                    href={heroProduct?.slug ? `/productos/${heroProduct.slug}` : '#catalogo'}
                    className="text-xs text-white/90 hover:text-white underline underline-offset-4 flex items-center gap-1 font-medium transition cursor-pointer"
                  >
                    <span>Ver Detalles</span>
                    <ArrowRight className="w-3 h-3 text-brand-gold" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
