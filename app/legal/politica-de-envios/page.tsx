import type { Metadata } from 'next';
import { Truck, Zap, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Envíos y Tiempos de Entrega | Sandra Gil Velas',
  description: 'Conoce los tiempos de elaboración artesanal (1-2 días), transporte nacional con Servientrega y opción de Envío Express el mismo día en Bogotá.',
  alternates: {
    canonical: '/legal/politica-de-envios',
  },
};

export default function PoliticaDeEnviosPage() {
  return (
    <div className="space-y-8 font-sans not-prose">
      {/* Title */}
      <div className="space-y-3 pb-6 border-b border-stone-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Truck className="w-4 h-4 text-amber-700" />
          <span>Información Logística</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
          Política de Envíos y Tiempos de Entrega
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
          Transparencia y cuidado en cada etapa de tu pedido, desde el vertido artesanal hasta la entrega en la puerta de tu hogar.
        </p>
      </div>

      {/* Core Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
            1
          </div>
          <h3 className="font-serif text-base font-semibold text-stone-900">
            Alistamiento Artesanal
          </h3>
          <div className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded inline-block">
            1 a 2 días hábiles
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Nuestras velas son vertidas a mano con cera de soya 100% pura natural. Requerimos este período para garantizar el fraguado perfecto y el control de calidad.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
            2
          </div>
          <h3 className="font-serif text-base font-semibold text-stone-900">
            Transporte Nacional Servientrega
          </h3>
          <div className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded inline-block">
            1 a 3 días hábiles
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Despachamos a todas las ciudades y municipios de Colombia a través de nuestro aliado oficial <strong>Servientrega</strong> en empaque de protección especial.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-5 rounded-xl border border-amber-300 bg-amber-50/20 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <h3 className="font-serif text-base font-semibold text-stone-900">
            Envío Express en Bogotá
          </h3>
          <div className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded inline-block">
            Mismo Día / Entrega Rápida
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            ¿Lo necesitas hoy en Bogotá D.C.? Puedes coordinar tu despacho prioritario mediante plataformas digitales de mensajería directa.
          </p>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6">
        <section className="space-y-3">
          <h3 className="text-lg font-serif font-semibold text-stone-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-gold" />
            1. Tiempos Totales Estimados de Entrega
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            El tiempo total de entrega se calcula sumando el tiempo de preparación de la vela más el tiempo de tránsito del transporte:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700 pl-4 list-disc font-light">
            <li>
              <strong>Bogotá D.C. y Municipios Aledaño Zonal (Envío Gratis):</strong> 2 a 3 días hábiles totales (1-2 días elaboración + 1 día tránsito).
            </li>
            <li>
              <strong>Ciudades Principales e Intermedias (Servientrega $9.000 COP):</strong> 2 a 5 días hábiles totales (1-2 días elaboración + 1-3 días tránsito).
            </li>
            <li>
              <strong>Municipios Especiales / Difícil Acceso (Servientrega $24.000 COP):</strong> 4 a 7 días hábiles totales (1-2 días elaboración + 3-5 días tránsito).
            </li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-stone-100">
          <h3 className="text-lg font-serif font-semibold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            2. Empaque Seguro y Garantía de Rotura
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Cada una de nuestras velas en envase de vidrio es protegida individualmente con embalaje amortiguado multicapa. Garantizamos que tu producto llegará en perfectas condiciones. En caso improbable de daños durante el transporte por Servientrega, te repondremos la pieza sin costo adicional reportándolo en las primeras 24 horas.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-stone-100">
          <h3 className="text-lg font-serif font-semibold text-stone-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            3. ¿Cómo Funciona el Envío Express en Bogotá?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Si tu dirección de entrega se encuentra dentro del perímetro urbano de Bogotá D.C. y deseas recibir tus velas el mismo día, puedes activar el servicio prioritario ingresando tu ID de Pedido e ID de Transacción Wompi en nuestra sección dedicada.
          </p>
          <div className="pt-2">
            <Link
              href="/envio-express"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-xs"
            >
              <span>Solicitar Envío Express en Bogotá</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
