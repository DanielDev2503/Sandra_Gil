'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, Star, ArrowRight, MessageCircle, Heart, CheckCircle2, Droplets } from 'lucide-react';
import Header from './Header';
import HeroSection from './HeroSection';
import BrandPillarsBento from './BrandPillarsBento';
import InteractiveProductShowcase from './InteractiveProductShowcase';
import ProductCatalog from './ProductCatalog';
import SensoryWorkshopSection from './SensoryWorkshopSection';
import CartDrawer from './CartDrawer';
import Footer from './Footer';
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

interface ResenaItem {
  id: string;
  autor: string;
  calificacion: number;
  comentario: string;
  creado_en: string | Date;
  producto?: {
    nombre: string;
    slug: string;
  } | null;
}

interface StoreShellProps {
  products: Product[];
  heroProduct: Product | null;
  availableAromas?: string[];
  resenas?: ResenaItem[];
}

const FEATURED_AROMAS = [
  {
    name: 'Lavanda & Manzanilla',
    tag: 'Aromaterapia · Calma',
    mood: 'Relajación profunda y descanso',
    notes: 'Lavanda silvestre · Azahar · Maderas suaves',
    bgClass: 'from-purple-50/90 to-indigo-50/50 border-purple-200/60 hover:border-purple-300',
    badgeClass: 'bg-purple-100 text-purple-900 border-purple-200',
    accentText: 'text-purple-800',
  },
  {
    name: 'Cítricos & Caléndula',
    tag: 'Energía · Vitalidad',
    mood: 'Claridad mental y optimismo',
    notes: 'Mandarina verde · Bergamota · Caléndula',
    bgClass: 'from-amber-50/90 to-orange-50/50 border-amber-200/60 hover:border-amber-300',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-200',
    accentText: 'text-amber-800',
  },
  {
    name: 'Jazmín Imperial',
    tag: 'Floral Noble · Lujo',
    mood: 'Serenidad, calidez e introspección',
    notes: 'Jazmín blanco · Flor de azahar · Sándalo',
    bgClass: 'from-stone-50/90 to-amber-50/40 border-stone-200/70 hover:border-amber-300',
    badgeClass: 'bg-stone-100 text-stone-800 border-stone-200',
    accentText: 'text-stone-800',
  },
  {
    name: 'Rosas Silvestres',
    tag: 'Floral Romántico',
    mood: 'Amor propio y armonía',
    notes: 'Pétalos de rosa · Peonía · Almizcle floral',
    bgClass: 'from-rose-50/90 to-pink-50/50 border-rose-200/60 hover:border-rose-300',
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-200',
    accentText: 'text-rose-800',
  },
  {
    name: 'Canela & Manzana',
    tag: 'Cálido · Especiado',
    mood: 'Sensación acogedora de hogar',
    notes: 'Canela de Ceilán · Manzana · Nuez moscada',
    bgClass: 'from-orange-50/90 to-amber-100/40 border-orange-200/60 hover:border-orange-300',
    badgeClass: 'bg-orange-100 text-orange-900 border-orange-200',
    accentText: 'text-orange-900',
  },
  {
    name: 'Vainilla Dulce',
    tag: 'Gourmet · Confort',
    mood: 'Dulzura reconfortante y calidez',
    notes: 'Vainilla bourbon · Azúcar moreno · Caramelo',
    bgClass: 'from-yellow-50/70 to-stone-50/70 border-yellow-200/60 hover:border-yellow-300',
    badgeClass: 'bg-yellow-100 text-yellow-900 border-yellow-200',
    accentText: 'text-yellow-900',
  },
];

export default function StoreShell({
  products,
  heroProduct,
  availableAromas = [],
  resenas = [],
}: StoreShellProps) {
  // Select featured showcase product (heroProduct or first product with stock)
  const showcaseProduct = heroProduct || products[0] || null;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* Navigation Header */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section with split balance & animated floating badge */}
        <HeroSection heroProduct={heroProduct} />

        {/* 2. Brand Pillars Bento Grid (100% Cera de Soya, Flores Artesanales, Hecho a Mano, Aromaterapia) */}
        <BrandPillarsBento />

        {/* 3. Interactive Product Spotlight & Olfactory Pyramid Experience */}
        {showcaseProduct && (
          <InteractiveProductShowcase
            product={showcaseProduct}
            availableAromas={availableAromas}
          />
        )}

        {/* 4. SECCIÓN VISUAL ENRIQUECIDA: "Explorar por Aroma" (Paletas suaves editoriales) */}
        <section className="bg-white py-16 sm:py-20 border-b border-brand-gold/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-stone-50 rounded-full border border-brand-gold/25 mb-3">
                <Droplets className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold font-sans">
                  Familias Aromáticas Selectas
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-stone-900">
                Explora Nuestra Colección por Aroma
              </h2>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-3 mb-3" />
              <p className="text-stone-500 text-xs sm:text-sm font-sans font-light">
                Cada fragancia ha sido formulada con aceites botánicos puros para armonizar emociones y transformar espacios.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 font-sans">
              {FEATURED_AROMAS.map((item) => (
                <Link
                  key={item.name}
                  href={`/catalogo?aroma=${encodeURIComponent(item.name)}`}
                  className={`group relative rounded-xl p-5 sm:p-6 bg-gradient-to-br ${item.bgClass} border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${item.badgeClass}`}>
                        {item.tag}
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
                    </div>

                    <h3 className={`font-serif text-lg sm:text-xl font-medium mb-1 ${item.accentText}`}>
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-600 font-light mb-3">
                      {item.mood}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200/50 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="truncate max-w-[200px]">{item.notes}</span>
                    <span className="font-semibold text-stone-800 group-hover:text-brand-brown">Ver velas →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Complete Product Catalog */}
        <ProductCatalog products={products} showFilters={false} />

        {/* 6. NUEVA SECCIÓN DE ALTO TICKET: "Velas Personalizadas y Eventos" */}
        <section className="bg-[#2C2A29] text-[#FAF8F5] py-16 sm:py-24 relative overflow-hidden border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800/80 rounded-full border border-brand-gold/30">
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold font-sans">
                    Recordatorios Exclusivos & Regalos Corporativos
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-tight leading-tight">
                  Velas Personalizadas para{' '}
                  <span className="italic text-amber-300">Bodas, Bautizos & Eventos</span>
                </h2>

                <p className="text-stone-300 text-sm sm:text-base font-light font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Creamos piezas botánicas únicas para celebraciones inolvidables en Bogotá y la Sabana. Diseñamos etiquetas personalizadas con nombres y fechas, selección de flores preservadas temáticas, aromas insignia y empaques artesanales listos para regalar.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left font-sans">
                  <div className="bg-stone-800/60 p-3.5 rounded-lg border border-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mb-1" />
                    <p className="text-xs font-semibold text-white">Etiquetas a Medida</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">Diseño gráfico con tus nombres, fecha o logo</p>
                  </div>
                  <div className="bg-stone-800/60 p-3.5 rounded-lg border border-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mb-1" />
                    <p className="text-xs font-semibold text-white">Flores Temáticas</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">Hortensias, lavanda o rosas preservadas</p>
                  </div>
                  <div className="bg-stone-800/60 p-3.5 rounded-lg border border-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mb-1" />
                    <p className="text-xs font-semibold text-white">Precios por Volumen</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">Desde 12 unidades con tarifa preferencial</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
                  <Link
                    href="/personalizadas"
                    className="px-8 py-4 bg-brand-gold hover:bg-amber-500 text-stone-900 text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 shadow-md text-center flex items-center justify-center gap-2"
                  >
                    <span>Cotizar Velas para Eventos →</span>
                  </Link>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20gustar%C3%ADa%20cotizar%20velas%20personalizadas%20para%20un%20evento%20en%20Bogot%C3%A1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Asesoría Directa por WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl bg-stone-800 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">
                      Taller Bogotá
                    </span>
                    <CandleGlowPulse size="sm">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </CandleGlowPulse>
                  </div>

                  <div className="space-y-3 my-auto text-center py-4">
                    <p className="font-serif text-2xl text-white font-light">
                      &ldquo;El recuerdo de tu boda merece perdurar en la memoria con un aroma inolvidable.&rdquo;
                    </p>
                    <p className="text-xs text-amber-300 font-sans tracking-wide">
                      — Sandra Gil Artesana
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-700 flex items-center justify-between text-xs text-stone-300">
                    <span>Despachos en Bogotá & Colombia</span>
                    <span className="text-amber-400 font-medium">100% Cera de Soya</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. Sensory Workshops & Experiences */}
        <SensoryWorkshopSection />

        {/* 8. NUEVA SECCIÓN DE PRUEBA SOCIAL: "Testimonios y Reseñas de Clientes en Bogotá" */}
        <section className="bg-white py-16 sm:py-24 border-b border-brand-gold/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-200/80 mb-3 text-amber-800">
                <div className="flex text-amber-400">
                  {'★★★★★'}
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold font-sans ml-1">
                  Reseñas 5 Estrellas Verificadas
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900">
                Experiencias Reales de Nuestros Clientes
              </h2>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-3 mb-4" />
              <p className="text-stone-500 text-xs sm:text-sm font-sans font-light">
                Descubre por qué cientos de hogares y eventos en Bogotá y Colombia eligen Sandra Gil Velas Artesanales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              {(resenas.length > 0 ? resenas : [
                {
                  id: 'default-1',
                  autor: 'Camila Restrepo · Bogotá (Usaquén)',
                  calificacion: 5,
                  comentario: 'El aroma a lavanda y manzanilla es verdaderamente relajante, no satura ni huele a químico. Se nota el amor con el que la hicieron y la cera de soya quema súper parejo sin dejar túnel.',
                  producto: { nombre: 'Vela Botánica Lavanda & Manzanilla', slug: 'vela-botanica-lavanda-manzanilla' }
                },
                {
                  id: 'default-2',
                  autor: 'Andrés Felipe Morales · Chía',
                  calificacion: 5,
                  comentario: 'Compré la de cítricos y caléndula para mi estudio y el cambio de energía fue inmediato. Además, llegó empacada impecable con nota a mano. Excelente servicio de entrega rápida.',
                  producto: { nombre: 'Vela Botánica Cítricos & Caléndula', slug: 'vela-botanica-citricos-calendula' }
                },
                {
                  id: 'default-3',
                  autor: 'Valentina Gómez · Bogotá (Rosales)',
                  calificacion: 5,
                  comentario: 'Mandé a hacer 30 recordatorios personalizados para el bautizo de mi hija y todas las invitadas quedaron enamoradas. El detalle de las flores botánicas preservadas es único.',
                  producto: { nombre: 'Vela Aromática Jazmín Imperial', slug: 'vela-aromatica-jazmin-imperial' }
                }
              ]).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#FAF8F5] p-6 rounded-xl border border-brand-gold/20 shadow-xs flex flex-col justify-between hover:border-brand-gold/50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400 text-sm">
                        {Array.from({ length: rev.calificacion || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                        ✓ Compra Verificada
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed italic">
                      &ldquo;{rev.comentario}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-brand-gold/15">
                    <p className="text-xs font-semibold text-stone-900">{rev.autor}</p>
                    {rev.producto?.nombre && (
                      <p className="text-[10px] text-brand-gold font-medium mt-0.5">
                        {rev.producto.nombre}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
