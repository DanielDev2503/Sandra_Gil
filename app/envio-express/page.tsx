import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExpressShippingForm from './ExpressShippingForm';
import {
  Zap,
  MapPin,
  CircleDollarSign,
  Truck,
  Clock,
  ClipboardCheck,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '⚡ Envío Express en Bogotá (Mismo Día / Entrega Rápida) | Sandra Gil Velas',
  description: 'Solicita envío express el mismo día para tus velas artesanales en Bogotá D.C. Entrega rápida a través de plataformas digitales de mensajería.',
  openGraph: {
    title: '⚡ Envío Express en Bogotá | Sandra Gil Velas Artesanales',
    description: 'Servicio de entrega rápida el mismo día para Bogotá D.C. Cobertura local por mensajería digital.',
    url: 'https://sgvelas.com/envio-express',
  },
  alternates: {
    canonical: '/envio-express',
  },
};

const KEY_POINTS = [
  {
    icon: MapPin,
    badge: 'Ubicación',
    title: '1. Cobertura Restringida',
    highlight: 'ÚNICAMENTE Bogotá D.C.',
    desc: 'Por el momento, el servicio de Envío Express (mismo día o entrega prioritario) aplica de forma exclusiva dentro del perímetro urbano de la ciudad de Bogotá D.C.',
  },
  {
    icon: CircleDollarSign,
    badge: 'Costo',
    title: '2. Tarifa y Costo Adicional',
    highlight: 'Cargos según distancia',
    desc: 'La entrega express genera cargos adicionales sobre el valor de la compra, los cuales dependerán de la distancia exacta entre nuestro taller y tu dirección de entrega.',
  },
  {
    icon: Truck,
    badge: 'Despacho',
    title: '3. Transporte por Aplicación',
    highlight: 'Plataformas de mensajería',
    desc: 'El despacho de tus velas se gestiona a través de servicios digitales de mensajería directa y confiable (ej. Picap, Mensajeros Urbanos, Rappi o motorizados aliados).',
  },
  {
    icon: Clock,
    badge: 'Producción',
    title: '4. Tiempo de Alistamiento Artesanal',
    highlight: 'Elaboración a mano',
    desc: 'Nuestras velas son vertidas artesanalmente a mano con cera de soya. Se requiere un tiempo mínimo de alistamiento y secado previo antes de entregar al domiciliario.',
  },
  {
    icon: ClipboardCheck,
    badge: 'Verificación',
    title: '5. Datos Requeridos para Confirmar',
    highlight: 'ID Pedido + ID Wompi',
    desc: 'Para procesar tu envío express debes suministrar obligatoriamente tu ID del Pedido (Order ID) y el ID de Transacción de Pago de Wompi.',
  },
];

export default function ExpressShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#F5EDD8] via-[#FAF6ED] to-brand-cream py-10 sm:py-16 border-b border-brand-gold/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-100/90 border border-amber-300/70 rounded-full shadow-xs">
              <Zap className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-amber-900 uppercase tracking-widest">
                Servicio Prioritario Bogotá
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light text-stone-900 leading-tight">
              ⚡ Envío Express en Bogotá{' '}
              <span className="block text-xl sm:text-2xl md:text-3xl italic font-normal text-brand-gold mt-1">
                (Mismo Día / Entrega Rápida)
              </span>
            </h1>

            <p className="text-stone-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
              ¿Necesitas tus velas decorativas o aromáticas con urgencia en Bogotá? Te ofrecemos atención prioritaria y envío por mensajería directa para que disfrutes de la luz de Sandra Gil el mismo día.
            </p>
          </div>
        </section>

        {/* Informational Cards Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
              Condiciones del Servicio
            </span>
            <h2 className="text-xl sm:text-3xl font-serif text-stone-900">
              Puntos Clave que Debes Tener en Cuenta
            </h2>
            <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-2"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {KEY_POINTS.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl border border-stone-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                    index === 4 ? 'md:col-span-2 lg:col-span-1 border-amber-300/80 bg-amber-50/20' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-stone-100 text-stone-600 rounded-md">
                        {point.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900">
                      {point.title}
                    </h3>

                    <div className="inline-block px-2 py-0.5 bg-amber-100/60 rounded text-xs font-semibold text-amber-900 border border-amber-200/60">
                      {point.highlight}
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed pt-1">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Form Component */}
          <div className="pt-6">
            <ExpressShippingForm />
          </div>

          {/* Extra Guarantee / Navigation Banner */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Garantía de Calidad Sandra Gil</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif text-white">
                ¿Aún no has elegido tus velas?
              </h3>
              <p className="text-xs text-stone-400 max-w-md">
                Explora nuestro catálogo completo de velas aromáticas y decorativas hechas con cera de soya natural 100% colombiana.
              </p>
            </div>

            <Link
              href="/catalogo"
              className="px-6 py-3 min-h-[44px] bg-brand-gold hover:bg-brand-brown text-white text-xs font-bold uppercase tracking-wider rounded-lg transition duration-300 inline-flex items-center gap-2 shrink-0 active:scale-98"
            >
              <span>Ver Catálogo</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
