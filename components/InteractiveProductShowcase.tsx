'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Leaf, 
  Flame, 
  ShieldCheck, 
  Droplets, 
  Clock, 
  Check, 
  ShoppingBag,
  Zap
} from 'lucide-react';
import SkeletonImage from './SkeletonImage';
import CandleGlowPulse from './CandleGlowPulse';

interface Variacion {
  id: string;
  nombre: string;
  imagen: string;
  precio: number | null;
  activo: boolean;
}

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
  variaciones?: Variacion[];
}

interface InteractiveProductShowcaseProps {
  product: Product | null;
}

const AROMA_PROFILES: Record<string, { top: string; heart: string; base: string; mood: string }> = {
  'Vainilla Francesa': {
    top: 'Flor de Vainilla, Mantequilla Dulce',
    heart: 'Caramelo Tostado, Crema de Coco',
    base: 'Haba Tonka, Azúcar Morena',
    mood: 'Cálido, Acogedor & Relajante',
  },
  'Lavanda Silvestre': {
    top: 'Eucalipto Fresco, Bergamota',
    heart: 'Flores de Lavanda Francesa, Manzanilla',
    base: 'Cedro Blanco, Almizcle Suave',
    mood: 'Serenidad, Paz & Descanso Profundo',
  },
  'Café & Canela': {
    top: 'Granos de Café Colombiano Tostado',
    heart: 'Canela en Rama, Nuez Moscada',
    base: 'Cacao Puro, Vainilla Ahumada',
    mood: 'Energía, Inspiración & Calidez',
  },
  'Flores Blancas': {
    top: 'Pétalos de Jazmín, Neroli',
    heart: 'Gardenia, Lirio de los Valles',
    base: 'Ámbar Cálido, Maderas Nobles',
    mood: 'Elegancia, Frescura & Sofisticación',
  },
  'Eucalipto & Menta': {
    top: 'Menta Verde, Limón Sutil',
    heart: 'Eucalipto Silvestre, Romero',
    base: 'Musgo de Roble, Pino Blanco',
    mood: 'Claridad Mental, Purificación & Vitalidad',
  },
};

export default function InteractiveProductShowcase({ product }: InteractiveProductShowcaseProps) {
  const router = useRouter();
  const { addToCart, clearCart } = useCart();

  if (!product) return null;

  // Active variation state
  const activeVariations = useMemo(
    () => (product.variaciones || []).filter((v) => v.activo),
    [product.variaciones]
  );
  const [selectedVariation, setSelectedVariation] = useState<Variacion | null>(
    activeVariations.length > 0 ? activeVariations[0] : null
  );

  // Active aroma profile
  const defaultAroma = product.aroma || 'Vainilla Francesa';
  const availableAromas = Object.keys(AROMA_PROFILES);
  const initialAroma = availableAromas.includes(defaultAroma)
    ? defaultAroma
    : availableAromas[0];
  const [selectedAroma, setSelectedAroma] = useState<string>(initialAroma);

  // Active image
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const allImages = useMemo(() => {
    const list: string[] = [];
    if (selectedVariation?.imagen) {
      list.push(selectedVariation.imagen);
    }
    if (product.imagenes && product.imagenes.length > 0) {
      product.imagenes.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    if (product.url_imagen && !list.includes(product.url_imagen)) {
      list.push(product.url_imagen);
    }
    return list;
  }, [product, selectedVariation]);

  const currentDisplayImage = allImages[activeImageIndex] || allImages[0] || '';
  const effectivePrice = selectedVariation?.precio ?? product.precio;

  const currentOlfactory = AROMA_PROFILES[selectedAroma] || {
    top: 'Esencias Botánicas Puras',
    heart: selectedAroma,
    base: 'Cera de Soya & Ámbar',
    mood: 'Equilibrio & Armonía',
  };

  const handleBuyNow = () => {
    if (product.stock <= 0) return;
    clearCart();
    addToCart(
      product,
      1,
      selectedAroma,
      selectedVariation
        ? {
            id: selectedVariation.id,
            nombre: selectedVariation.nombre,
            imagen: selectedVariation.imagen,
            precio: selectedVariation.precio,
          }
        : null
    );
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addToCart(
      product,
      1,
      selectedAroma,
      selectedVariation
        ? {
            id: selectedVariation.id,
            nombre: selectedVariation.nombre,
            imagen: selectedVariation.imagen,
            precio: selectedVariation.precio,
          }
        : null
    );
  };

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-brand-gold/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-stone-50 rounded-full border border-brand-gold/25 mb-3">
            <CandleGlowPulse size="sm">
              <Sparkles className="w-3 h-3 text-brand-gold" />
            </CandleGlowPulse>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold font-sans">
              Experiencia Sensorial
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900 tracking-tight">
            Pieza Destacada & Perfil Olfativo
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-3 mb-4" />
          <p className="text-stone-500 text-xs sm:text-sm font-sans font-light">
            Explora las notas aromáticas exclusivas y personaliza tu experiencia antes de ordenar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Interactive Media Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square bg-[#FAF8F5] rounded-2xl overflow-hidden border border-brand-gold/20 shadow-xl group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDisplayImage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="relative w-full h-full"
                >
                  <SkeletonImage
                    src={currentDisplayImage}
                    alt={product.nombre}
                    className="w-full h-full object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-brand-brown uppercase tracking-wider shadow-xs border border-brand-gold/30">
                  100% Cera de Soya
                </span>
                {product.stock > 0 && product.stock <= 10 && (
                  <span className="bg-amber-500/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-xs">
                    Últimas {product.stock} unidades
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail list */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-brand-gold ring-2 ring-brand-gold/30 scale-105'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Vista ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Customization & Olfactory Pyramid */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-brand-gold mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-semibold font-sans">
                  Edición Artesanal Limitada
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-stone-900 leading-tight">
                {product.nombre}
              </h3>
              
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl sm:text-3xl font-serif font-semibold text-brand-brown">
                  {effectivePrice ? `$${effectivePrice.toLocaleString('es-CO')} COP` : 'Bajo Pedido'}
                </span>
                <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  ✓ Envío Gratis en Bogotá
                </span>
              </div>
            </div>

            {/* Variations Switcher (if any) */}
            {activeVariations.length > 0 && (
              <div className="space-y-2.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                  Elige tu Presentación:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {activeVariations.map((v) => {
                    const isSelected = selectedVariation?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          setSelectedVariation(v);
                          setActiveImageIndex(0);
                        }}
                        className={`px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border ${
                          isSelected
                            ? 'bg-brand-brown text-white border-brand-brown shadow-sm'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-gold" />}
                        <span>{v.nombre}</span>
                        {v.precio && (
                          <span className="text-[10px] opacity-80">
                            (${v.precio.toLocaleString('es-CO')})
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Scent Selector */}
            <div className="space-y-2.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 flex items-center justify-between">
                <span>Seleccionar Aroma:</span>
                <span className="text-[11px] font-normal text-brand-gold italic">
                  Sensación: {currentOlfactory.mood}
                </span>
              </label>

              <div className="flex flex-wrap gap-2">
                {availableAromas.map((aroma) => (
                  <button
                    key={aroma}
                    onClick={() => setSelectedAroma(aroma)}
                    className={`px-3.5 py-2 min-h-[44px] rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                      selectedAroma === aroma
                        ? 'bg-brand-gold text-white border-brand-gold shadow-xs font-semibold'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-brand-gold/50'
                    }`}
                  >
                    {aroma}
                  </button>
                ))}
              </div>
            </div>

            {/* Olfactory Pyramid Card */}
            <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-xl border border-brand-gold/25 space-y-3 font-sans">
              <div className="flex items-center gap-2 text-brand-brown pb-2 border-b border-brand-gold/15">
                <Droplets className="w-4 h-4 text-brand-gold" />
                <span className="text-xs uppercase tracking-wider font-bold">
                  Pirámide Olfativa · {selectedAroma}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white/80 p-2.5 rounded-lg border border-brand-gold/15">
                  <p className="text-[10px] uppercase font-bold text-stone-400">Salida</p>
                  <p className="font-medium text-stone-800 mt-0.5">{currentOlfactory.top}</p>
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-brand-gold/15">
                  <p className="text-[10px] uppercase font-bold text-stone-400">Corazón</p>
                  <p className="font-medium text-stone-800 mt-0.5">{currentOlfactory.heart}</p>
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-brand-gold/15">
                  <p className="text-[10px] uppercase font-bold text-stone-400">Fondo</p>
                  <p className="font-medium text-stone-800 mt-0.5">{currentOlfactory.base}</p>
                </div>
              </div>

              {/* Craftsmanship attributes */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-gold" />
                  ~45 horas de combustión limpia
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-brand-gold" />
                  Pabilo de algodón sin plomo
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="w-full py-4 min-h-[48px] bg-brand-gold hover:bg-brand-brown text-white text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Comprar Ahora · Despacho Inmediato</span>
              </button>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full py-3.5 min-h-[48px] bg-white hover:bg-stone-50 border border-brand-brown text-brand-brown text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:border-stone-300 disabled:text-stone-400 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Añadir al Carrito</span>
              </button>
            </div>

            <p className="text-[11px] text-stone-400 text-center font-sans tracking-wide">
              🔒 Pago 100% seguro con Wompi (Bancolombia, Nequi, PSE y Tarjetas).
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
