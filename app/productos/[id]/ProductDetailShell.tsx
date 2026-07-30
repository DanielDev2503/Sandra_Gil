'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Sparkles, ChevronDown, ChevronUp, Star, Truck, ShieldCheck, CreditCard, MapPin, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SkeletonImage from '@/components/SkeletonImage';

const WA_NUMBER = '573175752029';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  aroma: string;
  material?: string | null;
  dimensiones: string;
  precio: number | null;
  esBajoPedido: boolean;
  stock: number;
  url_imagen: string;
  imagenes?: string[];
  activo: boolean;
}

interface ProductDetailShellProps {
  product: Product;
}

const MOCK_REVIEWS = [
  {
    name: 'Carolina Restrepo',
    location: 'Cedritos, Bogotá',
    rating: 5,
    date: 'Hace 3 días',
    comment: '¡Las flores preservadas se ven hermosas! El aroma a lavanda inunda toda mi sala incluso estando apagada. El empaque llegó impecable.',
  },
  {
    name: 'Felipe Gómez',
    location: 'Chapinero, Bogotá',
    rating: 5,
    date: 'Hace 1 semana',
    comment: 'Compré la vela de Jazmín con cuarzo y es de otro mundo. La combustión es súper limpia y se nota que es cera de soya 100% natural. Recomendado.',
  },
  {
    name: 'Amalia Díaz',
    location: 'Colina Campestre, Bogotá',
    rating: 5,
    date: 'Hace 2 semanas',
    comment: 'Excelente servicio. El despacho llegó a tiempo y la vela viene en una caja rígida muy segura. El aroma a cítricos y caléndula es súper energizante.',
  },
];

export default function ProductDetailShell({ product }: ProductDetailShellProps) {
  const { addToCart, clearCart } = useCart();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('aroma');

  // Prefer imagenes[] from Supabase over single url_imagen
  const galleryImages: string[] =
    product.imagenes && product.imagenes.length > 0
      ? product.imagenes
      : [product.url_imagen];

  const [selectedImage, setSelectedImage] = useState(0);

  const isLowStock = product.stock > 0 && product.stock <= 15;
  const isOutOfStock = product.stock <= 0;
  const isBajoPedido = product.esBajoPedido;

  const getScentNotes = (aroma: string) => {
    const a = aroma.toLowerCase();
    if (a.includes('lavanda')) return 'Lavanda relajante, manzanilla silvestre y toques de vainilla dulce. Ideal para meditar, aliviar el estrés y calmar la mente antes de dormir.';
    if (a.includes('rosas') || a.includes('rosa')) return 'Pétalos de rosa búlgara, peonías frescas y un fondo sutil almizclado. Aroma romántico, floral e inspirador.';
    if (a.includes('cítrico') || a.includes('citrus') || a.includes('naranja')) return 'Mandarina madura, cáscara de naranja, bergamota italiana y caléndula. Vibrante, refrescante, alegre y energizante.';
    return 'Jazmín imperial, orquídea blanca y toques cremosos de vainilla. Aroma dulce, exótico, elegante y acogedor.';
  };

  const handleBuyNow = () => {
    clearCart();
    addToCart(product, Math.max(1, quantity));
    router.push('/checkout');
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20interesa%20cotizar%20la%20vela%20personalizada:%20${encodeURIComponent(product.nombre)}`;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-brand-cream">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-stone-400 font-sans">
          <Link href="/" className="hover:text-brand-brown transition">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-brand-brown transition">Catálogo</Link>
          <span>/</span>
          <span className="text-stone-600 truncate max-w-[200px]">{product.nombre}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-stone-200/60 shadow-xs relative">
              {galleryImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                  style={{ opacity: selectedImage === idx ? 1 : 0, zIndex: selectedImage === idx ? 10 : 1 }}
                >
                  <SkeletonImage
                    src={imgUrl}
                    alt={`${product.nombre} – imagen ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Badge */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-sm shadow-xs border border-stone-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-[10px] font-bold text-stone-700 uppercase tracking-widest font-sans">
                  {isBajoPedido ? 'Elaboración Bajo Pedido' : 'Hecho a Mano en Bogotá'}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 snap-x snap-mandatory scrollbar-none">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-md overflow-hidden bg-white shrink-0 w-[45%] sm:w-auto snap-start transition-all duration-300 cursor-pointer ${
                      selectedImage === idx
                        ? 'ring-2 ring-brand-gold ring-offset-2 border-transparent shadow-md scale-[1.02]'
                        : 'border border-stone-200/50 hover:border-stone-300 hover:shadow-sm'
                    }`}
                    aria-label={`Ver imagen ${idx + 1} de ${product.nombre}`}
                  >
                    <SkeletonImage
                      src={imgUrl}
                      alt={`${product.nombre} – miniatura ${idx + 1}`}
                      className={`w-full h-full object-cover transition-all duration-300 ${selectedImage === idx ? '' : 'hover:scale-105'}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">
                {isBajoPedido ? 'Vela Personalizada · Bajo Pedido' : 'Colección Botánica Exclusiva'}
              </span>
              <h1 className="text-3xl font-serif font-light text-stone-900 mt-1">{product.nombre}</h1>

              <div className="flex items-center gap-4 mt-3">
                {isBajoPedido ? (
                  <div className="inline-flex items-center gap-2 bg-[#F0FDF4] border border-[#25D366]/30 px-3 py-1.5 rounded-sm">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="text-sm font-semibold text-[#16a34a] font-sans">Elaboración Bajo Pedido</span>
                  </div>
                ) : (
                  <p className="text-2xl font-serif font-semibold text-brand-brown">
                    ${product.precio?.toLocaleString('es-CO')} COP
                  </p>
                )}
                <div className="bg-brand-brown/80 text-[#FAF8F5] px-2.5 py-0.5 rounded-sm text-[9px] uppercase tracking-widest font-sans">
                  {product.aroma}
                </div>
              </div>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed font-sans font-light">
              {product.descripcion} Elaborada individualmente con pabilo de algodón orgánico libre de plomo para asegurar una combustión uniforme y libre de toxinas.
            </p>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              {isBajoPedido ? (
                /* WhatsApp CTA for bajo pedido */
                <div className="space-y-3 font-sans">
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Esta vela es elaborada especialmente para ti. Escríbenos por WhatsApp para conocer precios, tiempos de producción y opciones de personalización.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#1da851] hover:scale-[1.02] active:scale-[0.98] text-white text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-lg text-center flex items-center justify-center gap-2 rounded-sm cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Cotizar por WhatsApp
                  </a>
                </div>
              ) : (
                /* Normal purchase flow */
                <>
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase font-semibold text-stone-600 font-sans">Cantidad:</span>
                    <div className="flex items-center border border-stone-300 rounded-sm bg-white font-sans">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={isOutOfStock}
                        className="px-3 py-1.5 text-stone-500 hover:text-stone-900 transition disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-4 text-sm font-semibold text-stone-800">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        disabled={isOutOfStock}
                        className="px-3 py-1.5 text-stone-500 hover:text-stone-900 transition disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>

                    {isOutOfStock ? (
                      <span className="text-xs text-red-500 font-bold uppercase tracking-wider font-sans">Agotado</span>
                    ) : isLowStock ? (
                      <span className="text-xs text-amber-600 font-medium uppercase tracking-wider font-sans animate-pulse">Últimas {product.stock} unidades</span>
                    ) : (
                      <span className="text-xs text-emerald-600 font-medium uppercase tracking-wider font-sans">Disponible</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans">
                    <button
                      onClick={handleBuyNow}
                      disabled={isOutOfStock}
                      className="py-3.5 bg-brand-gold hover:bg-brand-brown hover:scale-[1.02] active:scale-[0.98] text-white text-xs uppercase tracking-widest font-bold rounded-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      Comprar Ahora
                    </button>
                    <button
                      onClick={() => addToCart(product, Math.max(1, quantity))}
                      disabled={isOutOfStock}
                      className="py-3.5 bg-white hover:bg-stone-50 hover:scale-[1.02] active:scale-[0.98] border border-brand-brown text-brand-brown text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 cursor-pointer disabled:border-stone-300 disabled:text-stone-400 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="space-y-3 pt-4 border-t border-stone-200 font-sans text-xs">
              <div className="bg-white p-3.5 rounded-sm border border-stone-200/50 flex gap-3 items-start">
                <CreditCard className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-800">Transacción 100% Segura</p>
                  <p className="text-[10px] text-stone-500 leading-relaxed mt-0.5">Procesado por Wompi (Bancolombia) 🔒. Aceptamos Nequi, PSE y Tarjetas de Crédito.</p>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-sm border border-stone-200/50 flex gap-3 items-start">
                <Truck className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-800">Envío Gratis Garantizado</p>
                  <p className="text-[10px] text-stone-500 leading-relaxed mt-0.5">Envíos GRATIS en Bogotá y municipios aledaños. Empaque reforzado a prueba de impactos 📦.</p>
                </div>
              </div>
            </div>

            {/* Accordion */}
            <div className="border border-stone-200 rounded-sm overflow-hidden bg-white divide-y divide-stone-200 font-sans text-sm">
              {[
                { key: 'aroma', label: 'Notas del Aroma & Aromaterapia', content: <p className="text-xs text-stone-500 leading-relaxed font-light">{getScentNotes(product.aroma)}</p> },
                {
                  key: 'specs', label: 'Dimensiones & Duración de Luz', content: (
                    <div className="text-xs text-stone-500 leading-relaxed font-light space-y-2">
                      <p><strong>Dimensiones:</strong> {product.dimensiones}</p>
                      <p><strong>Duración estimada:</strong> ~40 a 45 horas de encendido continuo.</p>
                      <p><strong>Contenedor:</strong> Envase de vidrio premium, ideal para reutilizar como florero.</p>
                    </div>
                  )
                },
                {
                  key: 'care', label: 'Consejos de Cuidado & Seguridad', content: (
                    <div className="text-xs text-stone-500 leading-relaxed font-light space-y-2.5">
                      <p>Para aprovechar al máximo tu vela artesanal:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li><strong>Pabilo Corto:</strong> Recorta a 5 mm antes de cada encendido.</li>
                        <li><strong>Memoria de Cera:</strong> En el primer encendido, deja que la cera llegue a los bordes del vidrio.</li>
                        <li><strong>Tiempo Máximo:</strong> No dejes encendida por más de 4 horas seguidas.</li>
                        <li><strong>Seguridad:</strong> Sobre superficie resistente al calor. Fuera del alcance de niños y mascotas.</li>
                      </ul>
                    </div>
                  )
                },
              ].map(({ key, label, content }) => (
                <div key={key}>
                  <button
                    onClick={() => toggleAccordion(key)}
                    className="w-full px-5 py-4 flex items-center justify-between font-semibold text-stone-800 hover:bg-stone-50/50 transition text-left"
                  >
                    <span>{label}</span>
                    {activeAccordion === key ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                  </button>
                  {activeAccordion === key && <div className="px-5 pb-5">{content}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-20 pt-10 border-t border-stone-200">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">Opiniones de Clientes</span>
            <h2 className="text-2xl font-serif text-stone-900 mt-1">Lo Que Dicen de Sandra Gil</h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />)}
              <span className="text-xs font-semibold text-stone-700 ml-2">5.0 / 5.0 Estrellas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {MOCK_REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-stone-200/50 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-stone-800">{review.name}</p>
                      <p className="text-[10px] text-stone-400 flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 shrink-0" /> {review.location}
                      </p>
                    </div>
                    <span className="text-[10px] text-stone-400">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />)}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-light italic">"{review.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
