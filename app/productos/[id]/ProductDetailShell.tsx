'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star,
  Truck,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Send,
  Ruler,
  Wind,
  Check,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SkeletonImage from '@/components/SkeletonImage';
import { isSoapProduct } from '@/app/catalogo/CatalogShell';

const WA_NUMBER = '573175752029';

interface Variacion {
  id: string;
  nombre: string;
  imagen: string;
  precio: number | null;
}

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
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

interface Resena {
  id: string;
  producto_id: string;
  autor: string;
  calificacion: number;
  comentario: string;
  creado_en: string | Date;
}

interface ProductDetailShellProps {
  product: Product;
  resenas: Resena[];
  availableAromas?: string[];
  relatedProducts?: Product[];
  variaciones?: Variacion[];
}

// ── Star Rating Input Component ────────────────────────
function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="p-0.5 transition-transform duration-150 hover:scale-110 cursor-pointer"
          aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
        >
          <Star
            className={`w-6 h-6 transition-colors duration-150 ${
              star <= (hovered || value)
                ? 'text-amber-400 fill-current'
                : 'text-stone-300'
            }`}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-xs text-stone-500 font-sans">
          {value === 1
            ? 'Mala'
            : value === 2
              ? 'Regular'
              : value === 3
                ? 'Buena'
                : value === 4
                  ? 'Muy buena'
                  : 'Excelente'}
        </span>
      )}
    </div>
  );
}

// ── Star Rating Display Component ──────────────────────
function StarRatingDisplay({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= Math.round(rating)
              ? 'text-amber-400 fill-current'
              : 'text-stone-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductDetailShell({
  product,
  resenas: initialResenas,
  availableAromas = [],
  relatedProducts = [],
  variaciones = [],
}: ProductDetailShellProps) {
  const { addToCart, clearCart } = useCart();
  const router = useRouter();

  const isSoap = isSoapProduct(product);

  const aromasList: string[] = availableAromas.length > 0 ? availableAromas : (product.aroma ? [product.aroma] : ['Aroma por defecto']);
  const [selectedAroma, setSelectedAroma] = useState<string>(product.aroma || aromasList[0] || 'Aroma por defecto');

  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('care');
  const [resenas, setResenas] = useState<Resena[]>(initialResenas);
  const [selectedVariation, setSelectedVariation] = useState<Variacion | null>(null);

  // Review form state
  const [reviewAutor, setReviewAutor] = useState('');
  const [reviewCalificacion, setReviewCalificacion] = useState(0);
  const [reviewComentario, setReviewComentario] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Gallery images
  const galleryImages: string[] =
    product.imagenes && product.imagenes.length > 0
      ? product.imagenes
      : product.url_imagen ? [product.url_imagen] : [];

  const [selectedImage, setSelectedImage] = useState(0);

  // Derived values — no useEffect needed (React best practice)
  const activePrice = selectedVariation?.precio ?? product.precio;
  const activeImage = selectedVariation?.imagen || galleryImages[selectedImage] || product.url_imagen;

  const isLowStock = product.stock > 0 && product.stock <= 15;
  const isOutOfStock = product.stock <= 0;
  const isBajoPedido = product.esBajoPedido;
  const hasVariaciones = variaciones.length > 0;

  // Computed average rating
  const avgRating =
    resenas.length > 0
      ? resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length
      : 0;

  const handleBuyNow = () => {
    clearCart();
    const productForCart = {
      ...product,
      url_imagen: activeImage || product.url_imagen,
    };
    addToCart(productForCart, Math.max(1, quantity), isSoap ? 'Jabón Sin Aroma' : selectedAroma, selectedVariation);
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    const productForCart = {
      ...product,
      url_imagen: activeImage || product.url_imagen,
    };
    addToCart(productForCart, Math.max(1, quantity), isSoap ? 'Jabón Sin Aroma' : selectedAroma, selectedVariation);
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess(false);

    if (!reviewAutor.trim()) {
      setReviewError('Ingresa tu nombre.');
      return;
    }
    if (reviewCalificacion < 1 || reviewCalificacion > 5) {
      setReviewError('Selecciona una calificación de 1 a 5 estrellas.');
      return;
    }
    if (!reviewComentario.trim()) {
      setReviewError('Escribe un comentario.');
      return;
    }

    setReviewSubmitting(true);

    try {
      const res = await fetch('/api/resenas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          producto_id: product.id,
          autor: reviewAutor.trim(),
          calificacion: reviewCalificacion,
          comentario: reviewComentario.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al enviar la reseña.');
      }

      const newResena = await res.json();
      setResenas((prev) => [newResena, ...prev]);
      setReviewAutor('');
      setReviewCalificacion(0);
      setReviewComentario('');
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error inesperado.';
      setReviewError(message);
    } finally {
      setReviewSubmitting(false);
    }
  };

  const formatDate = (dateStr: string | Date) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%20Sandra,%20me%20interesa%20cotizar%20el%20producto:%20${encodeURIComponent(product.nombre)}`;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-brand-cream">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-12 flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 sm:mb-8 flex items-center gap-2 text-xs text-stone-400 font-sans overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link href="/" className="hover:text-brand-brown transition">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-brand-brown transition">Catálogo</Link>
          <span>/</span>
          <span className="text-stone-600 truncate max-w-[180px] sm:max-w-[250px]">{product.nombre}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-stone-200/60 shadow-xs relative">
              {/* Show variation image when selected, otherwise show gallery */}
              {selectedVariation ? (
                <div className="absolute inset-0 transition-opacity duration-500 ease-in-out" style={{ opacity: 1, zIndex: 10 }}>
                  <SkeletonImage
                    src={selectedVariation.imagen}
                    alt={`${product.nombre} – ${selectedVariation.nombre}`}
                    className="w-full h-full object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                    style={{ opacity: selectedImage === idx ? 1 : 0, zIndex: selectedImage === idx ? 10 : 1 }}
                  >
                    <SkeletonImage
                      src={imgUrl}
                      alt={`${product.nombre} – imagen ${idx + 1}`}
                      className="w-full h-full object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                  </div>
                ))
              )}

              {/* Badge */}
              <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm shadow-xs border border-stone-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span className="text-[10px] font-bold text-stone-700 uppercase tracking-widest font-sans">
                  {isSoap ? 'Jabón Artesanal' : isBajoPedido ? 'Elaboración Bajo Pedido' : 'Hecho a Mano en Bogotá'}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 snap-x snap-mandatory scrollbar-none">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-md overflow-hidden bg-white shrink-0 w-20 sm:w-auto snap-start transition-all duration-300 cursor-pointer min-h-[44px] ${
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
                      fill
                      sizes="(max-width: 768px) 20vw, 15vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">
                {isSoap ? 'Cosmética Artesanal Natural' : isBajoPedido ? 'Vela Personalizada · Bajo Pedido' : 'Colección Artesanal Exclusiva'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 mt-1">{product.nombre}</h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">
                {isBajoPedido ? (
                  <div className="inline-flex items-center gap-2 bg-[#F0FDF4] border border-[#25D366]/30 px-3 py-1.5 rounded-sm">
                    <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-[#16a34a] font-sans">Elaboración Bajo Pedido</span>
                  </div>
                ) : (
                  <p className="text-xl sm:text-2xl font-serif font-semibold text-brand-brown transition-all duration-300">
                    ${activePrice?.toLocaleString('es-CO')} COP
                  </p>
                )}

                {/* Show material badge if present AND not a soap */}
                {!isSoap && product.material && (
                  <div className="bg-brand-brown/80 text-[#FAF8F5] px-2.5 py-0.5 rounded-sm text-[9px] uppercase tracking-widest font-sans">
                    {product.material}
                  </div>
                )}
              </div>

              {/* Average rating inline */}
              {resenas.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <StarRatingDisplay rating={avgRating} size="sm" />
                  <span className="text-xs text-stone-500 font-sans">
                    {avgRating.toFixed(1)} / 5.0 · {resenas.length} opinión{resenas.length !== 1 ? 'es' : ''}
                  </span>
                </div>
              )}
            </div>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans font-light">
              {product.descripcion}
            </p>

            {/* ── AROMA SELECTOR (For VELAS only - Hidden for JABON) ── */}
            {!isSoap && (
              <div className="bg-white rounded-xl border border-stone-200/80 p-4 sm:p-5 space-y-3 shadow-xs font-sans">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Selecciona el Aroma de tu Vela:</span>
                </label>

                <div className="flex flex-wrap gap-2">
                  {aromasList.map((aroma) => {
                    const isActive = selectedAroma === aroma;
                    return (
                      <button
                        key={aroma}
                        type="button"
                        onClick={() => setSelectedAroma(aroma)}
                        className={`
                          inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium
                          border transition-all duration-200 cursor-pointer min-h-[38px]
                          active:scale-95
                          ${isActive
                            ? 'border-[#B88A32] text-[#B88A32] bg-amber-50 shadow-sm font-semibold'
                            : 'border-stone-200 text-stone-600 bg-white hover:border-[#B88A32]/50 hover:text-[#B88A32] hover:bg-amber-50/40'
                          }
                        `}
                        aria-pressed={isActive}
                        aria-label={`Seleccionar aroma ${aroma}`}
                      >
                        {isActive && <Check className="w-3 h-3 shrink-0" />}
                        {aroma}
                      </button>
                    );
                  })}
                </div>

                {selectedAroma && (
                  <p className="text-[10px] text-stone-400 font-sans leading-relaxed pt-0.5">
                    ✓ Aroma seleccionado: <span className="text-[#B88A32] font-semibold">{selectedAroma}</span>
                  </p>
                )}
              </div>
            )}

            {/* ── VARIATION SELECTOR ── */}
            {hasVariaciones && !isBajoPedido && (
              <div className="bg-white rounded-xl border border-stone-200/80 p-4 sm:p-5 space-y-3 shadow-xs font-sans">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Selecciona tu Variación:</span>
                </label>

                <div className="flex flex-wrap gap-2.5">
                  {/* Original option */}
                  <button
                    type="button"
                    onClick={() => setSelectedVariation(null)}
                    className={`
                      inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium
                      border transition-all duration-250 cursor-pointer min-h-[44px]
                      hover:scale-[1.02] active:scale-[0.98]
                      ${!selectedVariation
                        ? 'border-[#B88A32] text-[#B88A32] bg-amber-50 shadow-sm font-semibold ring-1 ring-[#B88A32]/30'
                        : 'border-stone-200 text-stone-600 bg-white hover:border-[#B88A32]/50 hover:text-[#B88A32] hover:bg-amber-50/40'
                      }
                    `}
                    aria-pressed={!selectedVariation}
                  >
                    {!selectedVariation && <Check className="w-3 h-3 shrink-0" />}
                    Original
                    {product.precio !== null && (
                      <span className="text-[10px] opacity-70">${product.precio.toLocaleString('es-CO')}</span>
                    )}
                  </button>

                  {variaciones.map((v) => {
                    const isActive = selectedVariation?.id === v.id;
                    const displayPrice = v.precio ?? product.precio;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariation(v)}
                        className={`
                          inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium
                          border transition-all duration-250 cursor-pointer min-h-[44px]
                          hover:scale-[1.02] active:scale-[0.98]
                          ${isActive
                            ? 'border-[#B88A32] text-[#B88A32] bg-amber-50 shadow-sm font-semibold ring-1 ring-[#B88A32]/30'
                            : 'border-stone-200 text-stone-600 bg-white hover:border-[#B88A32]/50 hover:text-[#B88A32] hover:bg-amber-50/40'
                          }
                        `}
                        aria-pressed={isActive}
                        aria-label={`Seleccionar variación ${v.nombre}`}
                      >
                        {/* Variation thumbnail */}
                        <span className="w-7 h-7 rounded-md overflow-hidden border border-stone-200/60 shrink-0">
                          <img
                            src={v.imagen}
                            alt={v.nombre}
                            className="w-full h-full object-cover"
                          />
                        </span>
                        {isActive && <Check className="w-3 h-3 shrink-0" />}
                        <span className="truncate max-w-[120px]">{v.nombre}</span>
                        {displayPrice !== null && (
                          <span className="text-[10px] opacity-70">${displayPrice.toLocaleString('es-CO')}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedVariation && (
                  <p className="text-[10px] text-stone-400 font-sans leading-relaxed pt-0.5">
                    ✓ Variación seleccionada: <span className="text-[#B88A32] font-semibold">{selectedVariation.nombre}</span>
                  </p>
                )}
              </div>
            )}


            {/* ── INDEPENDENT DIMENSIONS CARD ── */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs flex items-center gap-3 font-sans">
              <div className="p-2.5 rounded-lg bg-amber-50 text-brand-gold shrink-0">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  Dimensiones del Producto
                </span>
                <span className="text-sm font-semibold text-stone-900">
                  {product.dimensiones || 'Tamaño Estándar Artesanal'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              {isBajoPedido ? (
                /* WhatsApp CTA for bajo pedido */
                <div className="space-y-3 font-sans">
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Este producto es elaborado especialmente bajo pedido. Escríbenos por WhatsApp para conocer precios, tiempos de producción y opciones de personalización.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 min-h-[44px] bg-[#25D366] hover:bg-[#1da851] text-white text-xs sm:text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-lg text-center flex items-center justify-center gap-2 rounded-sm cursor-pointer active:scale-98"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    Cotizar por WhatsApp
                  </a>
                </div>
              ) : (
                /* Normal purchase flow */
                <>
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase font-semibold text-stone-600 font-sans">Cantidad:</span>
                    <div className="flex items-center border border-stone-300 rounded-sm bg-white font-sans min-h-[44px]">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={isOutOfStock}
                        className="px-3.5 py-2 min-h-[44px] min-w-[44px] text-stone-500 hover:text-stone-900 transition disabled:opacity-50 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-4 text-sm font-semibold text-stone-800">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        disabled={isOutOfStock}
                        className="px-3.5 py-2 min-h-[44px] min-w-[44px] text-stone-500 hover:text-stone-900 transition disabled:opacity-50 flex items-center justify-center cursor-pointer"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans w-full">
                    <button
                      onClick={handleBuyNow}
                      disabled={isOutOfStock}
                      className="w-full py-3.5 min-h-[44px] bg-brand-gold hover:bg-brand-brown text-white text-xs uppercase tracking-widest font-bold rounded-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center active:scale-98 disabled:bg-stone-300 disabled:cursor-not-allowed"
                    >
                      Comprar Ahora
                    </button>
                    <button
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className="w-full py-3.5 min-h-[44px] bg-white hover:bg-stone-50 border border-brand-brown text-brand-brown text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 cursor-pointer flex items-center justify-center active:scale-98 disabled:border-stone-300 disabled:text-stone-400 disabled:cursor-not-allowed"
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
                  <p className="font-semibold text-stone-800">Envíos Seguros con Servientrega</p>
                  <p className="text-[10px] text-stone-500 leading-relaxed mt-0.5">Despachos locales y nacionales con empaque reforzado contra impactos 📦.</p>
                </div>
              </div>
            </div>

            {/* Accordion: Consejos de Cuidado & Seguridad */}
            <div className="border border-stone-200 rounded-sm overflow-hidden bg-white divide-y divide-stone-200 font-sans text-sm">
              {[
                {
                  key: 'care',
                  label: 'Consejos de Cuidado & Seguridad',
                  content: (
                    <div className="text-xs text-stone-600 leading-relaxed font-light space-y-2.5">
                      <p className="font-medium text-stone-800">Para aprovechar al máximo tu producto artesanal:</p>
                      <ul className="list-disc pl-4 space-y-1.5">
                        <li><strong>Pabilo Corto:</strong> Recorta el pabilo a 5 mm antes de cada encendido.</li>
                        <li><strong>Tiempo Máximo:</strong> No dejar la vela encendida por más de 2 horas continuas.</li>
                        <li><strong>Superficie Segura:</strong> Encender siempre sobre una superficie plana y resistente al calor.</li>
                        <li><strong>Precaución:</strong> Mantener fuera del alcance de niños, mascotas y materiales inflamables.</li>
                      </ul>
                    </div>
                  ),
                },
              ].map(({ key, label, content }) => (
                <div key={key}>
                  <button
                    onClick={() => toggleAccordion(key)}
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 min-h-[44px] flex items-center justify-between font-semibold text-stone-800 hover:bg-stone-50/50 transition text-left cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm">{label}</span>
                    {activeAccordion === key ? <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />}
                  </button>
                  {activeAccordion === key && <div className="px-4 sm:px-5 pb-4 sm:pb-5">{content}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── REVIEWS SECTION ──────────────────────────────── */}
        <section className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-stone-200">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">Opiniones de Clientes</span>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900 mt-1">Lo Que Dicen de Este Producto</h2>
            {resenas.length > 0 ? (
              <div className="flex items-center justify-center gap-1 mt-2">
                <StarRatingDisplay rating={avgRating} size="md" />
                <span className="text-xs font-semibold text-stone-700 ml-2">
                  {avgRating.toFixed(1)} / 5.0 · {resenas.length} opinión{resenas.length !== 1 ? 'es' : ''}
                </span>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-stone-400 mt-2 font-sans">Aún no hay opiniones para este producto.</p>
            )}
          </div>

          {/* Review Form */}
          <div className="max-w-xl mx-auto mb-10 sm:mb-12">
            <div className="bg-white rounded-lg border border-stone-200/60 p-4 sm:p-6 shadow-xs">
              <h3 className="text-sm font-semibold text-stone-800 font-sans mb-4">
                {resenas.length === 0 ? '✨ Sé el primero en compartir tu experiencia' : 'Deja tu opinión'}
              </h3>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label htmlFor="review-autor" className="block text-xs font-medium text-stone-600 mb-1 font-sans">
                    Tu nombre
                  </label>
                  <input
                    id="review-autor"
                    type="text"
                    value={reviewAutor}
                    onChange={(e) => setReviewAutor(e.target.value)}
                    placeholder="Ej: María García"
                    className="w-full px-3.5 py-3 border border-stone-300 rounded-sm text-base sm:text-sm min-h-[44px] font-sans text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1 font-sans">
                    Calificación
                  </label>
                  <StarRatingInput value={reviewCalificacion} onChange={setReviewCalificacion} />
                </div>

                <div>
                  <label htmlFor="review-comentario" className="block text-xs font-medium text-stone-600 mb-1 font-sans">
                    Tu comentario
                  </label>
                  <textarea
                    id="review-comentario"
                    value={reviewComentario}
                    onChange={(e) => setReviewComentario(e.target.value)}
                    placeholder="¿Qué te pareció el producto? Cuéntanos tu experiencia..."
                    rows={3}
                    className="w-full px-3.5 py-3 border border-stone-300 rounded-sm text-base sm:text-sm font-sans text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition bg-white resize-none"
                  />
                </div>

                {reviewError && (
                  <p className="text-xs text-red-500 font-sans">{reviewError}</p>
                )}

                {reviewSuccess && (
                  <p className="text-xs text-emerald-600 font-sans font-medium">
                    ¡Gracias por tu opinión! Tu reseña ha sido publicada.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="w-full py-3.5 min-h-[44px] bg-brand-brown hover:bg-brand-gold text-white text-xs uppercase tracking-widest font-bold rounded-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  {reviewSubmitting ? 'Enviando...' : 'Publicar Opinión'}
                </button>
              </form>
            </div>
          </div>

          {/* Reviews List */}
          {resenas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 font-sans">
              {resenas.map((review) => (
                <div key={review.id} className="bg-white p-4 sm:p-6 rounded-lg border border-stone-200/50 shadow-xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-stone-800">{review.autor}</p>
                      </div>
                      <span className="text-[10px] text-stone-400">{formatDate(review.creado_en)}</span>
                    </div>
                    <StarRatingDisplay rating={review.calificacion} size="sm" />
                    <p className="text-xs text-stone-600 leading-relaxed font-light italic">&ldquo;{review.comentario}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 font-sans">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 sm:w-7 sm:h-7 text-brand-gold" />
              </div>
              <p className="text-xs sm:text-sm text-stone-500">
                Este producto aún no tiene opiniones.
              </p>
            </div>
          )}
        </section>

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-10 border-t border-stone-200">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">Recomendado para ti</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">Productos que te pueden interesar</h2>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-3 sm:mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => {
                const soap = isSoapProduct(p);
                const displayImage = p.imagenes && p.imagenes.length > 0 ? p.imagenes[0] : p.url_imagen;

                return (
                  <div
                    key={p.id}
                    className="group bg-white rounded-lg border border-stone-200/60 overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300"
                  >
                    <Link href={`/productos/${p.id}`} className="relative aspect-square block overflow-hidden bg-stone-100">
                      <SkeletonImage
                        src={displayImage ?? ''}
                        alt={p.nombre}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-sm shadow-xs border border-stone-100">
                        <span className="text-[9px] font-bold text-stone-600 uppercase tracking-wider">
                          {soap ? 'Jabón' : p.esBajoPedido ? 'Especial' : 'Vela'}
                        </span>
                      </div>
                    </Link>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/productos/${p.id}`}>
                          <h3 className="font-serif font-medium text-stone-900 text-sm hover:text-brand-gold transition duration-200 line-clamp-1">
                            {p.nombre}
                          </h3>
                        </Link>
                        <p className="text-[10px] text-stone-400 mt-1">Medida: {p.dimensiones}</p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex justify-between items-center font-sans">
                        {p.esBajoPedido ? (
                          <span className="text-[10px] font-bold text-brand-brown uppercase tracking-wider">Bajo Pedido</span>
                        ) : (
                          <span className="text-xs font-bold text-brand-brown font-serif">
                            ${p.precio?.toLocaleString('es-CO')} COP
                          </span>
                        )}

                        <Link
                          href={`/productos/${p.id}`}
                          className="text-[10px] uppercase font-bold text-brand-gold hover:text-brand-brown transition"
                        >
                          Ver más →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
