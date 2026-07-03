'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/context/CartContext';
import { Sparkles, MapPin, ChevronDown, ChevronUp, Star, Truck, ShieldCheck, CreditCard, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SkeletonImage from '@/components/SkeletonImage';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  aroma: string;
  dimensiones: string;
  precio: number;
  stock: number;
  url_imagen: string;
  activo: boolean;
}

interface ProductDetailShellProps {
  product: Product;
}

// Mock Reviews for social proof
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

  const isLowStock = product.stock > 0 && product.stock <= 15;
  const isOutOfStock = product.stock <= 0;

  // Scent details helper based on aroma
  const getScentNotes = (aroma: string) => {
    const aromaLower = aroma.toLowerCase();
    if (aromaLower.includes('lavanda')) {
      return 'Lavanda relajante, manzanilla silvestre y toques de vainilla dulce. Ideal para meditar, aliviar el estrés y calmar la mente antes de dormir.';
    }
    if (aromaLower.includes('rosas')) {
      return 'Pétalos de rosa búlgara, peonías frescas y un fondo sutil almizclado. Aroma romántico, floral e inspirador.';
    }
    if (aromaLower.includes('cítricos') || aromaLower.includes('citrus')) {
      return 'Mandarina madura, cáscara de naranja, bergamota italiana y caléndula. Vibrante, refrescante, alegre y energizante.';
    }
    return 'Jazmín imperial, orquídea blanca y toques cremosos de vainilla. Aroma dulce, exótico, elegante y acogedor.';
  };

  const handleBuyNow = () => {
    const cleanQty = Math.max(1, quantity);
    clearCart();
    addToCart(product, cleanQty);
    router.push('/checkout');
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FBF9F6]">
      {/* Header */}
      <Header />

      {/* Main product detail section */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-stone-200/60 shadow-xs relative">
              <SkeletonImage
                src={product.url_imagen}
                alt={product.nombre}
                className="w-full h-full object-cover"
              />
              
              {/* Handcrafted Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-sm shadow-xs border border-stone-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#A68F81]" />
                <span className="text-[10px] font-bold text-stone-700 uppercase tracking-widest font-sans">
                  Hecho a Mano en Bogotá
                </span>
              </div>
            </div>

            {/* Sub-images for gallery */}
            <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 snap-x snap-mandatory scrollbar-none">
              <div className="aspect-square rounded-md overflow-hidden bg-white border border-stone-200/50 shrink-0 w-[45%] sm:w-auto snap-start">
                <img
                  src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=350"
                  alt="Ingredientes botánicos aromaterapia"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="aspect-square rounded-md overflow-hidden bg-white border border-stone-200/50 shrink-0 w-[45%] sm:w-auto snap-start">
                <img
                  src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=350"
                  alt="Cera de soya e insumos naturales"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="aspect-square rounded-md overflow-hidden bg-white border border-stone-200/50 shrink-0 w-[45%] sm:w-auto snap-start">
                <img
                  src="https://images.unsplash.com/photo-1596435707261-05608be50720?auto=format&fit=crop&q=80&w=350"
                  alt="Vertido de velas artesanales"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Conversions and Info */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#A68F81] font-bold font-sans">
                Colección Botánica Exclusiva
              </span>
              <h1 className="text-3xl font-serif font-light text-stone-900 mt-1">
                {product.nombre}
              </h1>
              
              <div className="flex items-center gap-4 mt-3">
                <p className="text-2xl font-serif font-semibold text-[#2C2A29]">
                  ${product.precio.toLocaleString('es-CO')} COP
                </p>
                <div className="bg-[#2C2A29]/80 backdrop-blur-xs text-[#FBF9F6] px-2.5 py-0.5 rounded-sm text-[9px] uppercase tracking-widest font-sans">
                  {product.aroma}
                </div>
              </div>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed font-sans font-light">
              {product.descripcion} Elaborada individualmente con pabilo de algodón orgánico libre de plomo para asegurar una combustión uniforme y libre de toxinas.
            </p>

            {/* Quantity Selector & Actions */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
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

                {/* Stock Tag */}
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
                  className="py-3.5 bg-[#A68F81] hover:bg-[#927d70] hover:scale-[1.02] active:scale-[0.98] text-white text-xs uppercase tracking-widest font-bold rounded-sm shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed disabled:scale-100"
                >
                  Comprar Ahora (Envío Directo)
                </button>
                <button
                  onClick={() => addToCart(product, Math.max(1, quantity))}
                  disabled={isOutOfStock}
                  className="py-3.5 bg-white hover:bg-stone-50 hover:scale-[1.02] active:scale-[0.98] border border-stone-700 text-[#2C2A29] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 ease-in-out cursor-pointer disabled:border-stone-300 disabled:text-stone-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>

            {/* CRO Trust Badges */}
            <div className="space-y-3 pt-4 border-t border-stone-200 font-sans text-xs">
              {/* Payment Security */}
              <div className="bg-white p-3.5 rounded-sm border border-stone-200/50 flex gap-3 items-start">
                <CreditCard className="w-4.5 h-4.5 text-[#A68F81] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-800">Transacción 100% Segura</p>
                  <p className="text-[10px] text-stone-500 leading-relaxed mt-0.5">
                    Procesado de forma segura por Wompi (Bancolombia) 🔒. Aceptamos Nequi, PSE y Tarjetas de Crédito.
                  </p>
                </div>
              </div>

              {/* Delivery Guarantee */}
              <div className="bg-white p-3.5 rounded-sm border border-stone-200/50 flex gap-3 items-start">
                <Truck className="w-4.5 h-4.5 text-[#A68F81] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-800">Garantía de Envío Local</p>
                  <p className="text-[10px] text-stone-500 leading-relaxed mt-0.5">
                    Envíos directos en Bogotá y alrededores. Empaque reforzado a prueba de impactos 📦.
                  </p>
                </div>
              </div>
            </div>

            {/* Accordion Block */}
            <div className="border border-stone-250 rounded-sm overflow-hidden bg-white divide-y divide-stone-200 font-sans text-sm">
              {/* Accordion 1: Aroma Notes */}
              <div>
                <button
                  onClick={() => toggleAccordion('aroma')}
                  className="w-full px-5 py-4 flex items-center justify-between font-semibold text-stone-800 hover:bg-stone-50/50 transition text-left"
                >
                  <span>Notas del Aroma & Aromaterapia</span>
                  {activeAccordion === 'aroma' ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                </button>
                {activeAccordion === 'aroma' && (
                  <div className="px-5 pb-5 text-xs text-stone-500 leading-relaxed font-light">
                    {getScentNotes(product.aroma)}
                  </div>
                )}
              </div>

              {/* Accordion 2: Dimensions & Burn Time */}
              <div>
                <button
                  onClick={() => toggleAccordion('specs')}
                  className="w-full px-5 py-4 flex items-center justify-between font-semibold text-stone-800 hover:bg-stone-50/50 transition text-left"
                >
                  <span>Dimensiones & Duración de Luz</span>
                  {activeAccordion === 'specs' ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                </button>
                {activeAccordion === 'specs' && (
                  <div className="px-5 pb-5 text-xs text-stone-500 leading-relaxed font-light space-y-2">
                    <p><strong>Dimensiones:</strong> {product.dimensiones}</p>
                    <p><strong>Duración estimada:</strong> ~40 a 45 horas de encendido continuo.</p>
                    <p><strong>Contenedor:</strong> Envase de vidrio grueso premium de grado cosmetológico, ideal para reutilizar como florero o portarobjetos después del uso.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Candle Care Tips */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full px-5 py-4 flex items-center justify-between font-semibold text-stone-800 hover:bg-stone-50/50 transition text-left"
                >
                  <span>Consejos de Cuidado & Seguridad</span>
                  {activeAccordion === 'care' ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                </button>
                {activeAccordion === 'care' && (
                  <div className="px-5 pb-5 text-xs text-stone-500 leading-relaxed font-light space-y-2.5">
                    <p>Para aprovechar al máximo tu vela artesanal, sigue estas recomendaciones básicas:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Pabilo Corto:</strong> Recorta el pabilo a 5 mm antes de cada encendido. Esto evita el humo negro y mantiene la llama estable.</li>
                      <li><strong>Memoria de Cera:</strong> En el primer encendido, deja que la cera se derrita por completo hasta los bordes del vidrio. Esto evita que se forme un "túnel" en el centro.</li>
                      <li><strong>Tiempo Máximo:</strong> No dejes encendida la vela por más de 4 horas seguidas.</li>
                      <li><strong>Seguridad:</strong> Colócala sobre una superficie resistente al calor y nunca la dejes sin supervisión. Mantén fuera del alcance de niños y mascotas.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Social Proof: Customer Reviews */}
        <section className="mt-20 pt-10 border-t border-stone-200">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#A68F81] font-bold font-sans">Opiniones de Clientes</span>
            <h2 className="text-2xl font-serif text-stone-900 mt-1">Lo Que Dicen de Sandra Gil</h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4.5 h-4.5 text-amber-400 fill-current" />
              ))}
              <span className="text-xs font-semibold text-stone-700 ml-2">5.0 / 5.0 Estrellas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {MOCK_REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-stone-200/50 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-stone-850">{review.name}</p>
                      <p className="text-[10px] text-stone-400 flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-stone-400 shrink-0" /> {review.location}
                      </p>
                    </div>
                    <span className="text-[10px] text-stone-400">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-light italic">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <footer className="bg-[#2C2A29] text-[#FBF9F6] border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-stone-800">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-light tracking-widest">SANDRA GIL</h3>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed font-light">
                Creación artesanal de velas decorativas y aromáticas premium. Diseñadas para armonizar tus sentidos y transformar tus espacios con elegancia natural.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <MapPin className="w-4 h-4 text-[#A68F81]" />
                <span>Bogotá, Colombia (Envíos locales)</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A68F81]">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li><Link href="/" className="hover:text-white transition">Inicio</Link></li>
                <li><Link href="/catalogo" className="hover:text-white transition">Catálogo Completo</Link></li>
                <li><Link href="/checkout" className="hover:text-white transition">Checkout / Pago</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A68F81]">Conecta con Nosotros</h4>
              <p className="text-xs text-stone-400 font-light">
                Síguenos en redes sociales para ver el proceso de vertido de velas y lanzamientos de nuevas colecciones.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-[#A68F81] transition flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} Sandra Gil Velas. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Hecho con <Heart className="w-3.5 h-3.5 text-red-400 fill-current" /> en Bogotá.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
