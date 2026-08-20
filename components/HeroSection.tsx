'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, Leaf, Flame, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import CandleGlowPulse from './CandleGlowPulse';
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
  url_imagen: string | null;
  imagenes?: string[];
  activo: boolean;
}

interface HeroSectionProps {
  heroProduct: Product | null;
}

const WA_NUMBER = '573175752029';

const ARTISAN_PILLARS = [
  { icon: Leaf, title: '100% Cera de Soya', subtitle: 'Biodegradable & limpia' },
  { icon: Sparkles, title: 'Flores Preservadas', subtitle: 'Diseño botánico vivo' },
  { icon: Flame, title: 'Combustión Limpia', subtitle: 'Pabilo de algodón sin plomo' },
  { icon: ShieldCheck, title: 'Hecho a Mano', subtitle: 'Vertido en Bogotá' },
];

export default function HeroSection({ heroProduct }: HeroSectionProps) {
  const heroImage =
    heroProduct?.imagenes && heroProduct.imagenes.length > 0
      ? heroProduct.imagenes[0]
      : heroProduct?.url_imagen ?? null;

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

            {/* Main Editorial Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-stone-900 tracking-tight leading-[1.12]">
              El Arte de Iluminar con{' '}
              <span className="font-normal italic text-brand-gold relative inline-block">
                Naturaleza & Alma
                <span className="absolute left-0 bottom-1 w-full h-[2px] bg-brand-gold/30 -z-10 rounded-full" />
              </span>
            </h1>

            {/* Subtitle / Value Thesis */}
            <p className="text-stone-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Velas aromáticas y piezas escultóricas vertidas a mano con cera de soya 100% natural, 
              adornadas con flores preservadas y esencias botánicas exclusivas. Luz que transforma tu hogar.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start gap-3.5 sm:gap-4 w-full">
              <a
                href="#catalogo"
                className="group w-full sm:w-auto px-8 py-4 min-h-[48px] bg-brand-brown hover:bg-stone-900 text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-xl text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 rounded-sm"
              >
                <span>Explorar Colección</span>
                <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20personalizada%20sobre%20tus%20velas%20artesanales`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 min-h-[48px] bg-white hover:bg-stone-50 border border-brand-brown/40 hover:border-brand-brown text-brand-brown text-xs uppercase tracking-widest font-semibold transition-all duration-300 text-center flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 shadow-xs rounded-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Asesoría por WhatsApp</span>
              </a>
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
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/25 bg-stone-100 group">
              {/* Product Image */}
              {heroImage ? (
                <SkeletonImage
                  src={heroImage}
                  alt={heroProduct?.nombre ?? 'Vela artesanal de soya Sandra Gil'}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-brand-cream p-8 text-center">
                  <Image
                    src="/logo-sandra.png"
                    alt="Sandra Gil Velas"
                    width={160}
                    height={160}
                    className="object-contain opacity-70"
                  />
                  <p className="font-serif text-lg text-stone-700 mt-4">Velas Botánicas Hechas a Mano</p>
                </div>
              )}

              {/* Ambient lighting gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Floating Handcrafted Seal Badge */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-brand-gold/30 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-[10px] font-bold text-brand-brown uppercase tracking-wider">
                  Edición Artesanal
                </span>
              </div>

              {/* Bottom Card Details */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-20 text-white flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
                  {heroProduct?.aroma ? `Aroma: ${heroProduct.aroma}` : 'Cera 100% de Soya'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug">
                  {heroProduct?.nombre ?? 'Colección Signature'}
                </h3>
                <div className="flex items-center justify-between pt-1 mt-1 border-t border-white/20">
                  <p className="text-sm sm:text-base font-semibold text-brand-gold font-serif">
                    {heroProduct?.precio ? `$${heroProduct.precio.toLocaleString('es-CO')} COP` : 'Bajo Pedido'}
                  </p>
                  <Link
                    href={heroProduct?.id ? `/productos/${heroProduct.id}` : '#catalogo'}
                    className="text-xs text-white/90 hover:text-white underline underline-offset-4 flex items-center gap-1 font-medium transition"
                  >
                    <span>Ver Detalles</span>
                    <ArrowRight className="w-3 h-3" />
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
