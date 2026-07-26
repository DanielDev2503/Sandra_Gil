import { prisma } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { MessageCircle, Sparkles, Clock, Palette } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Velas Bajo Pedido | Sandra Gil Velas Artesanales',
  description: 'Velas decorativas elaboradas a pedido con cera de soya natural, flores botánicas y aromas personalizados. Cotiza por WhatsApp con Sandra Gil en Bogotá.',
};

export const revalidate = 0;

const WA_NUMBER = '573175752029';

export default async function PersonalizadasPage() {
  const products = await prisma.producto.findMany({
    where: { activo: true, esBajoPedido: true },
    orderBy: { nombre: 'asc' },
  });

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <Header />

      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-[#F5EDD8] to-brand-cream py-20 border-b border-brand-gold/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-brand-gold/30 rounded-full shadow-xs">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-bold text-brand-brown uppercase tracking-widest">Elaboración Artesanal Exclusiva</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-900 leading-tight">
              Velas{' '}
              <span className="italic font-normal text-brand-gold">Bajo Pedido</span>
            </h1>

            <p className="text-stone-600 text-base max-w-2xl mx-auto leading-relaxed font-light">
              Creamos velas únicas y completamente personalizadas para ti: elige el aroma, el tamaño, las flores botánicas y el mensaje. Cada pieza es una obra artesanal irrepetible, elaborada con cera de soya pura 100% natural.
            </p>

            {/* Process steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
              {[
                { icon: MessageCircle, step: '1', title: 'Escríbenos', desc: 'Cuéntanos tu visión por WhatsApp: aroma, flores, tamaño y ocasión.' },
                { icon: Palette, step: '2', title: 'Diseñamos', desc: 'Sandra crea una propuesta personalizada según tus preferencias.' },
                { icon: Clock, step: '3', title: 'Elaboramos', desc: 'Tiempo de producción: 3 a 7 días hábiles según la complejidad.' },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div key={step} className="bg-white/80 border border-brand-gold/20 rounded-md p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-brand-gold text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {step}
                    </div>
                    <Icon className="w-4 h-4 text-brand-brown" />
                    <h3 className="font-semibold text-stone-800 text-sm">{title}</h3>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed pl-9">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {products.length === 0 ? (
            <div className="text-center py-24 space-y-6">
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-brand-gold" />
              </div>
              <h2 className="text-2xl font-serif text-stone-800">Próximamente</h2>
              <p className="text-stone-500 text-sm max-w-md mx-auto">
                Estamos preparando nuestra colección de velas bajo pedido. Mientras tanto, escríbenos directamente por WhatsApp para cotizar tu vela personalizada.
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20interesa%20cotizar%20una%20vela%20personalizada`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                Cotizar por WhatsApp
              </a>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Catálogo Personalizado</span>
                <h2 className="text-3xl font-serif font-light text-stone-900 mt-2">Diseños Disponibles</h2>
                <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4"></div>
                <p className="text-stone-500 text-sm max-w-lg mx-auto mt-4">
                  Cada diseño puede adaptarse a tus preferencias. Escríbenos para cotizar y personalizar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => {
                  const displayImage =
                    product.imagenes && product.imagenes.length > 0
                      ? product.imagenes[0]
                      : product.url_imagen;
                  const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20interesa%20cotizar%20la%20vela%20personalizada:%20${encodeURIComponent(product.nombre)}`;

                  return (
                    <div key={product.id} className="bg-white rounded-lg border border-brand-gold/20 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
                      <Link href={`/productos/${product.id}`} className="relative aspect-square block overflow-hidden bg-stone-100">
                        <img
                          src={displayImage}
                          alt={product.nombre}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs border border-brand-gold/20 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-brand-gold" />
                          <span className="text-[10px] font-bold text-brand-brown uppercase tracking-wider">Bajo Pedido</span>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-brand-brown/80 text-[#FAF8F5] px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-widest">
                          {product.aroma}
                        </div>
                      </Link>

                      <div className="p-6 flex flex-col flex-1">
                        <Link href={`/productos/${product.id}`}>
                          <h3 className="font-serif font-medium text-stone-900 text-lg hover:text-brand-gold transition">{product.nombre}</h3>
                        </Link>
                        <p className="text-xs text-stone-500 mt-2 leading-relaxed flex-1 line-clamp-3">{product.descripcion}</p>

                        <div className="mt-4 pt-4 border-t border-stone-100 space-y-3">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-[#25D366]" />
                            <span className="text-xs font-semibold text-stone-700">Elaboración Bajo Pedido</span>
                          </div>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 bg-[#25D366] hover:bg-[#1da851] text-white text-xs uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            Cotizar por WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* General WhatsApp CTA */}
          <div className="mt-16 bg-gradient-to-r from-brand-brown to-brand-gold rounded-lg p-8 text-center text-white space-y-4">
            <h3 className="text-2xl font-serif">¿Tienes una idea especial?</h3>
            <p className="text-sm text-white/80 max-w-lg mx-auto">
              Podemos crear la vela de tus sueños: cumpleaños, bodas, recuerdos corporativos, o simplemente para ti. Sin límites en creatividad.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20tengo%20una%20idea%20especial%20para%20una%20vela%20personalizada`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-brown text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:bg-brand-cream hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Enviar Mensaje a Sandra
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
