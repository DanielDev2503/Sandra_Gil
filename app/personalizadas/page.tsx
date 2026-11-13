import { prisma } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { MessageCircle, Sparkles, Clock, Palette } from 'lucide-react';
import PersonalizadasProductCard from '@/components/PersonalizadasProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Velas Personalizadas para Eventos y Recordatorios en Bogotá | Sandra Gil',
  description:
    'Velas decorativas elaboradas bajo pedido con cera de soya natural, flores artesanales y aromas exclusivos. Cotiza recordatorios para bodas y eventos en Bogotá.',
  alternates: {
    canonical: 'https://sandragilvelas.com/personalizadas',
  },
  openGraph: {
    title: 'Velas Personalizadas para Eventos y Recordatorios en Bogotá | Sandra Gil',
    description:
      'Velas decorativas elaboradas bajo pedido con cera de soya natural, flores artesanales y aromas exclusivos. Cotiza recordatorios para bodas y eventos en Bogotá.',
    url: 'https://sandragilvelas.com/personalizadas',
    siteName: 'Sandra Gil Velas Artesanales',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velas Personalizadas para Eventos | Sandra Gil Velas Artesanales',
    description:
      'Diseñamos velas únicas y recuerdos personalizados con cera de soya pura y flores artesanales en Bogotá.',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const WA_NUMBER = '573175752029';

export default async function PersonalizadasPage() {
  const products = await prisma.producto.findMany({
    where: { activo: true, esBajoPedido: true },
    select: {
      id: true,
      slug: true,
      nombre: true,
      descripcion: true,
      aroma: true,
      url_imagen: true,
      imagenes: true,
    },
    orderBy: { nombre: 'asc' },
  });

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <Header />

      <main className="flex-1">
        {/* ── HERO COMPACTO: SPLIT HORIZONTAL ── */}
        <section className="bg-[#FAF8F5] border-b border-stone-200/70 py-5 sm:py-7">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
              {/* COLUMNA IZQUIERDA: Título y Propuesta de Valor (5 de 12 cols) */}
              <div className="lg:col-span-5 text-center lg:text-left space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#B8862D] font-semibold bg-white border border-amber-200/70 rounded-full px-3 py-0.5 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#B8862D] shrink-0" /> Elaboración Artesanal Exclusiva
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 leading-tight">
                  Velas <span className="italic font-normal text-[#B8862D]">Bajo Pedido</span>
                </h1>

                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Creamos piezas únicas personalizadas a tu gusto: elige el aroma, el tamaño, las flores en cera y el mensaje. Elaboradas a mano con cera de soya 100% natural.
                </p>
              </div>

              {/* COLUMNA DERECHA: Flujo Asimétrico Editorial de 3 Pasos */}
              <div className="lg:col-span-7 space-y-3.5">
                {/* Paso 01: Acción Primaria Destacada (Full-width en columna derecha) */}
                <div className="group border-t border-[#B8862D]/40 pt-3 sm:pt-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-[#B8862D]/35 text-2xl sm:text-3xl font-light select-none">
                        01
                      </span>
                      <MessageCircle className="w-3.5 h-3.5 text-[#B8862D]/70 stroke-[1.5]" aria-hidden="true" />
                      <h3 className="font-serif text-sm sm:text-base font-medium text-stone-900 group-hover:text-[#B8862D] transition-colors">
                        Escríbenos tu Visión
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B8862D] font-medium font-sans">
                      Paso Inicial por WhatsApp
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-light leading-relaxed font-sans sm:pl-8">
                    Cuéntanos tu idea: aroma preferido, colores, flores en cera, tamaño y ocasión especial.
                  </p>
                </div>

                {/* Pasos 02 y 03: Dúo Asimétrico Escalonado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2.5 border-t border-stone-200/60">
                  {/* Paso 02 */}
                  <div className="group border-l-0 sm:border-r sm:border-stone-200/60 sm:pr-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-[#B8862D]/35 text-xl sm:text-2xl font-light select-none">
                        02
                      </span>
                      <Palette className="w-3.5 h-3.5 text-[#B8862D]/70 stroke-[1.5]" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-xs sm:text-sm font-medium text-stone-900 mb-0.5 group-hover:text-[#B8862D] transition-colors">
                      Diseñamos la Propuesta
                    </h3>
                    <p className="text-[11px] text-stone-500 font-light leading-snug font-sans">
                      Sandra crea una composición personalizada según tus preferencias.
                    </p>
                  </div>

                  {/* Paso 03 (con ligero offset visual) */}
                  <div className="group sm:pl-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-[#B8862D]/35 text-xl sm:text-2xl font-light select-none">
                        03
                      </span>
                      <Clock className="w-3.5 h-3.5 text-[#B8862D]/70 stroke-[1.5]" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-xs sm:text-sm font-medium text-stone-900 mb-0.5 group-hover:text-[#B8862D] transition-colors">
                      Elaboramos a Mano
                    </h3>
                    <p className="text-[11px] text-stone-500 font-light leading-snug font-sans">
                      Tiempo de producción: 3 a 7 días hábiles según la complejidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTENEDOR PRINCIPAL DE PRODUCTOS ── */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12 overflow-x-hidden">
          {products.length === 0 ? (
            <div className="text-center py-16 sm:py-24 space-y-5 sm:space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-brand-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-stone-800">Próximamente</h2>
              <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
                Estamos preparando nuestra colección de velas bajo pedido. Mientras tanto, escríbenos directamente por WhatsApp para cotizar tu vela personalizada.
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20interesa%20cotizar%20una%20vela%20personalizada`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[44px] bg-[#B8862D] hover:bg-[#A37424] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-98"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-white" />
                Cotizar por WhatsApp
              </a>
            </div>
          ) : (
            <>
              {/* Barra de Título Compacta (Ahorra ~120px de altura) */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 mb-4 border-b border-stone-200/60">
                <div className="flex items-baseline gap-3">
                  <h2 className="text-lg sm:text-xl font-serif text-stone-900">
                    Diseños Disponibles
                  </h2>
                  <span className="hidden md:inline text-xs text-stone-500 font-light">
                    — Cada diseño puede adaptarse a tus preferencias. Escríbenos para cotizar.
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#B8862D] font-medium">
                  {products.length} modelos base
                </span>
              </div>

              {/* Móvil: 2 cols | Tablet: 3-4 cols | Desktop: 6 cols */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4">
                {products.map((product) => (
                  <PersonalizadasProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          {/* General WhatsApp CTA */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-brand-brown to-brand-gold rounded-2xl p-6 sm:p-8 text-center text-white space-y-4 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-serif">¿Tienes una idea especial?</h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-lg mx-auto font-light">
              Podemos crear la vela de tus sueños: cumpleaños, bodas, recuerdos corporativos, o simplemente para ti. Sin límites en creatividad.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20tengo%20una%20idea%20especial%20para%20una%20vela%20personalizada`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[44px] bg-white text-brand-brown text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-300 hover:bg-brand-cream shadow-md active:scale-98"
            >
              <MessageCircle className="w-4 h-4 shrink-0 text-brand-gold" />
              Enviar Mensaje a Sandra
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
