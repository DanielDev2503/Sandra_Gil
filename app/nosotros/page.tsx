import type { Metadata } from 'next';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Sparkles, Leaf, Heart, Flame, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Sandra Gil Velas Artesanales',
  description:
    'Conoce la historia de Sandra Gil Velas Artesanales: un taller artesanal en Bogotá dedicado a crear velas de cera de soya con flores preservadas y aromas exclusivos.',
};

const PILLARS = [
  {
    icon: Leaf,
    title: 'Ingredientes Puros',
    description:
      'Cera de soya 100% natural, pabilos de algodón orgánico sin plomo y esencias cuidadosamente seleccionadas.',
  },
  {
    icon: Sparkles,
    title: 'Diseño Artesanal',
    description:
      'Cada vela es moldeada y vertida a mano, con flores botánicas preservadas que la hacen irrepetible.',
  },
  {
    icon: Heart,
    title: 'Hecha con Amor',
    description:
      'Detrás de cada pieza hay dedicación, atención al detalle y un genuino deseo de embellecer tus espacios.',
  },
  {
    icon: Flame,
    title: 'Combustión Limpia',
    description:
      'Sin parafina ni derivados del petróleo: una llama que cuida de ti y de tu hogar sin humo ni hollín.',
  },
];

export default function NosotrosPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FAF8F5]">
      <Header />

      <main className="flex-1">
        {/* ── HERO ────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-brand-cream py-20 sm:py-28 border-b border-stone-200/40">
          {/* Decorative background circles */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-xs rounded-full border border-brand-gold/30 shadow-xs mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-[10px] font-bold text-brand-brown uppercase tracking-widest">
                Nuestra Historia
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
              Del Corazón de Bogotá,{' '}
              <span className="font-normal italic text-brand-gold">Luz Natural</span> para Tu Hogar
            </h1>

            <p className="mt-6 text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans font-light">
              Sandra Gil Velas Artesanales nació de la pasión por los aromas, la naturaleza y el
              diseño consciente. Desde nuestro taller en Bogotá, transformamos cera de soya pura en
              piezas decorativas que combinan belleza, bienestar y un compromiso real con el medio
              ambiente.
            </p>

            <div className="mt-8 flex justify-center">
              <Image
                src="/logo-sandra.png"
                alt="Sandra Gil Velas Artesanales"
                width={120}
                height={120}
                className="rounded-full object-cover ring-4 ring-brand-gold/30 shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* ── OUR STORY ──────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-white border-b border-stone-200/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
                Nuestra Esencia
              </span>
              <h2 className="text-3xl font-serif font-light text-stone-900 mt-2">
                Un Taller con Alma
              </h2>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4" />
            </div>

            <div className="space-y-6 text-stone-600 text-sm sm:text-base leading-relaxed font-sans font-light max-w-3xl mx-auto">
              <p>
                Todo comenzó con una búsqueda sencilla: crear atmósferas que invitaran a la calma.
                Después de experimentar con distintos materiales y técnicas, descubrimos que la cera
                de soya —limpia, renovable y con una duración excepcional— era la base perfecta para
                velas que fueran algo más que un objeto decorativo.
              </p>
              <p>
                Hoy cada vela que sale de nuestro taller es vertida a mano, decorada con flores
                botánicas preservadas artesanalmente y perfumada con mezclas de aromaterapia
                diseñadas para transformar cualquier espacio. Trabajamos en lotes pequeños para
                cuidar cada detalle: desde la temperatura exacta de vertido hasta la selección
                individual de cada flor y cristal.
              </p>
              <p>
                Creemos que la belleza auténtica no necesita prisa. Por eso ofrecemos también un
                servicio de elaboración bajo pedido, donde cada cliente puede personalizar su vela
                ideal —el aroma, las flores, los colores— y recibir una pieza verdaderamente única.
              </p>
            </div>
          </div>
        </section>

        {/* ── PILLARS ────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-brand-cream border-b border-stone-200/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
                Lo que Nos Define
              </span>
              <h2 className="text-3xl font-serif font-light text-stone-900 mt-2">
                Nuestros Pilares
              </h2>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="bg-white p-6 rounded-lg border border-brand-gold/15 shadow-xs hover:shadow-md transition-shadow duration-300 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <h3 className="font-serif text-base font-medium text-stone-800 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TALLER DIDÁCTICO — BANNER DESTACADO ────────── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-brown via-[#6B4D22] to-[#3E2A0F] p-8 sm:p-12 text-center shadow-2xl">
              {/* Decorative glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/20 backdrop-blur-xs rounded-full border border-brand-gold/40 mb-6">
                  <GraduationCap className="w-4 h-4 text-brand-gold" />
                  <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest">
                    Experiencia Exclusiva
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#FAF8F5] leading-tight max-w-2xl mx-auto">
                  ¡Vive la Experiencia Artesanal!{' '}
                  <span className="italic text-brand-gold font-normal">
                    Taller Didáctico de Creación de Velas y Aromaterapia
                  </span>
                </h2>

                <p className="mt-6 text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed font-sans font-light">
                  Aprende a crear tu propia vela aromática de cera de soya con flores preservadas.
                  Una experiencia sensorial guiada por Sandra Gil donde descubrirás las técnicas
                  artesanales, el arte de la aromaterapia y te llevarás una pieza única hecha por
                  tus propias manos. Ideal para regalar, para equipos corporativos o para una tarde
                  creativa con amigas.
                </p>

                <div className="mt-8">
                  <a
                    href="https://wa.me/573175752029?text=Hola%20Sandra,%20estoy%20interesado%20en%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20curso/taller%20did%C3%A1ctico%20de%20velas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1da851] hover:scale-[1.03] active:scale-[0.97] text-white text-sm uppercase tracking-widest font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M11.999 2.001C6.476 2.001 2.001 6.476 2.001 12c0 1.763.463 3.414 1.272 4.848L2 22l5.306-1.243A9.954 9.954 0 0 0 12 22c5.523 0 9.999-4.477 9.999-10S17.523 2.001 12 2.001zm0 1.8A8.197 8.197 0 0 1 20.2 12c0 4.52-3.678 8.2-8.2 8.2a8.163 8.163 0 0 1-4.167-1.137l-.299-.181-3.101.727.766-2.999-.197-.31A8.163 8.163 0 0 1 3.8 12C3.8 7.48 7.478 3.8 12 3.8z" />
                    </svg>
                    Reservar por WhatsApp
                  </a>
                </div>

                <p className="mt-4 text-[10px] text-stone-400 tracking-wide font-sans">
                  Cupos limitados · Incluye todos los materiales · Bogotá, Colombia
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
