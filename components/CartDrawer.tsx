'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Truck, Lock } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount, isCartOpen, closeCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        {/* Panel */}
        <div className="w-screen max-w-md transform bg-[#FAF8F5] shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full border-l border-stone-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
            <h2 className="text-xl font-serif font-medium text-stone-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              Tu Carrito ({cartCount})
            </h2>
            <button
              onClick={closeCart}
              aria-label="Cerrar carrito"
              className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-all duration-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-stone-900 font-medium font-serif text-lg">Tu carrito está vacío</p>
                  <p className="text-xs text-stone-500 mt-1.5 font-sans leading-relaxed max-w-xs mx-auto">
                    Explora nuestro catálogo artesanal y llena tu hogar de aromas y luz natural.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 bg-brand-brown hover:bg-brand-gold text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer font-sans rounded-sm"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.id}-${item.aroma}-${item.variacionId ?? 'base'}-${idx}`}
                  className="flex gap-4 pb-4 border-b border-stone-200/60 last:border-0 last:pb-0 font-sans items-start"
                >
                  <img
                    src={item.url_imagen || '/logo-sandra.png'}
                    alt={item.nombre}
                    className="w-20 h-20 object-cover bg-stone-100 rounded-md border border-stone-200/50 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-h-[5rem]">
                    <div>
                      <h4 className="font-serif font-medium text-stone-900 text-sm leading-snug">{item.nombre}</h4>
                      {item.variacionNombre && (
                        <p className="text-[10px] text-brand-gold font-semibold uppercase tracking-wider mt-0.5">
                          {item.variacionNombre}
                        </p>
                      )}
                      <p className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">
                        Aroma: {item.aroma}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-stone-300 rounded-sm bg-white shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad - 1, item.aroma || undefined, item.variacionId)}
                          aria-label="Disminuir cantidad"
                          className="px-2.5 py-1 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-stone-800">{item.cantidad}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad + 1, item.aroma || undefined, item.variacionId)}
                          aria-label="Aumentar cantidad"
                          className="px-2.5 py-1 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price and delete button */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-brand-brown font-serif">
                          ${(item.precio * item.cantidad).toLocaleString('es-CO')} COP
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id, item.aroma || undefined, item.variacionId)}
                          aria-label={`Eliminar ${item.nombre} del carrito`}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals & trust banners */}
          {cart.length > 0 && (
            <div className="border-t border-stone-200 p-6 bg-white space-y-4">
              <div className="flex justify-between items-center text-stone-900">
                <span className="text-sm text-stone-600 font-medium font-sans">Subtotal Productos</span>
                <span className="text-xl font-serif font-semibold text-brand-brown">
                  ${cartTotal.toLocaleString('es-CO')} COP
                </span>
              </div>

              {/* Shipping info */}
              <div className="flex items-center gap-2 text-[11px] text-stone-500 font-sans bg-stone-50 p-2.5 rounded-sm border border-stone-200/60">
                <Truck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Envíos a Bogotá, Sabana y Nacional calculados en el checkout.</span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-600 font-sans">
                <div className="flex items-center gap-1.5 bg-amber-50/60 border border-brand-gold/20 p-2 rounded-sm">
                  <Lock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span className="font-medium">Pago Seguro Wompi</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50/60 border border-brand-gold/20 p-2 rounded-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span className="font-medium">Empaque Protegido</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full block text-center py-3.5 bg-brand-brown hover:bg-brand-gold text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg font-sans rounded-sm cursor-pointer active:scale-98"
                >
                  Proceder al Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
